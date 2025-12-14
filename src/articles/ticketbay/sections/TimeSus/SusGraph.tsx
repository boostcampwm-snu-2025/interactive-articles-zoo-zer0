import { useEffect, useRef } from "react";
import * as d3 from "d3";
interface Props {
  OnStep: number | null;
}

export const SusGraph: React.FC<Props> = ({ OnStep }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
    const width = 650;
    const height = 350;
  useEffect(() => {
    const data = [
      { time: new Date("2025-10-09T20:42:01Z"), sus: 0 },
{ time: new Date("2025-10-09T20:42:19Z"), sus: 0 },
{ time: new Date("2025-10-09T20:42:48Z"), sus: 0 },
{ time: new Date("2025-10-09T20:42:57Z"), sus: 0 },
{ time: new Date("2025-10-09T20:43:10Z"), sus: 0 },
{ time: new Date("2025-10-09T20:43:24Z"), sus: 0 },
{ time: new Date("2025-10-09T20:43:36Z"), sus: 0 },
{ time: new Date("2025-10-09T20:43:54Z"), sus: 0 },
{ time: new Date("2025-10-09T20:44:03Z"), sus: 0 },
{ time: new Date("2025-10-09T20:45:28Z"), sus: 0 },
{ time: new Date("2025-10-09T20:45:39Z"), sus: 0 },
{ time: new Date("2025-10-09T20:45:52Z"), sus: 0 }
    ];


    const margin = { top: 20, right: 20, bottom: 60, left: 50 };

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // clear only when OnStep === null
    if (OnStep === null) {
      svg.selectAll("*").remove();
      return;
    }

    // scales
    const x = d3
      .scaleUtc()
      .domain([
        new Date("2025-10-09T20:42:45Z"),
        new Date("2025-10-09T20:44:05Z"),
      ])
          .range([margin.left, width - margin.right]);
    // Create axis with ticks every 10 seconds
    const xAxis = d3.axisBottom(x)
      .ticks(d3.utcSecond.every(5))
      .tickFormat((d) => d3.utcFormat("%H:%M:%S")(d as Date));  // ← every 10 seconds

    // Remove old axis/dots if re-rendering
//    svg.selectAll(".x-axis").remove();
//    svg.selectAll(".dot").remove();

    // Transition settings

    if (OnStep === 1) {
              svg.selectAll("*").remove();

      // Step 1: Show x-axis only
      const axisGroup = svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .style("stroke-width", 1.5)
        .call(xAxis);
    axisGroup.selectAll("text")
        .style("font-size", "12px")
        .style("font", "sans-serif")
        .style("fill", "#333").style("text-anchor", "end")
        .attr("transform", "rotate(-90)").attr("x",-10).attr("y",-5);
    



        // Add arrow line (pointing upward near start of x-axis)
        const arrowGroup = svg.append("g").attr("class", "start-arrow");
        const yBase = height-margin.bottom-60;
        // Add vertical caps (“|” shapes)
        const capHeight = 10; // height of the vertical lines
        const yTop = yBase - capHeight / 2;
        const yBottom = yBase + capHeight / 2;
        arrowGroup
            .append("line")
            .attr("x1", x(new Date("2025-10-09T20:42:45Z")))
            .attr("x2", x(new Date("2025-10-09T20:44:05Z")))
            .attr("y1", yBase)
            .attr("y2", yBase)
            .attr("stroke", "#333")
            .attr("stroke-width", 2)
            //.attr("marker-end", "url(#arrowhead)") // ✅ valid on SVG element
            .style("opacity", 0)
            .transition().duration(800)
            .style("opacity", 1);

        // Add label text above arrow
        arrowGroup
            .append("text")
            .attr("x", x(new Date("2025-10-09T20:43:22Z")))
            .attr("y", yBase-15)
            .attr("text-anchor", "start")
            .style("font-size", "20px")
            .style("font-family", "sans-serif")
            .style("fill", "#333")
            .text("80 seconds")
            .style("opacity", 0)
            .transition().duration(800)
            .style("opacity", 1);
        svg.append("line") // left cap
  .attr("x1", x(new Date("2025-10-09T20:42:45Z")))
  .attr("x2", x(new Date("2025-10-09T20:42:45Z")))
  .attr("y1", yTop)
  .attr("y2", yBottom)
  .attr("stroke", "#333")
  .attr("stroke-width", 2)
  .style("opacity", 0)
  .transition()
  .duration(800)
  .style("opacity", 1);

svg.append("line") // right cap
  .attr("x1", x(new Date("2025-10-09T20:44:05Z")))
  .attr("x2", x(new Date("2025-10-09T20:44:05Z")))
  .attr("y1", yTop)
  .attr("y2", yBottom)
  .attr("stroke", "#333")
  .attr("stroke-width", 2)
  .style("opacity", 0)
  .transition()
  .duration(800)
  .style("opacity", 1);
    }
if (OnStep === 2) {

  const dots = svg
    .selectAll(".dot-us")
    .data([
      //new Date("2025-10-09T20:42:45Z"),
      new Date("2025-10-09T20:43:05Z"),
      new Date("2025-10-09T20:43:45Z"),
    ])
    .join("circle") // automatically handles enter/update/exit
    .attr("class", "dot-us")
    .attr("cx", (d) => x(d)) // ✅ use d directly (it’s a Date)
    .attr("cy", height - margin.bottom - 60)
    .attr("r", 0)
    .attr("fill", "#b6a4c6ff");

  dots
    .transition()
    .duration(800)
    .attr("r", 10)
    .attr("opacity", 1)
    .delay((_, i) => i * 5);
}
if (OnStep === 3) {
  // Make sure axis exists (if user skipped to step 2)

  // Group data by time
  const grouped = d3.group(data, (d) => d.time.getTime());
  const stackedData: { time: Date; sus: number; stack: number }[] = [];
  // Assign stack positions for each group
  grouped.forEach((points) => {
    points.forEach((p, i) => {
      stackedData.push({
        time: p.time,
        sus: p.sus,
        stack: i, // 0 = bottom, 1 = above, etc.
      });
    });
  });

  // Step 2: Add dots with transition
  const dots = svg
    .selectAll(".dot")
    .data(stackedData)
    .join("circle")
    .attr("class", "dot")
    .attr("cx", (d) => x(d.time))
    .attr("cy", height - margin.bottom -20)
    .attr("r", 0)
    //.attr("opacity", 0)
    .attr("fill", "#b50000ff");

  dots
    .transition().duration(800)
    .attr("cx", (d) => x(d.time))
    .attr("r",10)
    .attr("opacity", 1)
    .delay((_, i) => i * 30); // staggered appearance
}

  }, [OnStep]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ backgroundColor: "#ffffffff" }}
    />
  );
};
