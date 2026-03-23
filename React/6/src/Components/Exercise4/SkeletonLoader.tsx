import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = () => (
  <div>
    <Skeleton height={20} count={3} />
  </div>
);

export default SkeletonLoader;
