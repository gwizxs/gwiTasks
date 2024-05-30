import { CardContent, Typography } from "@material-ui/core"
import User from "../common/User";


const Task = ({task}) => {
    return (
        <CardContent>
            <Typography color="textPrimary" gutterBottom style={{fontSize: 18}}>
                {task?.title}
            </Typography>
            <Typography color="textPrimary" gutterBottom >
                {task?.description}
            </Typography>
            <User user={task?.me}/>
        </CardContent>
    )
}

export default Task;