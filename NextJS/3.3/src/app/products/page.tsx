interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export const revalidate = 10


async function getProducts() {
  // Mock data since dummyjson API is down
  return {
    products: [
      { id: 1, title: "iPhone 9", description: "An apple phone", price: 549, thumbnail: "https://dummyjson.com/image/i/products/1/thumbnail.jpg" },
      { id: 2, title: "iPhone 10", description: "An apple phone", price: 550, thumbnail: "https://dummyjson.com/image/i/products/2/thumbnail.jpg" },
      // Add 10 more...
      { id: 3, title: "Samsung Galaxy", description: "Android phone", price: 299, thumbnail: "https://dummyjson.com/image/i/products/3/thumbnail.jpg" },
      { id: 4, title: "Oppo Phone", description: "Smartphone", price: 349, thumbnail: "https://dummyjson.com/image/i/products/4/thumbnail.jpg" },
      { id: 5, title: "Laptop Dell", description: "Gaming laptop", price: 1299, thumbnail: "https://dummyjson.com/image/i/products/5/thumbnail.webp" },
      { id: 6, title: "Keyboard Wireless", description: "Mechanical keyboard", price: 99, thumbnail: "https://dummyjson.com/image/i/products/6/thumbnail.jpg" },
      { id: 7, title: "Mouse Logitech", description: "Gaming mouse", price: 49, thumbnail: "https://dummyjson.com/image/i/products/7/thumbnail.webp" },
      { id: 8, title: "Headphones Sony", description: "Wireless headphones", price: 199, thumbnail: "https://dummyjson.com/image/i/products/8/thumbnail.jpg" },
      { id: 9, title: "Camera Canon", description: "DSLR camera", price: 899, thumbnail: "https://dummyjson.com/image/i/products/9/thumbnail.jpg" },
      { id: 10, title: "Watch Apple", description: "Smart watch", price: 399, thumbnail: "https://dummyjson.com/image/i/products/10/thumbnail.jpeg" },
      { id: 11, title: "TV Samsung", description: "4K TV", price: 1499, thumbnail: "https://dummyjson.com/image/i/products/11/thumbnail.jpeg" },
      { id: 12, title: "Fridge LG", description: "Smart fridge", price: 1199, thumbnail: "https://dummyjson.com/image/i/products/12/thumbnail.jpg" }
    ]
  };
}

export default async function ProductsPage() {
  const data = await getProducts();

  return (
    <div>
      <h1>Products</h1>

{data.products.map((p: Product) => (

        <p key={p.id}>{p.title}</p>
      ))}

    </div>
  );
}