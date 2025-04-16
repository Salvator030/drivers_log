import { useForm } from "@mantine/form";
import { LogingProps, loginRequest } from "../api/auth";
import { useJwtStore } from "../stores/useJwtStore";
import { useApi } from "./useApi";

export const useLogin = () => {
  const { handleLogin } = useApi();
  const form = useForm<LogingProps>({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      username: (value: string) =>
        value.length < 3 ? "Name must have at least 2 letters" : null,
      password: (value: string) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d]).{7,}$/.test(value)
          ? null
          : "Password must heve at least 7 characters, one uppercase letter, one number and one special character",
    },
  });

  const handleSubmit = async (values: LogingProps) => {
    handleLogin(values);
  };

  return { form, handleSubmit };
};
