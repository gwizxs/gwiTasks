import { CardContent, Typography } from "@material-ui/core"
import User from "../common/User";
import me from "../../api";
import UseStore from "../../hooks/useStore"
import { Observer, observer } from "mobx-react-lite";

interface props {
 assignee: string,
 title: string,
 description: string,
 me: typeof me,
}

const Task = observer(({task}: {task: props}) => {
    const {users} = UseStore()
    return (
        <CardContent>
            <Typography color="textPrimary" gutterBottom style={{fontSize: 18}}>
                {task.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom >
                {task.description}
            </Typography>
            <User user={task.assignee}/>
        </CardContent>
    )
})

export default Task;