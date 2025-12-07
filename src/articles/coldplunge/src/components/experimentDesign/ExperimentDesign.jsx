import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function ExperimentDesign({ data, gendered=true }) {
  const svgRef = useRef(null);
  const [vizData, setVizData] = useState([]);
  const [studies, setStudies] = useState([]);
  const initializedRef = useRef(false);

  const columns = 6;
  const BLOCKS_PER_CELL = 5;
  const MARGIN = { top: 40, right: 10, bottom:10, left: 120 };
  
  let W = 600;
  let blockSize = W / (columns * BLOCKS_PER_CELL);
  if ((W + MARGIN.left + MARGIN.right) > window.innerWidth) {
    W = window.innerWidth * 0.9 - (MARGIN.left + MARGIN.right);
    blockSize = W / (columns * BLOCKS_PER_CELL);
  }
  const H = W;
  const TOTAL_W = W + MARGIN.left + MARGIN.right;
  const TOTAL_H = H + MARGIN.top + MARGIN.bottom;

  const femaleColorScale = d3.scaleLinear()
    .domain([0, 1])
    .range(["#a7e3ff", "#b80090"]);
  const heatmapColorScale = d3.scaleSequential()
    .interpolator(d3.interpolateBlues);
  const METHOD_ORDER = ["CWI (whole body)", "CWI (partial body)", "Cryotherapy", "Contrast Water Therapy", "Hot Water Immersion", "design etc."];
  const EFFECT_ORDER = ["Muscle recovery", "Athletic performance", "Diet", "Pain perception", "Clinical treatment", "Etc."];
  
  const METHOD_LABELS = {
    "CWI (whole body)": "CWI (whole body)",
    "CWI (partial body)": "CWI (partial body)",
    "Cryotherapy": "Cryotherapy",
    "Contrast Water Therapy": "Contrast Water",
    "Hot Water Immersion": "Hot Water",
    "design etc.": "Design etc."
  };
  
  const EFFECT_LABELS = {
    "Muscle recovery": "Muscle",
    "Athletic performance": "Performance",
    "Diet": "Diet",
    "Pain perception": "Pain",
    "Clinical treatment": "Clinical",
    "Etc.": "Etc."
  };

  function getMethods(study) {
    return METHOD_ORDER.filter(key => study[key] === 1);
  }
  
  function getEffects(study) {
    return EFFECT_ORDER.filter(key => study[key] === 1);
  }

  function getStudyPosition(method, effect) {
    if (!method || !effect) return null;

    const xGrid = EFFECT_ORDER.indexOf(effect);
    const yGrid = METHOD_ORDER.indexOf(method);

    return {
      baseX: xGrid * BLOCKS_PER_CELL * blockSize,
      baseY: yGrid * BLOCKS_PER_CELL * blockSize
    };
  }

  function indexToCellPosition(i, baseX, baseY) {
    const col = i % BLOCKS_PER_CELL;
    const row = Math.floor(i / BLOCKS_PER_CELL);

    return {
      x: baseX + col * blockSize + blockSize / 2,
      y: baseY + row * blockSize + blockSize / 2
    };
  }

  // Load & process study data
  useEffect(() => {
    if (!data || data.length === 0 || initializedRef.current) return;
    initializedRef.current = true;

    const processed = data.map(d => ({
      ...d,
      per_women: d["per women"] != null ? d["per women"] / 100 : null,
    }));

    setStudies(processed);

    // Group studies by their method-effect combination
    const cellGroups = {};
    processed.forEach((study, studyIdx) => {
      const methods = getMethods(study);
      const effects = getEffects(study);
      
      // Create a dot for each method-effect combination
      methods.forEach(method => {
        effects.forEach(effect => {
          const key = `${method}-${effect}`;
          if (!cellGroups[key]) cellGroups[key] = [];
          cellGroups[key].push({ study, studyIdx, method, effect });
        });
      });
    });

    // Create dots - one per study per cell combination
    const init = [];
    let dotId = 0;
    Object.entries(cellGroups).forEach(([key, studiesInCell]) => {
    studiesInCell.sort((a, b) => {
        const perA = a.study.per_women;
        const perB = b.study.per_women;
        
        // Put nulls at the end
        if (perA == null && perB == null) return 0;
        if (perA == null) return 1;
        if (perB == null) return -1;
        
        // Sort by per_women descending (highest first)
        return perA - perB;
      });
      studiesInCell.forEach((item, indexInCell) => {
        init.push({
          id: dotId++,
          study: item.study,
          method: item.method,
          effect: item.effect,
          indexInCell: indexInCell
        });
      });
    });

    setVizData(init);
  }, [data]);

  // Draw visualization
  useEffect(() => {
    if (vizData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g")
      .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

    // Create tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "experiment-tooltip")
      .style("position", "absolute")
      .style("padding", "10px")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("border-radius", "8px")
      .style("font-size", "13px")
      .style("pointer-events", "none")
      .style("width", "100%")
      .style("max-width", "300px")
      .style("display", "none")
    
    function showTooltip(event, htmlContent){
      tooltip.transition().duration(150)
        .style("display", "block");
      tooltip.html(htmlContent)
        .style("left",(event.pageX+15) + "px")
        .style("top", (event.pageY - 20) + "px");
    }
        
    function moveTooltip(event) {
      tooltip
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 20) + "px");
    }

    function hideTooltip() {
      tooltip.transition().duration(200)
        .style("display", "none");
    }
    
    // Draw cell borders
    const cellSize = BLOCKS_PER_CELL * blockSize;
    //for heatmap
    const cellCounts = {};
    vizData.forEach(d=>{
        const key = `${d.method}-${d.effect}`;
        cellCounts[key]=(cellCounts[key]||0)+1;
    });
    const maxCount = Math.max(...Object.values(cellCounts),1);
    for (let row = 0; row < METHOD_ORDER.length; row++) {
      for (let col = 0; col < EFFECT_ORDER.length; col++) {
        const method = METHOD_ORDER[row];
        const effect = EFFECT_ORDER[col];
        const key = `${method}-${effect}`;
        const count = cellCounts[key] || 0;
        g.append("rect")
          .attr("x", col * cellSize)
          .attr("y", row * cellSize)
          .attr("width", cellSize)
          .attr("height", cellSize)
          .attr("fill", gendered ? "none" : count >0 ? heatmapColorScale(count/maxCount):"#f9f9f9")
          .attr("stroke", "#3f3f3fff")
          .attr("stroke-width", 0.1);
                
        // Add count text in bottom right corner
        if (count > 0 && !gendered) {
          g.append("text")
            .attr("x", col * cellSize + cellSize - 5)
            .attr("y", row * cellSize + cellSize - 5)
            .attr("text-anchor", "end")
            .attr("dominant-baseline", "alphabetic")
            .style("font-size", "15px")
            .style("font-weight", "600")
            .style("fill", count>10 ? "#ffffffff" : "#333")
            .style("pointer-events", "none")
            .style("opacity", "0.8")
            .text(count);
        }
      }
    }

    // Draw dots
    g.selectAll("circle")
      .data(vizData)
      .join("circle")
      .attr("cx", d => {
        const pos = getStudyPosition(d.method, d.effect);
        if (!pos) return 0;
        const cell = indexToCellPosition(d.indexInCell, pos.baseX, pos.baseY);
        return cell.x;
      })
      .attr("cy", d => {
        const pos = getStudyPosition(d.method, d.effect);
        if (!pos) return 0;
        const cell = indexToCellPosition(d.indexInCell, pos.baseX, pos.baseY);
        return cell.y;
      })
      .attr("r", blockSize / 2.5)
        .attr("fill", d => {
        if (!gendered) return "#ffffffd5";   // color OFF → always gray
        return d.study?.per_women != null
            ? femaleColorScale(d.study.per_women)
            : "#999";
        })      .attr("opacity", 0.8)
      .style("cursor", "pointer")
      .attr("stroke", "#9E9E9E")
      .attr("stroke-width", 0)
      .on("mouseover", (event, d) => {
        d3.select(this).select("circle").attr("stroke-width", 2);
        
        const per = d.study.per_women != null 
          ? `${Math.round(d.study.per_women * 100)}%` 
          : "Not reported";
        
        const allMethods = getMethods(d.study);
        const allEffects = getEffects(d.study);
        
        const methodsText = allMethods.join(", ");
        const effectsText = allEffects.join(", ");
        
        showTooltip(event, `
            <strong>${d.study.Title || "Study"}</strong><br/>
            <strong>Method${allMethods.length > 1 ? 's' : ''}:</strong> ${methodsText}<br/>
            <strong>Effect${allEffects.length > 1 ? 's' : ''}:</strong> ${effectsText}<br/>
            <strong>Female participants:</strong> ${per}
          `);
      })
      .on("mousemove", (event) => {
        moveTooltip(event)
      })
      .on("mouseout", function(event,d){
        hideTooltip()
      })
      .on("click", function(event, d) {
              if (d.study?.link) {
                window.open(d.study.link, "_blank");
              }
            });

    // X-axis labels (Effect)
    EFFECT_ORDER.forEach((effect, i) => {
      svg.append("text")
        .attr("x", MARGIN.left + i * cellSize + cellSize / 2)
        .attr("y", MARGIN.top - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text(EFFECT_LABELS[effect]);
    });

    // Y-axis labels (Method)
    METHOD_ORDER.forEach((method, i) => {
      svg.append("text")
        .attr("x", MARGIN.left - 5)
        .attr("y", MARGIN.top + i * cellSize + cellSize / 2)
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .style("font-size", "12px")
        .text(METHOD_LABELS[method]);
    });

    // Axis titles
    svg.append("text")
      .attr("x", MARGIN.left + W / 2)
      .attr("y", MARGIN.top - 25)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "700")
      .text("Effect Type");

    svg.append("text")
      .attr("x", -(MARGIN.top + H / 2))
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .style("font-size", "14px")
      .style("font-weight", "700")
      .text("Method Type");

  }, [vizData, studies, blockSize, W, H]);

  return (
      <svg ref={svgRef} width={TOTAL_W} height={TOTAL_H} style={{}} />
  );
}