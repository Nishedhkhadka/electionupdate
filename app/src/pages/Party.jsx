import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import candidatesData from "../../public/data/candidates.json";
import constituencyData from "../../public/data/constituency.json";
import partyData from "../../public/data/party.json";
import { MainLayout } from "../layouts/MainLayout";
import { toNepaliNumber } from "../utils";
import { fixImageUrl } from "../utils/imageUtils";

function getPartyLogo(party) {
  if (!party?.logo || party.logo === "#") {
    return "/assets/images/placeholder.png";
  }
  return fixImageUrl(party.logo.startsWith("/") ? party.logo : `/${party.logo}`);
}

export default function Party() {
  const { slug } = useParams();
  const cleanSlug = slug?.replace(/\.html$/i, "");
  const party = partyData.find((item) => item.slug === cleanSlug);

  const constituencySlugByName = useMemo(() => {
    const map = new Map();
    constituencyData.forEach((item) => map.set(item.name, item.slug));
    return map;
  }, []);

  if (!party) {
    return (
      <MainLayout title="राजनीतिक दल फेला परेन">
        <p>दुःख है, यो राजनीतिक दल फेला परेन।</p>
      </MainLayout>
    );
  }

  const partyCandidates = candidatesData.filter((candidate) => candidate.party === party.name);
  const sortedPartyCandidates = [...partyCandidates].sort(
    (a, b) => (b.votes || 0) - (a.votes || 0),
  );
  const featuredCandidates = sortedPartyCandidates.filter((candidate) => candidate.isWinner).slice(0, 5);
  const logoUrl = getPartyLogo(party);

  const breadcrumb = (
    <>
      <span className="sep">/</span>
      <Link to="/parties">राजनीतिक दलहरु</Link>
      <span className="sep">/</span>
      <span>{party.name}</span>
    </>
  );

  return (
    <MainLayout
      title={party.name}
      hidePageHeader
      breadcrumb={breadcrumb}
      contentClassName="party-detail-page"
      secondaryChildren={
        <section className="all-parties-candidates section">
          <div className="elc-container">
            <div className="heading-title-wrap flex flex-between flex-wrap flex-middle">
              <h3 className="heading-title">{party.name}का उम्मेदवारहरु</h3>
              <span className="counter">{toNepaliNumber(sortedPartyCandidates.length)}</span>
            </div>

            <div className="candidate-wrapper active">
              <div className="result-container">
                <h3 className="title">
                  प्रतिनिधि सभा निर्वाचन २०८२
                  <span className="counter">{toNepaliNumber(sortedPartyCandidates.length)}</span>
                </h3>
                <div className="party-container-wrap dn-grid">
                  {sortedPartyCandidates.length > 0 ? (
                    sortedPartyCandidates.map((candidate) => {
                      const constituencySlug = constituencySlugByName.get(candidate.constituency);

                      return (
                        <div
                          key={candidate.slug}
                          className={`party-container col12${candidate.isWinner ? " candidate-win" : ""}`}
                        >
                          <Link to={`/candidate/${candidate.slug}`} className="party-logo">
                            <img
                              src={fixImageUrl(candidate.image)}
                              alt={candidate.name}
                              onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = "/assets/images/placeholder.png";
                              }}
                            />
                            <span className="party-name">{candidate.name}</span>
                          </Link>
                          <div className="party-wrap">
                            <div className="party-info">
                              <Link to={`/party/${party.slug}`} className="party-sign">
                                <img src={logoUrl} alt={party.name} />
                                {party.name}
                              </Link>
                              {constituencySlug ? (
                                <Link to={`/constituency/${constituencySlug}`}>
                                  {candidate.constituency}
                                </Link>
                              ) : (
                                <span>{candidate.constituency}</span>
                              )}
                            </div>
                            <div className="votes">
                              {toNepaliNumber(candidate.votes || 0)}
                              {candidate.isWinner ? (
                                <img src="/assets/img/win-tick.png" alt="win-tick" />
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>यस दलका उम्मेदवार फेला परेनन्।</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    >
      <div className="flex flex-wrap">
        <div className="detail">
          <div className="candidate-detail-wrapper">
            <div className="candidate-bio">
              <div className="candidate-featured-img">
                <img
                  src={logoUrl}
                  alt={party.name}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/assets/images/placeholder.png";
                  }}
                />
              </div>
              <div className="page-header">
                <div>
                  <h3 className="page-title">{party.name}</h3>
                  {party.leader ? (
                    <span>
                      <Link to={`/party/${party.slug}`} onClick={(event) => event.preventDefault()}>
                        सभापति : {party.leader}
                      </Link>
                    </span>
                  ) : null}
                  <span className="result-grid">
                    <div className="result-vote">
                      <h5>{toNepaliNumber(party.wins || 0)}</h5>
                      <span>जित</span>
                    </div>
                    {party.proportional_seats ? (
                      <div className="result-vote">
                        <h5>{toNepaliNumber(party.proportional_seats)}</h5>
                        <span>समानुपातिक सिट</span>
                      </div>
                    ) : null}
                    {party.proportional_votes && party.proportional_votes !== "०" ? (
                      <div className="result-vote">
                        <h5>{party.proportional_votes}</h5>
                        <span>समानुपातिक मत</span>
                      </div>
                    ) : null}
                  </span>
                </div>
              </div>
            </div>

            {party.description ? (
              <div className="candidate-info">
                <div
                  className="contentarea"
                  dangerouslySetInnerHTML={{ __html: party.description }}
                />
              </div>
            ) : null}
          </div>
        </div>

        {featuredCandidates.length > 0 ? (
          <aside className="candidate-sidebar">
            <div className="sidebar">
              <div className="sidebar-candidate">
                <h2 className="heading-title">
                  <span>विजयी उम्मेदवारहरु</span>
                </h2>
                {featuredCandidates.map((candidate) => (
                  <div
                    key={candidate.slug}
                    className={`candidate-row${candidate.isWinner ? " candidate-win" : ""}`}
                  >
                    <div className="candidate-media">
                      <Link to={`/candidate/${candidate.slug}`}>
                        <img
                          className="candidate-photo"
                          src={fixImageUrl(candidate.image)}
                          alt={candidate.name}
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = "/assets/images/placeholder.png";
                          }}
                        />
                      </Link>
                      <div>
                        <h3 className="title">
                          <Link to={`/candidate/${candidate.slug}`}>{candidate.name}</Link>
                        </h3>
                        <Link to={`/party/${party.slug}`}>{party.name}</Link>
                      </div>
                    </div>
                    <div className="candidate-detail">
                      <div className="votes">
                        {toNepaliNumber(candidate.votes || 0)}
                        {candidate.isWinner ? (
                          <img src="/assets/img/win-tick.png" alt="win-tick" />
                        ) : null}
                      </div>
                      <Link className="party" to={`/party/${party.slug}`}>
                        <img className="party-flag" src={logoUrl} alt={party.name} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </MainLayout>
  );
}
