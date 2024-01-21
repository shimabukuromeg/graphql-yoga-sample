import { Link } from "react-router-dom";

export default function Users() {
    return (
        <div>
            <h1>ユーザー一覧</h1>
            <div>
                <Link to="/users/1">ユーザー1へ</Link>
            </div>
            <div>
                <Link to="/">ホームヘ</Link>
            </div>
        </div>
    )
}
