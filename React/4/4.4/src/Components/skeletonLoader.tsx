// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// const SkeletonLoader = () => {
//   return (
//     <div>
//       <Skeleton height={20} count={5} />
//     </div>
//   );
// };

// export default SkeletonLoader;

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./UserComponent.css";

const SkeletonLoader = () => {
  return (
    <div className="skeleton-list">
      <div className="user-item">
        <Skeleton
          height={20}
          width="90%"
          baseColor="#2a2a2a"
          highlightColor="#3a3a3a"
        />
        <Skeleton
          height={16}
          width="70%"
          baseColor="#2a2a2a"
          highlightColor="#3a3a3a"
          style={{ marginTop: "8px" }}
        />
      </div>
      <div className="user-item">
        <Skeleton
          height={20}
          width="95%"
          baseColor="#2a2a2a"
          highlightColor="#3a3a3a"
        />
        <Skeleton
          height={16}
          width="75%"
          baseColor="#2a2a2a"
          highlightColor="#3a3a3a"
          style={{ marginTop: "8px" }}
        />
      </div>
      <div className="user-item">
        <Skeleton
          height={20}
          width="85%"
          baseColor="#2a2a2a"
          highlightColor="#3a3a3a"
        />
        <Skeleton
          height={16}
          width="65%"
          baseColor="#2a2a2a"
          highlightColor="#3a3a3a"
          style={{ marginTop: "8px" }}
        />
      </div>
      <div className="user-item">
        <Skeleton
          height={20}
          width="92%"
          baseColor="#2a2a2a"
          highlightColor="#3a3a3a"
        />
        <Skeleton
          height={16}
          width="72%"
          baseColor="#2a2a2a"
          highlightColor="#3a3a3a"
          style={{ marginTop: "8px" }}
        />
      </div>
      <div className="user-item">
        <Skeleton
          height={20}
          width="88%"
          baseColor="#2a2a2a"
          highlightColor="#3a3a3a"
        />
        <Skeleton
          height={16}
          width="60%"
          baseColor="#2a2a2a"
          highlightColor="#3a3a3a"
          style={{ marginTop: "8px" }}
        />
      </div>
    </div>
  );
};

export default SkeletonLoader;
