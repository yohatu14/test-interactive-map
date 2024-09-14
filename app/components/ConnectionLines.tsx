
const ConnectionLines = () => {
  
  // Draw connections with animation
  const drawConnections = (g: d3.Selection<SVGGElement, unknown, null, undefined>, nodes: any[]) => {
    g.selectAll('line.connection')
      .data(nodes.flatMap(node =>
        node.connections.map((conn: { id: any; strength: any; }) => ({
          source: node,
          target: nodes.find(n => n.id === conn.id),
          strength: conn.strength
        }))
      ))
      .enter().append('line')
      .attr('class', 'connection')
      .attr('stroke-width', d => d.strength * 2)
      .attr('stroke-opacity', 0.5)
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target ? d.target.x : null)
      .attr('y2', d => d.target ? d.target.y : null);
  };
    return {drawConnections};
};

export default ConnectionLines;