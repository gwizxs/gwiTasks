import React from 'react';

const ColorCirclePicker = ({
  width = '252px',
  colors = [
    "#ff7875", "#ff9c6e", "#9c27b0", "#fff566",
    "#3f51b5", "#ffd666", "#69b1ff", "#cddc39",
    "#d3f261", "#95de64", "#5cdbd3", "#4caf50", 
    "#85a5ff", "#b37feb", "#ff85c0", "#ff5722",
    "#d9d9d9", "#391085"
  ],
  circleSize = 28,
  circleSpacing = 14,
  onSwatchHover = (color, event) => console.log(`Hovered over color: ${color}`)
}) => {
  return (
    <div style={{ width, display: 'flex', flexWrap: 'wrap', gap: `${circleSpacing}px` }}>
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            backgroundColor: color,
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 'small'
          }}
          onMouseOver={(event) => onSwatchHover(color, event)}
        >
        </div>
      ))}
    </div>
  );
};

export default ColorCirclePicker;
