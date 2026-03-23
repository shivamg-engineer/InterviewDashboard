import React, { useEffect, useReducer, useState } from "react";
import ProductApi from "../api/products/ProductApi";
import { getProducts } from "../api/products/ProductApi";
import type { Product } from "../api/products/product.types";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // useEffect(() => {
    //   ProductApi.getAll().then((data)=>{
    //     setProducts(data);
    //     setLoading(false);
    //   })
    // });

    useEffect(() => {
        getProducts().then(setProducts).finally(() => setLoading(false));
         
    }, []);
   
useEffect(() => {
    console.log("Fetched products:", products);
}, [products]);
    if (loading) {
        return <p>Loading products...</p>
    }

    return (
        <ul>
            {products.map((p) => (
                <li key={p.id}>
                    {p.title} – ₹{p.price}
                </li>
            ))}
        </ul>
    );
};

export default ProductList;