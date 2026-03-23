import React,{ Component } from "react"

export const Greeting = React.memo(({ name = "guest" }) => {
    console.log("greeting re-rendered");
    return <h1>Hello, {name}</h1>

});

export class Greetings extends Component {

    render() {
        return (
            <div>
                <h1>Class Component</h1>
            </div>
        )
    }
}
