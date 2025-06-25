import { foodItems } from '../data/data';

function Search() {
  const [query, setQuery] = useState("");

  const results = foodItems.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-1 mb-4 w-full"
      />
      {results.map(item => (
        <div key={item.id} className="mb-2">
          <h2 className="font-bold">{item.name}</h2>
          <p>Rs. {item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Search;
