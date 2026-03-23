export default function DashboardLayout({ children, }: { children: React.ReactNode; }) {

    return (
        <div className="flex min-h-screen">

            {/* sidebar */}
            <aside className="w-52 bg-gray-100 p-5 border-r">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Dashboard</h3>
                <ul className="space-y-2">
                    <li><a
                        href="/dashboard"
                        className="block rounded px-2 py-1 text-gray-700 hover:text-blue-600 hover:bg-gray-200 transition"
                    >Home</a></li>
                    <li><a
                        href="/dashboard/settings"
                        className="block rounded px-2 py-1 text-gray-700 hover:text-blue-600 hover:bg-gray-200 transition"
                    >Settings</a></li>
                </ul>
            </aside>

            {/* main */}

            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}