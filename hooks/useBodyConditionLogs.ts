import { useState, useEffect, useCallback } from "react";

import type { BodyConditionLog } from "@/types";
import { petService } from "@/services/petService";

export function useBodyConditionLogs(petId: string) {
  const [logs, setLogs] = useState<BodyConditionLog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [adding, setAdding] = useState<boolean>(false);
  const [addError, setAddError] = useState<string | null>(null);

  const addNewLog = async (newLog: Omit<BodyConditionLog, "id" | "pet_id">) => {
    try {
      setAdding(true);
      setAddError(null);
      const addedLog = await petService.createBodyConditionLog(newLog, petId);
      setLogs((prevLogs) => [addedLog, ...prevLogs]);
    } catch (err: unknown) {
      setAddError(err instanceof Error ? err.message : "Something went wrong");
      throw err;
    } finally {
      setAdding(false);
    }
  };

  const fetchLogs = useCallback(async () => {
    if (!petId) return;

    try {
      setLoading(true);
      setError(null);

      const data = await petService.getBodyConditionLogs(petId);
      setLogs(data);
    } catch (err: unknown) {
      setLogs([]);
      setError(err instanceof Error ? err.message : "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [petId]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    loading,
    error,
    refetch: fetchLogs,
    adding,
    addError,
    addNewLog,
  };
}
