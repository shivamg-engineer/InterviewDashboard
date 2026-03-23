export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    console.log("Blog layout rendered");
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 border-r">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          Blog Sidebar
        </h2>

        <ul className="space-y-2 text-gray-700">
          <li>Recent Posts</li>
          <li>Categories</li>
          <li>Archives</li>
        </ul>
      </aside>

      {/* Blog Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}