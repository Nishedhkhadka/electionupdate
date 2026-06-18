import Candidate from "./Candidate";

export default function HotSeatCard({ seat }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border">

      <div className="bg-red-50 border-b border-red-300 px-5 py-3">

        <h2 className="font-bold text-red-700 text-xl">
          {seat.constituency}
        </h2>

      </div>

      <div className="grid grid-cols-3 gap-4 p-5">

        {seat.candidates.map((candidate) => (
          <Candidate
            key={candidate.name}
            candidate={candidate}
          />
        ))}

      </div>

    </div>
  );
}