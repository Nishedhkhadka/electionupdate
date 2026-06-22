import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NepalMap from "../components/map/map";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [hoveredConstituency, setHoveredConstituency] = useState(null);
  const [constituenciesData, setConstituenciesData] = useState([]);

  // Load constituency data on mount
  useEffect(() => {
    fetch("/data/constituency.json")
      .then(res => res.json())
      .then(data => setConstituenciesData(data))
      .catch(err => console.error("Error loading constituency data:", err));
  }, []);

  const provinces = [
    { id: 1, name: "कोशी प्रदेश" },
    { id: 2, name: "मधेस प्रदेश" },
    { id: 3, name: "बागमती प्रदेश" },
    { id: 4, name: "गण्डकी प्रदेश" },
    { id: 5, name: "लुम्बिनी प्रदेश" },
    { id: 6, name: "कर्णाली प्रदेश" },
    { id: 7, name: "सुदूरपश्चिम प्रदेश" },
  ];

  const parties = [
    {
      id: "rsp",
      name: "राष्ट्रिय स्वतन्त्र पार्टी",
      image: "/assets/images/rsp_AiC1qh2xlI.jpg",
      direct: 125,
      proportional: 57,
      total: 182,
      votes: "51,83,493",
      color: "#07a4f2",
    },
    {
      id: "congress",
      name: "नेपाली कांग्रेस",
      image: "/assets/images/congress-logo_zVeY3un3Hj.jpg",
      direct: 18,
      proportional: 20,
      total: 38,
      votes: "17,59,172",
      color: "#2e7a05",
    },
    {
      id: "uml",
      name: "नेकपा (एमाले)",
      image: "/assets/images/uml-1_zfT0bMAJFO.jpg",
      direct: 9,
      proportional: 16,
      total: 25,
      votes: "14,55,885",
      color: "#910808",
    },
    {
      id: "ncp",
      name: "नेपाली कम्युनिष्ट पार्टी",
      image: "/assets/images/nepali-communist_uVwmNizOSk.jpg",
      direct: 8,
      proportional: 9,
      total: 17,
      votes: "8,11,577",
      color: "#f50f0f",
    },
    {
      id: "shram",
      name: "श्रम संस्कृति पार्टी",
      image: "/assets/images/shram-sanskriti-party_jrxdNsjzjb.jpg",
      direct: 3,
      proportional: 4,
      total: 7,
      votes: "3,85,902",
      color: "#d54b10",
    },
    {
      id: "rpp",
      name: "राष्ट्रिय प्रजातन्त्र पार्टी",
      image: "/assets/images/raprapa_RPVSZDsBPg.jpg",
      direct: 1,
      proportional: 4,
      total: 5,
      votes: "3,30,684",
      color: "#f0d105",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle search submission
  };

  return (
    <div className="home-page">
      {/* Candidate Search Form */}
      <div className="candidate-search-form" data-search-url="search.json">
        <div className="search-overlay"></div>
        <div className="flex">
          <div className="elc-container">
            <div className="form-label">
              उम्मेदवार, दल वा निर्वाचन क्षेत्र खोज्नुहोस्
              <button className="trigger-close">
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
                placeholder="कम्तिमा ३ अक्षर टाइप गर्नुहोस्..."
              />
              <div className="form-autocomplete">
                <span className="counter search-counter">
                  कम्तिमा ३ अक्षर टाइप गर्नुहोस्...
                </span>
                <div className="search-result-list"></div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Header */}
       <header>
        <div className="header-section">
          <div className="elc-container">
            <div className="header-holder flex flex-middle flex-wrap flex-between">
              <div className="header-logo">
                {/* <Link to="/" className="logo">
                  <img
                    src="/assets/images/ratopati-logo_zD9OASMMFx.png"
                    alt="Logo"
                  />
                </Link> */}
              </div>
              <div className="header-right">
                <img
                  src="/assets/images/election-2082_UbmQ0ktDVN.png"
                  alt="प्रतिनिधि सभा निर्वाचन २०८२"
                />
              </div>
              <span className="btn-search fa fa-search btn-trigger"></span>
              <a href="javascript:void(0);" className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="navigation">
        <div className="elc-container">
          <div className="menu-container">
            <ul>
              <li>
                <Link to="/">होम पेज</Link>
              </li>
              <li>
                <Link to="/candidates">उम्मेदवारहरु</Link>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  निर्वाचन <ChevronDown size={16} />
                </a>
                <ul>
                  <li>
                    <Link to="/province/koshi">कोशी प्रदेश</Link>
                  </li>
                  <li>
                    <Link to="/province/madhesh">मधेस प्रदेश</Link>
                  </li>
                  <li>
                    <Link to="/province/bagmati">बागमती प्रदेश</Link>
                  </li>
                  <li>
                    <Link to="/province/gandaki">गण्डकी प्रदेश</Link>
                  </li>
                  <li>
                    <Link to="/province/lumbini">लुम्बिनी प्रदेश</Link>
                  </li>
                  <li>
                    <Link to="/province/karnali">कर्णाली प्रदेश</Link>
                  </li>
                  <li>
                    <Link to="/province/sudurpaschim">सुदूरपश्चिम प्रदेश</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/parties">राजनीतिक दल</Link>
              </li>
              <li>
                <Link to="/hot-seats">हट सिटहरु</Link>
              </li>
              <li>
                <Link to="/vote-difference">मतान्तर</Link>
              </li>
              <li>
                <Link to="/popular-candidates">चर्चित उम्मेदवारहरु</Link>
              </li>
              <li>
                <Link to="/manifesto">घोषणा पत्र</Link>
              </li>
            </ul>
            <div className="nav-right">
              <span className="btn-search fa fa-search btn-trigger"></span>
              <a
                className="button"
                href="https://www.ratopati.com/"
                target="_blank"
              >
                 होमपेज
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="black-overlay"></div>

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
                onChange={(e) => setSelectedProvince(e.target.value)}
              >
                <option value="">प्रदेश</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
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
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">जिल्ला</option>
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
              </select>
            </div>

            <div className="select-box">
              <input className="btn-submit" type="submit" value="खोज्‍नुहोस्" />
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
          <div className="elc-container flex" style={{ position: "relative" }}>
            <div className="mapcontainer" id="constituency-map" style={{ flex: 1 }}>
              <div className="spinner-wrapper flex flex-middle flex-center">
                <NepalMap 
                  onConstituencyHover={setHoveredConstituency}
                  constituenciesData={constituenciesData}
                />
              </div>
            </div>
            
            {/* Hovered Constituency Candidates Card */}
            {hoveredConstituency && (
              <div className="constituency-hover-card" style={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#fff",
                border: "none",
                borderLeft: "5px solid #4caf50",
                borderRadius: "8px",
                padding: "0",
                width: "340px",
                maxHeight: "500px",
                overflowY: "auto",
                boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                zIndex: 100,
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              }}>
                {/* Header */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 20px",
                  backgroundColor: "#f5f5f5",
                  borderBottom: "2px solid #e91e63",
                }}>
                  <h3 style={{
                    margin: "0",
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#e91e63",
                  }}>
                    {hoveredConstituency.name}
                  </h3>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#e91e63",
                    textAlign: "right"
                  }}>
                    {hoveredConstituency.province_name}
                  </div>
                </div>

                {/* Top 3 Candidates */}
                <div style={{ padding: "0" }}>
                  {hoveredConstituency.candidates && hoveredConstituency.candidates.length > 0 ? (
                    hoveredConstituency.candidates
                      .sort((a, b) => b.votes - a.votes)
                      .slice(0, 3)
                      .map((candidate, idx) => (
                      <div key={idx} style={{
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "14px 16px",
                        marginBottom: "0",
                        backgroundColor: candidate.is_winner ? "#fffacd" : "#fff",
                        borderBottom: "1px solid #f0f0f0",
                        transition: "background-color 0.2s"
                      }}>
                        {/* Profile Image */}
                        <div style={{
                          width: "56px",
                          height: "56px",
                          minWidth: "56px",
                          marginRight: "14px",
                          borderRadius: "50%",
                          backgroundColor: "#e8e8e8",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "26px",
                          fontWeight: "bold",
                          color: "#999",
                          border: "2px solid #e0e0e0"
                        }}>
                          👤
                        </div>

                        {/* Candidate Info */}
                        <div style={{ flex: 1, minWidth: "0", marginTop: "2px" }}>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            marginBottom: "5px"
                          }}>
                            <div style={{
                              fontSize: "14px",
                              fontWeight: candidate.is_winner ? "700" : "600",
                              color: candidate.is_winner ? "#1a1a1a" : "#333",
                              wordBreak: "break-word",
                              lineHeight: "1.3"
                            }}>
                              {candidate.name}
                            </div>
                            {candidate.is_winner && (
                              <span style={{ fontSize: "18px", marginLeft: "2px" }}>⭐</span>
                            )}
                          </div>
                          <div style={{
                            fontSize: "12px",
                            color: "#888",
                            wordBreak: "break-word",
                            lineHeight: "1.3"
                          }}>
                            {candidate.party_name || "राजनीतिक दल"}
                          </div>
                        </div>

                        {/* Vote Count and Indicator */}
                        <div style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          marginLeft: "12px",
                          minWidth: "70px",
                          textAlign: "right",
                          justifyContent: "flex-start"
                        }}>
                          <div style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            color: candidate.is_winner ? "#4caf50" : "#e91e63",
                            marginBottom: "3px",
                            lineHeight: "1"
                          }}>
                            {candidate.votes.toLocaleString()}
                          </div>
                          <div style={{
                            fontSize: "14px",
                            color: candidate.is_winner ? "#4caf50" : "#e91e63",
                            fontWeight: "bold"
                          }}>
                            {candidate.is_winner ? "✓" : "●"}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{
                      padding: "20px",
                      textAlign: "center",
                      fontSize: "12px",
                      color: "#999"
                    }}>
                      कोनो उम्मेदवार उपलब्ध छैन
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Party Results Section */}
        <section className="section section-lead-table">
          <div className="elc-container">
            <div className="heading-title-wrap flex flex-between flex-wrap flex-middle">
              <h3 className="heading-title">प्रतिनिधिसभा परिणाम</h3>
              <a className="btn" href="/result">
                विस्तृत
              </a>
            </div>
            <div className="dn-grid dn-grid-small">
              {parties.map((party) => (
                <div key={party.id} className="col2 parties-card is-border">
                  <a href={`/party/${party.id}`}>
                    <img src={party.image} alt={party.name} />
                    <span className="title">{party.name}</span>
                  </a>
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
                          <a href={`/winners?party_id=${party.id}`}>
                            {party.direct}
                          </a>
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

        {/* Province Results Section */}
        <section className="section pradesh-result">
          <div className="elc-container">
            <div className="heading-title-wrap flex flex-between flex-wrap flex-middle">
              <h3 className="heading-title">प्रदेशअनुसार परिणाम</h3>
            </div>
            <div className="candidate--lists dn-grid dn-grid-small">
              {provinces.map((province) => (
                <div key={province.id} className="election-card col3">
                  <div className="candidate-card-header">
                    <h3>
                      <a href={`/province/${province.id}`}>{province.name}</a>
                    </h3>
                  </div>
                  <div className="mx-height">
                    <a
                      href={`/province/${province.id}`}
                      className="candidate-row pradesh-row"
                    >
                      <div className="candidate-media">
                        <img
                          className="candidate-photo"
                          src="/assets/images/rsp_AiC1qh2xlI.jpg"
                          alt="राष्ट्रिय स्वतन्त्र पार्टी"
                        />
                        <div>
                          <h3 className="title">राष्ट्रिय स्वतन्त्र पार्टी</h3>
                          <div className="progress-bar">
                            <div
                              style={{
                                background: "#07a4f2",
                                width: "45%",
                              }}
                              className="progress-fill"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="candidate-detail">
                        <div className="votes">—</div>
                      </div>
                    </a>
                  </div>
                  <div className="load-more">
                    <a className="more" href={`/province/${province.id}`}>
                      विस्तृत विवरण
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
