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
import getPersonLink from "../utils/getPersonLink";
import { ChevronRight } from "lucide-react";

export default function Constituency() {
  const { slug } = useParams();
  const cleanSlug = slug?.replace(/\.html$/i, "");

  const constituency = constituencyData.find((c) => c.slug === cleanSlug);
  
  const navigate = useNavigate();

const [provinceFilter, setProvinceFilter] = useState("");
const [districtFilter, setDistrictFilter] = useState("");
const [constituencyFilter, setConstituencyFilter] = useState("");

const availableDistricts = useMemo(
  () => districtData.filter((d) => d.province_slug === provinceFilter),
  [provinceFilter]
);
const availableConstituencies = useMemo(
  () =>
    constituencyData.filter(
      (c) => c.district_slug === districtFilter
    ),
  [districtFilter]
  
);


const handleProvinceChange = (value) => {
  setProvinceFilter(value);
  setDistrictFilter("");
  setConstituencyFilter("");
};
const handleDistrictChange = (value) => {
  setDistrictFilter(value);
  setConstituencyFilter("");
};
const handleFilterSubmit = (e) => {

  

  if (constituencyFilter) {
    navigate(`/constituency/${constituencyFilter}`);
  }
};

  if (!constituency) {
    return (
      <MainLayout title="निर्वाचन क्षेत्र फेला परेन">
        <p>दुःख है, यो निर्वाचन क्षेत्र फेला परेन।</p>
      </MainLayout>
    );
  }
const districtConstituencies = constituencyData.filter(
  (c) => c.district_slug === constituency.district_slug
);
  // Sort candidates by votes descending
  const sortedCandidates = [...constituency.candidates].sort(
    (a, b) => (b.votes || 0) - (a.votes || 0),
  );
  

  const candidatesBySlug = useMemo(
    () => new Map(candidatesData.map((c) => [c.slug, c])),
    [],
  );

  const partyByName = useMemo(
    () => new Map(partyData.map((p) => [p.name, p])),
    [],
  );

const filterBar = (
  <form
    onSubmit={handleFilterSubmit}
    className="filter-bar"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexWrap: "wrap",
    }}
  >
    {/* Province */}
    <select
      style={{
        padding: "8px 25px 10px 16px",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "500",
        border: "1px solid rgba(12,12,13,.09)",
        backgroundColor: "rgba(204,204,204,.28)",
      }}
      value={provinceFilter}
      onChange={(e) => handleProvinceChange(e.target.value)}
    >
      <option value="">प्रदेश</option>

      {provinceData.map((province) => (
        <option key={province.slug} value={province.slug}>
          {province.name}
        </option>
      ))}
    </select>

    {/* District */}
    <select
      style={{
        padding: "8px 25px 10px 16px",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "500",
        border: "1px solid rgba(12,12,13,.09)",
        backgroundColor: "rgba(204,204,204,.28)",
      }}
      value={districtFilter}
      onChange={(e) => handleDistrictChange(e.target.value)}
    >
      <option value="">जिल्ला</option>

      {availableDistricts.map((district) => (
        <option key={district.slug} value={district.slug}>
          {district.name}
        </option>
      ))}
    </select>

    {/* Constituency */}
    <select
      style={{
        padding: "8px 25px 10px 16px",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "500",
        border: "1px solid rgba(12,12,13,.09)",
        backgroundColor: "rgba(204,204,204,.28)",
      }}
      value={constituencyFilter}
      onChange={(e) => setConstituencyFilter(e.target.value)}
    >
      <option value="">निर्वाचन क्षेत्र</option>

      {availableConstituencies.map((item) => (
        <option key={item.slug} value={item.slug}>
          {item.name}
        </option>
      ))}
    </select>

    <button
      type="submit"
      
      style={{
        backgroundColor: "#bf1e2e",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "4px",
        border: "none",
        fontSize: "14px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >

      खोज्नुहोस्
    </button>
  </form>
);

debugger
  return (
    <MainLayout title={constituency.name} headerRight={filterBar}>
      <div className="district-detail" style={{ marginBottom: "30px" }}>
        <div className="dn-grid">
          <div className="col8">
            {constituency.map_image && (
              <div
                className="map-wrapper"
                style={{ marginBottom: "20px", textAlign: "center" }}
              >
                <img
                  src={constituency.map_image}
                  alt={constituency.name}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            )}
            <div style={{ fontSize: "14px", color: "#666" }}>
              <strong>जिल्ला:</strong>{" "}
              <Link
                to={`/district/${constituency.district_slug}`}
                style={{
                  color: "#bf1e2e",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {constituency.district_name}
              </Link>
              <span style={{ margin: "0 10px" }}>|</span>
              <strong>प्रदेश:</strong>{" "}
              <Link
                to={`/province/${constituency.province_slug}`}
                style={{
                  color: "#bf1e2e",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {constituency.province_name}
              </Link>
            </div>
          </div>

          <div className="col4">
          <div
              className="heading-title"
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              {" "}
              मतदाता विवरण
            </div>
            <ul className="stats">
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <img
                  src="/assets/images/vote.png"
                  alt=""
                  style={{ maxWidth: "40px", marginRight: "15px" }}
                />
                <h5>
                  {constituency.voters?.total?.toLocaleString() || "०"}
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      display: "block",
                    }}
                  >
                    जम्मा मतदाता
                  </span>
                </h5>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <img
                  src="/assets/images/man.png"
                  alt=""
                  style={{ maxWidth: "40px", marginRight: "15px" }}
                />
                <h5>
                  {constituency.voters?.male?.toLocaleString() || "०"}
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      display: "block",
                    }}
                  >
                    पुरुष मतदाता
                  </span>
                </h5>
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/assets/images/woman.png"
                  alt=""
                  style={{ maxWidth: "40px", marginRight: "15px" }}
                />
                <h5>
                  {constituency.voters?.female?.toLocaleString() || "०"}
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      display: "block",
                    }}
                  >
                    महिला मतदाता
                  </span>
                </h5>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="all-parties-candidates section"
        style={{ marginTop: "30px" }}
      >
        <h3
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "20px",
            borderBottom: "2px solid #bf1e2e",
            paddingBottom: "10px",
          }}
        >
          उम्मेदवारहरु
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {sortedCandidates.map((candidate) => {
            const candidateInfo = candidatesData.find(
              (c) => c.slug === candidate.slug,
            );
            const partyInfo = partyData.find(
              (p) => p.name === candidateInfo?.party,
            );

            const isWinner = Boolean(
              candidate.isWinner ||
              candidate.is_winner ||
              candidateInfo?.isWinner ||
              candidateInfo?.is_winner,
            );

            return (
              <div
                key={candidate.slug}
                className={`party-container col12${candidate.isWinner ? " candidate-win" : ""}`}
              >
                <Link
                  to={`/candidate/${candidate.slug}`}
                  className="party-logo"
                >
                  <img
                    src={candidateInfo?.image}
                    alt={candidate.name}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = getPersonLink(
                        100 * Math.random(),
                      );
                    }}
                  />
                  <span className="party-name">{candidate.name}</span>
                </Link>
                <div className="party-wrap">
                  <div className="party-info">
                    <Link
                      to={`/party/${partyInfo.slug}`}
                      className="party-sign"
                    >
                      <img src={partyInfo?.logo} alt={partyInfo?.name} />
                      {partyInfo.name}
                    </Link>
                    <Link to={`/constituency/${cleanSlug}`}>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "rgba(1, 8, 20, 0.568627451)",
                          fontWeight: "700",
                        }}
                      >
                        {candidateInfo?.constituency}
                      </p>
                    </Link>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "fit-content",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "7px 12px",

                        color: isWinner ? "#2c9a6b" : "#4b5563",
                        fontWeight: 700,
                        fontSize: "15px",
                      }}
                    >
                      <span>{toNepaliNumber(candidate.votes || 0)}</span>
                      {isWinner ? (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            background: "#ffffff",
                            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.12)",
                          }}
                        >
                          <img
                            src="/assets/img/win-tick.png"
                            alt="winner badge"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
