interface SearchPageProps {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}

const items = [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Pineapple",
    "Grapes",
    "Strawberry",
];

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = params.query?.toLowerCase() || "";
    const currentPage = Number(params.page) || 1;
    const itemsPerPage = 5;

    //filter products
    const filteredItems = items.filter((item) =>
        item.toLowerCase().includes(query)
    );

    // Pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredItems.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Search Fruits</h1>

            <form>
                <input
                    type="text"
                    name="query"
                    placeholder="Search fruits..."
                    defaultValue={params.query}
                />
                <button type="submit">Search</button>
            </form>

            <h2><b>Results :</b></h2>

            {filteredItems.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <ul>
                    {filteredItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )}

            <h2><b>paginatedProducts :</b></h2>
            {paginatedProducts.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <ul>
                    {paginatedProducts.map((product, index) => (
                        <li key={index}>{product}</li>
                    ))}
                </ul>
            )}

            {/* Pagination */}
            <div style={{ marginTop: "20px" }}>
                {currentPage > 1 && (
                    <a href={`/search?query=${query}&page=${currentPage - 1}`}>
                        Previous
                    </a>
                )}

                <span style={{ margin: "0 10px" }}>
                    Page {currentPage} of {totalPages}
                </span>

                {currentPage < totalPages && (
                    <a href={`/search?query=${query}&page=${currentPage + 1}`}>
                        Next
                    </a>
                )}
            </div>
        </div>

    );
}