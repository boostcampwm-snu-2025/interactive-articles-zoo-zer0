import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DonutChartProps {
  width?: number;
  height?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ width = 400, height = 400 }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // --- Data & style
    const data = [
      {
        label: "조치 완료",
        value: 3501,
        html: "<strong>조치완료</strong><br>총 3,501건<br>예매 취소: 211건<br>경고문 발송: 3,290건",
      },
      {
        label: "무효",
        value: 60818,
        html: "<strong>무효</strong><br>60,818건",
      },
    ];
    const colors = ["rgb(43, 63, 107)", "#e5e7eb"];

    // --- Margins
    const margin = { top: 50, right: 50, bottom: 10, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    const innerRadius = radius * 0.4;

    // Clear previous render
    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr(
        "transform",
        `translate(${margin.left + innerWidth / 2}, ${margin.top + innerHeight / 2})`
      );

    // Tooltip div
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "donut-tooltip")
      .style("position", "absolute")
      .style("padding", "10px")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("border-radius", "8px")
      .style("font-size", "13px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Pie generator
    const pie = d3
      .pie<{ label: string; value: number; html: string }>()
      .value((d) => d.value)
      .sort(null)
      .startAngle((90 * Math.PI) / 180)
      .endAngle((450 * Math.PI) / 180);

    // Arc generator
    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number; html: string }>>()
      .innerRadius(innerRadius)
      .outerRadius(radius);

    // Color scale
    const color = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d.label))
      .range(colors);

    // Draw arcs
    svg
      .selectAll("path")
      .data(pie(data))
      .join("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label)!)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("mouseover", (event, d) => {
        tooltip
          .html(d.data.html)
          .style("opacity", 1)
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 28 + "px");
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .style("opacity", 0.8);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", (event) => {
        tooltip.transition().duration(200).style("opacity", 0);
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .style("opacity", 1);
      });

    // --- Labels (stacked)
    const total = d3.sum(data, (d) => d.value);

    const labelGroups = svg
      .selectAll(".label-group")
      .data(pie(data))
      .join("g")
      .attr("class", "label-group")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`);

    // Label text (top)
    labelGroups
      .append("text")
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .style("font-size", "13px")
      .style("font-weight", "600")
      .style("fill", (d) => (d.data.label === "조치 완료" ? "white" : "#000"))
      .text((d) => d.data.label);

    // Percentage (bottom)
    labelGroups
      .append("text")
      .attr("y", 14)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", (d) => (d.data.label === "조치 완료" ? "white" : "#000"))
      .text((d) => `${((d.data.value / total) * 100).toFixed(1)}%`);

    // Title
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -radius - 30)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("스포츠 분야 조치 현황");

    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -radius - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "13px")
      .style("fill", "#666")
      .text("(23.01~25.07)");

    // Cleanup
    return () => {
      d3.select(ref.current).selectAll("*").remove();
      tooltip.remove();
    };
  }, [width, height]);

  return <svg ref={ref} style={{ borderRadius:"10px", backgroundColor: "#ffffffff" }}></svg>;
};

export default DonutChart;
