import { Link } from "react-router-dom";
import { useMemo } from "react";
import candidatesData from "../../data/candidates.json";
import constituencyData from "../../data/constituency.json";
import partyData from "../../data/party.json";
import { toNepaliNumber } from "../../utils";
import { fixImageUrl } from "../../utils/imageUtils";

const PREVIEW_COUNT = 10;

function normalizeName(value) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[()]/g, "")
    .replace(/[\s\u00A0]+/g, " ")
    .trim();
}

export default function PopularCandidatesPreviewSection() {
  const constituencySlugByName = useMemo(() => {
    const map = new Map();

    constituencyData.forEach((constituency) => {
      map.set(normalizeName(constituency.name), constituency.slug);
    });

    return map;
  }, []);

  const partySlugByName = useMemo(() => {
    const map = new Map();

    partyData.forEach((party) => {
      map.set(normalizeName(party.name), party.slug);
    });

    return map;
  }, []);

  const popularCandidates = useMemo(
    () =>
      [...candidatesData]
        .filter((candidate) => candidate.popular)
        .sort((a, b) => {
          const rankA = a.popularRank ?? Number.POSITIVE_INFINITY;
          const rankB = b.popularRank ?? Number.POSITIVE_INFINITY;

          if (rankA !== rankB) {
            return rankA - rankB;
          }

          return (b.votes || 0) - (a.votes || 0);
        })
        .slice(0, PREVIEW_COUNT),
    [],
  );

  const getCandidateHref = (candidate) => `/candidate/${candidate.slug}`;

  const getConstituencyHref = (candidate) => {
    const constituencySlug = constituencySlugByName.get(
      normalizeName(candidate.constituency),
    );

    return constituencySlug
      ? `/constituency/${constituencySlug}`
      : getCandidateHref(candidate);
  };

  const getPartyHref = (candidate) => {
    const partySlug = partySlugByName.get(normalizeName(candidate.party));

    return partySlug ? `/party/${partySlug}` : getCandidateHref(candidate);
  };

  return (
    <section className="section candidates-column">
      <div className="elc-container">
        <div className="heading-title-wrap flex flex-between flex-wrap flex-middle">
          <h3 className="heading-title">चर्चित उम्मेदवारहरु</h3>

          <Link
            className="btn"
            to="/popular-candidates"
            target="_blank"
            rel="noopener noreferrer"
          >
            विस्तृत
          </Link>
        </div>

        <div className="popular-grid popular-candidates-preview">
          {popularCandidates.map((candidate) => (
            <article
              key={candidate.slug}
              className={`popular-card${
                candidate.isWinner ? " popular-card-winner" : ""
              }`}
            >
              <Link
                to={getCandidateHref(candidate)}
                target="_blank"
                rel="noopener noreferrer"
                className="popular-card-overlay"
                aria-label={`${candidate.name} candidate profile`}
              />

              <div className="popular-card-inner">
                {candidate.isWinner && (
                  <span className="popular-card-check">
                    <img src="/assets/img/win-tick.png" alt="" />
                  </span>
                )}

                <div className="photo-wrap">
                  <div className="photo-circle">
                    <Link to={getCandidateHref(candidate)}>
                      <img
                        src={
                          fixImageUrl(candidate.image) ||
                          "/assets/images/placeholder.png"
                        }
                        alt={candidate.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "/assets/images/placeholder.png";
                        }}
                      />
                    </Link>
                  </div>

                  {candidate.partyLogo && (
                    <Link
                      to={getPartyHref(candidate)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="party-emblem"
                    >
                      <img
                        src={fixImageUrl(candidate.partyLogo)}
                        alt=""
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </Link>
                  )}
                </div>

                <div className="card-body">
                  <Link to={getCandidateHref(candidate)}>
                    <h4 className="candidate-name" style={{ color: "#000" }}>
                      {candidate.name}
                    </h4>
                  </Link>

                  <Link
                    to={getPartyHref(candidate)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="candidate-meta candidate-meta-link"
                  >
                    {candidate.party}
                  </Link>

                  <Link
                    to={getConstituencyHref(candidate)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="constituency-pill constituency-pill-link"
                  >
                    {candidate.constituency}
                  </Link>
                </div>

                <div className="card-footer">
                  <div
                    className={`votes${
                      candidate.isWinner ? " votes-winner" : ""
                    }`}
                  >
                    {toNepaliNumber(candidate.votes || 0)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
