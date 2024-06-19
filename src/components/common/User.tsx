import { Space, Avatar, Spin } from "antd";
import './Avatar.css'
import { useProfile } from "../../hooks/useProfile";



 export interface UserProps {
  avatar?: string,
  name?: string,
}


const User = () => {
  const {data, isLoading} = useProfile()
  return (
    <div>
      {isLoading ? (<Spin/>) : (
    <Space className="spaceAvatar"  size={13}>
      <Avatar shape="square" size={34} icon={data?.user.email?.charAt(0) || 'A'}  />
      <span className="spanAvatar" >
       <h4>{data?.user.name}</h4>
       <p>{data?.user.email}</p>
      </span>
    </Space>
      )}
    </div>
  )
}

export default User;