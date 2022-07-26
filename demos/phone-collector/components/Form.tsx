import {Button, Card, CardContent, CardHeader, TextField} from "@mui/material";
import {FormEvent, useState} from "react";

export const Form = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const submit = (event: FormEvent) => {
        event.preventDefault();
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                phoneNumber
            })
        })
    }

    return <Card variant="outlined">
        <CardHeader title="Your Application"/>
        <CardContent>
            <form onSubmit={submit}>

            <TextField placeholder="Name" size="small" fullWidth required value={name}
                       onChange={e => setName(e.target.value)}/>
            <TextField placeholder="Phone Number" size="small" fullWidth required sx={{
                mt: 1
            }} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
            <Button type="submit" color="primary" variant="contained" sx={{mt: 2}}>Submit</Button>
            </form>
        </CardContent>
    </Card>

}