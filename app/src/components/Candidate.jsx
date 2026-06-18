export default function Candidate({ candidate }) {
    return (
      <div className="text-center">
  
        <img
          src={candidate.image}
          alt={candidate.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-red-100 mx-auto"
        />
  
        <h3 className="font-semibold mt-3 text-sm">
          {candidate.name}
        </h3>
  
        <p className="text-xs text-gray-500">
          {candidate.party}
        </p>
  
        <div
          className={`mt-3 text-2xl font-bold ${
            candidate.winner
              ? "text-green-600"
              : "text-black"
          }`}
        >
          {candidate.votes}
        </div>
      </div>
    );
  }