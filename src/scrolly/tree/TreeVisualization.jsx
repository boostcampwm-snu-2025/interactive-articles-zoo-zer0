import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function TreeVisualization({ data, focusStep, focusType }) {
  const svgRef = useRef(null);
  const [root, setRoot] = useState(null);

  useEffect(() => {
    if (!data) return;

    // --- SVG setup ---
    const width = 1200;
    const height = 800;
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");

    svg.selectAll("*").remove(); // clear previous content
    const g = svg.append("g");

    // --- Tree layout ---
    const treeLayout = d3.tree().size([width, height]);
    const rootNode = d3.hierarchy(data);
    treeLayout(rootNode);
    rootNode.sort((a,b)=>{
        const aVal = a.data.femaleParticipation !== undefined
            ? a.data.femaleParticipation
            : a.data["per women"] !== undefined 
            ? a.data["per women"] / 100 : 0;
        const bVal = b.data.femaleParticipation !== undefined
            ? b.data.femaleParticipation
            : b.data["per women"] !== undefined 
            ? b.data["per women"] / 100 : 0;

        return bVal - aVal; // descending order
    })
    setRoot(rootNode);

    // --- Color scales ---
    const femaleColorScale = d3.scaleLinear().domain([0, 1]).range(["#a7e3ff", "#b80090"]);
    const sentimentColor = {
      positive: "#70a372ff",
      negative: "#c40d00ff",
      neutral: "#9E9E9E"
    };

    // --- Tooltip as SVG group ---
    const tooltipG = svg.append("g")
      .attr("class", "tooltip-g")
      .style("opacity", 0)
      .style("pointer-events", "none");

    const tooltipRect = tooltipG.append("rect")
      .attr("fill", "white")
      .attr("stroke", "#999")
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("width", 220)
      .attr("height", 90)
      .attr("opacity", 0.9);

    const tooltipText = tooltipG.append("text")
      .attr("x", 10)
      .attr("y", 20)
      .attr("font-size", 12)
      .attr("fill", "#333");

    function showTooltip(d) {
      const html = `${d.data.type || "Unknown"}: ${d.data.Title || "No title"}`;
      tooltipText.text(html);
      tooltipG.transition().duration(150).style("opacity", 1)
        .attr("transform", `translate(${d.x + 10},${d.y - 10})`);
    }

    function hideTooltip() {
      tooltipG.transition().duration(200).style("opacity", 0);
    }

    // --- Links ---
    const links = g.selectAll(".edge")
      .data(rootNode.links())
      .join("path")
      .attr("class", "edge")
      .attr("d", d3.linkVertical().x(d => d.x).y(d => d.y))
      .attr("stroke", d => sentimentColor[d.target.data.sentiment] || "#999")
      .attr("stroke-width", 1.5)
      .on("mouseover", (event, d) => showTooltip(d.target))
      .on("mouseout", hideTooltip);

    // --- Nodes ---
    const nodes = g.selectAll(".node")
      .data(rootNode.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .style("cursor", d => (d.depth === 1 || d.data.link ? "pointer" : "default"))
      .on("mouseover", (event, d) => showTooltip(d))
      .on("mouseout", hideTooltip)
      .on("click", (event, d) => {
        if (d.data.link) window.open(d.data.link, "_blank");
        else if (d.depth === 1) focusNode(d);
      });

    nodes.append("circle")
      .attr("r", d => (d.depth === 3 ? 7 : 10))
      .attr("fill", d => {
        if (d.data.type === "Review") return "#ffaf80ff";
        if (d.data.type === "Trial") {
          let femaleVal = d.data.femaleParticipation ?? (d.data["per women"] / 100 ?? 0);
          return femaleColorScale(femaleVal);
        }
        return "#ffdd46ff";
      });

    // --- Zoom ---
    const zoom = d3.zoom().on("zoom", event => g.attr("transform", event.transform));
    svg.call(zoom);

    // --- Focus / center functions ---
    function transformFor(nodeOrEdge, padding = 40) {
      const bbox = g.node().getBBox();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let centerX, centerY;
      if (focusType === "node") {
        centerX = nodeOrEdge.x;
        centerY = nodeOrEdge.y;
      } else if (focusType === "edge") {
        // center between source and target
        centerX = (nodeOrEdge.source.x + nodeOrEdge.target.x) / 2;
        centerY = (nodeOrEdge.source.y + nodeOrEdge.target.y) / 2;
      }

      const scaleX = (viewportWidth - padding * 2) / bbox.width;
      const scaleY = (viewportHeight - padding * 2) / bbox.height;
      const scale = Math.min(scaleX, scaleY, 1);

      const tx = viewportWidth / 2 - centerX * scale;
      const ty = viewportHeight / 2 - centerY * scale;
      return { scale, tx, ty };
    }

    function focusNode(nodeOrEdge) {
      const { scale, tx, ty } = transformFor(nodeOrEdge);
      svg.transition()
        .duration(800)
        .call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(scale));
    }
    
    // expose for external use (like scrollama)
    svg.node().focusNode = focusNode;
    svg.node().rootNode = rootNode;

  }, [data]);

  // --- Scrollama / external step focus ---
  useEffect(() => {
    if (!root || !focusStep) return;

    const svg = d3.select(svgRef.current);
    const g = svg.select("g");

    if (focusStep === "allReviews") {
        function adjustTreeHeight(maxDepth, op=0.1){
        nodes
            .transition().duration(500)
            .style("opacity", d => d.depth <= maxDepth ? 1 : op); // dim or hide

        links
            .transition().duration(500)
            .style("opacity", d => {
                return (d.source.depth <= maxDepth - 1 && d.target.depth <= maxDepth)
                    ? 1
                    : op;
            });
    }
        // special "allReviews" behavior
        adjustTreeHeight(4); // dim/hide nodes beyond depth 4
        const center = averageNodeDepth(rootNode, 2, 3); // average coordinates
        const { tx, ty } = transformFor(center, 0.7); // calculate translation & scale
        svg.transition().duration(1000)
        .call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(0.7));
        return; // skip normal focus
    }
    
    if (focusType === "node") {
      const node = root.descendants().find(d => d.data.id === focusStep);
      if (node) svg.node().focusNode(node);
    } else if (focusType === "edge") {
      const edge = root.links().find(l => l.target.data.id === focusStep);
      if (edge) svg.node().focusNode(edge);
    }

  }, [focusStep, focusType, root]);

  return <svg ref={svgRef}></svg>;
}
