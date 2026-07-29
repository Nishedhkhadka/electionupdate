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

export default function District() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const cleanSlug = slug?.replace(/\.html$/i, "");

  const district = districtData.find((d) => d.slug === cleanSlug);

  const [provinceFilter, setProvinceFilter] = useState(district.province_slug);
  const [districtFilter, setDistrictFilter] = useState(district.slug);

  const availableDistricts = useMemo(
    () => districtsForProvince(provinceFilter),
    [provinceFilter],
  );
  const handleProvinceChange = (value) => {
    setProvinceFilter(value);
    setDistrictFilter("");
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if (districtFilter) {
      navigate(`/district/${districtFilter}`);
    }
  };

  if (!district) {
    return (
      <MainLayout title="जिल्ला फेला परेन">
        <p>दुःख है, यो जिल्ला फेला परेन।</p>
      </MainLayout>
    );
  }

  const districtConstituencies = constituencyData.filter(
    (c) => c.district_slug === district.slug,
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
    <div className="heading-title-wrap flex flex-between flex-wrap flex-middle">
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
        <select
          style={{
            padding: "8px 25px 10px 16px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
            border: "1px solid rgba(12, 12, 13, 0.0901960784)",
            backgroundColor: "rgba(204, 204, 204, 0.2784313725)",
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

        <select
          offset={-100}
          style={{
            padding: "8px 25px 10px 16px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
            border: "1px solid rgba(12, 12, 13, 0.0901960784)",
            backgroundColor: "rgba(204, 204, 204, 0.2784313725)",
          }}
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
        >
          <option value="">जिल्ला</option>

          {availableDistricts.map((district) => (
            <option key={district.slug} value={district.slug}>
              {district.name}
            </option>
          ))}
        </select>

        <button
          animate={{ scale: 1.2 }}
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
    </div>
  );

  return (
    <MainLayout title={district.name} headerRight={filterBar}>
      <div className="district-detail" style={{ marginBottom: "30px" }}>
        <div className="dn-grid">
          <div className="col8">
            {district.map_image && (
              <div
                className="map-wrapper"
                style={{ marginBottom: "20px", textAlign: "center" }}
              >
                <img
                  src={district.map_image}
                  alt={district.name}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            )}
            <div className="contentarea">
              <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
                {district.description}
              </p>
            </div>
            <div style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
              <strong>प्रदेश:</strong>{" "}
              <Link
                to={`/province/${district.province_slug}`}
                style={{
                  color: "#bf1e2e",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {district.province_name}
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
                  alt="vote.img"
                  style={{ maxWidth: "40px", marginRight: "15px" }}
                />
                <h5>
                  {district.voters?.total?.toLocaleString() || "०"}
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
                  {district.voters?.male?.toLocaleString() || "०"}
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
                  {district.voters?.female?.toLocaleString() || "०"}
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

      <div className="local__election section" style={{ marginTop: "30px" }}>
        <h3
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "20px",
            borderBottom: "2px solid #bf1e2e",
            paddingBottom: "10px",
          }}
        >
          निर्वाचन क्षेत्रहरू
        </h3>
        <div
          className="candidate-lists dn-grid dn-grid-small"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {districtConstituencies.map((constituency) => (
            <ConstituencyElectionCard
              key={constituency.slug}
              constituency={constituency}
              candidatesBySlug={candidatesBySlug}
              partyByName={partyByName}
              limit={3}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
