import { useEffect } from "react";
import "./App.css";
import AuthStatus from "./Components/AuthStatus";
import { decrement, increment } from "./redux/CounterSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { fetchUserProfile } from "./redux/user/userSlice";
import UsersList from "./Components/UsersList";
import UsersComponent from "./Components/UsersComponent";
function App() {
  const { ids, entities, loading, error } = useAppSelector(
    (state) => state.user
  );
  const user = ids.length > 0 ? entities[ids[0]] : null;

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  // fetch user on mount
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Redux Counter</h1>

        <h2>{count}</h2>

        <button onClick={() => dispatch(increment())}>+</button>
        <button
          onClick={() => dispatch(decrement())}
          style={{ marginLeft: 10 }}
        >
          -
        </button>
      </div>

      <div style={{ textAlign: "center" }}>
        <h1>Redux Auth Example</h1>
        <AuthStatus />
      </div>
      {/* User Profile */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h1>User Profile</h1>

        {loading && <p>⏳ Loading user...</p>}
        {error && <p style={{ color: "red" }}>❌ {error}</p>}

        {user && (
          <>
            <p>
              <b>ID:</b> {user.id}
            </p>
            <p>
              <b>Name:</b> {user.name}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>
          </>
        )}
      </div>

      <div>
        <UsersList />
      </div>
      <div>
        <UsersComponent />
      </div>
    </>
  );
}

export default App;
