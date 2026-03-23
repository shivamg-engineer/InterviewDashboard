import React from "react";
const UserProfile = React.memo((props) => {
console.log("profile re-rendered");
    return (
        <div>
            <h1>Name : {props.name}</h1>
            <p>Email : {props.email}</p>
            <p>age : {props.age}</p>
        </div>
    );
});

export default UserProfile;