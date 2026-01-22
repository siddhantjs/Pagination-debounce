import { useMemo, useState } from 'react'
import useProduct from './hook'
import useDebounce from './debounce'


function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const { product, loading, error } = useProduct();
  console.log(product[0])
  const debouncedValue = useDebounce(search, 500);

  // for filtering the products
  const filterProducts = useMemo(() => {
    if (!debouncedValue) return product;
    return product.filter((item) => item.title.toLowerCase().includes(debouncedValue.toLowerCase()))
  }, [product, debouncedValue])

  // total pages
  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);

  // used useMemo hook to avoid unnecessory re-render and get subarray
  const currentItems = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filterProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [page, filterProducts]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Something went wrong</p>;


  return <>
    {/* Header section | Paginated search bar.. */}
    <header className='w-full bg-gradient-to-r from-indigo-500 to-purple-500'>
      <div className='w-full flex flex-col md:flex-row justify-between p-4 gap-3'>
        <div className='w-full flex items-center'>
          <p className='text-white text-sm md:text-2xl'>Project is about pagination and debounced search</p>
        </div>

        <div className='w-full max-w-md'>
          <input type="text"
            className='bg-white/40 w-full p-2 text-white rounded outline-none'
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder='Search..' />
        </div>
      </div>
    </header>

    {/* product listing */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6">
      {currentItems.map(item => (
        <div
          key={item.id}
          className="backdrop-blur-xl bg-white/20
          border border-white/30 rounded-2xl shadow-xl
          hover:scale-[1.02] transition-all duration-300
        ">
          {/* Image */}
          <img
            src={item.images?.[0]}
            alt={item.title}
            className="h-48 w-full object-fill rounded-t-2xl"
          />

          {/* Content */}
          <div className="p-4 space-y-3">


            <div className='flex justify-between items-center'>
              <p className="text-sm font-semibold text-green-600">
                {item.availabilityStatus}
              </p>

              <p className="text-lg font-bold text-gray-800">
                ₹ {item.price}
              </p>
            </div>

            <p className='text-red-500'>{item.title}</p>

            <p className="text-sm text-gray-700 line-clamp-2">
              {item.description}
            </p>

            <button
              className="w-full py-2 rounded-xl
              bg-gradient-to-r from-indigo-500 to-purple-500
            text-white font-semibold hover:opacity-90 transition
            ">
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>


    {/* paginate buttons */}
    <div className="flex justify-center gap-2 my-6 flex-wrap">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i} onClick={() => setPage(i + 1)}
          className={`px-4 py-2 rounded-lg font-semibold transition
          ${page === i + 1
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'}`}>
          {i + 1}
        </button>
      ))}
    </div>
  </>
}

export default App
