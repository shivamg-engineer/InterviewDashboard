export type User = {
  id: number;
  name: string;
  email?: string;
};

// Mock data for demonstration
const MOCK_USERS: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

class UserApi {
  static async getUsers(): Promise<User[]> {
    // For demo purposes, return mock data with a small delay
    // In production, this would make a real API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_USERS);
      }, 1000);
    });
  }

  static async getUser(id: number): Promise<User> {
    const user = MOCK_USERS.find((u) => u.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}

export default UserApi;
