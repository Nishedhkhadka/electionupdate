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

import KoshiMap from "../components/map/KoshiMap";
import MadeshMap from "../components/map/MadeshMap";
import BagmatiMap from "../components/map/BagmatiMap";
import GandakiMap from "../components/map/GandakiMap";
import LumbiniMap from "../components/map/LumbiniMap";
import KarnaliMap from "../components/map/KarnaliMap";
import SudhurPaschimMap from "../components/map/SudhurPaschimMap";

export default function Province() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const cleanSlug = slug?.replace(/\.html$/i, "");

  const province = provinceData.find(
    (p) =>
      p.slug === cleanSlug ||
      provinceRouteSlug(p.slug) === cleanSlug,
  );

  const [provinceFilter, setProvinceFilter] = useState(province?.slug || "");
  const [districtFilter, setDistrictFilter] = useState("");
  const [appliedDistrict, setAppliedDistrict] = useState("");

  useEffect(() => {
    if (province) {
      setProvinceFilter(province.slug);
      setDistrictFilter("");
      setAppliedDistrict("");
    }
  }, [province?.slug]);

  const candidatesBySlug = useMemo(
    () => new Map(candidatesData.map((c) => [c.slug, c])),
    [],
  );

  const partyByName = useMemo(
    () => new Map(partyData.map((p) => [p.name, p])),
    [],
  );

  const provinceDistrictSlugs = useMemo(
    () => new Set(province?.districts?.map((d) => d.slug) || []),
    [province],
  );

  const availableDistricts = useMemo(
    () => districtsForProvince(provinceFilter),
    [provinceFilter],
  );

  const filteredConstituencies = useMemo(() => {
    return constituencyData.filter((constituency) => {
      if (!provinceDistrictSlugs.has(constituency.district_slug)) {
        return false;
      }
      if (appliedDistrict && constituency.district_slug !== appliedDistrict) {
        return false;
      }
      return true;
    });
  }, [provinceDistrictSlugs, appliedDistrict]);

  const handleProvinceChange = (value) => {
    setProvinceFilter(value);
    setDistrictFilter("");
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    if (provinceFilter && provinceFilter !== province?.slug) {
      navigate(`/province/${provinceRouteSlug(provinceFilter)}`);
      return;
    }
    setAppliedDistrict(districtFilter);
  };

  if (!province) {
    return (
      <MainLayout title="प्रदेश फेला परेन">
        <p>दुःख है, यो प्रदेश फेला परेन।</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={province.name}>
      <div className="district-detail" style={{ marginBottom: "30px" }}>
        <div className="dn-grid">
          <div className="col8">
            <div className="contentarea">
              <p style={{ fontSize: "16px", lineHeight: "1.6" }}>{province.description}</p>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h4 style={{ fontSize: "18px", marginBottom: "10px", fontWeight: "bold", color: "#333" }}>
                यस प्रदेशका जिल्लाहरू:
              </h4>
              <div style={{ display: "flex", justifyContent: "center", width: "100%", overflow: "hidden" }}>
                {province.slug === "koshi-province" && <KoshiMap />}
                {province.slug === "madhesh-province" && <MadeshMap />}
                {province.slug === "bagmati-province" && <BagmatiMap />}
                {province.slug === "gandaki-province" && <GandakiMap />}
                {province.slug === "lumbini-province" && <LumbiniMap />}
                {province.slug === "karnali-province" && <KarnaliMap />}
                {province.slug === "sudurpaschim-province" && <SudhurPaschimMap />}
              </div>
            </div>
          </div>

          <div className="col4">
            <ul className="stats">
              <li style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <img src="/assets/img/vote.png" alt="" style={{ maxWidth: "40px", marginRight: "15px" }} />
                <h5>
                  {toNepaliNumber(province.voters?.total || 0)}
                  <span style={{ fontSize: "12px", color: "#666", display: "block" }}>जम्मा मतदाता</span>
                </h5>
              </li>
              <li style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <img src="/assets/img/man.png" alt="" style={{ maxWidth: "40px", marginRight: "15px" }} />
                <h5>
                  {toNepaliNumber(province.voters?.male || 0)}
                  <span style={{ fontSize: "12px", color: "#666", display: "block" }}>पुरुष मतदाता</span>
                </h5>
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <img src="/assets/img/woman.png" alt="" style={{ maxWidth: "40px", marginRight: "15px" }} />
                <h5>
                  {toNepaliNumber(province.voters?.female || 0)}
                  <span style={{ fontSize: "12px", color: "#666", display: "block" }}>महिला मतदाता</span>
                </h5>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="local__election section">
        <div className="heading-title-wrap flex flex-between flex-wrap flex-middle">
          <h3 className="heading-title">जिल्ला विवरण</h3>
          <form onSubmit={handleFilterSubmit}>
            <div className="filter-row">
              <div className="select-box">
                <select
                  className="state select"
                  name="province_id"
                  id="province_id"
                  value={provinceFilter}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                >
                  {provinceData.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="select-box">
                <select
                  name="district_id"
                  className="district select"
                  id="district_id"
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
              </div>
              <div className="select-box">
                <button type="submit" className="btn-submit">
                  <span>खोज्नुहोस</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="candidate--lists dn-grid dn-grid-small">
          {filteredConstituencies.length > 0 ? (
            filteredConstituencies.map((constituency) => (
              <ConstituencyElectionCard
                key={constituency.slug}
                constituency={constituency}
                candidatesBySlug={candidatesBySlug}
                partyByName={partyByName}
              />
            ))
          ) : (
            <p>कुनै निर्वाचन क्षेत्र फेला परेन</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
