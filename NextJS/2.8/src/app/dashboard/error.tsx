'use client';

export default function DashboardError({ error, reset }: { error: Error, reset: () => void }) {

    return (
        <div>
            <h2>Dashboard Error</h2>
            <p>{error.message}</p>

            <button onClick={()=>reset()}>
                Retry
            </button>
        </div>
    )
}