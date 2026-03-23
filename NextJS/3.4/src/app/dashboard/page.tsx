import dynamic from "next/dynamic";

const Chart = dynamic(() => import("@/components/Chart"), {
//   ssr: false,  // Forces client-side only
  loading: () => <p>Loading chart...</p>,
});

export default function Page() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Chart />
        </div>
    );
}