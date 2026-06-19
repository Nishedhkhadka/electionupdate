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

function SiteLayout({ title, description, children, breadcrumbRight, headerRight }) {
  return (
    <>
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
              <button type="button" className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

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
                  निर्वाचन
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
                rel="noreferrer noopener"
              >
                 होमपेज
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="black-overlay"></div>
      <div className="full-banner-adv">
        <div
          className="elc-container el-placeholder"
          data-position="election-below-navbar"
        ></div>
      </div>

      <div className="elec-content-wrap">
        <section className="section section-candidates section-bottom">
          <div className="elc-container">
            <div className="backward flex flex-wrap flex-between flex-middle">
              <div className="breadcrumb">
                <Link to="/">प्रतिनिधि सभा निर्वाचन २०८२</Link>
                <span className="sep">/</span>
                <span>{title}</span>
              </div>
              {breadcrumbRight}
            </div>
            <div className="page-header flex flex-between flex-middle flex-wrap">
              <div>
                <h3 className="page-title">{title}</h3>
                {description ? <p>{description}</p> : null}
              </div>
              {headerRight}
            </div>
            {children}
          </div>
        </section>
      </div>
    </>
  );
}

function normalizeSlug(slug = "") {
  return decodeURIComponent(slug)
    .replace(/\.html$/i, "")
    .replace(/-/g, " ");
}

function toNepaliNumber(value) {
  const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return String(value ?? 0).replace(/\d/g, (digit) => nepaliDigits[Number(digit)]);
}

function provinceRouteSlug(provinceSlug = "") {
  return provinceSlug.replace(/-province$/, "");
}

function districtsForProvince(provinceSlug) {
  const provinceEntry = provinceData.find((p) => p.slug === provinceSlug);
  if (!provinceEntry?.districts) {
    return [];
  }
  return provinceEntry.districts.map((district) => {
    const full = districtData.find((d) => d.slug === district.slug);
    return { slug: district.slug, name: full?.name || district.slug };
  });
}

function ConstituencyElectionCard({ constituency, candidatesBySlug, partyByName }) {
  const sortedCandidates = [...constituency.candidates].sort(
    (a, b) => (b.votes || 0) - (a.votes || 0),
  );
  const shareUrl = `${window.location.origin}/constituency/${constituency.slug}`;
  const shareText = encodeURIComponent(
    `${constituency.name} को ताजा मत परिणाम`,
  );

  return (
    <div className="election-card col4">
      <div className="candidate-card-header">
        <h3>
          <Link to={`/constituency/${constituency.slug}`}>
            {constituency.name}
          </Link>
        </h3>
        <Link to={`/district/${constituency.district_slug}`}>
          <span className="small">{constituency.district_name}</span>
        </Link>
      </div>
      <div className="mx-height">
        {sortedCandidates.map((candidate) => {
          const info = candidatesBySlug.get(candidate.slug);
          const party = partyByName.get(info?.party);
          const partyLogo = info?.partyLogo || party?.logo;

          return (
            <div
              key={candidate.slug}
              className={`candidate-row${candidate.is_winner ? " candidate-win" : ""}`}
            >
              <div className="candidate-media">
                <Link to={`/candidate/${candidate.slug}`}>
                  <img
                    className="candidate-photo"
                    src={info?.image || "/assets/images/placeholder.png"}
                    alt={candidate.name}
                  />
                </Link>
                <div>
                  <h3 className="title">
                    <Link to={`/candidate/${candidate.slug}`}>
                      {candidate.name}
                    </Link>
                  </h3>
                  {info?.party || ""}
                </div>
              </div>
              <div className="candidate-detail">
                <div className="votes">
                  {toNepaliNumber(candidate.votes || 0)}
                  {candidate.is_winner ? (
                    <img src="/assets/img/win-tick.png" alt="win-tick" />
                  ) : null}
                </div>
                {party && partyLogo && partyLogo !== "#" ? (
                  <Link className="party" to={`/party/${party.slug}`}>
                    <img
                      className="party-flag"
                      src={partyLogo}
                      alt={info?.party}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                    />
                  </Link>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      <div className="load-more">
        <Link className="more" to={`/constituency/${constituency.slug}`}>
          विस्तृत विवरण
        </Link>
        <div className="share-links">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&title=${shareText}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src="https://www.ratopati.com/build/img/facebook.svg"
              alt="facebook"
            />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}&hashtags=Election2082,Ratopati,ElectionUpdate`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src="https://www.ratopati.com/build/img/twitter-x.svg"
              alt="twitter"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Candidates() {
  const [provinceFilter, setProvinceFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [appliedProvince, setAppliedProvince] = useState("");
  const [appliedDistrict, setAppliedDistrict] = useState("");

  const candidatesBySlug = useMemo(
    () => new Map(candidatesData.map((c) => [c.slug, c])),
    [],
  );

  const partyByName = useMemo(
    () => new Map(partyData.map((p) => [p.name, p])),
    [],
  );

  const availableDistricts = useMemo(
    () => districtsForProvince(provinceFilter),
    [provinceFilter],
  );

  const appliedProvinceDistrictSlugs = useMemo(() => {
    if (!appliedProvince) {
      return null;
    }
    const provinceEntry = provinceData.find((p) => p.slug === appliedProvince);
    return new Set(provinceEntry?.districts?.map((d) => d.slug) || []);
  }, [appliedProvince]);

  const filteredConstituencies = useMemo(() => {
    return constituencyData.filter((constituency) => {
      if (
        appliedProvinceDistrictSlugs &&
        !appliedProvinceDistrictSlugs.has(constituency.district_slug)
      ) {
        return false;
      }
      if (appliedDistrict && constituency.district_slug !== appliedDistrict) {
        return false;
      }
      return true;
    });
  }, [appliedProvinceDistrictSlugs, appliedDistrict]);

  const handleProvinceChange = (value) => {
    setProvinceFilter(value);
    setDistrictFilter("");
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    setAppliedProvince(provinceFilter);
    setAppliedDistrict(districtFilter);
  };

  const filterBar = (
    <div className="heading-title-wrap flex flex-between flex-wrap flex-middle">
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
  );

  return (
    <SiteLayout title="उम्मेदवारहरु" headerRight={filterBar}>
      <div className="local__election">
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
    </SiteLayout>
  );
}

export function HotSeats() {
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
    ].filter(Boolean).sort();
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
    <SiteLayout title="हट सिटहरु" headerRight={filterBar}>
      <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {filteredHotSeats.length > 0 ? (
          filteredHotSeats.map((hotSeat) => (
            <div key={hotSeat.constituency}>
              <div
                style={{
                  backgroundColor: "#f3e8eb",
                  borderBottom: "3px solid #bf1e2e",
                  padding: "10px 15px",
                  marginBottom: "15px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#bf1e2e",
                  }}
                >
                  {hotSeat.constituency}
                </h3>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: "15px",
                  overflowX: "auto",
                  paddingBottom: "8px",
                }}
              >
                {hotSeat.candidates.map((candidate, idx) => {
                  // Look up votes from candidatesData by matching name
                  const candidateData = candidatesData.find((c) => c.name === candidate.name);
                  const votes = candidateData?.votes || candidate.votes || 0;
                  // Fix image URL if it has the malformed ../npcdn prefix
                  const fixedImageUrl = candidate.image?.replace(/^\.\.\/npcdn\.ratopati\.com/, "https://npcdn.ratopati.com") || "/assets/images/placeholder.png";

                  return (
                    <div
                      key={idx}
                      style={{
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "90px",
                          height: "90px",
                          margin: "0 auto 10px",
                          borderRadius: "50%",
                          background: "linear-gradient(180deg, #ffeef0, #f8dfe0)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                          border: "1px solid rgba(0,0,0,0.04)",
                          position: "relative",
                        }}
                      >
                        <img
                          src={fixedImageUrl}
                          alt={candidate.name}
                          style={{
                            width: "76px",
                            height: "76px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "4px solid #fff",
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/images/placeholder.png";
                          }}
                        />
                        {candidate.winner && (
                          <img
                            src="/assets/img/win-tick.png"
                            alt="winner"
                            style={{
                              position: "absolute",
                              bottom: "-2px",
                              right: "-2px",
                              width: "24px",
                              height: "24px",
                            }}
                          />
                        )}
                      </div>

                      <h4
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          margin: "6px 0",
                          color: "#333",
                        }}
                      >
                        {candidate.name}
                      </h4>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#666",
                          margin: "2px 0",
                        }}
                      >
                        {candidate.party}
                      </p>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "#2c9a6b",
                          marginTop: "6px",
                        }}
                      >
                        {toNepaliNumber(votes)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <p>कुनै हट सिट फेला परेन</p>
        )}
      </div>
    </SiteLayout>
  );
}

function getManifestoImage(manifestoId) {
  const imageMap = {
    "1": "/election/media/party-manifesto/pratibaddatapatra-pralo-pa_E1AqsXAJyr.jpg",
    "2": "/election/media/party-manifesto/congress-manifesto-082_vcRT3VJKFK.jpg",
    "3": "/election/media/party-manifesto/nepali-communist-manifesto_7Yi5M2ya8I.jpg",
    "4": "/election/media/party-manifesto/rsp-bachapatra_N3Q271hh8R.jpg",
    "5": "/election/media/party-manifesto/unp_election_menifesto_book_2082_LXbjETeuoP.jpg",
    "6": "/election/media/party-manifesto/uml-election-manifesto_ilAJhqpl3m.jpg",
    "7": "/election/media/party-manifesto/rpp_c9PJTTVU6z.jpg",
    "8": "/election/media/party-manifesto/nepal-majdur-kisan-party_07xDyXZ0vI.jpg",
    "9": "/election/media/party-manifesto/rastriya_janamorcha_manifesto_2082_CRDSjZ6jBd.jpg",
  };
  return imageMap[manifestoId] || "/assets/images/placeholder.png";
}

export function Manifesto() {
  return (
    <SiteLayout
      title="घोषणा पत्र"
      description="Read the major party manifestos and policy platforms in the 2082 election."
    >
      <div
        className="manifesto-grid"
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {manifestoData.map((manifesto) => (
          <div
            key={manifesto.id}
            className="manifesto-card"
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ position: "relative", overflow: "hidden" }}>
              <Link to={`/manifesto/${manifesto.id}`} style={{ display: "block" }}>
                <img
                  src={getManifestoImage(manifesto.id)}
                  alt={manifesto.party_name}
                  style={{
                    width: "100%",
                    height: "240px",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onError={(e) => {
                    e.target.src = "/assets/images/placeholder.png";
                  }}
                />
              </Link>
            </div>
            <div style={{ padding: "16px", textAlign: "center" }}>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "12px",
                  color: "#333",
                  minHeight: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {manifesto.party_name}
              </h3>
              <Link
                to={`/manifesto/${manifesto.id}`}
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  backgroundColor: "#bf1e2e",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                घोषणा पत्र हेर्नुहोस्
              </Link>
            </div>
          </div>
        ))}
      </div>
    </SiteLayout>
  );
}

export function ManifestoDetail() {
  const { id } = useParams();
  const cleanId = id?.replace(/\.html$/i, "");
  const manifesto = manifestoData.find((m) => m.id === cleanId);

  if (!manifesto) {
    return (
      <SiteLayout title="घोषणा पत्र फेला परेन">
        <p>दुःख है, यो घोषणा पत्र फेला परेन।</p>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout title={manifesto.party_name}>
      <div className="pdf-viewer" style={{ marginTop: "20px" }}>
        <iframe
          src={manifesto.pdf_url}
          style={{ width: "100%", height: "920px", border: "none" }}
          title={manifesto.party_name}
        ></iframe>
      </div>
    </SiteLayout>
  );
}

export function Parties() {
  const sortedParties = [...partyData].sort((a, b) => {
    const winsA = a.wins || 0;
    const winsB = b.wins || 0;
    if (winsA !== winsB) return winsB - winsA;
    const votesA = Number(a.proportional_votes?.replace(/[^0-9]/g, "") || 0);
    const votesB = Number(b.proportional_votes?.replace(/[^0-9]/g, "") || 0);
    return votesB - votesA;
  });

  return (
    <SiteLayout
      title="राजनीतिक दलहरु"
      description="Review participating political parties and their results in Nepal Election 2082."
    >
      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {sortedParties.map((party) => (
          <div
            key={party.slug}
            style={{
              background: "linear-gradient(180deg, rgba(255,239,239,0.85), #fff)",
              border: "1px solid rgba(191,30,46,0.15)",
              borderRadius: "18px",
              padding: "24px 20px",
              minHeight: "320px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  width: "86px",
                  height: "86px",
                  margin: "0 auto 18px",
                  borderRadius: "50%",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
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
                  style={{ maxWidth: "72px", maxHeight: "72px", objectFit: "contain" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/images/placeholder.png";
                  }}
                />
              </div>

              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: "700",
                    margin: "0 0 10px",
                    lineHeight: "1.3",
                    color: "#991d2b",
                  }}
                >
                  {party.name}
                </h3>
                <p style={{ margin: 0, fontSize: "13px", color: "#5d5d5d", lineHeight: "1.5" }}>
                  अध्यक्ष: {party.leader || "—"}
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "14px",
                    padding: "14px",
                    textAlign: "center",
                    border: "1px solid #f1e6e9",
                  }}
                >
                  <div style={{ fontSize: "14px", color: "#999" }}>सिट</div>
                  <div style={{ fontSize: "20px", fontWeight: "800", color: "#bf1e2e", marginTop: "6px" }}>
                    {party.wins || 0}
                  </div>
                </div>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "14px",
                    padding: "14px",
                    textAlign: "center",
                    border: "1px solid #f1e6e9",
                  }}
                >
                  <div style={{ fontSize: "14px", color: "#999" }}>सम्पूर्ण मत</div>
                  <div style={{ fontSize: "20px", fontWeight: "800", color: "#bf1e2e", marginTop: "6px" }}>
                    {party.proportional_votes || "०"}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Link
                to={`/party/${party.slug}`}
                style={{
                  display: "inline-block",
                  padding: "10px 18px",
                  backgroundColor: "#bf1e2e",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "999px",
                  fontWeight: "700",
                  fontSize: "13px",
                }}
              >
                विस्तृत जानकारी
              </Link>
            </div>
          </div>
        ))}
      </div>
    </SiteLayout>
  );
}

export function PopularCandidates() {
  // Select some candidates with high votes
  const popularCandidates = [...candidatesData]
    .sort((a, b) => (b.votes || 0) - (a.votes || 0))
    .slice(0, 15);

  return (
    <SiteLayout
      title="चर्चित उम्मेदवारहरु"
      description="See the most popular candidates from the 2082 election."
    >
      <div className="popular-grid" style={{ marginTop: "20px" }}>
        {popularCandidates.map((candidate) => (
          <div key={candidate.slug} className="popular-card">
            <div className="popular-card-inner">
              <div className="photo-wrap">
                <Link to={`/candidate/${candidate.slug}`}>
                  <div className="photo-circle">
                    <img
                      src={candidate.image || "/assets/images/placeholder.png"}
                      alt={candidate.name}
                      onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png"; }}
                    />
                  </div>
                </Link>
              </div>

              <div className="card-body">
                <h4 className="candidate-name">
                  <Link to={`/candidate/${candidate.slug}`}>{candidate.name}</Link>
                </h4>
                <div className="candidate-meta">{candidate.party}</div>
                <div className="constituency-pill">{candidate.constituency}</div>
              </div>

              <div className="card-footer">
                <div className="votes">{toNepaliNumber(candidate.votes || 0)}</div>
                {candidate.isWinner ? (
                  <img src="/assets/img/win-tick.png" alt="winner" className="winner-badge" style={{ width: "30px", height: "30px" }} />
                ) : candidate.partyLogo ? (
                  <img src={candidate.partyLogo} alt={candidate.party} className="party-badge" onError={(e)=>{e.target.style.display='none'}} />
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SiteLayout>
  );
}

export function Result() {
  return (
    <SiteLayout
      title="परिणाम"
      description="View election results for the Nepal Election 2082."
    >
      <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px", borderBottom: "2px solid #bf1e2e", paddingBottom: "10px" }}>
          प्रतिनिधिसभा परिणाम सारसंक्षेप
        </h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd", backgroundColor: "#f5f5f5" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>राजनीतिक दल</th>
              <th style={{ padding: "10px", textAlign: "center" }}>प्रत्यक्ष सिट</th>
              <th style={{ padding: "10px", textAlign: "center" }}>समानुपातिक सिट</th>
              <th style={{ padding: "10px", textAlign: "right" }}>कुल सिट</th>
            </tr>
          </thead>
          <tbody>
            {partyData.filter(p => p.wins > 0).map((party) => {
              // Map some mock proportional seats based on popular status
              let proportional = 0;
              if (party.slug === "rastriya-swatantra-party") proportional = 57;
              else if (party.slug === "nepali-congress") proportional = 20;
              else if (party.slug === "cpn-uml") proportional = 16;
              else if (party.slug === "nepali-communist-party") proportional = 9;
              else if (party.slug === "shram-samskriti-party") proportional = 4;
              else if (party.slug === "rastriya-prajatantra-party") proportional = 4;
              
              return (
                <tr key={party.slug} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}>
                    <Link to={`/party/${party.slug}`} style={{ color: "#0066cc", textDecoration: "none", fontWeight: "bold" }}>
                      {party.name}
                    </Link>
                  </td>
                  <td style={{ padding: "10px", textAlign: "center" }}>{party.wins}</td>
                  <td style={{ padding: "10px", textAlign: "center" }}>{proportional}</td>
                  <td style={{ padding: "10px", textAlign: "right", fontWeight: "bold" }}>{party.wins + proportional}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SiteLayout>
  );
}

export function Videos() {
  return (
    <SiteLayout
      title="निर्वाचन भिडियो"
      description="Watch election videos and voter coverage from the 2082 campaign."
    >
      <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", backgroundColor: "#fff" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>रातोपाटी निर्वाचन विशेष</h3>
          <p style={{ color: "#666" }}>निर्वाचन परिणाम र विश्लेषण भिडियो अपडेट यहाँ उपलब्ध हुनेछ।</p>
        </div>
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", backgroundColor: "#fff" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>उम्मेदवार अन्तर्वार्ता</h3>
          <p style={{ color: "#666" }}>विभिन्न निर्वाचन क्षेत्रका उम्मेदवारहरूसँग रातोपाटीको विशेष कुराकानी।</p>
        </div>
      </div>
    </SiteLayout>
  );
}

export function VoteDifference() {
  const [partyFilter, setPartyFilter] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");

  const voteItems = useMemo(() => {
    return voteDifferenceData.map((item) => {
      const match = constituencyData.find((c) => c.name === item.constituency);
      return {
        ...item,
        district: match?.district_name || "",
      };
    });
  }, []);

  const partyOptions = useMemo(
    () => [
      ...new Set(voteItems.flatMap((item) => item.candidates.map((candidate) => candidate.party))),
    ],
    [voteItems]
  );

  const provinceOptions = useMemo(
    () => [
      ...new Set(voteItems.map((item) => item.province).filter(Boolean)),
    ],
    [voteItems]
  );

  const districtOptions = useMemo(
    () => [
      ...new Set(voteItems.map((item) => item.district).filter(Boolean)),
    ],
    [voteItems]
  );

  const filteredItems = useMemo(() => {
    return voteItems.filter((item) => {
      const partyMatch =
        !partyFilter || item.candidates.some((candidate) => candidate.party === partyFilter);
      const provinceMatch = !provinceFilter || item.province === provinceFilter;
      const districtMatch = !districtFilter || item.district === districtFilter;
      return partyMatch && provinceMatch && districtMatch;
    });
  }, [partyFilter, provinceFilter, districtFilter, voteItems]);

  return (
    <SiteLayout
      title="मतान्तर"
      description="Track the vote difference across constituencies in the 2082 election."
    >
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <select
          value={partyFilter}
          onChange={(e) => setPartyFilter(e.target.value)}
          style={{
            minWidth: "160px",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            fontSize: "14px",
            background: "#fff",
          }}
        >
          <option value="">पार्टी</option>
          {partyOptions.map((party) => (
            <option key={party} value={party}>
              {party}
            </option>
          ))}
        </select>

        <select
          value={provinceFilter}
          onChange={(e) => setProvinceFilter(e.target.value)}
          style={{
            minWidth: "160px",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            fontSize: "14px",
            background: "#fff",
          }}
        >
          <option value="">प्रदेश</option>
          {provinceOptions.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>

        <select
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
          style={{
            minWidth: "160px",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            fontSize: "14px",
            background: "#fff",
          }}
        >
          <option value="">जिल्ला</option>
          {districtOptions.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setPartyFilter("");
            setProvinceFilter("");
            setDistrictFilter("");
          }}
          style={{
            padding: "10px 18px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#bf1e2e",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          खोज्नुहोस्
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.constituency}
              style={{
                background: "#fff",
                border: "1px solid #e6e6e6",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  padding: "18px 18px 14px",
                  borderBottom: "1px solid #f0f0f0",
                  background: "#fbfbfb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "#222",
                        marginBottom: "6px",
                      }}
                    >
                      {item.constituency}
                    </div>
                    <div style={{ fontSize: "13px", color: "#666" }}>
                      {item.province}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: "800",
                        color: "#2c9a6b",
                      }}
                    >
                      {item.voteDifference}
                    </div>
                    <div style={{ fontSize: "12px", color: "#999" }}>
                      {item.voteDifferencePercent}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: "18px", display: "grid", gap: "12px" }}>
                {item.candidates.map((candidate, index) => {
                  const fixedImageUrl =
                    candidate.image?.replace(/^\.\.\/npcdn\.ratopati\.com/, "https://npcdn.ratopati.com") ||
                    "/assets/images/placeholder.png";
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "12px",
                        borderRadius: "12px",
                        background: candidate.winner ? "#edf9f0" : "#fff",
                        border: candidate.winner ? "1px solid #cdecd4" : "1px solid #f0f0f0",
                      }}
                    >
                      <div
                        style={{
                          width: "52px",
                          height: "52px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          background: "#f3f3f3",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={fixedImageUrl}
                          alt={candidate.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/images/placeholder.png";
                          }}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#212121",
                          }}
                        >
                          {candidate.name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>
                          {candidate.party}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            color: "#2c9a6b",
                          }}
                        >
                          {candidate.votes}
                        </div>
                        <div style={{ fontSize: "11px", color: "#888" }}>मत</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: "12px",
              padding: "40px 20px",
              textAlign: "center",
              color: "#666",
            }}
          >
            कुनै परिणाम फेला परेन। फिल्टर हटाएर पुन: प्रयास गर्नुहोस्।
          </div>
        )}
      </div>
    </SiteLayout>
  );
}

export function Province() {
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
      <SiteLayout title="प्रदेश फेला परेन">
        <p>दुःख है, यो प्रदेश फेला परेन।</p>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout title={province.name}>
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
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {province.districts?.map((d) => {
                  const districtInfo = districtData.find((item) => item.slug === d.slug);
                  return (
                    <Link
                      key={d.slug}
                      to={`/district/${d.slug}`}
                      style={{
                        display: "inline-block",
                        padding: "8px 16px",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "20px",
                        color: "#bf1e2e",
                        textDecoration: "none",
                        fontWeight: "bold",
                        border: "1px solid #ddd",
                      }}
                    >
                      {districtInfo?.name || d.slug}
                    </Link>
                  );
                })}
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
    </SiteLayout>
  );
}

export function District() {
  const { slug } = useParams();
  const cleanSlug = slug?.replace(/\.html$/i, "");
  
  const district = districtData.find((d) => d.slug === cleanSlug);

  if (!district) {
    return (
      <SiteLayout title="जिल्ला फेला परेन">
        <p>दुःख है, यो जिल्ला फेला परेन।</p>
      </SiteLayout>
    );
  }

  const districtConstituencies = constituencyData.filter(
    (c) => c.district_slug === district.slug
  );

  return (
    <SiteLayout title={district.name}>
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
          {districtConstituencies.map((constituency) => {
            const winner = constituency.candidates.find(c => c.is_winner) || constituency.candidates[0];
            const candidateInfo = candidatesData.find(c => c.slug === winner?.slug);
            
            return (
              <div 
                key={constituency.slug} 
                className="election-card col4" 
                style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", backgroundColor: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div className="candidate-card-header" style={{ marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                  <h3 style={{ margin: 0 }}>
                    <Link to={`/constituency/${constituency.slug}`} style={{ color: "#bf1e2e", fontWeight: "bold", textDecoration: "none", fontSize: "18px" }}>
                      {constituency.name}
                    </Link>
                  </h3>
                </div>
                {winner && (
                  <div className="candidate-row candidate-win" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="candidate-media" style={{ display: "flex", alignItems: "center" }}>
                      <Link to={`/candidate/${winner.slug}`}>
                        <img 
                          className="candidate-photo" 
                          src={candidateInfo?.image || "/assets/images/placeholder.png"} 
                          alt={winner.name} 
                          style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px", objectFit: "cover", border: "1px solid #ccc" }}
                        />
                      </Link>
                      <div>
                        <h3 className="title" style={{ fontSize: "14px", fontWeight: "bold", margin: 0 }}>
                          <Link to={`/candidate/${winner.slug}`} style={{ color: "#333", textDecoration: "none" }}>
                            {winner.name}
                          </Link>
                        </h3>
                        <span style={{ fontSize: "12px", color: "#777" }}>{candidateInfo?.party || ""}</span>
                      </div>
                    </div>
                    <div className="candidate-detail" style={{ textAlign: "right" }}>
                      <div className="votes" style={{ fontWeight: "bold", color: "#bf1e2e", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        {winner.votes?.toLocaleString() || "०"}
                        <img src="/assets/img/win-tick.png" alt="win-tick" style={{ width: "16px", marginLeft: "5px" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SiteLayout>
  );
}

export function Constituency() {
  const { slug } = useParams();
  const cleanSlug = slug?.replace(/\.html$/i, "");
  
  const constituency = constituencyData.find((c) => c.slug === cleanSlug);

  if (!constituency) {
    return (
      <SiteLayout title="निर्वाचन क्षेत्र फेला परेन">
        <p>दुःख है, यो निर्वाचन क्षेत्र फेला परेन।</p>
      </SiteLayout>
    );
  }

  // Sort candidates by votes descending
  const sortedCandidates = [...constituency.candidates].sort(
    (a, b) => (b.votes || 0) - (a.votes || 0)
  );

  return (
    <SiteLayout title={constituency.name}>
      <div className="district-detail" style={{ marginBottom: "30px" }}>
        <div className="dn-grid">
          <div className="col8">
            {constituency.map_image && (
              <div className="map-wrapper" style={{ marginBottom: "20px", textAlign: "center" }}>
                <img 
                  src={constituency.map_image} 
                  alt={constituency.name} 
                  style={{ maxWidth: "100%", height: "auto", borderRadius: "8px", border: "1px solid #ddd" }}
                />
              </div>
            )}
            <div style={{ fontSize: "14px", color: "#666" }}>
              <strong>जिल्ला:</strong> <Link to={`/district/${constituency.district_slug}`} style={{ color: "#bf1e2e", textDecoration: "none", fontWeight: "bold" }}>{constituency.district_name}</Link>
              <span style={{ margin: "0 10px" }}>|</span>
              <strong>प्रदेश:</strong> <Link to={`/province/${constituency.province_slug}`} style={{ color: "#bf1e2e", textDecoration: "none", fontWeight: "bold" }}>{constituency.province_name}</Link>
            </div>
          </div>
          
          <div className="col4">
            <ul className="stats">
              <li style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <img src="/assets/img/vote.png" alt="" style={{ maxWidth: "40px", marginRight: "15px" }} />
                <h5>
                  {constituency.voters?.total?.toLocaleString() || "०"}
                  <span style={{ fontSize: "12px", color: "#666", display: "block" }}>जम्मा मतदाता</span>
                </h5>
              </li>
              <li style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <img src="/assets/img/man.png" alt="" style={{ maxWidth: "40px", marginRight: "15px" }} />
                <h5>
                  {constituency.voters?.male?.toLocaleString() || "०"}
                  <span style={{ fontSize: "12px", color: "#666", display: "block" }}>पुरुष मतदाता</span>
                </h5>
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <img src="/assets/img/woman.png" alt="" style={{ maxWidth: "40px", marginRight: "15px" }} />
                <h5>
                  {constituency.voters?.female?.toLocaleString() || "०"}
                  <span style={{ fontSize: "12px", color: "#666", display: "block" }}>महिला मतदाता</span>
                </h5>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="all-parties-candidates section" style={{ marginTop: "30px" }}>
        <h3 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px", borderBottom: "2px solid #bf1e2e", paddingBottom: "10px" }}>
          उम्मेदवारहरु
        </h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {sortedCandidates.map((candidate) => {
            const candidateInfo = candidatesData.find((c) => c.slug === candidate.slug);
            const partyInfo = partyData.find((p) => p.name === candidateInfo?.party);
            
            return (
              <div 
                key={candidate.slug} 
                className={`party-container ${candidate.is_winner ? "candidate-win" : ""}`}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  backgroundColor: candidate.is_winner ? "#fff8f8" : "#fff",
                  borderColor: candidate.is_winner ? "#bf1e2e" : "#ddd",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div className="party-logo" style={{ display: "flex", alignItems: "center" }}>
                  <Link to={`/candidate/${candidate.slug}`}>
                    <img 
                      className="candidate-photo" 
                      src={candidateInfo?.image || "/assets/images/placeholder.png"} 
                      alt={candidate.name} 
                      style={{ width: "60px", height: "60px", borderRadius: "50%", marginRight: "15px", objectFit: "cover", border: "1px solid #ccc" }}
                    />
                  </Link>
                  <div>
                    <h3 className="party-name" style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
                      <Link to={`/candidate/${candidate.slug}`} style={{ color: "#333", textDecoration: "none" }}>
                        {candidate.name}
                      </Link>
                    </h3>
                    {partyInfo ? (
                      <Link to={`/party/${partyInfo.slug}`} style={{ fontSize: "13px", color: "#bf1e2e", textDecoration: "none", fontWeight: "bold" }}>
                        {candidateInfo?.party}
                      </Link>
                    ) : (
                      <span style={{ fontSize: "13px", color: "#666" }}>{candidateInfo?.party || "स्वतन्त्र"}</span>
                    )}
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <div className="votes" style={{ fontWeight: "bold", fontSize: "18px", color: "#bf1e2e", display: "flex", alignItems: "center" }}>
                    {candidate.votes?.toLocaleString() || "०"}
                    {candidate.is_winner && (
                      <img src="/assets/img/win-tick.png" alt="win-tick" style={{ width: "20px", marginLeft: "10px" }} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SiteLayout>
  );
}

export function Party() {
  const { slug } = useParams();
  const cleanSlug = slug?.replace(/\.html$/i, "");
  
  const party = partyData.find((p) => p.slug === cleanSlug);

  if (!party) {
    return (
      <SiteLayout title="राजनीतिक दल फेला परेन">
        <p>दुःख है, यो राजनीतिक दल फेला परेन।</p>
      </SiteLayout>
    );
  }

  // Filter candidates belonging to this party
  const partyCandidates = candidatesData.filter(
    (c) => c.party === party.name
  );
  
  // Sort them by votes descending
  const sortedPartyCandidates = [...partyCandidates].sort(
    (a, b) => (b.votes || 0) - (a.votes || 0)
  );

  return (
    <SiteLayout title={party.name}>
      <div className="candidate-detail-wrapper" style={{ marginBottom: "30px" }}>
        <div className="dn-grid">
          <div className="col8">
            <div className="candidate-bio" style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              {party.logo && party.logo !== "#" ? (
                 <img src={party.logo} alt={party.name} onError={(e) => { e.target.onerror=null; e.target.src="/assets/images/placeholder.png"; }} style={{ maxWidth: "120px", height: "auto", borderRadius: "8px", border: "1px solid #ddd" }} />
               ) : (
                 <img src="/assets/images/placeholder.png" alt={party.name} style={{ maxWidth: "120px", height: "auto", borderRadius: "8px", border: "1px solid #ddd" }} />
               )}
              <div className="page-header" style={{ padding: 0, border: "none" }}>
                <h3 className="page-title" style={{ margin: "0 0 10px 0", fontSize: "24px" }}>
                  {party.name}
                </h3>
                {party.leader && (
                  <span style={{ fontSize: "16px", color: "#666" }}>
                    <strong>नेतृत्व/अध्यक्ष:</strong> {party.leader}
                  </span>
                )}
              </div>
            </div>
            
            <div className="contentarea">
              <p style={{ fontSize: "16px", lineHeight: "1.6" }}>{party.description}</p>
            </div>
          </div>
          
          <div className="col4">
            <div className="stats-wrap" style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", backgroundColor: "#fff" }}>
              <h3 className="heading-title" style={{ fontSize: "18px", fontWeight: "bold", borderBottom: "2px solid #bf1e2e", paddingBottom: "10px", marginBottom: "15px" }}>
                निर्वाचन परिणाम सार
              </h3>
              <div className="result-grid" style={{ display: "flex", gap: "20px", justifyContent: "space-around" }}>
                <div className="result-vote" style={{ textAlign: "center" }}>
                  <h5 style={{ fontSize: "24px", color: "#bf1e2e", margin: 0, fontWeight: "bold" }}>
                    {party.wins || "०"}
                  </h5>
                  <span style={{ fontSize: "12px", color: "#666" }}>जित सिट</span>
                </div>
                {party.proportional_votes && (
                  <div className="result-vote" style={{ textAlign: "center" }}>
                    <h5 style={{ fontSize: "20px", color: "#bf1e2e", margin: 0, fontWeight: "bold" }}>
                      {party.proportional_votes}
                    </h5>
                    <span style={{ fontSize: "12px", color: "#666" }}>समानुपातिक मत</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="all-parties-candidates section" style={{ marginTop: "30px" }}>
        <h3 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px", borderBottom: "2px solid #bf1e2e", paddingBottom: "10px" }}>
          यस दलका उम्मेदवारहरु ({partyCandidates.length})
        </h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {sortedPartyCandidates.map((candidate) => (
            <div 
              key={candidate.slug} 
              className={`party-container ${candidate.isWinner ? "candidate-win" : ""}`}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                backgroundColor: candidate.isWinner ? "#fff8f8" : "#fff",
                borderColor: candidate.isWinner ? "#bf1e2e" : "#ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div className="party-logo" style={{ display: "flex", alignItems: "center" }}>
                <Link to={`/candidate/${candidate.slug}`}>
                  <img 
                    className="candidate-photo" 
                    src={candidate.image || "/assets/images/placeholder.png"} 
                    alt={candidate.name} 
                    style={{ width: "60px", height: "60px", borderRadius: "50%", marginRight: "15px", objectFit: "cover", border: "1px solid #ccc" }}
                  />
                </Link>
                <div>
                  <h3 className="party-name" style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
                    <Link to={`/candidate/${candidate.slug}`} style={{ color: "#333", textDecoration: "none" }}>
                      {candidate.name}
                    </Link>
                  </h3>
                  <span style={{ fontSize: "13px", color: "#666" }}>
                    <strong>क्षेत्र:</strong> {candidate.constituency}
                  </span>
                </div>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div className="votes" style={{ fontWeight: "bold", fontSize: "18px", color: "#bf1e2e", display: "flex", alignItems: "center" }}>
                  {candidate.votes?.toLocaleString() || "०"}
                  {candidate.isWinner && (
                    <img src="/assets/img/win-tick.png" alt="win-tick" style={{ width: "20px", marginLeft: "10px" }} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}

export function Candidate() {
  const { slug } = useParams();
  const cleanSlug = slug?.replace(/\.html$/i, "");
  const candidate = candidatesData.find((c) => c.slug === cleanSlug);

  if (!candidate) {
    return (
      <SiteLayout title="उम्मेदवार फेला परेन">
        <p>
          दुःख है, यो उम्मेदवार फेला परेन। कृपया{" "}
          <Link to="/candidates">उम्मेदवार सूची</Link> पर वापस जाएं।
        </p>
      </SiteLayout>
    );
  }

  const partyInfo = partyData.find((p) => p.name === candidate.party);

  return (
    <SiteLayout
      title={candidate.name}
      description={`Candidate profile page for ${candidate.name}.`}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div>
          <img
            src={candidate.image}
            alt={candidate.name}
            style={{
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />
        </div>
        <div>
          <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
            {candidate.name}
          </h2>
          <div style={{ marginBottom: "15px" }}>
            <strong>पार्टी:</strong>{" "}
            {partyInfo ? (
              <Link to={`/party/${partyInfo.slug}`} style={{ color: "#bf1e2e", textDecoration: "none", fontWeight: "bold" }}>
                {candidate.party}
              </Link>
            ) : (
              candidate.party
            )}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>निर्वाचन क्षेत्र:</strong>{" "}
            <Link 
              to={`/constituency/${candidate.constituency?.replace(/\s+/g, "").toLowerCase()}`}
              style={{ color: "#0066cc", textDecoration: "none", fontWeight: "bold" }}
            >
              {candidate.constituency}
            </Link>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>पद:</strong> {candidate.jobTitle}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>मत:</strong> {candidate.votes?.toLocaleString() || "०"}
          </div>
          {candidate.isWinner && (
            <div style={{ marginBottom: "15px", color: "green", fontWeight: "bold", display: "flex", alignItems: "center" }}>
              <span>विजेता</span>
              <img src="/assets/img/win-tick.png" alt="win" style={{ width: "20px", marginLeft: "10px" }} />
            </div>
          )}
          {candidate.partyLogo && (
            <div style={{ marginBottom: "15px" }}>
              <img
                src={candidate.partyLogo}
                alt={candidate.party}
                style={{ maxWidth: "150px", height: "auto" }}
              />
            </div>
          )}
          <div>
            <Link
              to="/candidates"
              style={{
                display: "inline-block",
                padding: "8px 16px",
                backgroundColor: "#0066cc",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              सभी उम्मेदवार देखें
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

export function Winner() {
  const { pageId } = useParams();
  const winnerId = pageId?.replace(/\.html$/i, "") || "unknown";

  return (
    <SiteLayout
      title={`Winner ${winnerId}`}
      description={`Winner result content for ID ${winnerId}.`}
    >
      <p>
        This winner page is rendered by React for result identifier:{" "}
        <strong>{winnerId}</strong>.
      </p>
    </SiteLayout>
  );
}

export function NotFound() {
  return (
    <main className="not-found-page elc-container">
      <h1>Page not found</h1>
      <p>
        Go back to the <Link to="/">home page</Link>.
      </p>
    </main>
  );
}

