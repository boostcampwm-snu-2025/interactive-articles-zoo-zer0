import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TimeVisualization = ({ activeStep }) => {
  const svgRef = useRef(null);
  const rectsRef = useRef([]);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Create tooltip if it doesn't exist
    if (!tooltipRef.current) {
      tooltipRef.current = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("opacity", 0)
        .style("background-color", "white")
        .style("border", "1px solid #ddd")
        .style("padding", "10px")
        .style("font-size","12px")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("max-width","320px")
        .style("z-index", 1000);
    }

    // Load and process data
    d3.json("data.json").then(data => {
      data.forEach(d => {
        d.Year = +d.Year;
        d.perWomen = d['per women'] == null ? null : +d['per women'];
      });

      const margin = {top: 50, right: 20, bottom: 50, left: 60};
      const width = 900 - margin.left - margin.right;
      const height = 600 - margin.top - margin.bottom;

      // Clear previous content
      d3.select(svgRef.current).selectAll("*").remove();

      const svgContainer = d3.select(svgRef.current)
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      const svg = svgContainer.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const grouped = d3.group(data, d => d.Year);
      const years = Array.from(grouped.keys()).sort(d3.ascending);

      const x = d3.scaleBand().domain(years).range([0, width]).padding(0.3);
      const barHeight = 18;
      const y = d3.scaleLinear()
        .domain([0, 25])
        .range([height, height - (25 * barHeight)]);

      const colorScale = d3.scaleLinear().domain([0, 100]).range(["#a8cbe7ff", "#b80090"]);
      const tooltip = tooltipRef.current;

      // Draw bars
      const rects = [];
      years.forEach(year => {
        const studies = grouped.get(year).sort((a, b) => {
          const aVal = a.perWomen == null ? -1 : a.perWomen;
          const bVal = b.perWomen == null ? -1 : b.perWomen;
          return aVal - bVal;
        });

        let stackPos = 0;
        studies.forEach(study => {
          const barGap = 2;
          const color = study.perWomen == null ? "#757474" : colorScale(study.perWomen);
          const rect = svg.append("rect")
            .attr("x", x(year))
            .attr("y", height - (stackPos * (barHeight + barGap)) - 18)
            .attr("width", x.bandwidth() + 2)
            .attr("height", 18)
            .attr("fill", color)
            .attr("class", `bar year-${year}`)
            .on("mouseover", function(event) {
              d3.select(this).attr("fill", d3.color(color).copy({opacity: 0.5}));
            })
            .on("mousemove", (event) => {
              const tooltipHeight = tooltip.node().offsetHeight;
              const tooltipWidth = tooltip.node().offsetWidth;
              const pageHeight = window.innerHeight;
              const pageWidth = window.innerWidth;

              const mouseX = event.pageX;
              const mouseY = event.pageY;
              const mouseClientY = event.clientY;

              let topPosition = mouseY - 28;
              let leftPosition = mouseX + 15;

              if (mouseClientY + tooltipHeight + 20 > pageHeight) {
                topPosition = mouseY - tooltipHeight - 5;
              }

              if (mouseX + tooltipWidth + 20 > pageWidth) {
                leftPosition = mouseX - tooltipWidth - 15;
              }

              tooltip
                .style("opacity", 1)
                .html(`
                  <b>${study.Title}</b>(${study.Year})<br>
                  <br><b>Demographic:</b> ${study.Demographic}<br>
                  <b>Female Participation:</b> ${study.perWomen != null ? study.perWomen + '%' : 'Missing'}<br>
                  <b>Summary:</b> ${study.summary}
                `)
                .style("left", `${leftPosition}px`)
                .style("top", `${topPosition}px`);
            })
            .on("mouseout", function() {
              d3.select(this).attr("fill", color);
              tooltip.style("opacity", 0);
            })
            .on("click", function() {
              if (study.link) {
                window.open(study.link, "_blank");
              }
            });

          rects.push({el: rect, data: study});
          stackPos++;
        });
      });

      rectsRef.current = rects;

      // Axes
      const xAxis = d3.axisBottom(x).tickValues([1989, 1995, 2000, 2005, 2010, 2015, 2020, 2025]);
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis);

      svg.append("g").call(d3.axisLeft(d3.scaleLinear().domain([0, 25]).range([height, height - (25 * barHeight)]))
        .tickValues([5, 10, 15, 20, 25]));

      svg.append("text")
        .attr("x", width / 2)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .style("font-size", "24px");
    });

    // Cleanup function
    return () => {
      if (tooltipRef.current) {
        tooltipRef.current.remove();
        tooltipRef.current = null;
      }
    };
  }, []);

  // Handle step highlighting
  useEffect(() => {
    if (!svgRef.current || rectsRef.current.length === 0) return;

    const svg = d3.select(svgRef.current).select("g");
    svg.selectAll(".highlight-box").remove();

    let targets = [];

    if (activeStep === 0) {
      targets = rectsRef.current.filter(r => r.data.Year >= 2011 && r.data.Year <= 2017);
    } else if (activeStep === 1) {
      targets = rectsRef.current.filter(r => r.data.Year === 2009);
    } else if (activeStep === 2) {
      targets = rectsRef.current.filter(r => r.data.Year === 2009);
    } else if (activeStep === 3) {
      targets = rectsRef.current.filter(r => r.data.Year === 2009);
    } else if (activeStep === 4) {
      targets = rectsRef.current.filter(r => r.data.Year === 2009);
    } else if (activeStep === 5) {
      targets = rectsRef.current.filter(r => r.data.Year >= 2020 && r.data.Year <= 2025);
    } else if (activeStep === 6) {
      targets = rectsRef.current.filter(r => r.data.Year === 2025);
    } else if (activeStep === 7) {
      targets = rectsRef.current.filter(r => r.data.Year === 2025);
    } else if (activeStep === 8) {
      targets = rectsRef.current.filter(r => r.data.Year === 2020);
    } else if (activeStep === 9) {
      targets = rectsRef.current.filter(r => r.data.Year === 2020);
    } else if (activeStep === 10) {
      targets = rectsRef.current.filter(r => r.data.Year === 2020);
    }

    targets.forEach(r => {
      const bbox = r.el.node().getBBox();
      svg.insert("rect", ":first-child")
        .attr("x", bbox.x - 3)
        .attr("y", bbox.y - 3)
        .attr("width", bbox.width + 6)
        .attr("height", bbox.height + 6)
        .attr("fill", "#fff88f")
        .attr("class", "highlight-box");
    });
  }, [activeStep]);


  return (
      <svg ref={svgRef} style={{width:"90vw", maxWidth:"900px"}}></svg>
  );
};

export default TimeVisualization;