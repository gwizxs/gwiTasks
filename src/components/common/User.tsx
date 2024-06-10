import { Avatar, Box } from "@material-ui/core";


 export interface UserProps {
  avatar?: string,
  name?: string,
}


const User = ({user}: {user: UserProps}) => {
  return (
    <Box display="flex" alignItems="center">
      <Avatar src={user?.avatar} alt={user?.name}/>
      <span style={{padding: 5}}>
        ({user?.name})
      </span>
    </Box>
  )
}

export default User;