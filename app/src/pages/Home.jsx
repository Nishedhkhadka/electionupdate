import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import NepalMap from "../components/map/NepalMap.jsx";
import { MainLayout } from "../layouts/MainLayout";
import ProportionalResultsSection from "../components/home/ProportionalResultsSection.jsx";
import ProvinceResultsSection from "../components/home/ProvinceResultsSection.jsx";
import HotSeatsPreviewSection from "../components/home/HotSeatsPreviewSection.jsx";
import PopularCandidatesPreviewSection from "../components/home/PopularCandidatesPreviewSection.jsx";
import AllCandidatesPreviewSection from "../components/home/AllCandidatesPreviewSection.jsx";
import constituencyData from "../data/constituency.json";
import provinceData from "../data/province.json";
import partyData from "../data/party.json";
import { toNepaliNumber } from "../utils";
import { districtsForProvince, provinceRouteSlug } from "../utils/geoUtils";
import { BadgeCheck } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const idleTimerRef = useRef(null);

  const isMapHoveredRef = useRef(false);
  const isPopupHoveredRef = useRef(false);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [hoveredConstituency, setHoveredConstituency] = useState(null);
  const [constituenciesData, setConstituenciesData] = useState([]);
  const [candidatesData, setCandidatesData] = useState([]);
  const [selectedLegendParty, setSelectedLegendParty] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [width, setWidth] = useState(window.innerWidth);
  // Load constituency data on mount
  useEffect(() => {
    fetch("/data/constituency.json")
      .then((res) => res.json())
      .then((data) => setConstituenciesData(data))
      .catch((err) => console.error("Error loading constituency data:", err));
  }, []);

  useEffect(() => {
    fetch("/data/candidates.json")
      .then((res) => res.json())
      .then((data) => setCandidatesData(data))
      .catch((err) => console.error("Error loading candidates data:", err));
  }, []);

  const availableDistricts = useMemo(
    () => districtsForProvince(selectedProvince),
    [selectedProvince],
  );

  const availableConstituencies = useMemo(() => {
    if (!selectedDistrict) {
      return [];
    }

    return constituencyData.filter(
      (constituency) => constituency.district_slug === selectedDistrict,
    );
  }, [selectedDistrict]);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (query.length < 2) {
      return [];
    }

    const matches = (values) =>
      values
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));

    const candidateResults = candidatesData
      .filter((candidate) =>
        matches([
          candidate.name,
          candidate.slug,
          candidate.party,
          candidate.constituency,
          candidate.district,
          candidate.provinces,
        ]),
      )
      .slice(0, 5)
      .map((candidate) => ({
        type: "उम्मेदवार",
        title: candidate.name,
        subtitle: [candidate.party, candidate.constituency]
          .filter(Boolean)
          .join(" • "),
        image: candidate.image,
        url: `/candidate/${candidate.slug}`,
      }));

    const partyResults = partyData
      .filter((party) => matches([party.name, party.slug, party.leader]))
      .slice(0, 4)
      .map((party) => ({
        type: "दल",
        title: party.name,
        subtitle: party.leader ? `नेता: ${party.leader}` : "",
        image: party.logo,
        url: `/party/${party.slug}`,
      }));

    const constituencyResults = constituencyData
      .filter((constituency) =>
        matches([
          constituency.name,
          constituency.slug,
          constituency.district_name,
          constituency.province_name,
        ]),
      )
      .slice(0, 4)
      .map((constituency) => ({
        type: "निर्वाचन क्षेत्र",
        title: constituency.name,
        subtitle: [constituency.district_name, constituency.province_name]
          .filter(Boolean)
          .join(" • "),
        image: constituency.map_image,
        url: `/constituency/${constituency.slug}`,
      }));

    return [...candidateResults, ...partyResults, ...constituencyResults].slice(
      0,
      10,
    );
  }, [searchQuery, candidatesData]);

  const parties = [
    {
      slug: "rastriya-swatantra-party",
      name: "राष्ट्रिय स्वतन्त्र पार्टी",
      image: "/assets/images/rsp_AiC1qh2xlI.jpg",
      direct: 125,
      proportional: 57,
      total: 182,
      votes: "51,83,493",
      color: "#07a4f2",
    },
    {
      slug: "nepali-congress",
      name: "नेपाली कांग्रेस",
      image: "/assets/images/congress-logo_zVeY3un3Hj.jpg",
      direct: 18,
      proportional: 20,
      total: 38,
      votes: "17,59,172",
      color: "#2e7a05",
    },
    {
      slug: "cpn-uml",
      name: "नेकपा (एमाले)",
      image: "/assets/images/uml-1_zfT0bMAJFO.jpg",
      direct: 9,
      proportional: 16,
      total: 25,
      votes: "14,55,885",
      color: "#910808",
    },
    {
      slug: "nepali-communist-party",
      name: "नेपाली कम्युनिष्ट पार्टी",
      image: "/assets/images/nepali-communist_uVwmNizOSk.jpg",
      direct: 8,
      proportional: 9,
      total: 17,
      votes: "8,11,577",
      color: "#f50f0f",
    },
    {
      slug: "shram-samskriti-party",
      name: "श्रम संस्कृति पार्टी",
      image: "/assets/images/shram-sanskriti-party_jrxdNsjzjb.jpg",
      direct: 3,
      proportional: 4,
      total: 7,
      votes: "3,85,902",
      color: "#d54b10",
    },
    {
      slug: "rastriya-prajatantra-party",
      name: "राष्ट्रिय प्रजातन्त्र पार्टी",
      image: "/assets/images/raprapa_RPVSZDsBPg.jpg",
      direct: 1,
      proportional: 4,
      total: 5,
      votes: "3,30,684",
      color: "#f0d105",
    },
  ];

  const handleConstituencyHover = (data) => {
    isMapHoveredRef.current = true;

    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }

    setHoveredConstituency(data);
  };

  const handleConstituencyLeave = () => {
    isMapHoveredRef.current = false;

    startIdleCheck();
  };

  const handlePopupEnter = () => {
    isPopupHoveredRef.current = true;

    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
  };

  const handlePopupLeave = () => {
    isPopupHoveredRef.current = false;

    startIdleCheck();
  };

  const startIdleCheck = () => {
    // only hide if BOTH are inactive
    if (isMapHoveredRef.current || isPopupHoveredRef.current) {
      return;
    }

    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    idleTimerRef.current = setTimeout(() => {
      // re-check before hiding (safety)
      if (!isMapHoveredRef.current && !isPopupHoveredRef.current) {
        setHoveredConstituency(null);
      }
    }, 1000); // 1.1 seconds of inactivity
  };

  const legendItems = [{ name: "सबै", color: "#ddd", value: "" }]
    .concat(
      parties.map((p) => ({
        name: p.name,
        color: p.color,
        value: p.name,
      })),
    )
    .concat([
      { name: "स्वतन्त्र", color: "#043e62", value: "स्वतन्त्र" },
      {
        name: "निकुञ्ज तथा आरक्ष",
        color: "#55e5a5",
        value: "निकुञ्ज तथा आरक्ष",
      },
    ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let url = "";

    if (selectedConstituency) {
      url = `/constituency/${selectedConstituency}`;
    } else if (selectedDistrict) {
      url = `/district/${selectedDistrict}`;
    } else if (selectedProvince) {
      url = `/province/${provinceRouteSlug(selectedProvince)}`;
    }

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setSelectedDistrict("");
    setSelectedConstituency("");
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedConstituency("");
  };

  const closeSearch = () => {
    setSearchQuery("");
    document.body.classList.remove("show__search--modal");
  };

  const candidateMap = new Map(
    candidatesData.map((candidate) => [candidate.slug, candidate]),
  );
  const partyColorMap = Object.fromEntries(
    legendItems.map((item) => [item.value || item.name, item.color]),
  );

  window.onresize = () => {
    setWidth(window.innerWidth);
  };
  return (
    <div className="home-page">
      {/* Candidate Search Form */}
      <div className="candidate-search-form" data-search-url="search.json">
        <div className="search-overlay" onClick={closeSearch}></div>
        <div className="flex">
          <div className="elc-container">
            <div className="form-label">
              उम्मेदवार, दल वा निर्वाचन क्षेत्र खोज्नुहोस्
              <button
                className="trigger-close"
                type="button"
                onClick={closeSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x-icon lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <form className="input-wrap">
              <input
                type="search"
                name="query"
                autoComplete="off"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="कम्तिमा ३ अक्षर टाइप गर्नुहोस्..."
              />
              <div className="form-autocomplete">
                {searchQuery.trim().length < 2 ? (
                  <span className="counter search-counter">
                    कम्तिमा ३ अक्षर टाइप गर्नुहोस्...
                  </span>
                ) : null}
                {searchQuery.trim().length >= 2 ? (
                  searchResults.length > 0 ? (
                    <div className="search-result-list">
                      {searchResults.map((result) => (
                        <Link
                          key={`${result.type}-${result.url}`}
                          to={result.url}
                          className="search-result-item"
                          onClick={closeSearch}
                        >
                          <span className="search-result-image">
                            {result.image ? (
                              <img src={result.image} alt="" />
                            ) : null}
                          </span>
                          <span className="search-result-content">
                            <span className="search-result-type">
                              {result.type}
                            </span>
                            <strong>{result.title}</strong>
                            {result.subtitle ? (
                              <small>{result.subtitle}</small>
                            ) : null}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <span className="counter search-counter">
                      कुनै परिणाम भेटिएन
                    </span>
                  )
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>

      <MainLayout bare>
        {/* Smart Filter */}
        <div className="smart-filter">
          <div className="elc-container">
            <form
              onSubmit={handleSubmit}
              className="smart-filter-form"
              id="smart-filter-form"
            >
              <div className="select-box">
                <select
                  id="smart_filter_province_id"
                  name="province_id"
                  className="form-control"
                  value={selectedProvince}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                >
                  <option value="">प्रदेश</option>
                  {provinceData.map((province) => (
                    <option key={province.slug} value={province.slug}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="select-box">
                <select
                  id="smart_filter_district_id"
                  name="district_id"
                  className="form-control"
                  disabled={!selectedProvince}
                  value={selectedDistrict}
                  onChange={(e) => handleDistrictChange(e.target.value)}
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
                <select
                  id="smart_filter_constituency_id"
                  name="constituency_id"
                  className="form-control"
                  disabled={!selectedDistrict}
                  value={selectedConstituency}
                  onChange={(e) => setSelectedConstituency(e.target.value)}
                >
                  <option value="">निर्वाचन क्षेत्र छान्नुहोस्</option>
                  {availableConstituencies.map((constituency) => (
                    <option key={constituency.slug} value={constituency.slug}>
                      {constituency.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="select-box">
                <input
                  className="btn-submit"
                  type="submit"
                  value="खोज्‍नुहोस्"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="elec-content-wrap"
          data-district-url="api/address/district.json?province_id=PROVINCE_ID"
        >
          {/* Map Section */}
          <section className="section nepalmap">
            <div
              className="elc-container flex"
              style={{ position: "relative" }}
            >
              <div
                className="mapcontainer"
                id="constituency-map"
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                {width > 768 && (
                  <div
                    className=" spinner-wrapper flex flex-middle flex-center"
                    style={{ width: "100%", position: "relative" }}
                  >
                    <NepalMap
                      onConstituencyHover={handleConstituencyHover}
                      onConstituencyLeave={handleConstituencyLeave}
                      constituenciesData={constituenciesData}
                      candidatesData={candidatesData}
                      selectedParty={selectedLegendParty}
                      partyColorMap={partyColorMap}
                    />
                  </div>
                )}
                {/* Horizontal Legend */}
                {width > 768 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                     
                      gap: "16px",
                      padding: "16px 10px",
                      marginTop: "10px",
                      zIndex: 10,
                      fontSize: "14px",
                      fontFamily: "'Noto Sans Devanagari', sans-serif",
                    }}
                  >
                    {legendItems.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedLegendParty(item.value)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          cursor: "pointer",
                          fontWeight:
                            selectedLegendParty === item.value ? 700 : 400,
                          opacity:
                            !selectedLegendParty ||
                            selectedLegendParty === item.value
                              ? 1
                              : 0.65,
                        }}
                      >
                        <span
                          style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: item.color,
                            borderRadius: "50%",
                            display: "inline-block",
                          }}
                        />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Hovered Constituency Candidates Card */}
              {hoveredConstituency && (
                <div
                  onMouseEnter={handlePopupEnter}
                  onMouseLeave={handlePopupLeave}
                  style={{
                    position: "absolute",
                    right: "50px",
                    top: "250px",
                    transform: "translateY(-50%)",
                    width: "290px",
                    height: "auto",
                    background: "#fff",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                    border: "1px solid #e2e8f0",
                    zIndex: 100,
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      background: "#fff",
                      borderBottom: "1.5px solid #d32f2f",
                    }}
                  >
                    <div
                      style={{
                        color: "#b30e2f",
                        fontWeight: 700,
                        fontSize: "17px",
                      }}
                    >
                      {hoveredConstituency.name}
                    </div>

                    <div
                      style={{
                        color: "#b30e2f",
                        fontSize: "12px",
                        fontWeight: 500,
                        textDecoration: "underline",
                      }}
                    >
                      {hoveredConstituency.province_name}
                    </div>
                  </div>

                  {/* Candidates */}
                  {hoveredConstituency.candidates
                    ?.map((candidate) => ({
                      ...candidate,
                      ...candidateMap.get(candidate.slug),
                    }))
                    .sort((a, b) => b.votes - a.votes)
                    .slice(0, 3)
                    .map((candidate, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "6px 10px",
                          borderBottom: "1px solid #f1f5f9",
                          background: idx === 0 ? "#f8fafc" : "#fff",
                          borderLeft:
                            idx === 0
                              ? "3px solid #43a047"
                              : "3px solid transparent",
                        }}
                      >
                        {/* Candidate Image */}
                        <img
                          src={candidate.image || "/placeholder-user.jpg"}
                          alt={candidate.name}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: "8px",
                            border:
                              idx === 0
                                ? "1.5px solid #43a047"
                                : "1px solid #cbd5e1",
                          }}
                        />

                        {/* Candidate Details */}
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: 700,
                              color: "#1e293b",
                              lineHeight: 1.2,
                            }}
                          >
                            {candidate.name}
                          </div>

                          <div
                            style={{
                              fontSize: "11px",
                              color: "#64748b",
                              marginTop: "2px",
                            }}
                          >
                            {candidate.party}
                          </div>
                        </div>

                        {/* Votes */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            textAlign: "right",
                            minWidth: "75px",
                            justifyContent: "flex-end",
                          }}
                        >
                          <div
                            style={{
                              color: idx === 0 ? "#43a047" : "#334155",
                              fontWeight: 700,
                              fontSize: "16px",
                            }}
                          >
                            {toNepaliNumber(candidate.votes)}
                          </div>

                          {idx === 0 && (
                            <div
                              style={{
                                color: "#43a047",
                                display: "flex",
                                alignItems: "center",
                                paddingLeft: "3px",
                              }}
                            >
                              <BadgeCheck size={14} />
                            </div>
                          )}
                        </div>

                        {/* Party Symbol */}
                        <div
                          style={{
                            marginLeft: "6px",
                            width: "22px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={candidate.partyLogo}
                            alt={candidate.party}
                            style={{
                              width: "18px",
                              height: "18px",
                              objectFit: "contain",
                            }}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </section>

          {/* Party Results Section */}
          <section className="section section-lead-table">
            <div className="elc-container">
              <div className="heading-title-wrap flex flex-between flex-wrap flex-middle">
                <h3 className="heading-title">प्रतिनिधिसभा परिणाम</h3>
                <Link
                  className="btn"
                  to="/result"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  विस्तृत
                </Link>
              </div>
              <div className="dn-grid dn-grid-small">
                {parties.map((party) => (
                  <div key={party.slug} className="col2 parties-card is-border">
                    <Link
                      to={`/party/${party.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={party.image} alt={party.name} />
                      <span className="title">{party.name}</span>
                    </Link>
                    <table>
                      <thead>
                        <tr>
                          <th>प्रत्यक्ष</th>
                          <th>समानुपातिक सिट</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <Link
                              to={`/party/${party.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {party.direct}
                            </Link>
                          </td>
                          <td>{party.proportional}</td>
                        </tr>
                      </tbody>
                    </table>
                    <span
                      style={{ backgroundColor: party.color }}
                      className="total-seat"
                    >
                      कुल सिट: <strong>{party.total}</strong>
                    </span>
                    <p>
                      सामानुपातिक मत:
                      <span className="vote-samanupatik">{party.votes}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <ProvinceResultsSection />
          <ProportionalResultsSection />
          <HotSeatsPreviewSection />
          <PopularCandidatesPreviewSection />
          <AllCandidatesPreviewSection />
        </div>
      </MainLayout>
    </div>
  );
}
