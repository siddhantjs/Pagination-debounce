export default function Header({search,setSearch}){
    return <header className='w-full bg-gradient-to-r from-indigo-500 to-purple-500'>
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
}