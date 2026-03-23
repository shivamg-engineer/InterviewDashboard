import { useEffect, useRef, useState } from "react";
import UserApi from "./UserApi";
import { ApiHandler } from "../utils/ApiHandler";
import { ResponseManager } from "../utils/ResponseManager";

import SkeletonLoader from "./skeletonLoader";
import EmptyState from "./EmptyState";
import { ErrorMessage } from "./ErrorMessage";

import type { User } from "../types/user";
import type { ApiResponse } from "../utils/ApiResponse";
import "./UserComponent.css";

function UserComponent() {
  const apiHandlerRef = useRef(new ApiHandler<User[]>());
  const [response, setResponse] = useState<ApiResponse<User[]> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Start loading
      setLoading(true);
      const res = await apiHandlerRef.current.handle(() => UserApi.getUsers());
      setResponse(res);
      // Stop loading after API completes
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="card">
      <h2 className="card-title">Users</h2>

      {/* Skeleton stays simple */}
      {loading && <SkeletonLoader />}

      {/* Centralized response handling 🔥 */}
      {ResponseManager.render<User[]>({
        loading,
        response,
        onSuccess: (users) => (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id} className="user-item">
                <span className="name">{user.name}</span>
                <span className="email">{user.email}</span>
              </li>
            ))}
          </ul>
        ),
        onError: (message) => <ErrorMessage message={message} />,
        onEmpty: () => <EmptyState />,
      })}
    </div>
  );
}

export default UserComponent;
