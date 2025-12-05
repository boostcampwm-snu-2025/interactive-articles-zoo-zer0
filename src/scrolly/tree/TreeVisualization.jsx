import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function TreeVisualization({ data, focusStep, focusType }) {
  const svgRef = useRef(null);
  const [root, setRoot] = useState(null);
  const zoomRef = useRef(null);
  const selectionsRef = useRef({ nodes: null, links: null, linkStroke: null, nodeLabel: null });
  
  useEffect(() => {
    if (!data) return;

    // --- SVG setup ---
    let width = 2100;
    let height = 2800; 
    const ratio = window.innerWidth/window.innerHeight;
    if (ratio<1){
      height = height*(1/ratio)
    }

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");

    svg.selectAll("*").remove();
    const g = svg.append("g");

    // --- Tree layout ---
    const treeLayout = d3.tree().size([width-100, height-100]);
    const rootNode = d3.hierarchy(data);
    
    // Sort before layout
    rootNode.sort((a, b) => {
      const aVal = a.data.femaleParticipation !== undefined
        ? a.data.femaleParticipation
        : a.data["per women"] !== undefined 
        ? a.data["per women"] / 100 
        : 0;
      const bVal = b.data.femaleParticipation !== undefined
        ? b.data.femaleParticipation
        : b.data["per women"] !== undefined 
        ? b.data["per women"] / 100 
        : 0;
      return bVal - aVal;
    });

    treeLayout(rootNode);
    setRoot(rootNode);

    // --- Color scales ---
    const femaleColorScale = d3.scaleLinear()
      .domain([0, 1])
      .range(["#a7e3ff", "#b80090"]);
    
    const sentimentColor = {
      positive: "#70a372ff",
      negative: "#c40d00ff",
      neutral: "#9E9E9E"
    };
      
    //aesthetic links
    function drawTaperedLinkVertical(d, startRadius = 1.5, endRadius = 7, samples = 20) {
      const linkGen = d3.linkVertical()
        .x(p => p.x)
        .y(p => p.y);

      // 1. Get the path as SVG string
      const pathStr = linkGen(d);

      // 2. Convert path string to SVG Path object to sample points
      const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathEl.setAttribute("d", pathStr);
      const totalLen = pathEl.getTotalLength();

      // 3. Sample points along the path
      const points = [];
      for (let i = 0; i <= samples; i++) {
        const t = i / samples;
        const pt = pathEl.getPointAtLength(t * totalLen);
        points.push({ x: pt.x, y: pt.y });
      }

      // 4. Build polygon with perpendicular offsets
      const left = [];
      const right = [];
      const n = points.length;

      points.forEach((p, i) => {
        // linear radius from start → end
        const radius = startRadius + ((endRadius - startRadius) * i) / (n - 1);

        // compute tangent
        let dx, dy;
        if (i < n - 1) {
          dx = points[i + 1].x - p.x;
          dy = points[i + 1].y - p.y;
        } else {
          dx = p.x - points[i - 1].x;
          dy = p.y - points[i - 1].y;
        }

        const len = Math.sqrt(dx * dx + dy * dy);
        const px = -dy / len;
        const py = dx / len;

        left.push([p.x + px * radius, p.y + py * radius]);
        right.push([p.x - px * radius, p.y - py * radius]);
      });

      // 5. Combine left + reversed right to make polygon
      const polygon = left.concat(right.reverse());
      return "M" + polygon.map(p => p.join(",")).join(" L") + " Z";
    }
//helper: wraptext
function wrapText(text, width) {
  text.each(function () {
    const textEl = d3.select(this);

    // --- NEW: Split text by <br> to force line breaks ---
    const paragraphs = textEl.text().split(/<br\s*\/?>/i);

    textEl.text(null); // clear

    let lineNumber = 0;
    const lineHeight = 1.2; // em
    const y = textEl.attr("y") || 0;
    const dy = parseFloat(textEl.attr("dy") || 0);

    paragraphs.forEach((paragraph, pIndex) => {
      // split paragraph into words
      let words = paragraph.trim().split(/\s+/).reverse();
      let line = [];

      let tspan = textEl.append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", (lineNumber * lineHeight + dy) + "em");

      let word;
      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));

        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];

          tspan = textEl.append("tspan")
            .attr("x", 0)
            .attr("y", y)
            .attr("dy", (++lineNumber * lineHeight + dy) + "em")
            .text(word);
        }
      }

      // after finishing a paragraph, force next line for next <br>
      if (pIndex < paragraphs.length - 1) {
        lineNumber++;
      }
    });
  });
}
function addTextBackground(g, color = "white",padding = 4) {
  g.each(function () {
    const group = d3.select(this);

    // Select the text element inside this <g>
    const text = group.select("text");

    // Get bounding box after tspans are created
    const bbox = text.node().getBBox();

    // Insert a rectangle BEFORE the text so it's behind it
    group.insert("rect", "text")
      .attr("x", bbox.x - padding)
      .attr("y", bbox.y - padding)
      .attr("width", bbox.width + padding * 2)
      .attr("height", bbox.height + padding * 2)
      .attr("fill", `${color}`)
      .attr("opacity", 0.8)
      .attr("rx", 4); // rounded corners optional
  });
}


  // --- Links ---
    //stroke layer
    let linkStroke = g.selectAll(".edge-stroke")
      .data(rootNode.links(), d=> d.target.data.id)
      .join("path")
      .attr("class", "edge-stroke")
      .attr("id", d=>`edge-stroke-${d.target.data.id}`)
      .attr("d", d3.linkVertical().x(d => d.x).y(d => d.y))
      .attr("stroke", d => sentimentColor[d.target.data.sentiment] || "#999")
      .attr("stroke-width", 1.5)
      .attr("fill", "none");
    const links = g.selectAll(".edge-tapered")
      .data(rootNode.links(), d=> d.target.data.id)
      .join("path")
      .attr("class", "edge-tapered")
      .attr("d", d => drawTaperedLinkVertical(d, 1.5, d.target.depth === 3 ? 7 : 10))
      .attr("fill", d => sentimentColor[d.target.data.sentiment] || "none")
      .attr('fill-opacity', 0.2);
    let linkLabel = g.selectAll(".edge-label")
      .data(rootNode.links(), d=>d.target.data.id)
      .join("g")
      .attr("class", "edge-label")
      .attr("id", d=>`edge-label-${d.target.data.id}`)
      .attr("transform", d=>{
        const mx = (d.source.x + d.target.x) / 2;
        const my = (d.source.y + d.target.y) /2;
        return `translate(${mx},${my})`;
      })
      .attr("display", "none")
      //.style("opacity",0)
      let linkText = linkLabel.append("text")
      .style("font-size","24px")
      //.attr("text-anchor", "middle")
      .text(d=>d.target.data.quote || "N/A")
      .call(wrapText, 600);
      linkLabel.call(addTextBackground);
/* if i want link labels to be colored based on sentiment
linkLabel.each(function(d) {
  const color = sentimentColor[d.target.data.sentiment] || "none";
  d3.select(this).call(addTextBackground, color);
});
*/
    // --- Nodes ---
    const nodes = g.selectAll(".node")
      .data(rootNode.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .style("cursor", d => (d.depth === 1 || d.data.link ? "pointer" : "default"));
    nodes.append("circle")
      .attr("r", d => (d.depth === 3 ? 7 : 10))
      .attr("fill", d => {
        if (d.data.type === "Review") return "#ffaf80ff";
        if (d.data.type === "Trial") {
          let femaleVal = d.data.femaleParticipation ?? (d.data["per women"] ? d.data["per women"] / 100 : 0);
          return femaleColorScale(femaleVal);
        }
        return "#ffdd46ff";
      });
    let nodeLabel = g.selectAll(".node-label")
      .data(rootNode.descendants(), d=>d.data.id)
      .join("g")
      .attr("id", d=>`node-label-${d.data.id}`)
      .attr("class", "node-label")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      //.style("opacity", 0)
      .attr("display", "none")

      let nodeText = nodeLabel.append("text")
      .text(d=>d.data.Title || d.data.citation || "null")
      .attr("text-anchor", "middle")
      .attr("dy", 3)
      .style("font-size","12px")
      .call(wrapText,200);
    nodeLabel.call(addTextBackground);
    // Store selections for later use

    selectionsRef.current = { nodes, links, linkStroke, nodeLabel, linkLabel, nodeText, linkText };
    //show labels
   function showLinkLabel(id){
      
      d3.select(`#edge-label-${id}`)// match the same data
        .transition().duration(1200)  
        //.style("opacity",1);
      .attr("display", "block")

    }    
    function showNodeLabel(id){
      
      d3.select(`#node-label-${id}`)// match the same data
        .transition().duration(1200)  
        //.style("opacity",1);
        .attr("display", "block")

    }
    function hideLabels(id){
      d3.selectAll(".node-label, .edge-label")
        .transition()
        .duration(1000)
        .attr("display", "none")

        //.style("opacity", 0);
    }

        
    
    
    // --- Tooltip ---
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tree-tooltip")
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
      //.style("opacity", 0);
    function showTooltip(event, htmlContent){
            //d3.select(this).attr("stroke-width, 2.5");
            tooltip.transition().duration(150)
            .style("display", "block")
            //.style("opacity",1);
            tooltip.html(htmlContent)
                .style("left",(event.pageX+15) + "px")
        }
        
    function moveTooltip(event) {
        tooltip
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY - 20) + "px");
        }

    function hideTooltip() {
        tooltip.transition().duration(200)
        //.style("display","none")
        .style("display", "none")
        //.style("opacity", 0);
        }    
    // edge hovers: Attach hover to tapered polygons
    links
      .on("mouseover", function (event, d) {
        // Make the top stroke thicker
        d3.select(`#edge-stroke-${d.target.data.id}`)// match the same data
          .attr("stroke-width", 4.5);

        const sentiment = d.target.data.sentiment || "N/A";
        const quote = d.target.data.quote || "No quote";

        showTooltip(
          event,
          `<b>Sentiment:</b> ${sentiment}<br/><b>Quote:</b> ${quote}`
        );
      })
      .on("mousemove", moveTooltip)
      .on("mouseout", function (event, d) {
        // Reset top stroke width
        d3.select(`#edge-stroke-${d.target.data.id}`)// match the same data
          .attr("stroke-width", 1.5); // match original stroke width

        hideTooltip();
      });
    
        nodes
            .on("mouseover", function (event, d) {
            d3.select(this).select("circle").attr("stroke", "#9E9E9E").attr("stroke-width", 2);
            const type = d.data.type || "Unknown";
            const femaleParticipation =
                d.data.femaleParticipation !== undefined
                ? `${Math.round(d.data.femaleParticipation * 100)}%`
                : d.data["per women"] !== undefined
                ? `${d.data["per women"]}%`
                : null;
            const title = d.data.citation || d.data.Title || "No title available";
            const doi = d.data.doi ? `<a href="${d.data.doi}" target="_blank">DOI Link</a><br>` : "";
            const screenshot = d.data.screenshot
                ? `<img src="${d.data.screenshot}" alt="screenshot" style="max-width:100%; height:auto; border-radius:8px;"/>`
                : "";
            const fp = femaleParticipation ? `Female Participation: ${femaleParticipation}<br>` : "";

            showTooltip(
                event,
                `<span class="highlight">${type}</span><br><strong>${title}</strong><br>${fp}${doi}${screenshot}`
            );
            })
            .on("mousemove", moveTooltip)
            .on("mouseout", function () {
            d3.select(this).select("circle").attr("stroke", null).attr("stroke-width", 0);
            hideTooltip();
            })
            // [MERGE] Interactive clicking: open links on leaves, toggle focus on parents
            .style("cursor", d => (d.depth === 1 || d.data.link ? "pointer" : "default"))
            .on("click", function (event, d) {
            if (d.data && d.data.link && d.depth >= 2) {
                window.open(d.data.link, "_blank");
                return;
            }
            if (d.depth === 1) {
                toggleParentFocus(d);
            }
            });    
    
    
    // --- Zoom ---
    
    const zoom = d3.zoom()
      .scaleExtent([0.1, 3])
      .filter(event => {
        // Disable all user-initiated zoom/pan events
        // Only allow programmatic zoom via zoom.transform
        return false;
      })
      .on("zoom", event => {
        g.attr("transform", event.transform);
      });
    
    svg.call(zoom);
    zoomRef.current = zoom;
    // --- Helper functions ---


    // Find node by id
    function findNodeById(root, id) {
      return root.descendants().find(d => d.data.id === id);
    }

    // Calculate average position of nodes at specific depths


    // Transform calculation for centering
    function transformFor(target, scale = 1) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      const centerX = target.x;
      const centerY = target.y;
      
      const tx = viewportWidth / 2 - centerX * scale;
      const ty = viewportHeight / 2 - centerY * scale;
      
      return { tx, ty, scale };
    }
    function transformEdge(root, minDepth, maxDepth, margin=50){
      const nodes = root.descendants().filter(
        d=>d.depth >=minDepth && d.depth <=maxDepth
      );
      if (nodes.length===0) return {tx:0, ty:0, scale:1};
      
      const minX = d3.min(nodes, d=>d.x);
      const maxX = d3.max(nodes, d=>d.x);
      const avgX = (minX + maxX) / 2;

      
      const minY = d3.min(nodes, d=>d.y);
      const maxY = d3.max(nodes, d=>d.y);
      const avgY = (minY + maxY) / 2;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      //bounds of depth range
      
      //scaledMinY should be at margin,
      //scaledMaxY should be at viewportHeight-margin
      // -> scale = availableViewportHeight / dataHeight
      const dataHeight = maxY - minY;
      const availableHeight = viewportHeight - margin *2;

      //main scale
      let scale = availableHeight / dataHeight;
      
      //just in case all nodes don't show up:
      
      const xScale = viewportWidth / (maxX-minX);
      if (xScale<scale){
        scale = xScale;
      }

      const tx = viewportWidth / 2 - avgX * scale;
      const ty = viewportHeight / 2 - avgY * scale;
      return { tx, ty, scale };
    } 

    // Adjust tree visibility by depth
    function adjustTreeHeight(maxDepth, opacity = 0.1) {
      selectionsRef.current.nodes
        .transition()
        .duration(500)
        .style("opacity", d => d.depth <= maxDepth ? 1 : opacity);

      selectionsRef.current.links
        .transition()
        .duration(500)
        .style("opacity", d => {
          return (d.source.depth <= maxDepth - 1 && d.target.depth <= maxDepth) ? 1 : opacity;
        });
      selectionsRef.current.linkStroke
        .transition()
        .duration(500)
        .style("opacity", d => {
          return (d.source.depth <= maxDepth - 1 && d.target.depth <= maxDepth) ? 1 : opacity;
        });
    }
    // Show only one parent and its children
    function showOneParent(parentNode, hideOthersOpacity = 0.1) {
      if (!parentNode) return;
      
      const parentId = parentNode.data.id;
      const childrenIds = new Set(parentNode.children ? parentNode.children.map(c => c.data.id) : []);
      
      selectionsRef.current.nodes
        .transition()
        .duration(500)
        .style("opacity", d => {
          // Show root
          if (d.depth === 0) return 1;
          // Show the parent node
          if (d.data.id === parentId) return 1;
          // Show children of parent
          if (childrenIds.has(d.data.id)) return 1;
          // Show grandchildren (depth 3+)
          if (d.depth >= 3 && d.parent && childrenIds.has(d.parent.data.id)) return 1;
          // Hide others
          return hideOthersOpacity;
        });

      selectionsRef.current.links
        .transition()
        .duration(500)
        .style("opacity", d => {
          // Show link to parent
          if (d.target.data.id === parentId) return 1;
          // Show links to children
          if (childrenIds.has(d.target.data.id)) return 1;
          // Show links to grandchildren
          if (d.source.data.id && childrenIds.has(d.source.data.id)) return 1;
          return hideOthersOpacity;
        });
      selectionsRef.current.linkStroke
        .transition()
        .duration(500)
        .style("opacity", d => {
          // Show link to parent
          if (d.target.data.id === parentId) return 1;
          // Show links to children
          if (childrenIds.has(d.target.data.id)) return 1;
          // Show links to grandchildren
          if (d.source.data.id && childrenIds.has(d.source.data.id)) return 1;
          return hideOthersOpacity;
        });
      //labels
      
    }

    // Store functions on SVG node for external access
    
    svg.node().rootNode = rootNode;
    svg.node().findNodeById = findNodeById;
    svg.node().transformFor = transformFor;
    svg.node().adjustTreeHeight = adjustTreeHeight;
    svg.node().showOneParent = showOneParent;
    svg.node().transformEdge = transformEdge;
    svg.node().showNodeLabel = showNodeLabel;
    svg.node().hideLabels = hideLabels;
    svg.node().showLinkLabel = showLinkLabel;
    // Initial position: start at root, everything hidden
    const initialTransform = transformFor(rootNode, 1);
    adjustTreeHeight(0, 0);
    svg.call(zoom.transform, d3.zoomIdentity.translate(initialTransform.tx, initialTransform.ty).scale(initialTransform.scale));

  }, [data]);

  // --- Handle scroll-based focus changes ---
  useEffect(() => {
    if (!root || focusStep === null || focusStep === undefined) return;

    const svg = d3.select(svgRef.current);
    const zoom = zoomRef.current;
    
    const findNodeById = svg.node().findNodeById;
    const transformFor = svg.node().transformFor;
    const adjustTreeHeight = svg.node().adjustTreeHeight;
    const showOneParent = svg.node().showOneParent;
    const transformEdge = svg.node().transformEdge;
    const showNodeLabel = svg.node().showNodeLabel;
    const hideLabels = svg.node().hideLabels;
    const showLinkLabel = svg.node().showLinkLabel;
    if (!findNodeById) return;

    // Handle special "allReviews" case
    if (focusStep === "allReviews") {
      hideLabels();
      adjustTreeHeight(4);
      //const transform = transformFor(target, 0.7);
      const transform = transformEdge(root, 2, 3, 120);

      svg.transition()
        .duration(1000)
        .call(zoom.transform, d3.zoomIdentity.translate(transform.tx, transform.ty).scale(transform.scale));
      return;
    }

    // Handle node focus
    if (focusType === "node") {
      const node = findNodeById(root, focusStep);
      if (!node) return;
      const transform = transformFor(node, 1.6);
      
      svg.interrupt();
      svg.call(zoom.transform, d3.zoomTransform(svg.node()));
      
      svg.transition()
        .duration(1000)
        .call(zoom.transform, d3.zoomIdentity.translate(transform.tx, transform.ty).scale(transform.scale));
        hideLabels();
        showNodeLabel(focusStep);
        return;
    }

    // Handle edge focus (show parent and its children)
    if (focusType === "edge") { 
      hideLabels();

      //focusStep is source id
      const parentNode = findNodeById(root, focusStep);
      if (!parentNode) return;

      // Special handling based on the parent node
      if (focusStep === 0) {
        // Step 1: Show root and first level
        adjustTreeHeight(1, 0);
        showLinkLabel(1);

        //TODO: transform to center 
        // control transformFor by margin, not zoom scale
        //DONE
        const transform = transformEdge(root, 0, 1, 100);
        svg.transition()
          .duration(1000)
          .call(zoom.transform, d3.zoomIdentity.translate(transform.tx, transform.ty).scale(transform.scale));
      } else if (focusStep === 1) {
        // Step 3: Show one parent (EveryDay Health)
        showOneParent(parentNode, 0.1);
        showLinkLabel(14);
        const transform = transformEdge(root, 1, 2, 100);
        svg.transition()
          .duration(1000)
          .call(zoom.transform, d3.zoomIdentity.translate(transform.tx, transform.ty).scale(transform.scale));
      } else if (focusStep === 14 || focusStep === 6) {
        // Step 5: Show specific review and its trials
        showOneParent(parentNode, 0.1);
        const transform = transformEdge(root, 2, 3, 20);

        svg.transition()
          .duration(1000)
          .call(zoom.transform, d3.zoomIdentity.translate(transform.tx, transform.ty).scale(transform.scale));
        if(focusStep===6){
          showNodeLabel(6);
        }
        } else {
        // Default edge behavior
        showOneParent(parentNode, 0.1);
        const transform = transformEdge(root, parentNode.depth, parentNode.depth+1);
        svg.transition()
          .duration(1000)
          .call(zoom.transform, d3.zoomIdentity.translate(transform.tx, transform.ty).scale(transform.scale));
      }
    }

  }, [focusStep, focusType, root]);

  return <svg ref={svgRef} style={{width:"100%", height:"100vh"}}></svg>;
}