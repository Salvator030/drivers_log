import React from 'react';
import {
  Container,
  Title,
  TextInput,
  PasswordInput,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import axios from "axios";
import { useJwtStore } from '../../../hooks/useJwtStore';

export function Login() {
const setJwt = useJwtStore((state) => state.setJwt); // Zustand-Hook zum Setzen des JWT-Token

  const form = useForm({
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

  const handleSubmit = async (values: {}) => {
    try {
      console.log("Form values:", values);
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        values
      );
      console.log("Login erfolgreich:", response.data.jwt);
      setJwt(response.data.jwt); // Setze den JWT-Token im Zustand
    //   console.log("Login erfolgreich:", jwtToken);
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
