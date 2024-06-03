import React from "react";
import { Avatar, Box } from "@material-ui/core";


interface UserProps {
  avatar?: string,
  name?: string,
}


const User = ({user}: {user: UserProps}) => {
  return (
    <Box display="flex" alignItems="center">
      <Avatar src={user?.avatar} alt={user?.name}/>
      <span>
        ({user?.name})
      </span>
    </Box>
  )
}

export default User;