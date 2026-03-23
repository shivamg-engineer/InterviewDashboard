// type Props = {
//   user: {
//     name: string;
//     age: number;
//   };
// };

// export default function UserInfo_Grandchild({ user }: Props) {
//   return (
//     <div>
//       <p>Name: {user.name}</p>
//       <p>Age: {user.age}</p>
//     </div>
//   );
// }
import { useContext } from "react";
import { UserContext } from "../Context/UserContext/UserContext";

export default function UserInfo_Grandchild() {
  const context = useContext(UserContext);

  if (!context) return null;

  const { user } = context;

  return (
    <>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </>
  );
}
