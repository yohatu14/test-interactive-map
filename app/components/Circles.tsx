
const Circles = () => {

  const drawCircles = (g: d3.Selection<SVGGElement, unknown, null, undefined>, lastCircleRadius: number) => {
    // Draw circles
    const circles = [50, 150, 250, lastCircleRadius];
    
    circles.forEach((radius, i) => {
      g.append('circle')
        .attr('r', radius)
        .attr('fill', i === 0 ? 'black' : 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 2);
    });

    const fontSize = circles[0] / 2.5;
    const textLines = ['suspicious', 'activities'];
    const lineHeight = fontSize * 1.2;

    // Draw text
    textLines.forEach((line, index) => {
      g.append('text')
        .attr('x', 0)
        .attr('y', index * lineHeight - (textLines.length / 4) * lineHeight)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('fill', 'white')
        .attr('font-size', `${fontSize}px`)
        .text(line);
    });
  };
    return {drawCircles};
};

export default Circles;