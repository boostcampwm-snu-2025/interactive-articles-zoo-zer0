import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function SourcesVisualization({ data, step }) {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [vizData, setVizData] = useState([]);
  const [studies, setStudies] = useState([]);
  const initializedRef = useRef(false);
  
  const TOTAL = 426;
  const REMOVED = 214;
  const FINAL = 212;
  let W = 600;
  let blockSize = 20;
  if (W>window.innerWidth){
    W=window.innerWidth*0.9;
    blockSize = W/30;
  }
  const stackHeight = 25;
  const H = blockSize*(stackHeight+1);
  const femaleColorScale = d3.scaleLinear()
    .domain([0, 1])
    .range(["#a7e3ff", "#b80090"]);

  // Initialize data only once
  useEffect(() => {
    if (data && data.length > 0 && !initializedRef.current) {
      initializedRef.current = true;
      const processedStudies = data.map(d => ({
        ...d,
        per_women: d["per women"] != null ? d["per women"] / 100 : null
      }));
      setStudies(processedStudies);
      
      const initialData = d3.range(TOTAL).map(i => ({
        id: i,
        active: true,
        study: null,
        group: null
      }));
      setVizData(initialData);
    }
  }, [data]);

  // Grid layout function
  const gridPosition = (i, n = TOTAL) => {
    const cols = Math.floor(W / blockSize);
    const col = i % cols;
    const row = Math.floor(i / cols);
    return { x: col * blockSize, y: row * blockSize };
  };

  // Stack layout for groups
  const stackPosition = (i, group) => {
    const col = Math.floor(i / 25);
    const row = i % 25;
    const centerX = {
      men: W * 0.10,
      mixed: W * 0.35,
      women: W * 0.6,
      unknown: W * 0.85
    }[group];
    const baseY = H - blockSize;
    return { x: centerX + col * blockSize, y: baseY - row * blockSize };
  };

  // Handle step changes - no setState here!
  useEffect(() => {
    if (!svgRef.current || vizData.length === 0 || studies.length === 0) return;

    const svg = d3.select(svgRef.current);
    
    if (step === 0) {
      // Step 0: Show all blocks in grid
      const blocks = svg.selectAll("rect.block")
        .data(vizData, d => d.id)
        .join("rect")
        .attr("class", "block")
        .attr("width", blockSize - 2)
        .attr("height", blockSize - 2);
        
      blocks.transition()
        .duration(800)
        .attr("fill", "#ccc")
        .style("opacity", 1)
        .attr("x", (d, i) => gridPosition(i).x)
        .attr("y", (d, i) => gridPosition(i).y);
    } 
    else if (step === 1) {
      // Step 1: Fade out blocks to be removed
      svg.selectAll("rect.block")
        .transition()
        .duration(800)
        .style("opacity", (d, i) => (i >= REMOVED) ? 1 : 0.15);
    }
    else if (step === 2) {
      // Step 2: Remove excluded, assign studies, and reposition
      svg.selectAll("rect.block")
        .transition()
        .duration(800)
        .style("opacity", (d, i) => (i >= REMOVED) ? 1 : 0)
        .attr("x", (d, i) => {
          if (i < REMOVED) return gridPosition(i).x;
          const activeIndex = i - REMOVED;
          return gridPosition(activeIndex, FINAL).x;
        })
        .attr("y", (d, i) => {
          if (i < REMOVED) return gridPosition(i).y;
          const activeIndex = i - REMOVED;
          return gridPosition(activeIndex, FINAL).y;
        })
        
    }
    else if (step ==3) {
        //color
        svg.selectAll("rect.block")
        .transition()
        .duration(800)
        .attr("fill", (d, i) => {
          if (i < REMOVED) return "#eee";
          const studyIndex = i - REMOVED;
          const study = studies[studyIndex];
          if (study && study.per_women != null) {
            return femaleColorScale(study.per_women);
          }
          return "#999";
        });
    }
    else if (step === 4) {
      // Step 4: Group by gender
      const groups = { men: [], mixed: [], women: [], unknown: [] };
      
      vizData.forEach((d, i) => {
        if (i < REMOVED) return;
        
        const studyIndex = i - REMOVED;
        const study = studies[studyIndex];
        
        if (!study || study.per_women == null) {
          groups.unknown.push({ ...d, index: i, group: "unknown", study });
        } else if (study.per_women === 0) {
          groups.men.push({ ...d, index: i, group: "men", study });
        } else if (study.per_women === 1) {
          groups.women.push({ ...d, index: i, group: "women", study });
        } else {
          groups.mixed.push({ ...d, index: i, group: "mixed", study });
        }
      });
        groups.mixed.sort((a, b) => a.study.per_women - b.study.per_women);

      
      // Create a map for quick lookup
      const positionMap = new Map();
      ['men', 'mixed', 'women', 'unknown'].forEach(groupName => {
        groups[groupName].forEach((item, idx) => {
          positionMap.set(item.index, { group: groupName, idx });
        });
      });
      
      svg.selectAll("rect.block")
        .transition()
        .duration(1000)
        .attr("fill", (d, i) => {
          if (i < REMOVED) return "#eee";
          const studyIndex = i - REMOVED;
          const study = studies[studyIndex];
          if (!study || study.per_women == null) return "#999";
          return femaleColorScale(study.per_women);
        })
        .attr("x", (d, i) => {
          if (i < REMOVED) return gridPosition(i).x;
          const pos = positionMap.get(i);
          if (!pos) return gridPosition(i).x;
          return stackPosition(pos.idx, pos.group).x;
        })
        .attr("y", (d, i) => {
          if (i < REMOVED) return gridPosition(i).y;
          const pos = positionMap.get(i);
          if (!pos) return gridPosition(i).y;
          return stackPosition(pos.idx, pos.group).y;
        });
    }
  }, [step, vizData, studies]);

  // Setup mouse events
  useEffect(() => {
    if (!svgRef.current || studies.length === 0) return;
    
    const svg = d3.select(svgRef.current);
    
    const handleMouseOver = (event, d) => {
      const i = vizData.findIndex(item => item.id === d.id);
      if (i >= REMOVED && tooltipRef.current) {
        const studyIndex = i - REMOVED;
        const study = studies[studyIndex];
        
        if (study) {
          const per = study.per_women == null 
            ? "Not reported" 
            : `${Math.round(study.per_women * 100)}%`;
          
          const tooltip = d3.select(tooltipRef.current);
          tooltip
            .style("opacity", 1)
            .html(`${study.Title || "Study"}<br/>Year: ${study.Year || "—"}<br/>Female participants: ${per}`);
        }
      }
    };

    const handleMouseMove = (event) => {
      if (tooltipRef.current) {
        const tooltip = d3.select(tooltipRef.current);
        tooltip
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      }
    };

    const handleMouseOut = () => {
      if (tooltipRef.current) {
        d3.select(tooltipRef.current).style("opacity", 0);
      }
    };
    
    svg.selectAll("rect.block")
      .on("mouseover", handleMouseOver)
      .on("mousemove", handleMouseMove)
      .on("mouseout", handleMouseOut);
  }, [vizData, studies]);

  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", width: "100%", height: "100vh" }}>
      <svg ref={svgRef} width={W} height={H} style={{ border: '1px solid #ddd' }} />
      <div
        ref={tooltipRef}
        style={{
          position: 'fixed',
          opacity: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          pointerEvents: 'none',
          fontSize: '14px',
          zIndex: 1000
        }}
      />
    </div>
  );
}