import React from "react";
import { AppBar, FormControl, Grid, MenuItem, Toolbar, Typography, Box  } from "@material-ui/core"
import UseStore from "../../hooks/useStore"
import User from "../common/User";


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
                            value={boards?.active?.id || ''}
                            onChange={() => {}}
                            >
                                <MenuItem value='' disabled>

                                </MenuItem>
                                {boards?.list.map(b => {
                                    return (
                                        <MenuItem key={b.id} value={b?.id}>{b?.title}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        </Box>
                    </Grid>
                    <Grid item>
                        <User user={users?.me} />
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar>
    )
}