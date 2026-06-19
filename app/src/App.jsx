import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import {
  Candidates,
  HotSeats,
  Manifesto,
  ManifestoDetail,
  Parties,
  PopularCandidates,
  Result,
  Videos,
  VoteDifference,
  Province,
  District,
  Constituency,
  Party,
  Candidate,
  Winner,
  NotFound,
} from "./pages/Pages";
import NepalMap from "./components/map/map.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path = "/map" element={<NepalMap />} />
      <Route path="/index.html" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/candidates" element={<Candidates />} />
      <Route path="/candidates.html" element={<Candidates />} />
      <Route path="/hot-seats" element={<HotSeats />} />
      <Route path="/hot-seats.html" element={<HotSeats />} />
      <Route path="/manifesto" element={<Manifesto />} />
      <Route path="/manifesto.html" element={<Manifesto />} />
      <Route path="/manifesto/:id" element={<ManifestoDetail />} />
      <Route path="/manifesto/:id.html" element={<ManifestoDetail />} />
      <Route path="/parties" element={<Parties />} />
      <Route path="/parties.html" element={<Parties />} />
      <Route path="/popular-candidates" element={<PopularCandidates />} />
      <Route path="/popular-candidates.html" element={<PopularCandidates />} />
      <Route path="/result" element={<Result />} />
      <Route path="/result.html" element={<Result />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/videos.html" element={<Videos />} />
      <Route path="/vote-difference" element={<VoteDifference />} />
      <Route path="/vote-difference.html" element={<VoteDifference />} />
      <Route path="/province/:slug" element={<Province />} />
      <Route path="/province/:slug.html" element={<Province />} />
      <Route path="/district/:slug" element={<District />} />
      <Route path="/district/:slug.html" element={<District />} />
      <Route path="/constituency/:slug" element={<Constituency />} />
      <Route path="/constituency/:slug.html" element={<Constituency />} />
      <Route path="/party/:slug" element={<Party />} />
      <Route path="/party/:slug.html" element={<Party />} />
      <Route path="/candidate/:slug" element={<Candidate />} />
      <Route path="/candidate/:slug.html" element={<Candidate />} />
      <Route path="/winners:pageId.html" element={<Winner />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
