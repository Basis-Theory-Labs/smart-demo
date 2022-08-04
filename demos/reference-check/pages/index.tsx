import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import {DatabaseTable} from "../components/DatabaseTable";
import {OriginalForm} from "../components/OriginalForm";

const Home: NextPage = () => {
  return (
    <Grid container spacing={2} direction="column" justifyContent="center">
        <Grid item>
            <OriginalForm/>
        </Grid>
        <Grid item>
            <DatabaseTable />
        </Grid>
    </Grid>
  )
}

export default Home;
