import { useForm } from "@mantine/form";
import { PasswordInput, TextInput, Button, Group, Title, Container } from "@mantine/core";
import { IconEye, IconEyeOff } from '@tabler/icons-react';
export function Login() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { name: "", password: "secret" },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value: string) =>
        value.length < 3 ? "Name must have at least 2 letters" : null,
      password: (value: string) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d]).{7,}$/.test(value)
          ? null
          : "Password must heve at least 7 characters, one uppercase letter, one number and one special character",
    },
  });
  return (
    <Container size="xs" >
      <Title order={2}>Login</Title>
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput
          label="Name"
          placeholder="Name"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <PasswordInput
          mt="sm"
          label="Password"
          placeholder="Password"
          key={form.key("password")}
          {...form.getInputProps("password")}
          visibilityToggleIcon={({ reveal }) => (
            reveal ? <IconEye size={20} /> : <IconEyeOff size={20} />
          )}
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
