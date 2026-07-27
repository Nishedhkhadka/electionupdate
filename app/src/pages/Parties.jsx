import { Link, useNavigate } from "react-router-dom";
import partyData from "../data/party.json";
import candidateData from "../data/candidates.json";
import { MainLayout } from "../layouts/MainLayout";
import { toNepaliNumber } from "../utils";

export default function Parties() {
  const navigate = useNavigate();

  const parseVoteCount = (value) => {
    const arabic = String(value ?? "0")
      .replace(/[०-९]/g, (digit) => "०१२३४५६७८९".indexOf(digit))
      .replace(/[^\d]/g, "");
    return Number(arabic) || 0;
  };

  const sortedParties = [...partyData].sort((a, b) => {
    const totalSeatsA = (a.wins || 0) + (a.proportional_seats || 0);
    const totalSeatsB = (b.wins || 0) + (b.proportional_seats || 0);
    if (totalSeatsA !== totalSeatsB) return totalSeatsB - totalSeatsA;
    return (
      parseVoteCount(b.proportional_votes) -
      parseVoteCount(a.proportional_votes)
    );
  });

  return (
    <MainLayout title="राजनीतिक दलहरु" description="">
      <div
        style={{
          marginTop: "16px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        {sortedParties.map((party) => (
          <div
            key={party.slug}
            onClick={() => navigate(`/party/${party.slug}`)}
            style={{
              cursor: "pointer",
              background: "#fff9f9",
              border: "1px solid #fce8e8",
              borderRadius: "16px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
            className="parent"
          >
            <img
              src={party.logo || "/assets/images/placeholder.png"}
              alt={party.name}
              style={{
                width: "64px",
                height: "64px",
                objectFit: "contain",
                marginBottom: "12px",
                pointerEvents: "none",
              }}
            />

            <h3
              style={{
                fontSize: "16px",
                fontWeight: "700",
                margin: "0 0 4px",
                pointerEvents: "none",
              }}
              className="glowText"
            >
              {party.name}
            </h3>

            <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#444" }}>
              {party.leader && (
                <>
                  {party.leader_title || "अध्यक्ष"}:{" "}
                  <Link
                    to={`/party/${party.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      color: "#991d2b",
                      textDecoration: "underline",
                      fontWeight: "600",
                    }}
                  >
                    {party.leader}
                  </Link>
                </>
              )}
            </p>

            <hr
              style={{
                width: "100%",
                border: "0",
                borderTop: "2px solid #bf1e2e",
                marginBottom: "16px",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#2d9c44",
                  }}
                >
                  {toNepaliNumber(party.wins || 0)}
                </div>
                <div style={{ fontSize: "11px", color: "#666" }}>जित</div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#bf1e2e",
                  }}
                >
                  {party.proportional_votes || "०"}
                </div>
                <div style={{ fontSize: "11px", color: "#666" }}>
                  समानुपातिक मत
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
