/* eslint-disable react-refresh/only-export-components */
import {  FormControl, Grid, Select, Typography, Box } from "@material-ui/core";
import UseStore from "../../hooks/useStore"
import User from "../common/User";
import { observer } from "mobx-react-lite";
import './header.css'

import { TinyColor } from '@ctrl/tinycolor';


const Header = () => {
    const {boards, users} = UseStore();
    return (
        <nav>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Box display="flex" alignItems="center">
                            <nav>
                                 
                            </nav>
                        <Typography variant="h6">
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
                    <Grid item>
                        <User user={users?.me || {}} />
                    </Grid>

                </Grid>
                </nav>
    )
}


export default observer(Header);