import { useEffect, useState } from "react";

const useProduct = () => {

    // state to send 
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // call initially
    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            setError(null);
            try {
                let response = await fetch(`https://dummyjson.com/products?limit=100`);
                if(!response.ok) throw new Error("Failed to load products");
                response = await response.json();
                setProduct(response.products);
            } catch (err) {
                setError(err.message);
            }finally{
                setLoading(false);
            }
        };

        fetchProducts();
    },[]);

    // returning data
    return { product, loading, error };
}

export default useProduct;