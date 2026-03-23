import { useEffect, useRef, useState } from "react";

/** Shape of API data */
interface Post {
  id: number;
  title: string;
  body: string;
}

const LIMIT = 10;

const InfiniteScroll: React.FC = () => {
  const [items, setItems] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observerRef = useRef<IntersectionObserver | null>(null);

  /** Fetch paginated data */
  const fetchItems = async (): Promise<void> => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${page}`
      );

      const data: Post[] = await res.json();

      setItems((prev) => [...prev, ...data]);
      setHasMore(data.length === LIMIT);
    } catch (error) {
      console.error("Failed to fetch items", error);
    } finally {
      setLoading(false);
    }
  };

  /** Fetch on page change */
  useEffect(() => {
    fetchItems();
  }, [page]);

  /** Callback ref for last item */
  const lastItemRef = (node: HTMLDivElement | null): void => {
    if (loading) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  };

  return (
    <div style={styles.container}>
      <h2>📜 Infinite Scroll (TypeScript)</h2>

      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;

        return (
          <div
            key={item.id}
            ref={isLastItem ? lastItemRef : null}
            style={styles.card}
          >
            {item.title}
          </div>
        );
      })}

      {loading && <p>Loading...</p>}
      {!hasMore && <p>✅ No more data</p>}
    </div>
  );
};

export default InfiniteScroll;

/** Inline styles (typed) */
const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
  },
  card: {
    padding: "16px",
    marginBottom: "12px",
    border: "1px solid #444",
    borderRadius: "8px",
    background: "#1e1e1e",
    color: "#fff",
  },
};
