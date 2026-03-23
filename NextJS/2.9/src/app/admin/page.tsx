import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function AdminPage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        return <h1>Access Denied.</h1>
    }

    if (session.user.role !== "admin") {
        return <h1>Unauthorized</h1>;
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome Admin, {session.user.name}</p>
        </div>
    )
}