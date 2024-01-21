import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


const rows = [
    {
        id: 1,
        name: "太郎"
    },
    {
        id: 2,
        name: "次郎"
    },
    {
        id: 3,
        name: "三郎"
    },
];


export default function Users() {
    return (
        <div>
            <h1>ユーザー一覧</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>name</TableCell>
                            <TableCell>Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                    <Link to={`/users/${row.id}`}>{`詳細`}</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ my: 4 }}>
                <Link to="/">
                    <Button variant="contained">ホーム</Button>
                </Link>
            </Box>
        </div>
    )
}
