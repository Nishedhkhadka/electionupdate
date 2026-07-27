import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import candidatesData from "../data/candidates.json";
import constituencyData from "../data/constituency.json";
import partyData from "../data/party.json";
import { MainLayout } from "../layouts/MainLayout";
import { toNepaliNumber } from "../utils";
import { fixImageUrl } from "../utils/imageUtils";

function normalizeName(value) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[()]/g, "")
    .replace(/[\s\u00A0]+/g, " ")
    .trim();
}

export default function PopularCandidates() {
  const navigate = useNavigate();

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
        }),
    [],
  );

  const getCandidateHref = (candidate) => `/candidate/${candidate.slug}`;

  const getConstituencyHref = (candidate) => {
    const constituencySlug = constituencySlugByName.get(
      normalizeName(candidate.constituency),
    );

    return constituencySlug ? `/constituency/${constituencySlug}` : null;
  };

  const getPartyHref = (candidate) => {
    const partySlug = partySlugByName.get(normalizeName(candidate.party));

    return partySlug ? `/party/${partySlug}` : null;
  };

  return (
    <MainLayout
      title="चर्चित उम्मेदवारहरु"
      contentClassName="popular-candidates-page"
    >
      <div className="popular-candidates-grid popular-grid">
        {popularCandidates.map((candidate) => (
          <article
            key={candidate.slug}
            className={`popular-card${
              candidate.isWinner ? " popular-card-winner" : ""
            }`}
            onClick={() => navigate(getCandidateHref(candidate))}
            style={{ cursor: "pointer" }}
          >
            <div className="popular-card-inner parent">
              {candidate.isWinner && (
                <span className="popular-card-check" aria-hidden="true">
                  <img src="/assets/img/win-tick.png" alt="" />
                </span>
              )}

              <div className="photo-wrap">
                <div className="photo-circle">
                  <img
                    src={
                      fixImageUrl(candidate.image) ||
                      "/assets/images/placeholder.png"
                    }
                    alt={candidate.name}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src =
                        "/assets/images/placeholder.png";
                    }}
                  />
                </div>

                {candidate.partyLogo && (
                  <Link
                    to={getPartyHref(candidate) || getCandidateHref(candidate)}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="party-emblem"
                    aria-label={`${candidate.party} party page`}
                  >
                    <img
                      src={fixImageUrl(candidate.partyLogo)}
                      alt=""
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </Link>
                )}
              </div>

              <div className="card-body">
                <h4
                  className="candidate-name glowText"
                  style={{ color: "black" }}
                >
                  {candidate.name}
                </h4>

                <Link
                  to={getPartyHref(candidate) || getCandidateHref(candidate)}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="candidate-meta candidate-meta-link"
                >
                  {candidate.party}
                </Link>

                <Link
                  to={
                    getConstituencyHref(candidate) ||
                    getCandidateHref(candidate)
                  }
                  onClick={(e) => e.stopPropagation()}
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
    </MainLayout>
  );
}
