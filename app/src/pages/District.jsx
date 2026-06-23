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

export default function District() {
  const { slug } = useParams();
  const cleanSlug = slug?.replace(/\.html$/i, "");
  
  const district = districtData.find((d) => d.slug === cleanSlug);

  if (!district) {
    return (
      <MainLayout title="जिल्ला फेला परेन">
        <p>दुःख है, यो जिल्ला फेला परेन।</p>
      </MainLayout>
    );
  }

  const districtConstituencies = constituencyData.filter(
    (c) => c.district_slug === district.slug
  );

  const candidatesBySlug = useMemo(
    () => new Map(candidatesData.map((c) => [c.slug, c])),
    []
  );

  const partyByName = useMemo(
    () => new Map(partyData.map((p) => [p.name, p])),
    []
  );

  return (
    <MainLayout title={district.name}>
      <div className="district-detail" style={{ marginBottom: "30px" }}>
        <div className="dn-grid">
          <div className="col8">
            {district.map_image && (
              <div className="map-wrapper" style={{ marginBottom: "20px", textAlign: "center" }}>
                <img 
                  src={district.map_image} 
                  alt={district.name} 
                  style={{ maxWidth: "100%", height: "auto", borderRadius: "8px", border: "1px solid #ddd" }}
                />
              </div>
            )}
            <div className="contentarea">
              <p style={{ fontSize: "16px", lineHeight: "1.6" }}>{district.description}</p>
            </div>
            <div style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
              <strong>प्रदेश:</strong> <Link to={`/province/${district.province_slug}`} style={{ color: "#bf1e2e", textDecoration: "none", fontWeight: "bold" }}>{district.province_name}</Link>
            </div>
          </div>
          
          <div className="col4">
            <ul className="stats">
              <li style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <img src="/assets/img/vote.png" alt="" style={{ maxWidth: "40px", marginRight: "15px" }} />
                <h5>
                  {district.voters?.total?.toLocaleString() || "०"}
                  <span style={{ fontSize: "12px", color: "#666", display: "block" }}>जम्मा मतदाता</span>
                </h5>
              </li>
              <li style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <img src="/assets/img/man.png" alt="" style={{ maxWidth: "40px", marginRight: "15px" }} />
                <h5>
                  {district.voters?.male?.toLocaleString() || "०"}
                  <span style={{ fontSize: "12px", color: "#666", display: "block" }}>पुरुष मतदाता</span>
                </h5>
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <img src="/assets/img/woman.png" alt="" style={{ maxWidth: "40px", marginRight: "15px" }} />
                <h5>
                  {district.voters?.female?.toLocaleString() || "०"}
                  <span style={{ fontSize: "12px", color: "#666", display: "block" }}>महिला मतदाता</span>
                </h5>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="local__election section" style={{ marginTop: "30px" }}>
        <h3 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px", borderBottom: "2px solid #bf1e2e", paddingBottom: "10px" }}>
          निर्वाचन क्षेत्रहरू
        </h3>
        <div className="candidate--lists dn-grid dn-grid-small" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
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
