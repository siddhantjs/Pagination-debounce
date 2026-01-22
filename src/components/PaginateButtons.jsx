export default function PaginateButtons({totalPages, page, setPage}){
    return  <div className="flex justify-center gap-2 my-6 flex-wrap">
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
}