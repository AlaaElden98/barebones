import { supabase } from "@/utils/supbase";
import type { BodyConditionLog, Pet, WeightLog } from "../types";

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

  async getBodyConditionLogs(petId: string): Promise<BodyConditionLog[]> {
    try {
      const { data, error } = await supabase
        .from("body_condition_logs")
        .select("*")
        .eq("pet_id", petId)
        .order("date", { ascending: false });

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

  async createBodyConditionLog(
    log: Omit<BodyConditionLog, "id" | "pet_id">,
    petId: string
  ): Promise<BodyConditionLog> {
    try {
      const { data, error } = await supabase
        .from("body_condition_logs")
        .insert([{ ...log, pet_id: petId }])
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
  async getWeightLogs(petId: string): Promise<WeightLog[]> {
    try {
      const { data, error } = await supabase
        .from("weight_logs")
        .select("*")
        .eq("pet_id", petId)
        .order("date", { ascending: false });

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

  async createWeightLog(
    log: Omit<WeightLog, "id" | "pet_id">,
    petId: string
  ): Promise<WeightLog> {
    try {
      const { data, error } = await supabase
        .from("weight_logs")
        .insert([{ ...log, pet_id: petId }])
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
};
