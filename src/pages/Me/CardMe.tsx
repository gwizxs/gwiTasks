import { Card } from "antd";
import User from "../../components/common/User";
import { observer } from "mobx-react-lite";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";

const CardMe = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200); 
  }, []);

  return (
    <div style={{ marginRight: 20 }}>
      {isLoading ? (
        <Skeleton width={400} height={350} baseColor="#d6e4ff" />
      ) : (
        <>
          <Card style={{ width: 340, boxSizing: 'border-box', height: 340 }}>
            <User />
            <Card.Meta style={{ marginTop: 20 }} title="описание:" description="https://t.me/gwizxs" />
          </Card>
        </>
      )}
    </div>
  );
};

export default observer(CardMe);
