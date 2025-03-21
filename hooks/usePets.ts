import { useState, useEffect, useCallback } from "react";

import type { Pet } from "@/types";
import { petService } from "@/services/petService";

export function usePets(userId: string) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [adding, setAdding] = useState<boolean>(false);
  const [addError, setAddError] = useState<string | null>(null);

  const addNewPet = async (
    newPet: Omit<Pet, "id" | "created_at" | "owner_id">
  ) => {
    try {
      setAdding(true);
      setAddError(null);
      const addedPet = await petService.createPet(newPet, userId);
      setPets((prevPets) => [...prevPets, addedPet]);
    } catch (err: unknown) {
      setAddError(err instanceof Error ? err.message : "Something went wrong");
      throw err;
    } finally {
      setAdding(false);
    }
  };

  const fetchPets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await petService.getPets(userId);
      setPets(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setPets([]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  return {
    pets,
    loading,
    error,
    adding,
    addError,
    addNewPet,
  };
}
