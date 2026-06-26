/**
 * Application constants
 */

export const MANIFESTO_IMAGES = {
  1: "/election/media/party-manifesto/pratibaddatapatra-pralo-pa_E1AqsXAJyr.jpg",
  2: "/election/media/party-manifesto/congress-manifesto-082_vcRT3VJKFK.jpg",
  3: "/election/media/party-manifesto/nepali-communist-manifesto_7Yi5M2ya8I.jpg",
  4: "/election/media/party-manifesto/rsp-bachapatra_N3Q271hh8R.jpg",
  5: "/election/media/party-manifesto/unp_election_menifesto_book_2082_LXbjETeuoP.jpg",
  6: "/election/media/party-manifesto/uml-election-manifesto_ilAJhqpl3m.jpg",
  7: "/election/media/party-manifesto/rpp_c9PJTTVU6z.jpg",
  8: "/election/media/party-manifesto/nepal-majdur-kisan-party_07xDyXZ0vI.jpg",
  9: "/election/media/party-manifesto/rastriya_janamorcha_manifesto_2082_CRDSjZ6jBd.jpg",
  10: "/election/media/party-manifesto/shram-sanskriti-party_jrxdNsjzjb.jpg",
};

export const getManifestoImage = (manifestoId) =>
  MANIFESTO_IMAGES[manifestoId] || PLACEHOLDER_IMAGE;

export const PLACEHOLDER_IMAGE = "/assets/images/placeholder.png";
export const PARTY_LOGO_BASE = "https://npcdn.ratopati.com";

export const ELECTION_TITLE = "प्रतिनिधि सभा निर्वाचन २०८२";
export const SITE_NAME = "रातोपाटी निर्वाचन २०८२";

export const COLORS = {
  primary: "#bf1e2e",
  success: "#2c9a6b",
  text: "#333",
  textLight: "#666",
  border: "#ddd",
  background: "#fff",
  lightBg: "#fbfbfb",
};
