import { useMemo, useState, useEffect } from 'react'
import useProduct from './hooks/useProduct'
import useDebounce from './hooks/useDebounce'
import usePagination from './hooks/usePagination';
import Header from './components/Header';
import ProductCard from './components/ProductCard'
import PaginateButtons from './components/PaginateButtons';



function App() {

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // making api call
  const { product, loading, error } = useProduct();

  // 1. getting the debounce value by debounced function
  const debouncedValue = useDebounce(search, 500);

  // 2. filtering the products
  const filterProducts = useMemo(() => {
    if (!debouncedValue) return product;
    return product.filter((item) => item.title?.toLowerCase().includes(debouncedValue.toLowerCase()))
  }, [product, debouncedValue]);

  // 3. paginating, accessing the subsets of array
  const { totalPages, currentItems } = usePagination(filterProducts,itemsPerPage,page);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Something went wrong</p>;


  return <>
    <Header search={search} setSearch={setSearch}/>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6">
      { currentItems.map((item)=> <ProductCard key={item.id} item={item}/>) }
    </div>

    <PaginateButtons  totalPages={totalPages} page={page} setPage={setPage} />
  </>
}

export default App
