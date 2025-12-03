import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function TreeVisualization({ data, focusStep, focusType }) {
  const svgRef = useRef(null);
  const [root, setRoot] = useState(null);
  const zoomRef = useRef(null);
  const selectionsRef = useRef({ nodes: null, links: null });
  
  useEffect(() => {
    if (!data) return;

    // --- SVG setup ---
    const width = 1600;
    const height = 2400;
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

    // --- Tooltip ---
    const tooltipG = svg.append("g")
      .attr("class", "tooltip-g")
      .style("opacity", 0)
      .style("pointer-events", "none");

    tooltipG.append("rect")
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
      .attr("fill", "none")
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
        if (d.data.link) {
          window.open(d.data.link, "_blank");
        }
      });

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

    // Store selections for later use
    selectionsRef.current = { nodes, links };

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
    }

    // Store functions on SVG node for external access
    svg.node().rootNode = rootNode;
    svg.node().findNodeById = findNodeById;
    svg.node().transformFor = transformFor;
    svg.node().adjustTreeHeight = adjustTreeHeight;
    svg.node().showOneParent = showOneParent;
    svg.node().transformEdge = transformEdge;
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
    if (!findNodeById) return;

    // Handle special "allReviews" case
    if (focusStep === "allReviews") {
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
      svg.transition()
        .duration(1000)
        .call(zoom.transform, d3.zoomIdentity.translate(transform.tx, transform.ty).scale(transform.scale));
      
      return;
    }

    // Handle edge focus (show parent and its children)
    if (focusType === "edge") { 
      //focusStep is source id
      const parentNode = findNodeById(root, focusStep);
      if (!parentNode) return;

      // Special handling based on the parent node
      if (focusStep === 0) {
        // Step 1: Show root and first level
        adjustTreeHeight(1, 0);
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
        const transform = transformEdge(root, 1, 2, 100);
        svg.transition()
          .duration(1000)
          .call(zoom.transform, d3.zoomIdentity.translate(transform.tx, transform.ty).scale(transform.scale));
      } else if (focusStep === 14 || focusStep === 6) {
        // Step 5: Show specific review and its trials
        showOneParent(parentNode, 0.1);
        const transform = transformEdge(root, 2, 3, 60);

        svg.transition()
          .duration(1000)
          .call(zoom.transform, d3.zoomIdentity.translate(transform.tx, transform.ty).scale(transform.scale));
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