import { Divider, Steps } from 'antd';
import { useState } from 'react';

const { Step } = Steps;

const StepsComponent = ({  stepTitles }: any) => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    setCurrent(value);
  };

  return (
    <>
      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
      >
        {stepTitles.map((title: string) => (
          <Step title={title} />
        ))}
      </Steps>

      <Divider />
    </>
  );
};

export default StepsComponent;
