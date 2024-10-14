
import { useColor } from "app/_providers/color-Context";

const ColorCirclePicker = ({
  width = '252px',
  colors = [
  ["#adc6ff", "#efdbff"],
  ["#ffadd2", "#b37feb"],
  ["#e3e2df", "#e3afbc"],
  ["#c2b9b0", "#c2cad0"],
  ["#DEBDE8", "#916ED8"],
  ["#edc7b7", "#eee2dc"],
  ["#9d8d8f", "#9b786f"],
],

  circleSize = 28,
  circleSpacing = 14,
}) => {
  const {setHeaderColor, setColor} = useColor();

  const handleColorClick = (color: any) => {
    setHeaderColor(color[0]);
    setColor(color[1])
  };

  return (
    <div style={{ width, display: 'flex', flexWrap: 'wrap', gap: `${circleSpacing}px` }}>
      {colors.map((pair, index) => (
        <div
          key={index}
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            background: `linear-gradient(100deg, ${pair[0]} 50%, ${pair[1]} 50%)`,
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 'small'
          }}

          onClick={() => handleColorClick(pair)}
        />
      ))}
    </div>
  );
};

export default ColorCirclePicker;
