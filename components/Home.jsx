import React from 'react';

const ITEMS = [
  { id: 1, name: 'Dal Bhat', img: 'https://placeimg.com/200/200/food?1' },
  { id: 2, name: 'Momo', img: 'https://placeimg.com/200/200/food?2' },
  { id: 3, name: 'Sel Roti', img: 'https://placeimg.com/200/200/food?3' },
  { id: 4, name: 'Gundruk', img: 'https://placeimg.com/200/200/food?4' },
  { id: 5, name: 'Chatamari', img: 'https://placeimg.com/200/200/food?5' },
  { id: 6, name: 'Thukpa', img: 'https://placeimg.com/200/200/food?6' },
  { id: 7, name: 'Yomari', img: 'https://placeimg.com/200/200/food?7' },
  { id: 8, name: 'Sukuti', img: 'https://placeimg.com/200/200/food?8' },
  { id: 9, name: 'Juju Dhau', img: 'https://placeimg.com/200/200/food?9' },
  { id: 10, name: 'Kwati', img: 'https://placeimg.com/200/200/food?10' },
  { id: 11, name: 'Samay Baji', img: 'https://placeimg.com/200/200/food?11' },
  { id: 12, name: 'Aloo Tama', img: 'https://placeimg.com/200/200/food?12' },
  { id: 13, name: 'Choila', img: 'https://placeimg.com/200/200/food?13' },
  { id: 14, name: 'Bara', img: 'https://placeimg.com/200/200/food?14' },
  { id: 15, name: 'Sekuwa', img: 'https://placeimg.com/200/200/food?15' },
  { id: 16, name: 'Gorkhali Lamb', img: 'https://placeimg.com/200/200/food?16' },
  { id: 17, name: 'Pulao', img: 'https://placeimg.com/200/200/food?17' },
  { id: 18, name: 'Thakali Set', img: 'https://placeimg.com/200/200/food?18' },
  { id: 19, name: 'Masu', img: 'https://placeimg.com/200/200/food?19' },
  { id: 20, name: 'Bhutuwa', img: 'https://placeimg.com/200/200/food?20' },
];

export default function Home({ addToCart, province, setProvince, provinces, recs }) {
  return (
    <div>
      <div className="mb-8 max-w-md mx-auto">
        <label htmlFor="province-select" className="block mb-2 font-semibold text-gray-700">
          Select Your Province
        </label>
        <select
          id="province-select"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="">-- Select Province --</option>
          {provinces.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Popular Foods</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {ITEMS.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded shadow-md hover:shadow-lg transition p-3 flex flex-col items-center"
          >
            <img
              src={item.img}
              alt={item.name}
              className="rounded w-full h-40 object-cover mb-3"
            />
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <button
              onClick={() => addToCart(item)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded w-full transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {recs.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-12 mb-4 text-center text-green-700">
            Recommended for your Province
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recs.map((item) => (
              <div
                key={item.id}
                className="bg-green-50 rounded shadow-md p-3 flex flex-col items-center"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="rounded w-full h-36 object-cover mb-2"
                />
                <h3 className="text-md font-semibold text-green-800">{item.name}</h3>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
