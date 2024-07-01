import { observer } from 'mobx-react-lite';
import CardMe from './CardMe';
import CardDetails from './Card/CardDetails';
import Body from '../../components/Body';

const Me = observer(() => {
  return (
      <Body selectedKey="sub1" BreadName={'Me'}>
        <div style={{ display: 'flex' }}>
          <CardMe />
          <CardDetails />
        </div>
      </Body>
  );
});

export default Me;