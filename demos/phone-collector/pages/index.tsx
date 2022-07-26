import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import {DatabaseTable} from "../components/DatabaseTable";
import {Form} from "../components/Form";

const Home: NextPage = () => {
  return (
    <Grid container spacing={2} direction="column" justifyContent="center">
        <Grid item>
            <Form/>
        </Grid>
        <Grid item>
            <DatabaseTable />
        </Grid>
    </Grid>
  )
}

export default Home;
