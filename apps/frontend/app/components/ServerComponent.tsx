import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

const ServerComponent = async () => {
    const session = await getServerSession(authOptions);

    console.log("session", session);

    return (
        <>
            <h1>ServerComponent</h1>
            {
                session?.user?.name ?
                    <p>{session.user.name}</p> :
                    <Link href="/signin">
                        <button>
                            ログインしてください
                        </button>
                    </Link>
            }
        </>)
};

export default ServerComponent;
