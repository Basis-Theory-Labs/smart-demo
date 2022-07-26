import {Box, Button, Card, CardContent, CardHeader, TextField} from "@mui/material";
import {TextElement, useBasisTheory} from '@basis-theory/basis-theory-react';
import {FormEvent, useState} from "react";

export const FormWithElements = () => {
    const [name, setName] = useState('');
    const { bt } = useBasisTheory();

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        const phoneNumber = bt?.getElement('phoneNumber');
        const token  = await bt?.tokens.create({
            id: '{{ data | alias_preserve_format }}',
            type: 'token',
            data: phoneNumber
        });
        await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                phoneNumber: token.id
            })
        })
        setName('');
        phoneNumber?.clear();
    }

    return <Card variant="outlined">
        <CardHeader title="Your Application"/>
        <CardContent>
            <form onSubmit={submit}>

                <TextField placeholder="Name" size="small" fullWidth required value={name}
                           onChange={e => setName(e.target.value)}/>
                <Box sx={theme => ({
                    mt: 1,
                    py: 1,
                    px: 1.75,
                    borderRadius: 1,
                    border: `1px solid rgba(0,0,0,0.25)`
                })}>

                    <TextElement id="phoneNumber" placeholder="Phone Number" style={{
                        base: {
                            "::placeholder": {
                                color: 'rgba(0, 0, 0, 0.35)'
                            }
                        }
                    }}/>
                </Box>
                <Button type="submit" color="primary" variant="contained" sx={{mt: 2}}>Submit</Button>
            </form>
        </CardContent>
    </Card>

}