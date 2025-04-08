import {
  Container,
  Title,
  TextInput,
  PasswordInput,
  Group,
  Button,
} from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useLogin } from '../../../hooks/useLogin';
import { useTranslation } from 'react-i18next';
import { useJwtStore } from "../../../stores/useJwtStore";
import { useForm } from "@mantine/form";
import { loginRequest } from "../../../api/auth";

export function Login() {
const setJwt = useJwtStore((state) => state.setJwt); // Zustand-Hook zum Setzen des JWT-Token
const { t, i18n } = useTranslation();


  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      username: (value: string) =>
        value.length < 3 ? t("login.validate.username") : null,
      password: (value: string) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d]).{7,}$/.test(value)
          ? null
          : t("login.validate.pasword"),
    },
  });

  const handleSubmit = async (values: { username: string;
    password: string;}) => {
    try {
      const response = await loginRequest(values);
      console.log("res: ",response)
      setJwt(response); // Setze den JWT-Token im Zustand
    //   console.log("Login erfolgreich:", jwtToken);
      // Weiterleitung zur Login-Seite oder Dashboard
    } catch (error: any) {
      console.error( error); // Logge den gesamten Fehler
    }
  };

  return (
    <Container size="xs">
      <Title order={2}>Login</Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label={t('login.username')}
          placeholder={t('login.username')}
          key={form.key("username")}
          {...form.getInputProps("username")}
        />
        <PasswordInput
          mt="sm"
          label={t('login.password')}
          placeholder={t('login.password')}
          key={form.key("password")}
          {...form.getInputProps("password")}
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <IconEye size={20} /> : <IconEyeOff size={20} />
          }
        />
        <Group justify="center" mt="xs">
          <Button type="submit" mt="xs" variant="filled">
            {t('login.loginBtn')}
          </Button>
        </Group>
      </form>
    </Container>
  );
}
