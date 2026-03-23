import "./App.css";
import FetchUsersWithAxios from "./Exercise1/FetchUsersWithAxios";
import FetchUsersWithFetch from "./Exercise1/FetchUsersWithFetch";
import Weather from "./Exercise2AND3/Weather";
import PaginationExample from "./Exercise4/PaginationExample";
import InfiniteScroll from "./Exercise5/InfiniteScroll";
import DebouncedSearch from "./Exercise6/DebouncedSearch";

function App() {
  return (
    <>
      <FetchUsersWithFetch />
      <FetchUsersWithAxios />
      <Weather />
      <PaginationExample />
      <DebouncedSearch />
      <InfiniteScroll />
    </>
  );
}

export default App;
