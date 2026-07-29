import { Link } from "react-router-dom";
import provinceData from "../../data/province.json";
import { toNepaliNumber } from "../../utils";

const provinceOrder = [
  "कर्णाली प्रदेश",
  "कोशी प्रदेश",
  "गण्डकी प्रदेश",
  "बागमती प्रदेश",
  "मधेस प्रदेश",
  "लुम्बिनी प्रदेश",
  "सुदूरपश्चिम प्रदेश",
];

const provincePartyWins = {
  "कर्णाली प्रदेश": {
    "नेपाली कांग्रेस": 5,
    "नेपाली कम्युनिष्ट पार्टी": 4,
    "राष्ट्रिय प्रजातन्त्र पार्टी": 1,
    "नेकपा (एमाले)": 1,
    "राष्ट्रिय स्वतन्त्र पार्टी": 1,
  },
  "कोशी प्रदेश": {
    "राष्ट्रिय स्वतन्त्र पार्टी": 17,
    "नेपाली कांग्रेस": 4,
    "नेकपा (एमाले)": 4,
  },
  "गण्डकी प्रदेश": {
    "राष्ट्रिय स्वतन्त्र पार्टी": 15,
    "नेपाली कांग्रेस": 2,
    स्वतन्त्र: 1,
  },
  "बागमती प्रदेश": {
    "राष्ट्रिय स्वतन्त्र पार्टी": 33,
    "नेपाली कम्युनिष्ट पार्टी": 1,
    "नेपाली कांग्रेस": 1,
  },
  "मधेस प्रदेश": {
    "राष्ट्रिय स्वतन्त्र पार्टी": 30,
    "नेपाली कांग्रेस": 1,
    "नेपाली कम्युनिष्ट पार्टी": 1,
  },
  "लुम्बिनी प्रदेश": {
    "राष्ट्रिय स्वतन्त्र पार्टी": 29,
    "नेपाली कम्युनिष्ट पार्टी": 2,
    "नेपाली कांग्रेस": 2,
  },
  "सुदूरपश्चिम प्रदेश": {
    "राष्ट्रिय स्वतन्त्र पार्टी": 10,
    "नेपाली कांग्रेस": 3,
    "नेकपा (एमाले)": 3,
  },
};

const partyConfig = {
  "राष्ट्रिय स्वतन्त्र पार्टी": {
    color: "#1E88E5",
    logo: "/assets/images/rsp_AiC1qh2xlI.jpg",
  },
  "नेपाली कांग्रेस": {
    color: "#00A650",
    logo: "/assets/images/congress-logo_zVeY3un3Hj.jpg",
  },
  "नेकपा (एमाले)": {
    color: "#D32F2F",
    logo: "/assets/images/uml-1_zfT0bMAJFO.jpg",
  },
  "नेपाली कम्युनिष्ट पार्टी": {
    color: "#CC0000",
    logo: "/assets/images/nepali-communist_uVwmNizOSk.jpg",
  },
  "राष्ट्रिय प्रजातन्त्र पार्टी": {
    color: "#F9A825",
    logo: "/assets/images/raprapa_RPVSZDsBPg.jpg",
  },
  स्वतन्त्र: {
    color: "#8E24AA",
    logo: null,
  },
};

export default function ProvinceResultsSection() {
  const provinceCards = provinceOrder
    .map((provinceName) => ({
      province: provinceData.find((p) => p.name === provinceName),
      results: provincePartyWins[provinceName] || {},
    }))
    .filter((entry) => entry.province);

  const renderRows = (results) => {
    const partyRows = Object.entries(results)
      .map(([party, seats]) => ({
        party,
        seats,
        config: partyConfig[party] || { color: "#999", icon: "●" },
      }))
      .sort((a, b) => b.seats - a.seats)
      .slice(0, 3);

    const total = partyRows.reduce((sum, row) => sum + row.seats, 0);

    return partyRows.map((row) => {
      const width = total > 0 ? Math.max((row.seats / total) * 100, 10) : 10;
      return (
        <div
          key={row.party}
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
          <div
            style={{
              width: "32px",
              minHeight: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
              backgroundColor: "#fff",
              border: `1px solid ${row.config.color}`,
            }}
          >
            {row.config.logo ? (
              <img
                src={row.config.logo}
                alt={row.party}
                style={{ width: "24px", height: "24px", objectFit: "contain" }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: row.config.color,
                }}
              />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <span
                style={{ fontSize: "13px", color: "#333", fontWeight: 600 }}
              >
                {row.party}
              </span>
              <span
                style={{ fontSize: "13px", color: "#333", fontWeight: 700 }}
              >
                {toNepaliNumber(row.seats)}
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "8px",
                borderRadius: "999px",
                backgroundColor: "#eceff1",
              }}
            >
              <div
                style={{
                  width: `${width}%`,
                  height: "100%",
                  borderRadius: "999px",
                  backgroundColor: row.config.color,
                }}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  const firstRowCards = provinceCards; //.slice(0, 4);
  const secondRowCards = []; // provinceCards.slice(4);

  return (
    <section
      className="section province-results"
      style={{ backgroundColor: "#fff", padding: "40px 0" }}
    >
      <div className="elc-container">
        <h3 className="heading-title">प्रदेशअनुसार परिणाम</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          {firstRowCards.map(({ province, results }) => (
            <div
              key={province.slug}
              className="translate-y-card"
              style={{ display: "flex" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  minHeight: "280px",
                  backgroundColor: "#fff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "14px 16px",
                    backgroundColor: "#fde7e9",
                    borderBottom: "2px solid #bf1e2e",
                  }}
                >
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      color: "#bf1e2e",
                      fontWeight: 700,
                    }}
                  >
                    {province.name}
                  </h4>
                </div>

                <div
                  style={{
                    padding: "14px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    flex: 1,
                  }}
                >
                  {renderRows(results)}
                </div>

                <div
                  style={{
                    padding: "12px 16px",
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    marginTop: "auto",
                  }}
                >
                  <Link
                    className="btn-special"
                    to={`/province/${province.slug || ""}`}
                    style={{
                      display: "inline-block",
                      width: "100%",
                      textAlign: "center",
                      boxSizing: "border-box",
                      textDecoration: "none",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    विस्तृत विवरण
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {secondRowCards.map(({ province, results }) => (
            <div key={province.slug} style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  minHeight: "280px",
                  backgroundColor: "#fff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    padding: "14px 16px",
                    backgroundColor: "#fde7e9",
                    borderBottom: "2px solid #bf1e2e",
                  }}
                >
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      color: "#bf1e2e",
                      fontWeight: 700,
                    }}
                  >
                    {province.name}
                  </h4>
                </div>

                <div
                  style={{
                    padding: "14px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    flex: 1,
                  }}
                >
                  {renderRows(results)}
                </div>

                <div
                  style={{
                    padding: "12px 16px",
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    marginTop: "auto",
                  }}
                >
                  <Link
                    className="btn"
                    to={`/province/${province.slug || ""}`}
                    style={{
                      display: "inline-block",
                      width: "100%",
                      textAlign: "center",
                      boxSizing: "border-box",
                      textDecoration: "none",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    विस्तृत विवरण
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
