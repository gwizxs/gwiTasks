/* eslint-disable react-refresh/only-export-components */
import {  FormControl, Grid,  Typography, Box } from "@material-ui/core";
import UseStore from "../../hooks/useStore"
import User from "../common/User";
import { observer } from "mobx-react-lite";
import './header.module.scss'
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import LogoutBtn from "../Logout/LogoutBtn";
import Statistic from "../Statistic";


const Header = () => {
    const {boards} = UseStore();
    return (
        <nav style={{borderStyle: "double"}}>
                <Grid container justifyContent="space-between" alignItems="center" >
                    <Grid item>
                        <Box display="flex" alignItems="center">
                        <Typography variant="h5">
                            gwask 
                        </Typography>
                        <FormControl style={{marginBottom: 50}}>

                        </FormControl>
                        
                        </Box>
                        <LogoutBtn/>
                    </Grid>
                    <Grid>
                        <Statistic/>
                        </Grid>
                    <Card>
                    <Grid item>
                        <User  />
                        <Meta style={{marginBottom: 2}}   />
                    </Grid>
                    </Card>

                </Grid>
                </nav>
    )
}


export default observer(Header);