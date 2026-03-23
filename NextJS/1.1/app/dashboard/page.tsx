import Counter from "../components/Counter";

export default function Dashboard() {
console.log("Dashboard rendered");
    return (
        <div>
            <h1>Dashboard</h1>
            <Counter/>
        </div>
    );
}