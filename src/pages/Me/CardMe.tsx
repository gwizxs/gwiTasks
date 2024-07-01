import { Avatar, Card } from "antd";
import { observer } from "mobx-react-lite";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { useProfile } from "../../hooks/useProfile";


const CardMe = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const { data } = useProfile();




  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  return (
    <div style={{ marginRight: 20 }}>
      {isLoading ? (
        <Skeleton width={400} height={350} baseColor="#d9d9d9" />
      ) : (
        <>
          <Card style={{ width: '100%', boxSizing: 'border-box', height: '100%', borderRadius: 5, padding: 20, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <Card.Meta
              avatar={<Avatar shape="square" size={40} icon={data?.user.email?.charAt(0) || 'A'} />}
              title={data?.user.name}
              description={data?.user.email}
            />
          </Card>

        </>
      )}
    </div>
  );
})

export default CardMe;
