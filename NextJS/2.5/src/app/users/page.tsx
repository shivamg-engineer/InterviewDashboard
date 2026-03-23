interface Geo {
    lat: string;
    lng: string;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

async function getUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export default async function UsersPage() {


    const users = await getUsers();

    return (
        <div style={{ padding: "20px" }}>
            <h1>Users List</h1>

            {users.map((user: User) => (
                <div
                    key={user.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h2>{user.name}</h2>
                    <p><b>Username:</b> {user.username}</p>
                    <p><b>Email:</b> {user.email}</p>

                    <h4>Address</h4>
                    <p>
                        {user.address.street}, {user.address.suite},{" "}
                        {user.address.city} - {user.address.zipcode}
                    </p>

                    <h4>Company</h4>
                    <p>{user.company.name}</p>
                    <p>{user.company.catchPhrase}</p>
                </div>
            ))}
        </div>
    );
}