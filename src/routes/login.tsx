import {
  Stack,
  TextInput,
  Title,
  Button,
  Text,
  LoadingOverlay,
} from "@mantine/core";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

interface LoginResponse {
  access: string;
  refresh: string;
}

const login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:8000/api/token/pair",
        { username, password }
      );
      localStorage.setItem("eduAccessToken", response.data.access);
      localStorage.setItem("eduAccessTokenTimeStamp", Date.now().toString());

      navigate("/");
      //   onLogin(response.data.access);
    } catch (error) {
      console.error(error);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Stack bg={"#EAF2E1"} h={"100%"} w={"100%"} justify="center" align="center">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Stack bg={"#435334"} p={"4rem"} style={{ borderRadius: "1.6rem" }}>
        <Title c={"white"} order={4} ta={"center"} mb={"1rem"}>
          Login
        </Title>
        <form>
          <Stack gap={"2rem"}>
            <TextInput
              radius={"md"}
              size="xl"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              placeholder="Username"
              variant="filled"
              error={error}
            />
            <TextInput
              variant="filled"
              radius={"md"}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              size="xl"
              placeholder="Password"
              type="password"
              error={error}
            />
            <Button
              h={"5.6rem"}
              variant="filled"
              color={"#FFEED6"}
              w={"100%"}
              onClick={handleLogin}
            >
              <Text px={"2rem"} size="md" c={"#435334"} fw={700}>
                Login
              </Text>
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default login;
