import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const ServerComponent = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    return (<>
        <h1>ServerComponent</h1>
        <p>{JSON.stringify(user)}</p>
    </>)
};

export default ServerComponent;
