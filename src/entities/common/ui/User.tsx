import {  Avatar, Space } from "antd";
import './Avatar.scss';
import { useProfile } from "shared/hooks/useProfile";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export interface UserProps {
  avatar?: string;
  name?: string;
}

const User = () => {
  const { data, isLoading } = useProfile();

  return (
    <Space className="spaceAvatar"> 
      {isLoading ? (
        <>
          <Skeleton height={34} width={34} borderRadius="4px" /> 
          <div style={{ marginLeft: '13px' }}> 
            <Skeleton height={20} width={50} />
            <Skeleton
            circle
            height="100%"
            containerClassName="avatar-skeleton"
            />
          </div>
        </>
      ) : (
        <>
          <Avatar shape="square" size={34} icon={data?.user.email?.charAt(0) || 'A'} />
          <span className="spanAvatar" >
            <h4>{data?.user.name}</h4>
            <p>{data?.user.email}</p>
          </span>
        </>
      )}
    </Space>
  );
};

export default User;
