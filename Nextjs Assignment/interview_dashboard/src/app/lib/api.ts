const BASE_URL = "https://dummyjson.com";

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export async function loginUser(username: string, password: string):Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "COntent-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Invalid Credentials");
  }

  return data;
}

export async function fetchUsers(limit = 30, skip = 0, search = "") {
  const url = search
    ? `${BASE_URL}/users/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
    : `${BASE_URL}/users?limit=${limit}&skip=${skip}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
}

export async function fetchUserById(id: number) {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return await res.json();
}

export async function fetchTodosByUser(userId: number) {
  const res = await fetch(`${BASE_URL}/todos?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return await res.json();
}

export async function fetchPostsByUser(userId: number) {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return await res.json();
}