import { useEffect } from "react";
import { useState } from "react"

const useProduct = ()=>{
    // initialization of states
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [product,setProduct] = useState([]);

    // this effect will run once when render.
    useEffect(()=>{

        // async function to handle api call efficiently 
        const fetchProducts =async ()=>{
            setLoading(true);
            setError(null);
           try {
                const response = await fetch(`https://dummyjson.com/products?limit=100`);
                if(!response.ok) throw new Error("Failed to load products");
                const jsonData = await response.json();
                setProduct(jsonData.products);
           } catch (err) {
                setError(err.message)
           }finally{
                setLoading(false);
           }
        }

        fetchProducts();
    },[])

    // returning the state to caller.
    return {loading, product, error};
}

export default useProduct;