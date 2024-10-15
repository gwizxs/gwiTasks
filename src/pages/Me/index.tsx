import { observer } from 'mobx-react-lite';

import CardDetails from 'entities/Card/ui/CardDetails';
import Body from 'widgets/Body/ui/Body';
import StepsComponent from 'entities/steps/ui/Steps';
import cl from '../Customize/Customizer.module.scss'


const Me = observer(() => {

  const customStepTitles = ['update profile']

  return (
      <Body selectedKey="sub1" BreadName={'Me'} >
         <StepsComponent stepTitles={customStepTitles}></StepsComponent>
        <div className={cl.root}>

          <CardDetails />
        </div>
      </Body>
  );
});

export default Me;