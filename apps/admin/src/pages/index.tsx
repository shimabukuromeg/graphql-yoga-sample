import { Link } from "react-router-dom";

export default function Home() {
    return (<div>
        <h1>Home</h1>
        <p>Hello world!</p>
        <Link to="/users">ユーザー一覧へ</Link>
    </div>)
}

