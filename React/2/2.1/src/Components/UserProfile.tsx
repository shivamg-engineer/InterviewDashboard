import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h2>User profile</h2>
      <p>User id from URL:{id}</p>
    </div>
  );
}
