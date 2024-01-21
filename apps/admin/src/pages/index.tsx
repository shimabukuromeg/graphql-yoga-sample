import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

export default function Top() {
    return (<div>
        <h1>トップ</h1>
        <Link to="/users">
            <Button variant="contained">ユーザー一覧へ</Button>
        </Link>
    </div>)
}

