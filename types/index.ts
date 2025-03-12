export interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string | null;
  age: number | string;
  created_at: string;
  owner_id: string;
}

export interface Profile {
  id: string;
  user_id: string;
  username: string;
  full_name?: string | null | undefined;
  avatar_url?: string;
  updated_at?: string;
}

export interface WeightLog {
  id: string;
  pet_id: string;
  weight: number;
  date: string;
}

export interface BodyConditionLog {
  date: string;
  id: string;
  body_condition: string;
  pet_id: string;
}

export type LogType = "weight" | "body" | "vet";

export interface VetVisitLog {
  id: string;
  pet_id: string;
  notes: string;
  date: string;
} 