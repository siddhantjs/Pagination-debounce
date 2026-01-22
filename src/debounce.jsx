import { useState } from "react";
import { useEffect } from "react"

const useDebounce = (value,delay)=>{
    const [debouncedValue,setDebouncedValue] = useState(value);
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedValue(value);
        })

        // clear the timer to wash out the previous call
        return ()=>clearTimeout(timer);
    },[value,delay]);

    return debouncedValue;
}

export default useDebounce;