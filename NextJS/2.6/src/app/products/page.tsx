interface Product {
  id: number;
  title: string;
  body: string;
}

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const limit = 3;
  const offset = (currentPage - 1) * limit;

  console.log(`Fetching products from ${offset+1} to ${offset + limit}`);

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${offset}&_limit=${limit}`
  );

  const products: Product[] = await res.json();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products Page {currentPage}</h1>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{product.title}</h3>
          <p>{product.body}</p>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        {currentPage > 1 && (
          <a href={`/products?page=${currentPage - 1}`}>⬅ Previous</a>
        )}

        <span style={{ margin: "0 10px" }}>Page {currentPage}</span>

        <a href={`/products?page=${currentPage + 1}`}>Next ➡</a>
      </div>
    </div>
  );
}