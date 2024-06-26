import { observer } from 'mobx-react-lite';
import CardMe from './CardMe';
import CardDetails from './Card/CardDetails';
import { FormProvider, useForm } from 'react-hook-form';
import Body from '../../components/Body';
import { TypeTimeBlockFormState } from '../../types/time-block.types';

const Me = observer(() => {
  const methods = useForm<TypeTimeBlockFormState>({
        mode: 'onChange'
  });

  return (
      <Body selectedKey="sub1" BreadName={'Me'}>
        <FormProvider {...methods}> 
        <div style={{ display: 'flex' }}>
          <CardMe />
          <CardDetails />
        </div>
        </FormProvider>
      </Body>
  );
});

export default Me;