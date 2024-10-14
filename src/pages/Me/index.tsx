import { observer } from 'mobx-react-lite';

import CardDetails from 'entities/Card/ui/CardDetails';
import Body from 'widgets/Body/ui/Body';
import StepsComponent from 'entities/steps/ui/Steps';


const Me = observer(() => {

  const customStepTitles = ['update profile']

  return (
      <Body selectedKey="sub1" BreadName={'Me'} >
         <StepsComponent stepTitles={customStepTitles}></StepsComponent>
        <div style={{ display: 'flex' }}>

          <CardDetails />
        </div>
      </Body>
  );
});

export default Me;