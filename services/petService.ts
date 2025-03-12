import { supabase } from "@/utils/supbase";
import type { Pet } from "../types";

export const petService = {
  async getPets(userId: string): Promise<Pet[]> {
    try {
      // TODO: Add pagination
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("owner_id", userId);

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

  // async getPetById(id: string): Promise<Pet | null> {
  //   // Simulate API call delay
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   const pet = mockPets.find((p) => p.id === id);
  //   return pet || null;
  // },

  async createPet(
    pet: Omit<Pet, "id" | "created_at" | "owner_id">,
    userId: string
  ): Promise<Pet> {
    try {
      const { data, error } = await supabase
        .from("pets")
        .insert([{ ...pet, owner_id: userId }])
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

  // async updatePet(id: string, updates: Partial<Pet>): Promise<Pet> {
  //   // Simulate API call delay
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   const index = mockPets.findIndex((p) => p.id === id);
  //   if (index === -1) {
  //     throw new Error("Pet not found");
  //   }
  //   mockPets[index] = { ...mockPets[index], ...updates };
  //   return mockPets[index];
  // },

  // async deletePet(id: string): Promise<void> {
  //   // Simulate API call delay
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   const index = mockPets.findIndex((p) => p.id === id);
  //   if (index === -1) {
  //     throw new Error("Pet not found");
  //   }
  //   mockPets.splice(index, 1);
  // },
};
