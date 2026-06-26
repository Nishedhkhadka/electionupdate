import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import candidatesData from "../../public/data/candidates.json";
import provinceData from "../../public/data/province.json";
import districtData from "../../public/data/district.json";
import constituencyData from "../../public/data/constituency.json";
import partyData from "../../public/data/party.json";
import manifestoData from "../../public/data/manifesto.json";
import hotSeatsData from "../../public/data/hot-seats.json";
import voteDifferenceData from "../../public/data/vote-difference.json";
import { MainLayout } from "../layouts/MainLayout";
import ConstituencyElectionCard from "../components/election/ConstituencyElectionCard";
import { toNepaliNumber } from "../utils";
import { districtsForProvince, provinceRouteSlug, cleanRouteSlug } from "../utils/geoUtils";
import { fixImageUrl } from "../utils/imageUtils";
import { getManifestoImage } from "../app/config/constants";

export default function Parties() {
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
    return parseVoteCount(b.proportional_votes) - parseVoteCount(a.proportional_votes);
  });

  return (
    <MainLayout
      title="राजनीतिक दलहरु"
      description="Review participating political parties and their results in Nepal Election 2082."
    >
      <div
        style={{
          marginTop: "16px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        {sortedParties.map((party) => (
          <div
            key={party.slug}
            style={{
              background: "linear-gradient(180deg, rgba(255,239,239,0.85), #fff)",
              border: "1px solid rgba(191,30,46,0.15)",
              borderRadius: "12px",
              padding: "12px 10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  margin: "0 auto 8px",
                  borderRadius: "50%",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={
                    party.logo && party.logo !== "#"
                      ? party.logo.startsWith("http")
                        ? party.logo
                        : party.logo.startsWith("/")
                        ? party.logo
                        : `/${party.logo}`
                      : "/assets/images/placeholder.png"
                  }
                  alt={party.name}
                  style={{ maxWidth: "42px", maxHeight: "42px", objectFit: "contain" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/images/placeholder.png";
                  }}
                />
              </div>

              <div style={{ textAlign: "center", marginBottom: "8px" }}>
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    margin: "0 0 4px",
                    lineHeight: "1.25",
                    color: "#991d2b",
                  }}
                >
                  {party.name}
                </h3>
                <p style={{ margin: 0, fontSize: "11px", color: "#5d5d5d", lineHeight: "1.35" }}>
                  {party.leader ? `अध्यक्ष: ${party.leader}` : null}
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "6px",
                  marginTop: "6px",
                }}
              >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "8px 6px",
                  textAlign: "center",
                  border: "1px solid #f1e6e9",
                  gridColumn: "1 / -1",
                }}
              >
                <div style={{ fontSize: "11px", color: "#999", marginBottom: "4px" }}>सिट</div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "6px",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "10px", color: "#888" }}>प्रत्यक्ष</div>
                    <div style={{ fontSize: "15px", fontWeight: "800", color: "#bf1e2e", marginTop: "2px" }}>
                      {toNepaliNumber(party.wins || 0)}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "10px", color: "#888" }}>समानुपातिक</div>
                    <div style={{ fontSize: "15px", fontWeight: "800", color: "#bf1e2e", marginTop: "2px" }}>
                      {toNepaliNumber(party.proportional_seats || 0)}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "8px 6px",
                  textAlign: "center",
                  border: "1px solid #f1e6e9",
                  gridColumn: "1 / -1",
                }}
              >
                <div style={{ fontSize: "11px", color: "#999" }}>समानुपातिक</div>
                <div style={{ fontSize: "14px", fontWeight: "800", color: "#bf1e2e", marginTop: "2px" }}>
                  {party.proportional_votes || "०"}
                </div>
              </div>
              </div>
            </div>

            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <Link
                to={`/party/${party.slug}`}
                style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  backgroundColor: "#bf1e2e",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "999px",
                  fontWeight: "700",
                  fontSize: "11px",
                }}
              >
                विस्तृत जानकारी
              </Link>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
