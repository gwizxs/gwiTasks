
import { useColor } from "app/_providers/color-Context";
import cl from './ColorPick.module.scss'

const ColorCirclePicker = ({
  colors = [
  ["#adc6ff", "#efdbff"],
  ["#ffadd2", "#b37feb"],
  ["#e3e2df", "#e3afbc"],
  ["#c2b9b0", "#c2cad0"],
  ["#DEBDE8", "#916ED8"],
  ["#edc7b7", "#eee2dc"],
  ["#9d8d8f", "#9b786f"],
],

}) => {
  const {setHeaderColor, setColor} = useColor();

  const handleColorClick = (color: string[]) => {
    setHeaderColor(color[0]);
    setColor(color[1])
  };

  return (
    <div className={cl.container}>
    {colors.map((pair, index) => (
      <div
        key={index}
        className={cl.colorBox} 
        style={{
          background: `linear-gradient(100deg, ${pair[0]} 50%, ${pair[1]} 50%`
        }}
        onClick={() => handleColorClick(pair)} 
      >
      </div>
    ))}
  </div>
);
};

export default ColorCirclePicker;
