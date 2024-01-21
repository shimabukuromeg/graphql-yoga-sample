import { Link, useMatch } from 'react-router-dom'
import { useParams } from '../../../router'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// import { useParams } from '@/router'

export default function User() {
    const { id } = useParams('/users/:id')
    const match = useMatch('/users/:id')
    console.log("match", match)

    return (
        <>
            <h1>ユーザー</h1>
            <div>{`UserID: ${id}`}</div>
            <Box sx={{ my: 4 }}>
                <Link to="/users">
                    <Button variant="contained">ユーザー一覧へ</Button>
                </Link>
            </Box>
        </>
    )
}