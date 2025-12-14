import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { Game, Seat, CategoryInfo } from "../types";
import { stadiumColors } from "../colors";

interface Props {
  game: Game | null;
  stadiumData: Record<string, Seat[]>;
  categoryData: Record<string, CategoryInfo[]>;
  selectedSeat: Seat | null; // <--- add this
  onSelect: (seat: Seat | null) => void;
}

export const StadiumChart: React.FC<Props> = ({ game, stadiumData, categoryData, selectedSeat, onSelect }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const width = 400;
  const height = width;
useEffect(() => {

  if (!game || !svgRef.current) return;
  d3.selectAll(".tooltip-chart, .tooltip-selected").remove();

  const tooltip = d3
                  .select("body")
                  .append("div").attr("class","tooltip-chart")
                  .style("position", "absolute")
                  .style("background", "rgba(0, 0, 0, 0.7)")
                  .style("color", "white")
                  .style("padding", "6px 10px")
                  .style("border-radius", "4px")
                  .style("font-size", "12px")
                  .style("z-index","10")
                  .style("visibility", "hidden");
  const data = stadiumData[game.stadium] || [];
  const category = categoryData[game.id] || [];

  
//  const tooltip = d3.select("#tooltip");
  const tooltipSelected = d3
                  .select("body")
                  .append("div").attr("class","tooltip-selected")
                  .style("position", "absolute")
                  .style("background", "rgba(0, 0, 0, 0.7)")
                  .style("color", "white")
                  .style("padding", "6px 10px")
                  .style("border-radius", "4px")
                  .style("font-size", "12px")
                  .style("visibility", "hidden");

//  const tooltipSelected = d3.select('#tooltip-selected');
  const svg = d3.select(svgRef.current);

  svg.selectAll("*").remove(); // clear previous
  
  svg.attr("style","")
    .style("background", `url('/ticketbay/img/stadiums/${game.stadium}.png`)
    .style("background-size", "cover");
  let selectedSeat: Seat | null = null; // <-- NEW
  
  // add stadium image as background
  svg
    .style("background", `url('/ticketbay/img/stadiums/${game.stadium}.png')`)
    .style("background-size", "cover");

  const xScale = d3.scaleLinear().domain([0, 950]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 950]).range([0, height]);
/*
"category": "SKY Upper Designated Seat",
      "avg_price": 76832.0,
      "max_price": 180000.0,
      "min_price": 38800.0,
      "median_price": 77000.0,
      "avg_original_price": 25000.0,
      "num_seats": 899,
      "price_to_original_ratio_pct": 307.3
 */
  const colorByCategory = new Map(
    category.map(c => [c.category, c["price_to_original_ratio_pct"]])
  );

  const stadiumColor = stadiumColors[game.stadium] || "red";
  const colorScale = d3.scaleLinear<string>().domain([100, 800]).range(["white", stadiumColor]);

  svg
    .selectAll<SVGCircleElement, Seat>("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("id",d=>`${d.x}-${d.y}`)
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", 5.5)
    .attr("fill", d => {
      const val = colorByCategory.get(d.section);
      return val !== undefined ? colorScale(val) : "#ccc";
    })
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .on("mouseover", function (event, d) {
      if (selectedSeat?.section=== d.section) return; // don't hover-highlight selected seat

      const info = category.find(p => p.category === d.section);
      tooltip
        .style("visibility", "visible")
        .html(`
          <strong>Section:</strong> ${d.section}<br>
          <strong>Resale/Original Ratio:</strong> ${info ? info["price_to_original_ratio_pct"] : "N/A"}%<br>
          <strong>Original Price:</strong> ₩${info ? Number(info["avg_original_price"]).toLocaleString() : "N/A"}<br>
          <strong>Average Resale Price:</strong> ₩${info ? Number(info["avg_price"]).toLocaleString() : "N/A"}<br>
          <strong>Median Resale Price:</strong> ₩${info ? Number(info["median_price"]).toLocaleString() : "N/A"}<br>
          <strong># of Tickets:</strong> ${info ? info["num_seats"] : "N/A"} tickets
        `)
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 20 + "px");

      svg
        .selectAll<SVGCircleElement, Seat>("circle")
        .filter(p => p.section === d.section)
        .attr("stroke-width", 3);
    })
    .on("mousemove", function (event, d) {
      if (selectedSeat?.section !==d.section) {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 20 + "px");
      }
    })
    .on("mouseout", function (_event , d) {
      

        if (selectedSeat?.section === d.section) return;
      
        // Revert hovered circle stroke
        svg
          .selectAll<SVGCircleElement, Seat>("circle")
          .filter(p => p.section === d.section)
          .attr("stroke-width", 1.5);

        tooltip.style("visibility", "hidden");      
    })
    .on("click", function (event, d) {
      onSelect(d);

      // Clear previous selection
      if (selectedSeat?.section  === d.section) {
        // Clicking again deselects
        selectedSeat = null;
        tooltip.style("visibility", "hidden");
        svg.selectAll<SVGCircleElement, Seat>("circle").attr("stroke-width", 1.5);
        return;
      }

      selectedSeat = d;
      const info = category.find(p => p.category === d.section);
      tooltip.style("visibility", "hidden");
      // Keep tooltip visible at that spot
      tooltipSelected
        .style("visibility", "visible")
        .html(`
          <strong>Section:</strong> ${d.section}<br>
          <strong>Resale/Original Ratio:</strong> ${info ? info["price_to_original_ratio_pct"] : "N/A"}%<br>
          <strong>Original Price:</strong> ₩${info ? Number(info["avg_original_price"]).toLocaleString() : "N/A"}<br>
          <strong>Average Resale Price:</strong> ₩${info ? Number(info["avg_price"]).toLocaleString() : "N/A"}<br>
          <strong>Median Resale Price:</strong> ₩${info ? Number(info["median_price"]).toLocaleString() : "N/A"}<br>
          <strong># of Tickets:</strong> ${info ? info["num_seats"] : "N/A"} tickets
        `)
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 20 + "px");

      svg.selectAll<SVGCircleElement, Seat>("circle").attr("stroke-width", 1.5);
      svg
        .selectAll<SVGCircleElement, Seat>("circle")
        .filter(p => p.section === d.section)
        .attr("stroke-width", 3);

    });
  //handle click outside
    const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest("circle")) {
      onSelect(null); // deselect seat

    }
    // If click is NOT on a circle
    if (!target.closest("circle")) {
      selectedSeat = null;
      tooltipSelected.style("visibility", "hidden");
      svg.selectAll<SVGCircleElement, Seat>("circle").attr("stroke-width", 1.5);
    }
    };
    document.addEventListener("click", handleClickOutside);
    return ()=>{
    document.removeEventListener("click", handleClickOutside);
    };
}, [game?.id, stadiumData, categoryData, onSelect]);
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    // Reset all circles to normal stroke
    svg.selectAll<SVGCircleElement, Seat>("circle")
    .attr("stroke", "#ffffffff")
    .attr("stroke-width", 1.5);

    // Highlight selected seat (by section name)
    if (selectedSeat) {
      svg.selectAll<SVGCircleElement, Seat>("circle")
        .filter(d => d.section === selectedSeat.section)
        .attr("stroke-width", 3)
        .attr("stroke", "#fcffc6ff");
    }
  }, [selectedSeat]);


  return <> <svg ref={svgRef} width={width} height={height} style={{ backgroundColor: "#eee" }} /> </>;
};
