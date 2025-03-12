import { useWeightLogs } from "@/hooks";
import { CommonLogsList } from "../components";
import type { WeightLogsScreenProps } from "@/navigation/types";

export const WeightLogs: React.FC<WeightLogsScreenProps> = ({ route }) => {
  const { petId } = route.params;

  const { logs, loading, error, adding, addError, addNewLog } =
    useWeightLogs(petId);

  const onSubmit = (data: string) => {
    addNewLog({
      weight: Number(data),
      date: new Date().toISOString(),
    });
  };

  return (
    <CommonLogsList
      type="weight"
      logs={logs}
      loading={loading}
      error={error}
      adding={adding}
      addError={addError}
      handleOnSubmit={onSubmit}
    />
  );
};
