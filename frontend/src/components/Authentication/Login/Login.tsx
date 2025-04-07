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

export function Login() {

  const {form,handleSubmit} = useLogin();

  return (
    <Container size="xs">
      <Title order={2}>Login</Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="Username"
          placeholder="Userame"
          key={form.key("username")}
          {...form.getInputProps("username")}
        />
        <PasswordInput
          mt="sm"
          label="Password"
          placeholder="Password"
          key={form.key("password")}
          {...form.getInputProps("password")}
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <IconEye size={20} /> : <IconEyeOff size={20} />
          }
        />
        <Group justify="center" mt="xs">
          <Button type="submit" mt="xs" variant="filled">
            Submit
          </Button>
        </Group>
      </form>
    </Container>
  );
}
