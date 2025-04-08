import { useForm } from "@mantine/form";
import { LogingProps, loginRequest } from "../api/auth";
import { useJwtStore } from "../stores/useJwtStore";
import { useApi } from "./useApi";

export const useLogin = () => {

    const setJwt = useJwtStore((state) => state.setJwt); // Zustand-Hook zum Setzen des JWT-Token
const {fetchAllData} = useApi()
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
    try {
      console.log("Form values:", values);
     
      const response = await loginRequest(values); // API-Request
      console.log("Login erfolgreich:", response);
      setJwt(response); // Setze den JWT-Token im Zustand
      fetchAllData()
    } catch (error: any) {
      console.error("Kompletter Fehler:", error); // Logge den gesamten Fehler
      console.error(
        "Fehlerdetails:",
        error.response?.status,
        error.response?.headers
      );
    }
  };

  return {form,handleSubmit}
}