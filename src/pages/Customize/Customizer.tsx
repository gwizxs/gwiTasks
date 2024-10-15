import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card } from "antd";
import { ChromePicker } from 'react-color';
import { useColor } from 'app/_providers/color-Context';
import ColorCirclePicker from './ColorCirclePicker';
import Skeleton from 'react-loading-skeleton';
import cl from './Customizer.module.scss'

const Customizer = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayChromePicker, setDisplayChromePicker] = useState(false);
  const [displayHeaderColorPicker, setDisplayHeaderColorPicker] = useState(false);
  const { color, setColor, headerColor, setHeaderColor } = useColor();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleOnChangeComplete = (color: { hex: string; }) => {
    setColor(color.hex);
  };

  const handleHeaderColorChangeComplete = (color: { hex: string; }) => {
    setHeaderColor(color.hex);
  };

  const toggleChromePicker = () => {
    setDisplayChromePicker(!displayChromePicker);
  };

  const toggleHeaderColorPicker = () => {
    setDisplayHeaderColorPicker(!displayHeaderColorPicker);
  };



  return (
    <div className={cl.container} >
      <div className={cl.content}>
        {isLoading ? (
          <Skeleton width={400} height={350} baseColor="#d9d9d9" />
        ) : (
          <Card
            className={cl.card}

          >
            <div
            className={cl.row}

            >
              <Button onClick={toggleChromePicker}>Background Color Picker</Button>
              <div
              className={cl.colorPicker}
              style={{ backgroundColor: color }}
              />
              <Button onClick={toggleHeaderColorPicker}>Header Color Picker</Button>
              <div
              className={cl.colorPicker}
              style={{ backgroundColor: headerColor }}
              />
            </div>


            {displayChromePicker && (
              <div className={cl.absolutePicker}>
                <div style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px', }}
                  onClick={() => setDisplayChromePicker(false)} />
                <ChromePicker color={color} onChangeComplete={handleOnChangeComplete} />
              </div>
            )}

            {displayHeaderColorPicker && (
              <div className={cl.absolutePicker}>
                <div style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px', }}
                  onClick={() => setDisplayHeaderColorPicker(false)} />
                <ChromePicker color={headerColor} onChangeComplete={handleHeaderColorChangeComplete} />
              </div>
            )}
          </Card>
        )}
      </div>
      <div>
        <Card
         className={cl.card}
        >
          <ColorCirclePicker />
        </Card>
      </div>
    </div>
  );
});

export default Customizer;
