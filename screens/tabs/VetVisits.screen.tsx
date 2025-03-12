import { useVisitsLogs } from "@/hooks";
import { CommonLogsList } from "../components";
import type { VetVisitsScreenProps } from "@/navigation/types";

export const VetVisits: React.FC<VetVisitsScreenProps> = ({ route }) => {
  const { petId } = route.params;
  const { logs, loading, error, adding, addError, addNewLog } =
    useVisitsLogs(petId);

  const onSubmit = (data: string) => {
    addNewLog({
      notes: data,
      date: new Date().toISOString(),
    });
  };

  return (
    <CommonLogsList
      type="vet"
      logs={logs}
      loading={loading}
      error={error}
      adding={adding}
      addError={addError}
      handleOnSubmit={onSubmit}
    />
  );
};
