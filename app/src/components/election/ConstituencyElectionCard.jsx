import { Link } from "react-router-dom";
import { toNepaliNumber } from "../../utils";

export default function ConstituencyElectionCard({
  constituency,
  candidatesBySlug,
  partyByName,
  limit,
}) {
  let sortedCandidates = [...constituency.candidates].sort(
    (a, b) => (b.votes || 0) - (a.votes || 0),
  );
  if (limit) {
    sortedCandidates = sortedCandidates.slice(0, limit);
  }
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
