/* eslint-disable react-refresh/only-export-components */

import { Button, ConfigProvider, Space } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import { observer } from 'mobx-react-lite';

interface ButtonComponentProps {
  onClick: () => void;
}
const colors1 = ['#1677ff', '#e6fffb'];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const ButtonComponent: React.FC<ButtonComponentProps> = ({onClick}) => {


  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Space>
        <Button type="primary" onClick={onClick}>
          add
        </Button>
      </Space>
    </ConfigProvider>
  );
};

export default observer(ButtonComponent);
