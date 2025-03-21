import { CommonLogsList } from "../components";
import type { BodyConditionScreenProps } from "@/navigation/types";
import { useBodyConditionLogs } from "@/hooks/useBodyConditionLogs";

export const BodyCondition: React.FC<BodyConditionScreenProps> = ({
  route,
}) => {
  const { petId } = route.params;
  const { logs, loading, error, adding, addError, addNewLog } =
    useBodyConditionLogs(petId);

  const onSubmit = (data: string) => {
    addNewLog({
      body_condition: data,
      date: new Date().toISOString(),
    });
  };

  return (
    <CommonLogsList
      type="body"
      logs={logs}
      loading={loading}
      error={error}
      adding={adding}
      addError={addError}
      handleOnSubmit={onSubmit}
    />
  );
};
