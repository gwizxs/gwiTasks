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
  const [displayHeaderColorPicker, setDisplayHeaderColorPicker] = useState(false);
  const { color, setColor, headerColor, setHeaderColor } = useColor(); 

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleOnChangeComplete = (color: any) => {
    setColor(color.hex);
  };

  const handleHeaderColorChangeComplete = (color: any) => {
    setHeaderColor(color.hex);
  };

  const toggleChromePicker = () => {
    setDisplayChromePicker(!displayChromePicker);
  };

  const toggleHeaderColorPicker = () => {
    setDisplayHeaderColorPicker(!displayHeaderColorPicker);
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
    flexDirection: 'row',
    
    justifyContent: 'space-between',
    marginBottom: 10,
  }}
>
  <Button onClick={toggleChromePicker}>Background Color Picker</Button>
  <div
    style={{
      width: 30,
      height: 30,
      backgroundColor: color,
      border: '1px solid black',
      display: 'block',
      marginBottom: 10,
    }}
  />
  <Button onClick={toggleHeaderColorPicker}>Header Color Picker</Button>
  <div
    style={{
      width: 30,
      height: 30,
      backgroundColor: headerColor,
      border: '1px solid black',
      display: 'block',
      marginBottom: 10,
    }}
  />
</div>


            {displayChromePicker && (
              <div style={{ position: 'absolute',  zIndex: '2',}}>
                <div style={{    position: 'fixed', top: '0px', right: '0px', bottom: '0px',left: '0px',}} 
                onClick={() => setDisplayChromePicker(false)} />
                <ChromePicker color={color} onChangeComplete={handleOnChangeComplete} />
              </div>
            )}

            {displayHeaderColorPicker && (
              <div style={{    position: 'absolute', zIndex: '2',}}>
                <div style={{    position: 'fixed', top: '0px', right: '0px',  bottom: '0px', left: '0px',}}
                 onClick={() => setDisplayHeaderColorPicker(false)} />
                <ChromePicker color={headerColor} onChangeComplete={handleHeaderColorChangeComplete} />
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
          <ColorCirclePicker /> 
        </Card>
      </div>
    </div>
  );
});

export default Customizer;
