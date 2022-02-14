import useSWR from "swr";

let value: string | undefined = undefined;

const useToast = () => {
  const { data: message, mutate } = useSWR("toast", () => {
    return value;
  });
  return {
    message,
    mutate: (updateValue: string | undefined) => {
      value = updateValue;
      return mutate();
    },
  };
};

export default useToast;
