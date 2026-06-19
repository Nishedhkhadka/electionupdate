/**
 * Route Configuration
 * Centralized route definitions for the application
 */

// Pages will be imported in App.jsx
export const routes = [
  { path: "/", routePath: "/", pageName: "Home" },
  { path: "/index.html", routePath: "/", pageName: "Home" },
  { path: "/about", routePath: "/about", pageName: "About" },
  { path: "/candidates", routePath: "/candidates", pageName: "Candidates" },
  { path: "/candidates.html", routePath: "/candidates", pageName: "Candidates" },
  { path: "/hot-seats", routePath: "/hot-seats", pageName: "HotSeats" },
  { path: "/hot-seats.html", routePath: "/hot-seats", pageName: "HotSeats" },
  { path: "/manifesto", routePath: "/manifesto", pageName: "Manifesto" },
  { path: "/manifesto.html", routePath: "/manifesto", pageName: "Manifesto" },
  { path: "/manifesto/:id", routePath: "/manifesto/:id", pageName: "ManifestoDetail" },
  { path: "/manifesto/:id.html", routePath: "/manifesto/:id", pageName: "ManifestoDetail" },
  { path: "/parties", routePath: "/parties", pageName: "Parties" },
  { path: "/parties.html", routePath: "/parties", pageName: "Parties" },
  { path: "/popular-candidates", routePath: "/popular-candidates", pageName: "PopularCandidates" },
  { path: "/popular-candidates.html", routePath: "/popular-candidates", pageName: "PopularCandidates" },
  { path: "/result", routePath: "/result", pageName: "Result" },
  { path: "/result.html", routePath: "/result", pageName: "Result" },
  { path: "/videos", routePath: "/videos", pageName: "Videos" },
  { path: "/videos.html", routePath: "/videos", pageName: "Videos" },
  { path: "/vote-difference", routePath: "/vote-difference", pageName: "VoteDifference" },
  { path: "/vote-difference.html", routePath: "/vote-difference", pageName: "VoteDifference" },
  { path: "/province/:slug", routePath: "/province/:slug", pageName: "Province" },
  { path: "/province/:slug.html", routePath: "/province/:slug", pageName: "Province" },
  { path: "/district/:slug", routePath: "/district/:slug", pageName: "District" },
  { path: "/district/:slug.html", routePath: "/district/:slug", pageName: "District" },
  { path: "/constituency/:slug", routePath: "/constituency/:slug", pageName: "Constituency" },
  { path: "/constituency/:slug.html", routePath: "/constituency/:slug", pageName: "Constituency" },
  { path: "/party/:slug", routePath: "/party/:slug", pageName: "Party" },
  { path: "/party/:slug.html", routePath: "/party/:slug", pageName: "Party" },
  { path: "/candidate/:slug", routePath: "/candidate/:slug", pageName: "Candidate" },
  { path: "/candidate/:slug.html", routePath: "/candidate/:slug", pageName: "Candidate" },
  { path: "/election-winner", routePath: "/election-winner", pageName: "Winner" },
  { path: "/election-winner.html", routePath: "/election-winner", pageName: "Winner" },
  { path: "*", routePath: "*", pageName: "NotFound" },
];

export default routes;
