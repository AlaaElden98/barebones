import { supabase } from "@/utils/supbase";
import type { Pet } from "../types";

// Mock data for development
const mockPets: Pet[] = [
  {
    id: "1",
    name: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    age: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Luna",
    species: "Cat",
    breed: "Siamese",
    age: 2,
    created_at: new Date().toISOString(),
  },
];

export const petService = {
  async getPets(): Promise<Pet[]> {
    try {
      // TODO: Add pagination
      const { data, error } = await supabase.from("pets").select("*");

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    } catch (err: unknown) {
      throw new Error(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  },

  async getPetById(id: string): Promise<Pet | null> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const pet = mockPets.find((p) => p.id === id);
    return pet || null;
  },

  async createPet(pet: Omit<Pet, "id" | "created_at">): Promise<Pet> {
    try {
      const { data, error } = await supabase
        .from("pets")
        .insert([pet])
        .select("*")
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (err: unknown) {
      throw new Error(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  },

  async updatePet(id: string, updates: Partial<Pet>): Promise<Pet> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const index = mockPets.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Pet not found");
    }
    mockPets[index] = { ...mockPets[index], ...updates };
    return mockPets[index];
  },

  async deletePet(id: string): Promise<void> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const index = mockPets.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Pet not found");
    }
    mockPets.splice(index, 1);
  },
};
