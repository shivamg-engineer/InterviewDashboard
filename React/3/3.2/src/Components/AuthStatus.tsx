import { login, logout } from "../redux/authslice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const AuthStatus = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <div style={{ marginTop: 20 }}>
      {isAuthenticated ? (
        <>
          <p>
            ✅ Logged in as <b>{user}</b>
          </p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      ) : (
        <>
          <p>❌ Not Authenticated</p>
          <button onClick={() => dispatch(login("shivam"))}>Login</button>
        </>
      )}
    </div>
  );
};

export default AuthStatus;
