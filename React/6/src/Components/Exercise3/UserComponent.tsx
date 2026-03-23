import { useEffect, useState } from "react";
import UserApi from "./UserApi";
import ApiHandler from "./ApiHandler";
import type { User } from "./UserApi";
import type { ApiResponse } from "./ApiHandler";
import SkeletonLoader from "../Exercise4/SkeletonLoader";
import EmptyState from "../Exercise5/EmptyState";
import ErrorMessage from "../Exercise6/ErrorMessage";
import ResponseManager from "./ResponseManager";

function UserComponent() {
  const [response, setResponse] = useState<ApiResponse<User[]> | null>(null);
  const [loading, setLoading] = useState(false);
  const apiHandler = new ApiHandler();

  const fetchData = async () => {
    setLoading(true);
    const res = await apiHandler.handleRequest(() => UserApi.getUsers());
    setResponse(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderSuccess = (users: User[]) => (
    <ul>
      {users.map((user) => (
        <li key={user.id}>User: {user.name}</li>
      ))}
    </ul>
  );

  const renderError = (error: string) => (
    <div>
      <ErrorMessage message={error} />
      <button onClick={fetchData}>Retry</button>
    </div>
  );

  const renderEmpty = () => <EmptyState />;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User List</h2>
      {loading && <SkeletonLoader />}
      {ResponseManager.render<User[]>({
        loading,
        response,
        initializing: !loading && !response,
        successComponent: renderSuccess,
        errorComponent: renderError,
        emptyComponent: renderEmpty,
      })}
    </div>
  );
}

export default UserComponent;

