import { Space, Avatar } from "antd";
import './Avatar.css'


 export interface UserProps {
  avatar?: string,
  name?: string,
}


const User = ({user}: {user: UserProps}) => {
  return (
    <Space className="spaceAvatar"  size={13}>
      <Avatar size="large" src={user?.avatar} alt={user?.name}/>
      <span className="spanAvatar" >
       <h4>{user?.name}</h4>
      </span>
    </Space>
  )
}

export default User;