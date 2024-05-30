import { Avatar, Box } from "@material-ui/core"


const User = ({user}) => {
  return (
    <Box display="flex" alignItems="center">
      <Avatar src={user?.avatar} alt={user?.name}/>
      <span>
        (user?.name)
      </span>
    </Box>
  )
}

export default User;