import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { Game, Seat, CategoryInfo } from "../types";
import { stadiumColors } from "../colors";

interface Props {
  game: Game | null;
  stadiumData: Record<string, Seat[]>;
  categoryData: Record<string, CategoryInfo[]>;
  selectedSeat: Seat | null;
}

export const StadiumChartScrolly: React.FC<Props> = ({ game, stadiumData, categoryData, selectedSeat }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const width = 400;
  const height = width;
  const xScale = d3.scaleLinear().domain([0, 950]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 950]).range([0, height]);

  useEffect(() => {
    if (!game || !svgRef.current) return;

    const data = stadiumData[game.stadium] || [];
    const category = categoryData[game.id] || [];

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // clear previous
    
    svg.attr("style","")
      .style("background", `url('/ticketbay/img/stadiums/${game.stadium}.png')`)
      .style("background-size", "cover");
/*
<strong>Section:</strong> ${d.section}<br>
          <strong>Resale Price/Original Price Ratio:</strong> ${info ? info["price_to_original_ratio_pct"] : "N/A"}%<br>
          <strong>Original Price:</strong> ₩${info ? Number(info["avg_original_price"]).toLocaleString() : "N/A"}<br>
          <strong>Average Resale Price:</strong> ₩${info ? Number(info["avg_price"]).toLocaleString() : "N/A"}<br>
          <strong>Median Resale Price:</strong> ₩${info ? Number(info["median_price"]).toLocaleString() : "N/A"}<br>
          <strong># of Seats Sold:</strong> ${info ? info["num_seats"] : "N/A"} tickets
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
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 5.5)
      .attr("fill", d => {
        const val = colorByCategory.get(d.section);
        return val !== undefined ? colorScale(val) : "#ccc";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);

  }, [game?.id, stadiumData, categoryData]);

  useEffect(() => {
    if (!svgRef.current || !game) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll(".seat-label").remove();

    // Reset all circles to normal stroke
    svg.selectAll<SVGCircleElement, Seat>("circle")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);

    // Highlight selected seat (by section name)
    if (selectedSeat) {
      svg.selectAll<SVGCircleElement, Seat>("circle")
        .filter(d => d.section === selectedSeat.section)
        .attr("stroke-width", 3)
        .attr("stroke", "#fcffc6");

      const category = categoryData[game.id] || [];
      const info = category.find(c => c.category === selectedSeat.section);

      // Use the selected seat's actual x and y coordinates
      const seatX = xScale(selectedSeat.x);
      const seatY = yScale(selectedSeat.y);
      
      // Add label with background
      const labelGroup = svg.append("g").attr("class", "seat-label");
      
      // Create styled lines with labels and values
      const padding = 10;
      const lineHeight = 18;
      const labelValuePairs = [          
        { label: "Section:", value: selectedSeat.section },
        { label: "Resale/Original Ratio:", value: info ? `${info["price_to_original_ratio_pct"]}%` : "N/A" },
        { label: "Original Price:", value: info ? `₩${Number(info["avg_original_price"]).toLocaleString()}` : "N/A" },
        { label: "Average Resale Price:", value: info ? `₩${Number(info["avg_price"]).toLocaleString()}` : "N/A" },
        { label: "Median Resale Price:", value: info ? `₩${Number(info["median_price"]).toLocaleString()}` : "N/A" },
        { label: "# of Tickets:", value: info ? `${info["num_seats"]} tickets` : "N/A" }
      ];

      const boxWidth = 200;
      const boxHeight = labelValuePairs.length * lineHeight + padding * 2;

      // Add background rectangle positioned relative to the seat
      labelGroup.append("rect")
        .style("opacity",0)
        .attr("x", seatX + 10)
        .attr("y", seatY - 20)
        .attr("width", boxWidth)
        .attr("height", boxHeight-5)
        .attr("fill", "rgba(0, 0, 0, 0.7)")
        .style("z-index",50)
        .attr("rx", 6)
        .transition().duration(800).style("opacity",1);

      // Add each line of text with label (bold) and value (normal)
      labelValuePairs.forEach((item, i) => {
        const textY = seatY - 20 + padding + (i + 0.6) * lineHeight;
        const textX = seatX + 10 + padding;
        
        // Add label (bold)
        const labelText = labelGroup.append("text")
          .attr("x", textX)
          .attr("y", textY)
          .attr("text-anchor", "start")
          .style("font-size", "12px")
          .style("font-weight", "bold")
          .style("fill", "#fff")
          .style("z-index", 55)
          .text(item.label)
          .style("opacity",0)
        .transition().duration(800).style("opacity",1);

        
        // Get the width of the label to position the value
        const labelWidth = (labelText.node() as SVGTextElement)?.getComputedTextLength() || 0;
        
        // Add value (normal weight) right after the label
        labelGroup.append("text")
          .attr("x", textX + labelWidth + 4)
          .attr("y", textY)
          .attr("text-anchor", "start")
          .style("font-size", "12px")
          .style("font-weight", "normal")
          .style("fill", "#fff")
          .style("z-index",55)
          .text(` ${item.value}`)
          .style("opacity",0)
        .transition().duration(800).style("opacity",1);

      });
    }
  }, [selectedSeat, game, stadiumData, categoryData, xScale, yScale]);

  return <svg ref={svgRef} width={width} height={height} style={{ backgroundColor: "#eee" }} />;
};