import { Link, useParams } from "react-router-dom";
import manifestoData from "../../public/data/manifesto.json";
import { MainLayout } from "../layouts/MainLayout";

function getPdfViewerUrl(pdfUrl) {
  const base = pdfUrl.split("#")[0];
  return `${base}#toolbar=1&navpanes=0&view=FitH`;
}

export default function ManifestoDetail() {
  const { id } = useParams();
  const cleanId = id?.replace(/\.html$/i, "");
  const manifesto = manifestoData.find((item) => item.id === cleanId);

  if (!manifesto) {
    return (
      <MainLayout title="घोषणा पत्र फेला परेन">
        <p>दुःख है, यो घोषणा पत्र फेला परेन।</p>
      </MainLayout>
    );
  }

  const breadcrumb = (
    <>
      <span className="sep">/</span>
      <Link to="/manifesto">घोषणा पत्र</Link>
      <span className="sep">/</span>
      <span>{manifesto.party_name}</span>
    </>
  );

  return (
    <MainLayout
      title={manifesto.party_name}
      hidePageHeader
      breadcrumb={breadcrumb}
    >
      <div className="manifesto-detail-header">
        <h2 className="manifesto-detail-title">{manifesto.party_name}</h2>
        <div className="manifesto-detail-actions">
          <a
            href={manifesto.pdf_url}
            download
            target="_blank"
            rel="noreferrer noopener"
            className="manifesto-btn manifesto-btn-primary"
          >
            PDF डाउनलोड
          </a>
          <Link to="/manifesto" className="manifesto-btn manifesto-btn-secondary">
            सूचीमा फर्कनुहोस्
          </Link>
        </div>
      </div>

      <div className="manifesto-pdf-viewer">
        <iframe
          src={getPdfViewerUrl(manifesto.pdf_url)}
          title={manifesto.party_name}
        />
      </div>
    </MainLayout>
  );
}
