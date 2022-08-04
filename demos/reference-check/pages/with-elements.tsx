import {Grid} from "@mui/material";
import {DatabaseTable} from "../components/DatabaseTable";
import {FormWithElements} from "../components/FormWithElements";
import {useBasisTheory, BasisTheoryProvider} from "@basis-theory/basis-theory-react";

const ELEMENTS_API_KEY = 'key_XVB48UzHJ57TdPtmLhJa9e';

const WithElements = () => {
    const {bt} = useBasisTheory(ELEMENTS_API_KEY, {
        elements: true,
    });

    return <BasisTheoryProvider bt={bt}>
        <Grid container spacing={2} direction="column" justifyContent="center">
            <Grid item>
                <FormWithElements/>
            </Grid>
            <Grid item>
                <DatabaseTable/>
            </Grid>
        </Grid>
    </BasisTheoryProvider>
}

export default WithElements;