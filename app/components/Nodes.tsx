import  { useState } from 'react';
import * as d3 from 'd3';
import { EntityInterface } from '../types/entities.interface';
import { entityColors, iconMap } from '../constants/index'

const Nodes = () => {
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>("");

    // Create nodes
    const createNodes = (data: EntityInterface[], ringSpacing: number) => {
        return data.map(d => ({
            id: d.id,
            type: d.type,
            name: d.name,
            description: d.description,
            connections: d.connections,
            x: (ringSpacing * d.position.distance + ringSpacing / 2) * Math.cos((d.position.angle * Math.PI) / 180),
            y: (ringSpacing * d.position.distance + ringSpacing / 2) * Math.sin((d.position.angle * Math.PI) / 180)
        }));
    };

    // Draw labels for nodes
    const drawLabels = (g: d3.Selection<SVGGElement, unknown, null, undefined>, nodes: any[]) => {
        const labelPadding = 4;
        const labelOffset = 35;

        g.selectAll('g.label')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', 'label')
            .each(function (d, i) {
                const labelGroup = d3.select(this);
                const textElement = labelGroup.append('text')
                    .attr('x', d.x)
                    .attr('y', d.y + labelOffset)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '12px')
                    .attr('fill', 'black')
                    .text(d.name);
                const type = d.type as keyof typeof entityColors;
                const bbox = textElement.node()!.getBBox();
                const colorEntity = entityColors[type];
                labelGroup.insert('rect', 'text')
                    .attr('x', bbox.x - labelPadding)
                    .attr('y', bbox.y - labelPadding)
                    .attr('width', bbox.width + labelPadding * 2)
                    .attr('height', bbox.height + labelPadding * 2)
                    .attr('fill', colorEntity)
                    .attr('stroke', 'black')
                    .attr('rx', 5)
                    .attr('ry', 5);
            });
    };

    // Draw nodes with images and hover animation
    const drawNodes = (g: d3.Selection<SVGGElement, unknown, null, undefined>, nodes: any[], tooltip: d3.Selection<HTMLDivElement, unknown, null, undefined>) => {
        const nodeGroups = g.selectAll('g.node')
            .data(nodes)
            .enter().append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x},${d.y})`)
            .on('click', function (event, d) {
                setSelectedNodeId(selectedNodeId === d.id ? null : d.id);
                event.stopPropagation();
            })
            .on('mouseover', function (_, d) {
                const relatedNodes = d.connections.map((conn: any) => {
                    const targetNode = nodes.find((n: any) => n.id === conn.id);
                    return targetNode ? targetNode.name : 'Unknown';
                }).join(', ');

                tooltip.html(`
          <strong>${d.name}</strong><br/>
          ${d.description}<br/>
          <strong>Related to:</strong> ${relatedNodes}
        `).style('visibility', 'visible');

        d3.select(this)
                .select('image')
                .transition()
                .duration(200)
                .attr('width', 50)
                .attr('height', 50)
                .attr('x', -25)
                .attr('y', -25);
        })
        .on('mousemove', function (event) {
            tooltip.style('top', `${event.pageY + 10}px`).style('left', `${event.pageX + 10}px`);
        })
        .on('mouseout', function () {
            tooltip.style('visibility', 'hidden');

            d3.select(this)
                .select('image')
                .transition()
                .duration(200)
                .attr('width', 40)
                .attr('height', 40)
                .attr('x', -20)
                .attr('y', -20);
        });

        nodeGroups.append('rect')
            .attr('x', -20)
            .attr('y', -20)
            .attr('width', 50)
            .attr('height', 50)
            .attr('fill', 'transparent');

        nodeGroups.append('image')
            .attr('xlink:href', d => {
                const type = d.type as keyof typeof iconMap;

                return iconMap[type]})
            .attr('x', -20)
            .attr('y', -20)
            .attr('width', 40)
            .attr('height', 40);

        drawLabels(g, nodes);
    };


    return { createNodes, drawNodes, selectedNodeId, setSelectedNodeId };
};

export default Nodes;