import { observer } from 'mobx-react-lite';

import CardDetails from './Card/CardDetails';
import Body from '../../components/Body';
import StepsComponent from '../../components/steps';


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