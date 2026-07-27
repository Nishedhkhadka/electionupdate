import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const TOTAL_VOTES = "१,०८,३५,०२५";

const parties = [
  {
    slug: "rastriya-swatantra-party",
    name: "राष्ट्रिय स्वतन्त्र पार्टी",
    image: "/assets/images/rsp_AiC1qh2xlI.jpg",
    percent: "४७.८४",
    votes: "५१,८३,४९३",
  },
  {
    slug: "nepali-congress",
    name: "नेपाली कांग्रेस",
    image: "/assets/images/congress-logo_zVeY3un3Hj.jpg",
    percent: "१६.२४",
    votes: "१७,५९,१७२",
  },
  {
    slug: "cpn-uml",
    name: "नेकपा (एमाले)",
    image: "/assets/images/uml-1_zfT0bMAJFO.jpg",
    percent: "१३.४४",
    votes: "१४,५५,८८५",
  },
  {
    slug: "nepali-communist-party",
    name: "नेपाली कम्युनिष्ट पार्टी",
    image: "/assets/images/nepali-communist_uVwmNizOSk.jpg",
    percent: "७.४९",
    votes: "८,११,५७७",
  },
  {
    slug: "shram-samskriti-party",
    name: "श्रम संस्कृति पार्टी",
    image: "/assets/images/shram-sanskriti-party_jrxdNsjzjb.jpg",
    percent: "३.५६",
    votes: "३,८५,९०२",
  },
  {
    slug: "rastriya-prajatantra-party",
    name: "राष्ट्रिय प्रजातन्त्र पार्टी",
    image: "/assets/images/raprapa_RPVSZDsBPg.jpg",
    percent: "३.०५",
    votes: "३,३०,६८४",
  },
];

export default function ProportionalResultsSection() {
  const navigate = useNavigate();
  return (
    <section className="section section-samaupatik-result">
      <div className="elc-container">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <div className="heading-title">
            समानुपातिक मतगणना
          </div>
          <Link
            className="btn"
            to="/parties"
            target="_blank"
            rel="noopener noreferrer"
            style={{}}
          >
            विस्तृत
          </Link>
        </div>
        <div className="flex" style={{}}>
          <div
            className="samaupatik-result-heading"
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/parties");
            }}
          >
            <span className="title">समानुपातिक मतगणना</span>
            <p>कुल मत: {TOTAL_VOTES}</p>
          </div>

          <div className="samaupatik-parties-result">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                gap: "10px 0",
                alignItems: "center",
              }}
            >
              {parties.map((party) => (
                <div
                  key={party.slug}
                  className="homePageUniquePartyCard"
                  style={{
                    background: "#fff",
                    borderRadius: "10px",
                    padding: "10px 0px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "2px",
                      justifyContent: "center",
                      alignItems: "center",

                      flexDirection: "column",
                    }}
                  >
                    <Link
                      to={`/party/${party.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: "100%",
                        borderBottom: "2px solid rgb(191, 30, 46) ",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          height: "50px",
                          aspectRatio: "1",
                          borderRadius: "50%",
                          border: "4px solid rgba(0,0,0,0.06)",
                          margin: "auto",
                        }}
                      >
                        <img
                          style={{
                            objectFit: "contain",
                            borderRadius: "50%",
                          }}
                          src={party.image}
                          alt={party.name}
                        />
                      </div>
                      <span
                        style={{
                          textAlign: "center",
                          margin: "auto",
                          color: "rgba(0, 0, 0, 0.73)",
                          fontWeight: "700",
                        }}
                      >
                        {party.name}
                      </span>
                    </Link>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        padding: "0 15px",
                      }}
                    >
                      <div
                        className="flex"
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <h3
                          style={{
                            textAlign: "center",
                            opacity: "0.7",
                            fontSize: "13px",
                          }}
                        >
                          {" "}
                          प्रतिशतमा:
                        </h3>
                        <span
                          style={{
                            textAlign: "center",
                            fontWeight: "700",
                            color: "rgba(0,0,0,0.7)",
                          }}
                        >
                          {" "}
                          {party.percent}%
                        </span>
                      </div>
                      <div
                        div
                        className="flex "
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <h3
                          style={{
                            textAlign: "center",
                            opacity: "0.7",
                            fontSize: "13px",
                          }}
                        >
                          {" "}
                          कुल मत:
                        </h3>
                        <span
                          style={{
                            textAlign: "center",
                            fontWeight: "700",
                            fontSize: "14px",
                            color: "rgba(0,0,0,0.7)",
                          }}
                          className="value"
                        >
                          {party.votes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text--right" style={{ marginTop: "12px" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
