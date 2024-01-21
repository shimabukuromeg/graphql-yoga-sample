import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

export default function Home() {
    return (<div>
        <h1>Home</h1>
        <p>Hello world!</p>
        <Link to="/users">
            <Button variant="contained">ユーザー一覧へ</Button>
        </Link>
    </div>)
}

