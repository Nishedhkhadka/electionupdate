import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import Header from "../components/ui/Header/Header";
import Footer from "../components/ui/Footer/Footer";
import candidatesData from "../data/candidates.json";
import constituencyData from "../data/constituency.json";
import districtData from "../data/district.json";
import partyData from "../data/party.json";
import { cleanRouteSlug } from "../utils";
import { useParams } from "react-router-dom";

/**
 * MainLayout Component
 * Default site layout with header, navigation, and footer
 */
export function MainLayout({
  title,
  description,
  children,
  secondaryChildren,
  breadcrumbRight,
  headerRight,
  breadcrumb,
  hidePageHeader = false,
  contentClassName = "",
  bare = false,
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [href, setHref] = useState(window.location.href);
  useEffect(() => setHref(window.location.href),[window.location.href]);
  const [temp, setTemp] = useState(
    districtData.find((e) =>
      e?.slug.includes(href.split("/")[-1 + href.split("/").length]),
    ),
  );
  const [temp1, setTemp1] = useState(
    districtData.find((e) =>
      e?.slug.includes(
        href.split("/")[-1 + href.split("/").length].split("-")[0],
      ),
    ),
  );

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
        type: "Candidate",
        title: candidate.name,
        subtitle: [candidate.party, candidate.constituency]
          .filter(Boolean)
          .join(" - "),
        image: candidate.image,
        url: `/candidate/${candidate.slug}`,
      }));

    const partyResults = partyData
      .filter((party) => matches([party.name, party.slug, party.leader]))
      .slice(0, 4)
      .map((party) => ({
        type: "Party",
        title: party.name,
        subtitle: party.leader ? `Leader: ${party.leader}` : "",
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
        type: "Constituency",
        title: constituency.name,
        subtitle: [constituency.district_name, constituency.province_name]
          .filter(Boolean)
          .join(" - "),
        image: constituency.map_image,
        url: `/constituency/${constituency.slug}`,
      }));

    return [...candidateResults, ...partyResults, ...constituencyResults].slice(
      0,
      10,
    );
  }, [searchQuery]);

  const closeSearch = () => {
    setSearchQuery("");
    document.body.classList.remove("show__search--modal");
  };

  const openSearch = () => {
    document.body.classList.add("show__search--modal");
    window.setTimeout(() => {
      document.querySelector(".global-search-form input")?.focus();
    }, 0);
  };

  return (
    <>
      <Header />
      <div className="candidate-search-form global-search-form">
        <div className="search-overlay" onClick={closeSearch}></div>
        <div className="flex">
          <div className="elc-container">
            <div className="form-label">
              Search candidates, parties or constituencies
              <button
                className="trigger-close"
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
              >
                <X size={30} strokeWidth={1.5} />
              </button>
            </div>
            <form
              className="input-wrap"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="search"
                name="query"
                autoComplete="off"
                placeholder="Type at least 3 letters..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <div className="form-autocomplete">
                {searchQuery.trim().length < 2 ? (
                  <span className="counter search-counter">
                    Type at least 3 letters...
                  </span>
                ) : searchResults.length > 0 ? (
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
                    No results found
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="mobile-nav-bar">
        <button
          className="mobile-nav-toggle"
          type="button"
          aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileNavOpen}
          onClick={() => setIsMobileNavOpen((open) => !open)}
        >
          {isMobileNavOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>
      <nav className={`navigation${isMobileNavOpen ? " is-mobile-open" : ""}`}>
        <div className="elc-container">
          <div className="menu-container">
            <ul>
              <li>
                <Link to="/" target="_blank" rel="noopener noreferrer">
                  होम पेज
                </Link>
              </li>
              <li>
                <Link
                  to="/candidates"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  उम्मेदवारहरु
                </Link>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  निर्वाचन <ChevronDown size={18} />
                </a>
                <ul>
                  <li>
                    <Link
                      to="/province/koshi"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      कोशी प्रदेश
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/province/madhesh"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      मधेस प्रदेश
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/province/bagmati"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      बागमती प्रदेश
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/province/gandaki"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      गण्डकी प्रदेश
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/province/lumbini"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      लुम्बिनी प्रदेश
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/province/karnali"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      कर्णाली प्रदेश
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/province/sudurpaschim"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      सुदूरपश्चिम प्रदेश
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/parties" target="_blank" rel="noopener noreferrer">
                  राजनीतिक दल
                </Link>
              </li>
              <li>
                <Link to="/hot-seats" target="_blank" rel="noopener noreferrer">
                  हट सिटहरु
                </Link>
              </li>
              <li>
                <Link
                  to="/vote-difference"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  मतान्तर
                </Link>
              </li>
              <li>
                <Link
                  to="/popular-candidates"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  चर्चित उम्मेदवारहरु
                </Link>
              </li>
              <li>
                <Link to="/manifesto" target="_blank" rel="noopener noreferrer">
                  घोषणा पत्र
                </Link>
              </li>
            </ul>
            <div className="nav-right">
              <button
                className="btn-search btn-trigger"
                type="button"
                aria-label="Open search"
                onClick={openSearch}
              >
                <Search size={18} strokeWidth={2.4} />
              </button>
              <a
                className="button"
                href="https://www.jointwithus.com.np/"
                target="_blank"
                rel="noreferrer noopener"
              >
                जोइन्ट विथ अस होमपेज
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

      {bare ? (
        children
      ) : (
        <div className="elec-content-wrap">
          <section className="section section-candidates section-bottom">
            <div className="elc-container">
              <div className="backward flex flex-wrap flex-between flex-middle">
                <div className="breadcrumb">
                  <Link to="/" target="_blank" rel="noopener noreferrer">
                    प्रतिनिधि सभा निर्वाचन २०८२
                  </Link>
                  <span className="sep">/</span>
                  {href.includes("district") && (
                    <>
                      <Link to={"/province/" + temp?.province_slug}>
                        {temp?.province_name}
                      </Link>
                      <span className="sep">/</span>
                      <Link>
                        {districtData.find(
                          (e) =>
                            e?.slug.includes(
                              href.split("/")[-1 + href.split("/").length],
                            )?.name,
                        )}{" "}
                      </Link>
                    </>
                  )}
                  {href.includes("constituency") && (
                    <>
                      <Link to={"/province/" + temp1?.province_slug}>
                        {temp1?.province_name}{" "}
                      </Link>
                      <span className="sep">/</span>
                      <Link to={"/district/" + temp1?.slug}>
                        {temp1?.name}{" "}
                      </Link>
                      <span className="sep">/</span>
                    </>
                  )}

                  <span>{title}</span>
                </div>
                {breadcrumbRight}
              </div>
              {!hidePageHeader ? (
                <div className="page-header flex flex-between flex-middle flex-wrap">
                  <div>
                    <h3 className="page-title">{title}</h3>
                    {description ? <p>{description}</p> : null}
                  </div>
                  {headerRight}
                </div>
              ) : null}
              <div className={contentClassName}>{children}</div>
            </div>
          </section>
          {secondaryChildren}
        </div>
      )}
      <Footer />
    </>
  );
}

export default MainLayout;
