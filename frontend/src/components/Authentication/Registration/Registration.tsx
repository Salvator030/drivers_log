import { useForm } from "@mantine/form";
import {
  PasswordInput,
  TextInput,
  Button,
  Group,
  Title,
  Container,
} from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { registerRequest, LogingProps } from "../../../api/auth";
import { useTranslation } from "react-i18next";

export function Registration() {
  const { t, i18n } = useTranslation();

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
      const response = registerRequest(values); // API-Request
    } catch (error: any) {
      console.error(error); // Logge den gesamten Fehler
    }
  };

  return (
    <Container size="xs">
      <Title order={2}>Registration</Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label={t("registration.username")}
          placeholder={t("registration.username")}
          key={form.key("username")}
          {...form.getInputProps("username")}
        />
        <PasswordInput
          mt="sm"
          label={t("registration.password")}
          placeholder={t("registration.password")}
          key={form.key("password")}
          {...form.getInputProps("password")}
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <IconEye size={20} /> : <IconEyeOff size={20} />
          }
        />
        <PasswordInput
          mt="sm"
          label={t("registration.confirmPassword")}
          placeholder={t("registration.confirmPassword")}
          key={form.key("confirmPassword")}
          {...form.getInputProps("confirmPassword")}
        />
        <Group justify="center" mt="xs">
          <Button type="submit" mt="xs" variant="filled">
            {t("registration.registBtn")}
          </Button>
        </Group>
      </form>
    </Container>
  );
}
