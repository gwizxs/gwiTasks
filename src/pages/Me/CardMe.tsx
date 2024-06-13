import { Card } from "antd";
import User from "../../components/common/User";
import Meta from "antd/es/card/Meta";
import UseStore from "../../hooks/useStore";
import { observer } from "mobx-react-lite";




const CardMe = () => {
    const {users} = UseStore();
    const { Meta } = Card;
    return (
        <div style={{ marginRight: 20 }}>
        <Card style={{ width: 340, boxSizing: 'border-box', height: 340 }}>
          <User user={users?.me || {}} />
          <Meta style={{ marginTop: 20 }} title="описание:" description="https://t.me/gwizxs" />
        </Card>
      </div>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(CardMe)