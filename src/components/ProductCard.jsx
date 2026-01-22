import React from "react";

function ProductCard({ item }) {
  if (!item) return null;

  return (
    <div
      className="backdrop-blur-xl bg-white/20
      border border-white/30 rounded-2xl shadow-xl
      hover:scale-[1.02] transition-all duration-300"
    >
      {/* Image */}
      <img
        src={item.images?.[0]}
        alt={item.title}
        className="h-48 w-full object-fill rounded-t-2xl"
        loading="lazy"
      />

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-green-600">
            {item.availabilityStatus}
          </p>

          <p className="text-lg font-bold text-gray-800">
            ₹ {item.price}
          </p>
        </div>

        <p className="text-red-500 font-medium">
          {item.title}
        </p>

        <p className="text-sm text-gray-700 line-clamp-2">
          {item.description}
        </p>

        <button
          className="w-full py-2 rounded-xl
          bg-gradient-to-r from-indigo-500 to-purple-500
          text-white font-semibold hover:opacity-90 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);
