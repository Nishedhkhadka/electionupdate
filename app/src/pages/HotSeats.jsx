import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import candidatesData from "../data/candidates.json";
import provinceData from "../data/province.json";
import districtData from "../data/district.json";
import constituencyData from "../data/constituency.json";
import partyData from "../data/party.json";
import manifestoData from "../data/manifesto.json";
import hotSeatsData from "../data/hot-seats.json";
import voteDifferenceData from "../data/vote-difference.json";
import { MainLayout } from "../layouts/MainLayout";
import ConstituencyElectionCard from "../components/election/ConstituencyElectionCard";
import { toNepaliNumber } from "../utils";
import {
  districtsForProvince,
  provinceRouteSlug,
  cleanRouteSlug,
} from "../utils/geoUtils";
import { fixImageUrl } from "../utils/imageUtils";
import { getManifestoImage } from "../app/config/constants";
import "./hotseats.css";

export default function HotSeats() {
  const [districtFilter, setDistrictFilter] = useState("");

  // Get unique districts from hot seats data
  const hotseatConstituencies = useMemo(() => {
    return hotSeatsData.map((hs) => {
      const match = constituencyData.find((c) => c.name === hs.constituency);
      return { ...hs, district: match?.district_name || "" };
    });
  }, []);

  const uniqueDistricts = useMemo(() => {
    const districts = [
      ...new Set(hotseatConstituencies.map((hs) => hs.district)),
    ]
      .filter(Boolean)
      .sort();
    return districts;
  }, [hotseatConstituencies]);

  const filteredHotSeats = useMemo(() => {
    if (!districtFilter) return hotseatConstituencies;
    return hotseatConstituencies.filter((hs) => hs.district === districtFilter);
  }, [districtFilter, hotseatConstituencies]);

  const filterBar = (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <select
        value={districtFilter}
        onChange={(e) => setDistrictFilter(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          fontSize: "14px",
        }}
      >
        <option value="">जिल्ला</option>
        {uniqueDistricts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
      <button
        onClick={() => setDistrictFilter("")}
        style={{
          padding: "8px 20px",
          backgroundColor: "#bf1e2e",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        खोज्नुहोस्
      </button>
    </div>
  );

  return (
    <MainLayout title="हट सिटहरु" headerRight={filterBar}>
      <div className="hot-seats-grid">
        {filteredHotSeats.length > 0 ? (
          filteredHotSeats.map((hotSeat) => (
            <div key={hotSeat.constituency} className="hot-seat-card">
              <div className="hot-seat-header">
                <Link
                  to={`/constituency/${constituencyData.find((e) => e?.name === hotSeat?.constituency)?.slug}`}
                >
                  <h3 className="hot-seat-title">{hotSeat.constituency}</h3>
                </Link>
              </div>

              <div className="hot-seat-candidates">
                {hotSeat.candidates.map((candidate, idx) => {
                  // Look up votes from candidatesData by matching name
                  const candidateData = candidatesData.find(
                    (c) => c.name === candidate.name,
                  );

                  const votes = candidateData?.votes || candidate.votes || 0;
                  // Fix image URL if it has the malformed ../npcdn prefix
                  const fixedImageUrl =
                    candidate.image?.replace(
                      /^\.\.\/npcdn\.ratopati\.com/,
                      "https://npcdn.ratopati.com",
                    ) || "/assets/images/placeholder.png";

                  return (
                    <Link
                      to={`/candidate/${candidateData?.slug}`}
                      key={idx}
                      className="hot-seat-candidate-link"
                    >
                      <div className="hot-seat-candidate-card">
                        <div className="hot-seat-avatar-wrapper">
                          <img
                            src={fixedImageUrl}
                            alt={candidate.name}
                            className="hot-seat-avatar-img"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/assets/images/placeholder.png";
                            }}
                          />
                          <img
                            src={candidateData?.partyLogo}
                            alt="Center overlay"
                            className="hot-seat-party-logo"
                          />
                        </div>

                        <h4 className="hot-seat-candidate-name glowText">
                          {candidate.name}
                        </h4>
                        <p className="hot-seat-candidate-party glowText">
                          {candidate.party}
                        </p>
                        <div className="flex hot-seat-votes-container">
                          <div
                            className="hot-seat-votes"
                            style={{
                              color: candidate.winner ? "#2c9a6b" : "#000000",
                            }}
                          >
                            {toNepaliNumber(votes)}
                          </div>
                          {candidate.winner && (
                            <img
                              src="/assets/img/win-tick.png"
                              alt="winner"
                              className="hot-seat-winner-tick"
                            />
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <p>कुनै हट सिट फेला परेन</p>
        )}
      </div>
    </MainLayout>
  );
}
