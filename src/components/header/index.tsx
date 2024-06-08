/* eslint-disable react-refresh/only-export-components */
import { AppBar, FormControl, Grid, Select, Toolbar, Typography, Box } from "@material-ui/core";
import UseStore from "../../hooks/useStore"
import User from "../common/User";
import { observer } from "mobx-react-lite";


const Header = () => {
    const {boards, users} = UseStore();
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Box display="flex" alignItems="center">
                        <Typography variant="h6">
                            Dashboard: 
                        </Typography>
                        <FormControl variant="outlined">
                            <Select
                            style={{
                                backgroundColor: '#fff',
                                marginLeft: 10
                            }}
                            native
                            value={boards?.active?.id || ''}
                            onChange={(event) => {
                                const value = event.target.value as string;
                                boards.selectBoard(value)
                            }}
                            >
                                <option value='' disabled>

                                </option>
                                {boards?.list.map(b => {
                                    return (
                                        <option key={b.id} value={b?.id}>{b?.title}</option>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        </Box>
                    </Grid>
                    <Grid item>
                        <User user={users?.me || {}} />
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar>
    )
}


export default observer(Header);