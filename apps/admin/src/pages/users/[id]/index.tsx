import { Link, useMatch } from 'react-router-dom'
import { useParams } from '../../../router'

// import { useParams } from '@/router'

export default function User() {
    const { id } = useParams('/users/:id')
    const match = useMatch('/users/:id')
    console.log("match", match)

    return (
        <>
            <h1>ユーザー</h1>
            <div>{`UserID: ${id}`}</div>
            <Link to="/users">ユーザー一覧へ</Link>
        </>
    )
}