import { useForm } from "@mantine/form";
import { PasswordInput, TextInput, Button, Group } from "@mantine/core";

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
          : "Invalid password",
    },
  });
  return (
    <div>
      <h1>Login</h1>
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
        />
        <Group justify="center" mt="xl">
          <Button type="submit" mt="sm" variant="filled">
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
}
