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
  const  {form,handleSubmit } = useLogin();
const { t, i18n } = useTranslation();


 

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
