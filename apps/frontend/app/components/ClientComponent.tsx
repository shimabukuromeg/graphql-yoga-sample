"use client";

import { useSession } from "next-auth/react";

const ClientComponent = () => {
    const { data: session } = useSession();
    const user = session?.user;
    return (
        <>
            <h1>ClientComponent</h1>
            <p>{JSON.stringify(user)}</p>
        </>
    );
};

export default ClientComponent;