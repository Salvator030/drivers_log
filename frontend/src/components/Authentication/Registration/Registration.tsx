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
import { useTranslation } from "react-i18next";
import { useRegistration } from "../../../hooks/useRegistration";

export function Registration() {
  const { t, i18n } = useTranslation();
  const { form, handleSubmit } = useRegistration();
  

 

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
