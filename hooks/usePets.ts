import { useState, useEffect, useCallback } from "react";

import type { Pet } from "@/types";
import { petService } from "@/services/petService";

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await petService.getPets();
      setPets(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setPets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  return {
    pets,
    loading,
    error,
  };
}
