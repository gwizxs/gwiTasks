/* eslint-disable react-refresh/only-export-components */
import {  FormControl, Grid, Select, Typography, Box } from "@material-ui/core";
import UseStore from "../../hooks/useStore"
import User from "../common/User";
import { observer } from "mobx-react-lite";
import './header.css'
import { Card } from "antd";
import Meta from "antd/es/card/Meta";


const Header = () => {
    const {boards, users} = UseStore();
    return (
        <nav style={{borderStyle: "double"}}>
                <Grid container justifyContent="space-between" alignItems="center" >
                    <Grid item>
                        <Box display="flex" alignItems="center">
                        <Typography variant="h5">
                            gwask 
                        </Typography>
                        <FormControl style={{marginBottom: 15}}>
                            <Select
                            style={{
                                backgroundColor: '#adc6ff',
                                marginTop: 10
                                
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
                    <Card>
                    <Grid item>
                        <User user={users?.me || {}} />
                        <Meta style={{marginBottom: 2}}   />
                    </Grid>
                    </Card>

                </Grid>
                </nav>
    )
}


export default observer(Header);