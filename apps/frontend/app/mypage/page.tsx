import ServerComponent from '@/app/components/ServerComponent'
import Link from 'next/link'


export default async function Home() {

    return (
        <div>
            <h1>Mypage</h1>
            <div>
                {/* Firebase authのユーザーを NextAuth の getServerSession を使って取得したデータを表示 */}
                <ServerComponent />
                <Link href={"/"}>TOPページへ移動</Link>
            </div>
        </div>
    )
}
