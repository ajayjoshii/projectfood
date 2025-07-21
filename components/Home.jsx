export default function Home({ addToCart, province, setProvince, provinces, recs }) {
  return (
    <div className="relative min-h-screen">
      {/* Location Badge on top-right fixed corner */}
      {province && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 font-semibold">
          Province: {province}
        </div>
      )}

      {/* Province Selector */}
      <div className="mb-6">
        <label htmlFor="province" className="block text-gray-700 font-medium mb-2">
          Select Province:
        </label>
        <select
          id="province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">-- Select Province --</option>
          {provinces.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recs.length > 0
          ? recs.map((item) => (
              <FoodItem key={item.id} item={item} addToCart={addToCart} />
            ))
          : provinces.length > 0 &&
            provinces.includes(province) && (
              <p className="text-gray-600">No recommendations found for your province.</p>
            )}
        {/* Default all food items shown if no recs */}
        {recs.length === 0 && (
          <>
            {defaultFoodItems.map((item) => (
              <FoodItem key={item.id} item={item} addToCart={addToCart} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

const FoodItem = ({ item, addToCart }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <img
      src={item.img}
      alt={item.name}
      className="w-full h-48 object-cover"
      loading="lazy"
    />
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
      <p className="text-green-700 font-bold mb-2">Rs. {item.price}</p>
      <button
        onClick={() => addToCart(item)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add to Cart
      </button>
    </div>
  </div>
);

// Dummy defaultFoodItems to avoid errors — keep your real food data here
const defaultFoodItems = [
    { id: 1, name: 'Dal Bhat', img: 'https://grrrltraveler.com/wp-content/uploads/2018/08/NEPALI-DAL-BHAT.jpg' },
    { id: 2, name: 'Momo', img: 'https://e7.pngegg.com/pngimages/979/343/png-clipart-mandu-momo-buuz-khinkali-pelmeni-meat-food-recipe-thumbnail.png' },
    { id: 3, name: 'Sel Roti', img: 'https://i.ytimg.com/vi/tRy6TAKNNes/sddefault.jpg' },
    { id: 4, name: 'Gundruk', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhSh3NXAD3EUkm8ls-5c7lIt7_xJalJeSceRCKg8rU2ipHeOohlElWGDFjsjnOYzqoz9qgfVs9_VGA7irfyIAmZ0HLCeXNsrEPdXN2n1hyphenhypheneUfeHwCIIoPMaleW5Xi3NZpZiWjM0fB6Wle4/s1600/DSC04152.JPG' },
    { id: 5, name: 'Chatamari', img: 'https://nepaltraveller.com/laravel-filemanager/photos/64/Chatamari/Untitled%20design%20(4).png' },
    { id: 6, name: 'Thukpa', img: 'https://www.awesomecuisine.com/wp-content/uploads/2020/03/chicken-thukpa.jpg' },
    { id: 7, name: 'Yomari', img: 'https://static1.squarespace.com/static/53ecd1bde4b0a6f9524254f8/t/675bdd6f2fda443f1ac0726e/1734073711928/Yomari-Punhi-Nepal-Festivals-shankerhotel_com_np.png?format=1500w' },
    { id: 8, name: 'Sukuti', img: 'https://uws.com.np/wp-content/uploads/2023/02/mutton-sukuti-fry.webp' },
    { id: 9, name: 'Juju Dhau', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhljhoGLu-SeG7_MbewOcsgN1ao786EgCmI2Htqdy6AWVl01jMCVmp4Sbg_o3TnSMQl3qJKwRpWSL1Dg2AYtvA-XL5fjP3q51l2yHWmowJgFxcFLSbTXNHewa2brcMIBS1sFh_S7JrD0-Q/s1600/2008+-+sept-nov+%28Nepal%29+050.jpg' },
    { id: 10, name: 'Kwati', img: 'https://naturallynidhi.com/wp-content/uploads/2019/05/InstantPot_NepaliKwatiDaal_MixedLentilStew-480x270.jpg' },
    { id: 11, name: 'Samay Baji', img: 'https://www.tasteatlas.com/images/dishes/856738bc40274f5694e144c242195a0c.jpg' },
    { id: 12, name: 'Aloo Tama', img: 'https://images.slurrp.com/prod/recipe_images/transcribe/main%20course/Aloo-tama.webp' },
    { id: 13, name: 'Choila', img: 'https://junifoods.com/wp-content/uploads/2023/04/Chicken-Choila-Main-2-500x500.png' },
    { id: 14, name: 'Bara', img: 'https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/52/71/73/5M1NG6h3SIKGKlhhKM9f_Nepali%20Bara.jpg' },
    { id: 15, name: 'Sekuwa', img: 'https://junifoods.com/wp-content/uploads/2022/12/Chicken-Sekuwa-1024x576.png' },
    { id: 16, name: 'Gorkhali Lamb', img: 'https://i.pinimg.com/236x/9a/c4/80/9ac480669bcd49ea1bb3ecc968ce99de.jpg' },
    { id: 17, name: 'Pulao', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgFPjIluL4H7E7Qznz6kq0DziLeDpnSg0RqM_0J-3nemYyxHbWSK0EaaAZ70NBiy1kLAFy5ZCxgBfCpETdfnL2oSqhS88KOdNTexX9Me5y1xKbFCU0D0DocySLaCPdiP1eXT7dvEWHXstDA/s1600/vegetable+pulao.JPG' },
    { id: 18, name: 'Thakali Set', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQfQimYoVlL3uplkHguLSCB4m554dDzTv-Ug&s' },
    { id: 19, name: 'Masu', img: 'https://junifoods.com/wp-content/uploads/2023/12/Easy-Goat-Curry-Sajilo-Khasi-Ko-Masu-%E0%A4%B8%E0%A4%9C%E0%A4%BF%E0%A4%B2%E0%A5%8B-%E0%A4%96%E0%A4%B8%E0%A5%80%E0%A4%95%E0%A5%8B-%E0%A4%AE%E0%A4%BE%E0%A4%B8%E0%A5%81-1.jpg' },
    { id: 20, name: 'Bhutuwa', img: 'https://cdn.tasteatlas.com//images/dishes/cc879765847047629baf56168ed7501c.jpg?width=320&height=205' },
  ];
