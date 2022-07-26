import {
    Card,
    CardContent,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const DatabaseTable = () => {
    const { data, error } = useSWR<any[]>('/api/users', fetcher, {
        refreshInterval: 100
    });

    return <Card variant="outlined">
        <CardHeader title="Database" />
        <CardContent>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            ID
                        </TableCell>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Phone Number
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map?.( user => (
                        <TableRow key={user.id}>
                            <TableCell>
                                {user.id}
                            </TableCell>
                            <TableCell>
                                {user.name}
                            </TableCell>
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>

}