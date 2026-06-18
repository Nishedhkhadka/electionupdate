export default function FilterBar({
    districts,
    district,
    setDistrict,
  }) {
    return (
      <div className="flex justify-end mb-8">
  
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border rounded-lg px-4 py-2 bg-white"
        >
          <option value="">जिल्ला</option>
  
          {districts.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
  
      </div>
    );
  }