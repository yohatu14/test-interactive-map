// DrawMap.tsx
import React, { useRef, useEffect, useState } from 'react';
//importing d3 libreary to use d3 functions and draw map
import * as d3 from 'd3';

//imporinting the types
import { EntityInterface } from '../types/entities.interface';
import { useOutsideClick } from '../hooks/useOutsideClick';
//importing the components to draw the map
import SectionGrades from './SectionGrades';
import Nodes from './Nodes';
import Circles from './Circles';
import ToolTip from './ToolTip';
import ConnectionLines from './ConnectionLines';

interface CircleProps {
  data: EntityInterface[];
  selectedEntityTypes: string[];
}

const DrawMap: React.FC<CircleProps> = ({ data,selectedEntityTypes}) => {
  //using useRef to get the reference of the svg element
  const svgRef = useRef<SVGSVGElement>(null);
  //using useRef to get the reference of the container element
  const containerRef = useRef<HTMLDivElement>(null);
  //using useState to set the initial size of the map
  const [initialSize, setInitialSize] = useState<{ width: number; height: number }>({ width: 1000, height: 1000 });
  const {drawSections} = SectionGrades();  
  const {createNodes, drawNodes, selectedNodeId, setSelectedNodeId} = Nodes();
  const {drawCircles} = Circles();
  const {showTooltip} = ToolTip();
  const {drawConnections} = ConnectionLines();
  
  // Detect clicks outside
  useOutsideClick(containerRef, () => setSelectedNodeId(null));

  // Draw the chart
  const drawInitial = () => {
    // Check if the SVG and container refs are available
    if (!svgRef.current || !containerRef.current) return;
    //getting the width and height of the map
    const { width: initialWidth, height: initialHeight } = initialSize;
    //setting the outer radius of the map
    const outerRadius = Math.min(initialWidth, initialHeight) / 2;
    //setting the ring spacing of the map
    const ringSpacing = outerRadius / 3;
    //setting the last circle radius of the map
    const lastCircleRadius = 350;

    // Select the SVG element
    const svg = d3.select(svgRef.current);
    // Clear the SVG before redrawing
    svg.selectAll('*').remove(); // Clear the SVG before redrawing
    // Show tooltip
    const tooltip = showTooltip(containerRef);
    // Append a group element to the SVG
    svg.attr('viewBox', `0 0 ${initialWidth} ${initialHeight}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
    // Append a group element to the SVG
    const g = svg.append('g')
      .attr('transform', `translate(${initialWidth / 2},${initialHeight / 2})`);
    //draw the sections of the map
    drawSections(g, lastCircleRadius);
    drawCircles(g, lastCircleRadius);

    // Filter nodes based on selected entity types
    const filteredNodes = createNodes(data, ringSpacing).filter(node =>
      selectedEntityTypes.includes(node.type)
    );

    drawNodes(g, filteredNodes, tooltip);
    drawConnections(g, filteredNodes);
  };


  useEffect(() => {
    // Set the initial size of the map
    if (containerRef.current) {
      setInitialSize({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      });
    }
    drawInitial();
    window.addEventListener('resize', drawInitial);

    return () => {
      window.removeEventListener('resize', drawInitial);
    };
  }, [data, selectedEntityTypes]);

  // Effect to handle selection and animation separately
  useEffect(() => {
    // Check if the SVG ref is available
    if (!svgRef.current) return;
  
    const svg = d3.select(svgRef.current);
    const nodeSelection = svg.selectAll('g.node');
    const linkSelection = svg.selectAll('line.connection');
    // Check if a node is selected
    if (selectedNodeId) {
      // Transition the opacity of nodes and links
      nodeSelection.transition().duration(500)
        .attr('opacity', d => (d as any).id === selectedNodeId ? 1 : 0.2);
      // Transition the stroke of links
      linkSelection.transition().duration(500)
        .attr('stroke-opacity', d =>
          (d as any).source.id === selectedNodeId || ((d as any).target && (d as any).target.id === selectedNodeId) ? 1 : 0.1
        )
        .attr('stroke', d =>
          (d as any).source.id === selectedNodeId || ((d as any).target && (d as any).target.id === selectedNodeId) ? 'orange' : ''
        );
    } else {
      // Reset the opacity of nodes and links
      nodeSelection.transition().duration(500).attr('opacity', 1);
      linkSelection.transition().duration(500)
        .attr('stroke-opacity', 0.5)
        .attr('stroke', '');
    }
  }, [selectedNodeId]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default DrawMap;
