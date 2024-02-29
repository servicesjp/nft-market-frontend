import React, { useRef, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import * as d3 from 'd3';

export interface DataProps {
  current: { date: string; value: number }[];
  old: { date: string; value: number }[];
}

interface ComparativeChartProps {
  data: DataProps;
  width?: number; 
  height: number;
  legend?: string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

const ComparativeChart: React.FC<ComparativeChartProps> = ({
  data,
  width,
  height,
  legend,
  showXAxis = true,
  showYAxis = true,
  xAxisLabel,
  yAxisLabel,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null); // <-- Agrega esta línea
  const margin = { top: 20, right: 0, bottom: 50, left: 0 };

  useEffect(() => {
    if (!svgRef.current) return;

    let effectiveWidth = width;
    if (width === undefined || width === null) {
      effectiveWidth = boxRef.current?.clientWidth || 0; // <-- Usa el ancho del div padre
    }
    const innerWidth = effectiveWidth! - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const transformedOld = data.current.map((currentItem, index) => ({
      date: currentItem.date,
      value: data.old[index] ? data.old[index].value : 0
    }));

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const xScale = d3.scalePoint<string>()
      .domain(data.current.map(d => d.date))
      .range([0, innerWidth])
      .padding(0.5);

    const allYValues = [...data.current.map(d => d.value), ...transformedOld.map(d => d.value)];
    const yScale = d3.scaleLinear()
      .domain([Math.min(...allYValues), Math.max(...allYValues)])
      .range([innerHeight, 0]);

    const lineGenerator = d3.line<{ date: string; value: number }>()
      .x(d => xScale(d.date) as number)
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const uniqueYValues = Array.from(new Set([...data.current.map(d => d.value), ...transformedOld.map(d => d.value)]));
    uniqueYValues.sort((a, b) => a - b); // Ordenar de menor a mayor

    let gridlinesValues = [];
    const minY = uniqueYValues[0];
    const maxY = uniqueYValues[uniqueYValues.length - 1];
  
    if (uniqueYValues.length < 5) {
      const midY = uniqueYValues[Math.floor(uniqueYValues.length / 2)];
      gridlinesValues = [minY, midY, maxY];
    } else {
      const step = (maxY - minY) / 5;
      for (let i = 0; i <= 5; i++) {
        gridlinesValues.push(minY + step * i);
      }
    }
  
    g.selectAll("line.horizontalGrid").data(gridlinesValues).enter()
      .append("line")
      .attr("class", "horizontalGrid")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", d => yScale(d) as number)
      .attr("y2", d => yScale(d) as number)
      .attr("fill", "none")
      .attr("shape-rendering", "crispEdges")
      .attr("stroke", "rgba(0,0,0,0.1)")
      .attr("stroke-width", "1px");

    if (showYAxis) {
      g.selectAll("text.horizontalGridLabel").data(gridlinesValues).enter()
        .append("text")
        .attr("class", "horizontalGridLabel")
        .attr("x", 0) // Alinea el texto con el inicio de la línea horizontal de la cuadrícula
        .attr("y", d => yScale(d))
        .attr("dy", -4) // Un pequeño desplazamiento para alinear verticalmente el texto con la línea
        .attr("fill", "#999999")
        .attr("text-anchor", "start") // Ancla el texto al inicio (izquierda)
        .text(d => d);
    }

    g.append('path')
      .datum(transformedOld)
      .attr('fill', 'none')
      .attr('stroke', '#CDDDF8')
      .attr('stroke-width', 2)
      .attr('d', lineGenerator);

    g.append('path')
      .datum(data.current)
      .attr('fill', 'none')
      .attr('stroke', 'var(--chakra-colors-blue-500)')
      .attr('stroke-width', 2)
      .attr('d', lineGenerator)
      .attr('filter', 'url(#drop-shadow)'); // Agregar sombra a la línea current

    // Agregar el filtro de sombra
    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'drop-shadow');
    filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', 3)
      .attr('result', 'blur');

    filter.append('feOffset')
      .attr('in', 'blur')
      .attr('dx', 2)
      .attr('dy', 7)
      .attr('result', 'offsetBlur');

    // Cambiar el color de la sombra
    filter.append('feFlood')
      .attr('flood-color', 'rgba(0,0,0,0.2)')
      .attr('result', 'color');

    filter.append('feComposite')
      .attr('in', 'color')
      .attr('in2', 'offsetBlur')
      .attr('operator', 'in')
      .attr('result', 'shadowWithColor');

    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'shadowWithColor');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const outerFocus = g.append('circle')
      .attr('r', 17)
      .attr('opacity', '0.1')
      .attr('fill', '#74AAF8')
      .attr('stroke', '#4072EE')
      .attr('stroke-width', 1)
      .style('display', 'none');

    const focus = g.append('circle')
      .attr('r', 6)
      .attr('fill', 'white')
      .attr('stroke', 'var(--chakra-colors-blue-500)')
      .attr('stroke-width', 3)
      .style('display', 'none');

    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("padding", "5px")
      .style("user-select", "none")
      .style("border-radius", "5px")
      .style("box-shadow", "0px 0px 10px rgba(0, 0, 0, 0.3)")
      .style("display", "none");

    svg.on('mousemove', function(event) {
      const [mouseX] = d3.pointer(event);
      const svgPosition = d3.select(svgRef.current)?.node()?.getBoundingClientRect();
      
      // 1. Calcular el tamaño de un segmento
      const segmentSize = innerWidth / (data.current.length - 1);
      
      // 2. Cambiar la lógica para determinar el "punto más cercano"
      const segmentIndex = Math.round(mouseX / segmentSize);
      const closestData = data.current[Math.min(segmentIndex, data.current.length - 1)];
      
      focus.attr('cx', xScale(closestData.date) as number)
        .attr('cy', yScale(closestData.value))
        .style('display', null);
      outerFocus.attr('cx', xScale(closestData.date) as number)
        .attr('cy', yScale(closestData.value))
        .style('display', null);
    
      // Show tooltip
      tooltip
        .style("left", (svgPosition!.left + xScale(closestData!.date)! + window.scrollX - 40) + "px") // <-- Añadir window.scrollX
        .style("top", (svgPosition!.top + yScale(closestData.value) + window.scrollY - 80) + "px")  // <-- Añadir window.scrollY
        .style("display", null)
        .html(`
          <div>
            <div style="display: flex;justify-content: space-between;">
              Current
              <strong>$${closestData.value}</strong>
            </div>
            <div style="display: flex;justify-content: space-between; color: var(--chakra-colors-blue-500)">
              ${transformedOld.find(item => item.date === closestData.date)?.date || '-'} : 
              <strong>$${transformedOld.find(item => item.date === closestData.date)?.value || '-'}</strong>
            </div>
          </div>
        `)
        .on("mousemove", function(event) {
          event.stopPropagation();
        })
        .on("mouseover", function(event) {
          event.stopPropagation();
        });
    })
    .on('mouseout', function(event) {
      // Verificar si el mouse se movió sobre el tooltip
      if (event.relatedTarget !== tooltip.node()) {
        focus.style('display', 'none');
        outerFocus.style('display', 'none');
        tooltip.style("display", "none");
      }  
    });

    if (showXAxis) {
      g.append('g')
        .attr('transform', `translate(0,${innerHeight + 20})`)
        .call(d3.axisBottom(xScale).tickSize(0))
        .select(".domain").remove();
      g.selectAll('.tick text').attr('fill', '#999999');
    }

    if (showYAxis) {
      g.append('g')
        .call(d3.axisLeft(yScale).tickSize(0))
        .select(".domain").remove();
      g.selectAll('.tick text').attr('fill', '#999999');
    }

  }, [data, width, height, showXAxis, showYAxis, xAxisLabel, yAxisLabel, margin.left, margin.top, margin.right, margin.bottom]);

  return (
    <Box position="relative" ref={boxRef} width={width || "100%"} >
      <svg ref={svgRef} width={"100%"} height={height}></svg>
    </Box>
  );
};

export default ComparativeChart;
