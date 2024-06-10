/* eslint-disable react-refresh/only-export-components */
import { CardContent, Typography } from "@material-ui/core"
import me from "../../dataBase/index.json";
import { observer } from "mobx-react-lite";
import User, { UserProps } from "../common/User";

interface props {
    id: string,
    title: string,
    assignee: UserProps,
    description: string,
    me: typeof me,
}

const Task = ({task}: {task: props}) => {
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
}

export default observer(Task);