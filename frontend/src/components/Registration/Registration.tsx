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
import axios from "axios";
import { FormEvent } from "react";

export function Registration() {
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
        value.length < 3 ? "Name must have at least 2 letters" : null,
      password: (value: string) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d]).{7,}$/.test(value)
          ? null
          : "Password must heve at least 7 characters, one uppercase letter, one number and one special character",
      confirmPassword: (value: string, values: {username: string, password: string}) =>
         value !== values.password ? 'Passwords did not match' : null,
},
  });

  const handleSubmit = async (values: {}) => {
    try {
      console.log("Form values:", values);
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        values
      );
      console.log("Registrierung erfolgreich:", response.data);
      // Weiterleitung zur Login-Seite oder Dashboard
    } catch (error: any) {
      console.error("Kompletter Fehler:", error); // Logge den gesamten Fehler
      console.error(
        "Fehlerdetails:",
        error.response?.status,
        error.response?.headers
      );
    }
  };

  return (
    <Container size="xs">
      <Title order={2}>Registration</Title>
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
         <PasswordInput
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          key={form.key('confirmPassword')}
          {...form.getInputProps('confirmPassword')}
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
