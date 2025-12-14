import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { Game } from "../types";
import { stadiumColors } from "../colors";

interface Props {
  game: Game | null;
}

export const ColorScale: React.FC<Props> = ({ game }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!game || !ref.current) return;

    const width = 65;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 20, left: 40 };

    // Clear previous SVG
    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    const stadiumColor = stadiumColors[game.stadium] || "red";

    // Vertical gradient
    const gradientId = `color-gradient-${game.stadium}`;
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", gradientId)
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "0%")
      .attr("y2", "0%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "white");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", stadiumColor || stadiumColor);

    // Draw gradient rectangle
    svg
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", 10)
      .attr("height", height - margin.top - margin.bottom)
      .style("fill", `url(#${gradientId})`)
      .style("stroke", d3.color(stadiumColor)?.darker(2)?.toString() || stadiumColor)       // outline color
      .style("stroke-width", 0.5);      // thickness of the outline

    // Add 100% and 800% labels on the left
    svg
      .append("text")
      .attr("x", margin.left - 10)
      .attr("y", height - margin.bottom)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .attr("font-size", 12)
      .text("100%");

    svg
      .append("text")
      .attr("x", margin.left - 10)
      .attr("y", margin.top)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .attr("font-size", 12)
      .text("800%");

    // Axis label
    svg
      .append("text")
      .attr("transform", `translate(${margin.left - 30},${height / 2}) rotate(-90)`)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .text("Resale Price/Original Price Ratio");

  }, [game]);

  return <svg ref={ref}></svg>;
};
