import { entityColors } from '../constants';

const SectionGrades = () => {
    // Draw the sections of the map
    const drawSections = (g: d3.Selection<SVGGElement, unknown, null, undefined>, lastCircleRadius: number) => {
        const sectionAngles = [0, 120, 240, 360];
        const lineColors = Object.values(entityColors);
    
        sectionAngles.forEach((angle, index) => {
    
          const x2 = lastCircleRadius * Math.cos((angle * Math.PI) / 180);
          const y2 = lastCircleRadius * Math.sin((angle * Math.PI) / 180);
          
          g.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', x2)
            .attr('y2', y2)
            .attr('stroke', lineColors[index % lineColors.length])
            .attr('stroke-width', 4);
        });
      };
    
    return {drawSections};
};

export default SectionGrades;