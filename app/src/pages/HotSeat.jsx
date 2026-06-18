import { useMemo, useState } from "react";
import hotSeatsData from "../../public/data/hot-seats.json";
import HotSeatCard from "../components/HotSeatCard";
import FilterBar from "../components/FilterBar";

export default function HotSeat() {
  const [district, setDistrict] = useState("");

  const data = useMemo(() => {
    if (!district) return hotSeatsData;

    return hotSeatsData.filter(
      (item) =>
        item.district === district ||
        item.constituency.includes(district)
    );
  }, [district]);

  const districts = [...new Set(hotSeatsData.map((x) => x.district))];

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="max-w-7xl mx-auto px-4 py-8">

        <h1 className="text-4xl font-bold text-red-700 mb-8">
          हट सिटहरू
        </h1>

        <FilterBar
          districts={districts}
          district={district}
          setDistrict={setDistrict}
        />

        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
          {data.map((seat) => (
            <HotSeatCard key={seat.id} seat={seat} />
          ))}
        </div>

      </div>

    </div>
  );
}