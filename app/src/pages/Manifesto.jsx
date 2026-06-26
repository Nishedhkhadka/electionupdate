import { Link } from "react-router-dom";
import { useMemo } from "react";
import partyData from "../../public/data/party.json";
import manifestoData from "../../public/data/manifesto.json";
import { MainLayout } from "../layouts/MainLayout";
import { fixImageUrl } from "../utils/imageUtils";
import { getManifestoImage } from "../app/config/constants";

function getPartyLogo(party) {
  if (!party?.logo || party.logo === "#") {
    return "/assets/images/placeholder.png";
  }
  return fixImageUrl(party.logo.startsWith("/") ? party.logo : `/${party.logo}`);
}

export default function Manifesto() {
  const partyBySlug = useMemo(
    () => new Map(partyData.map((party) => [party.slug, party])),
    [],
  );

  return (
    <MainLayout
      title="घोषणा पत्र"
      description="२०८२ प्रतिनिधि सभा निर्वाचनका प्रमुख दलहरूका घोषणा पत्र र बाचापत्र।"
    >
      <p className="manifesto-intro">
        तलका दलहरूका घोषणा पत्र हेर्न वा डाउनलोड गर्न सक्नुहुन्छ।
      </p>

      <div className="manifesto-grid">
        {manifestoData.map((manifesto) => {
          const party = manifesto.party_slug
            ? partyBySlug.get(manifesto.party_slug)
            : null;
          const coverImage = getManifestoImage(manifesto.id);
          const partyLogo = party ? getPartyLogo(party) : "/assets/images/placeholder.png";

          return (
            <article key={manifesto.id} className="manifesto-card">
              <div className="manifesto-card-cover">
                <img
                  src={coverImage}
                  alt={manifesto.party_name}
                  className="manifesto-card-image"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = partyLogo;
                  }}
                />
                <div className="manifesto-card-logo">
                  <img src={partyLogo} alt="" />
                </div>
              </div>

              <div className="manifesto-card-body">
                <h3 className="manifesto-card-title">{manifesto.party_name}</h3>

                <div className="manifesto-card-actions">
                  <Link to={`/manifesto/${manifesto.id}`} className="manifesto-btn manifesto-btn-primary">
                    हेर्नुहोस्
                  </Link>
                  <a
                    href={manifesto.pdf_url}
                    download
                    target="_blank"
                    rel="noreferrer noopener"
                    className="manifesto-btn manifesto-btn-secondary"
                  >
                    PDF
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </MainLayout>
  );
}
