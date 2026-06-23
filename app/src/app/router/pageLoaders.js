import { lazy } from "react";

/**
 * Lazy-loaded page components for code splitting.
 * Each page lives in its own file under src/pages/.
 */
export const pageLoaders = {
  Home: () => import("../../pages/Home"),
  About: () => import("../../pages/About"),
  Candidates: () => import("../../pages/Candidates"),
  HotSeats: () => import("../../pages/HotSeats"),
  Manifesto: () => import("../../pages/Manifesto"),
  ManifestoDetail: () => import("../../pages/ManifestoDetail"),
  Parties: () => import("../../pages/Parties"),
  PopularCandidates: () => import("../../pages/PopularCandidates"),
  Result: () => import("../../pages/Result"),
  Videos: () => import("../../pages/Videos"),
  VoteDifference: () => import("../../pages/VoteDifference"),
  Province: () => import("../../pages/Province"),
  District: () => import("../../pages/District"),
  Constituency: () => import("../../pages/Constituency"),
  Party: () => import("../../pages/Party"),
  Candidate: () => import("../../pages/Candidate"),
  Winner: () => import("../../pages/Winner"),
  NotFound: () => import("../../pages/NotFound"),
  Map: () => import("../../components/map/NepalMap.jsx"),
};

export const lazyPages = Object.fromEntries(
  Object.entries(pageLoaders).map(([name, loader]) => [name, lazy(loader)]),
);
