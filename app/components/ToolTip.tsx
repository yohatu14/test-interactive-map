import * as d3 from 'd3';

const ToolTip = () => {

const showTooltip = (containerRef: React.RefObject<HTMLDivElement>) => {
    // Create a tooltip
    const tooltip = d3.select(containerRef.current)
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('border', '2px solid black')
      .style('border-radius', '5px')
      .style('padding', '5px');
    return tooltip;

  };
  return {showTooltip};

};


export default ToolTip;