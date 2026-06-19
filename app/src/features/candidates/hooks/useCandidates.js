import { useMemo } from "react";
import candidatesData from "../../../public/data/candidates.json";
import partyData from "../../../public/data/party.json";

/**
 * Custom hook to get candidates indexed by slug
 */
export const useCandidatesBySlug = () => {
  return useMemo(() => {
    return new Map(candidatesData.map((c) => [c.slug, c]));
  }, []);
};

/**
 * Custom hook to get parties indexed by name
 */
export const usePartiesByName = () => {
  return useMemo(() => {
    return new Map(partyData.map((p) => [p.name, p]));
  }, []);
};

/**
 * Custom hook to get top N candidates by votes
 */
export const useTopCandidates = (count = 15) => {
  return useMemo(() => {
    return [...candidatesData]
      .sort((a, b) => (b.votes || 0) - (a.votes || 0))
      .slice(0, count);
  }, [count]);
};

/**
 * Custom hook to filter candidates by party
 */
export const useCandidatesByParty = (partyName) => {
  return useMemo(() => {
    if (!partyName) return [];
    return candidatesData.filter((c) => c.party === partyName);
  }, [partyName]);
};
