import { useForm } from "@mantine/form";
import { LogingProps } from "../api/auth";
import { useTranslation } from "react-i18next";
import { useApi } from "./useApi";

export const useRegistration = () => {  
  const { t, i18n } = useTranslation();
const {handleRegist} = useApi();

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
          username: "",
          password: "",
          confirmPassword: "",
        },
    
        // functions will be used to validate values at corresponding key
        validate: {
          username: (value: string) =>
            value.length < 3 ? t("registration.validate.username") : null,
          password: (value: string) =>
            /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d]).{7,}$/.test(value)
              ? null
              : t("registration.validate.password"),
          confirmPassword: (
            value: string,
            values: { username: string; password: string }
          ) =>
            value !== values.password
              ? t("registration.validate.confirmPwd")
              : null,
        },
      });

       const handleSubmit = async (values: LogingProps) => {
          try {
            const response = handleRegist(values); // API-Request
          } catch (error: any) {
            console.error(error); // Logge den gesamten Fehler
          }
        };

        return { form, handleSubmit };

}