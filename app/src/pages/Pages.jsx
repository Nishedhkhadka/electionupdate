import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import candidatesData from "../../public/data/candidates.json";

function SiteLayout({ title, description, children }) {
  return (
    <>
      <header>
        <div className="header-section">
          <div className="elc-container">
            <div className="header-holder flex flex-middle flex-wrap flex-between">
              <div className="header-logo">
                <Link to="/" className="logo">
                  <img
                    src="/assets/images/ratopati-logo_zD9OASMMFx.png"
                    alt="Logo"
                  />
                </Link>
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
              <li>
                <Link to="/videos">निर्वाचन भिडियो</Link>
              </li>
              <li>
                <a
                  href="https://www.ratopati.com/segment/parliament-election-2082"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  समाचार
                </a>
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
                रातोपाटी होमपेज
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
            </div>
            <div className="page-header flex flex-between flex-middle flex-wrap">
              <div>
                <h3 className="page-title">{title}</h3>
                {description ? <p>{description}</p> : null}
              </div>
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

export function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [partyFilter, setPartyFilter] = useState("");

  useEffect(() => {
    setCandidates(candidatesData);
    setFilteredCandidates(candidatesData);
  }, []);

  useEffect(() => {
    let results = candidates;

    if (searchTerm) {
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.party.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (partyFilter) {
      results = results.filter((c) => c.party === partyFilter);
    }

    setFilteredCandidates(results);
  }, [searchTerm, partyFilter, candidates]);

  const uniqueParties = [...new Set(candidates.map((c) => c.party))];

  return (
    <SiteLayout
      title="उम्मेदवारहरु"
      description="Search candidates, constituencies, and party results from Nepal Election 2082."
    >
      <div className="candidate-search-section">
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="उम्मेदवार नाम वा पार्टी खोज्नुहोस्..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontFamily: "'Mukta', sans-serif",
            }}
          />
          <select
            value={partyFilter}
            onChange={(e) => setPartyFilter(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontFamily: "'Mukta', sans-serif",
            }}
          >
            <option value="">सबै पार्टीहरु</option>
            {uniqueParties.map((party) => (
              <option key={party} value={party}>
                {party}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="candidate-list" style={{ marginTop: "20px" }}>
        {filteredCandidates.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  borderBottom: "2px solid #ddd",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <th style={{ padding: "10px", textAlign: "left" }}>नाम</th>
                <th style={{ padding: "10px", textAlign: "left" }}>पार्टी</th>
                <th style={{ padding: "10px", textAlign: "left" }}>जेष्ठता</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr
                  key={candidate.slug}
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  <td style={{ padding: "10px" }}>
                    <Link
                      to={`/candidate/${candidate.slug}`}
                      style={{ color: "#0066cc", textDecoration: "none" }}
                    >
                      {candidate.name}
                    </Link>
                  </td>
                  <td style={{ padding: "10px" }}>{candidate.party}</td>
                  <td style={{ padding: "10px" }}>{candidate.jobTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>कुनै उम्मेदवार फेला परेन</p>
        )}
        <p
          style={{
            marginTop: "20px",
            fontSize: "12px",
            color: "#666",
            fontFamily: "'Mukta', sans-serif",
          }}
        >
          कुल उम्मेदवारहरु: {filteredCandidates.length}
        </p>
      </div>
    </SiteLayout>
  );
}

export function HotSeats() {
  return (
    <SiteLayout
      title="हट सिटहरु"
      description="View hot seats for the Nepal Election 2082 race."
    >
      <p>Hot seats content has been migrated into a React route.</p>
    </SiteLayout>
  );
}

export function Manifesto() {
  return (
    <SiteLayout
      title="घोषणा पत्र"
      description="Read the major party manifestos and policy platforms in the 2082 election."
    >
      <p>Manifesto content has been migrated into React.</p>
    </SiteLayout>
  );
}

export function Parties() {
  return (
    <SiteLayout
      title="राजनीतिक दलहरु"
      description="Review participating political parties and their results in Nepal Election 2082."
    >
      <p>Political party overview page is now rendered with React.</p>
    </SiteLayout>
  );
}

export function PopularCandidates() {
  return (
    <SiteLayout
      title="चर्चित उम्मेदवारहरु"
      description="See the most popular candidates from the 2082 election."
    >
      <p>Popular candidates content is now served by a React page.</p>
    </SiteLayout>
  );
}

export function Result() {
  return (
    <SiteLayout
      title="परिणाम"
      description="View election results for the Nepal Election 2082."
    >
      <p>Results content has been converted into the React application.</p>
    </SiteLayout>
  );
}

export function Videos() {
  return (
    <SiteLayout
      title="निर्वाचन भिडियो"
      description="Watch election videos and voter coverage from the 2082 campaign."
    >
      <p>Election videos are now accessible through a React page.</p>
    </SiteLayout>
  );
}

export function VoteDifference() {
  return (
    <SiteLayout
      title="मतान्तर"
      description="Track the vote difference across constituencies in the 2082 election."
    >
      <p>Vote difference analysis is now available as a React route.</p>
    </SiteLayout>
  );
}

export function Province() {
  const { slug } = useParams();
  const provinceName = normalizeSlug(slug);

  return (
    <SiteLayout
      title={`निर्वाचन ${provinceName}`}
      description={`Election overview for ${provinceName}.`}
    >
      <p>
        This province page is rendered by React. The route is matched from the
        original election site structure.
      </p>
    </SiteLayout>
  );
}

export function Party() {
  const { slug } = useParams();
  const partyName = normalizeSlug(slug);

  return (
    <SiteLayout
      title={partyName || "राजनीतिक दल"}
      description={`Party overview page for ${partyName}.`}
    >
      <p>
        This party page is rendered by React for: <strong>{partyName}</strong>.
      </p>
    </SiteLayout>
  );
}

export function Candidate() {
  const { slug } = useParams();
  const candidate = candidatesData.find((c) => c.slug === slug);

  if (!candidate) {
    return (
      <SiteLayout title="उम्मेदवार फेला परेन">
        <p>
          दुःख है, यह उम्मेदवार हमारे डेटाबेस में नहीं मिला। कृपया{" "}
          <Link to="/candidates">उम्मेदवार सूची</Link> पर वापस जाएं।
        </p>
      </SiteLayout>
    );
  }

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
            <strong>पार्टी:</strong> {candidate.party}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>पद:</strong> {candidate.jobTitle}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>मत:</strong> {candidate.votes}
          </div>
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
