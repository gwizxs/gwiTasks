import { observer } from 'mobx-react-lite';
import Body from 'widgets/Body/ui/Body';
import Customizer from './Customizer';
import StepsComponent from 'entities/steps/ui/Steps';



const Customize = observer(() => {
  const customStepTitles = ["Pick Color" ];


  return (
      <Body selectedKey="sub4" BreadName={'Customize'}  >
        <StepsComponent stepTitles={customStepTitles}></StepsComponent>
        <div style={{ display: 'flex' }}>
          <Customizer/>
        </div>
      </Body>
  );
});

export default Customize;