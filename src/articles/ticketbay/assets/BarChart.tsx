import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
//basic bar chart
type Breakdown = Record<string, string>
interface BarChartProps {
  data: { name: string; value: number; breakdown?: Breakdown }[];
  width?: number;
  height?: number;
  color?: string;
  title?: string;
  hoverColor?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 500,
  height = 300,
  color = "#1e3a8a", // Tailwind blue-900
  hoverColor = "rgb(123, 142, 169)",
  title = "Bar Chart Example"
}) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // clear old chart

    // margins
    const margin = { top: 30, right: 20, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, innerWidth])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)!])
      .nice()
      .range([innerHeight, 0]);

    // chart group
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    // Tooltip setup
    const tooltip = d3
                    .select("body")
                    .append("div")
                    .style("position", "absolute")
                    .style("background", "rgba(0, 0, 0, 0.7)")
                    .style("color", "white")
                    .style("padding", "6px 10px")
                    .style("border-radius", "4px")
                    .style("font-size", "12px")
                    .style("visibility", "hidden")
                    .style("white-space", "pre-line");
    // bars
    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name)!)
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => innerHeight - y(d.value))
      .attr("fill", color)
        .on("mouseover", function (_event, d) {
        d3.select(this).attr("fill", hoverColor);

        // Tooltip content logic
        let content = ``;
        if (d.breakdown) {
          const breakdownText = Object.entries(d.breakdown)
            .map(([key, val]) => `${key}: ${val.toLocaleString()}`)
            .join("\n");
          content += `\n${breakdownText}`;
        }

        tooltip
          .style("visibility", "visible")
          .html(`<strong>${d.name}: </strong>${d.value.toLocaleString()}${content}`);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY - 40 + "px")
          .style("left", event.pageX + 15 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", color);
        tooltip.style("visibility", "hidden");
      });

    // x-axis
    // x-axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "black"); // ✅ tick labels black

    g.selectAll(".domain, .tick line")
      .attr("stroke", "black"); // ✅ axis line and ticks black

    // y-axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .style("fill", "black"); // ✅ tick labels black

    g.selectAll(".domain, .tick line")
      .attr("stroke", "black"); // ✅ axis line and ticks black

    // title
g
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("fill","black")
      .text(title);

    g
      .append("text")
      .attr("x", innerWidth /2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "13px")
      .style("fill", "#666")
      .text("(23.01~25.07)");

  }, [data, width, height, color]);

  return <svg ref={ref} width={width} height={height} style={{ borderRadius:"10px", backgroundColor: "#ffffffff" }}></svg>;
};

export default BarChart;
