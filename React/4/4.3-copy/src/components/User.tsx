import React, { useEffect, useState } from "react";
import UserApi from "../api/users/UserApi";
import type { User } from "../api/users/user.types";

const userApi = new UserApi();

const UserComponent: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        userApi.getUserById(1)
            .then((user: User) => {
                setUsers([user]);
                setLoading(false);
            })
            .catch((err: unknown) => {
                setError("Failed to load user");
                console.error(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        console.log("Fetched users:", users);
    }, [users]);

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    {user.name} — {user.email}
                </li>
            ))}
        </ul>
    );
};

export default UserComponent;

