import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card } from "antd";
import { ChromePicker } from 'react-color';
import { useColor } from "../../_providers/color-Context";
import ColorCirclePicker from './ColorCirclePicker';
import Skeleton from 'react-loading-skeleton';

const Customizer = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayChromePicker, setDisplayChromePicker] = useState(false);
  const { color, setColor } = useColor(); 

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleOnChangeComplete = (color) => {
    setColor(color.hex);
  };

  const toggleChromePicker = () => {
    setDisplayChromePicker(!displayChromePicker);
  };

  // Функция для изменения цвета при клике на CirclePicker
  const handleClickColor = (color) => {
    setColor(color);
  };

  const popover = {
    position: 'absolute',
    zIndex: '2',
  };

  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ marginRight: 20 }}>
        {isLoading ? (
          <Skeleton width={400} height={350} baseColor="#d9d9d9" />
        ) : (
          <Card
            style={{
              width: '100%', 
              boxSizing: 'border-box',
              height: '100%',
              borderRadius: 5,
              padding: 10,
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <Button onClick={toggleChromePicker}>Color Picker</Button>
              <div
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: color,
                  border: '1px solid black',
                }}
              />
            </div>

            {displayChromePicker && (
              <div style={popover}>
                <div
                  style={cover}
                  onClick={() => setDisplayChromePicker(false)}
                />
                <ChromePicker
                  color={color}
                  onChangeComplete={handleOnChangeComplete}
                />
              </div>
            )}
          </Card>
        )}
      </div>
      <div>
        <Card
          style={{
            width: '100%', 
            boxSizing: 'border-box',
            height: '100%',
            borderRadius: 5,
            padding: 10,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <ColorCirclePicker onSwatchHover={handleClickColor} /> {/* Изменил на onSwatchClick */}
        </Card>
      </div>
    </div>
  );
})


export default Customizer;
