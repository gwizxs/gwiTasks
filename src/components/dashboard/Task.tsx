import { CardContent, Typography } from "@material-ui/core"
import User from "../common/User";
import me from "../../api";
import UseStore from "../../hooks/useStore"

interface props {
 title: string,
 description: string,
 me: typeof me,
}

const Task = ({task}: {task: props}) => {
    const {users} = UseStore()
    return (
        <CardContent>
            <Typography color="textPrimary" gutterBottom style={{fontSize: 10}}>
                {task?.title}
            </Typography>
            <Typography color="textPrimary" gutterBottom >
                {task?.description}
            </Typography>
            <User user={users?.me || {}}/>
        </CardContent>
    )
}

export default Task;