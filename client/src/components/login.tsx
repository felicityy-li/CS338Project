import React, { useState } from "react";
import { fetchPassengerLogin } from "../services/fancyFeatureServices.ts";
import plane from "../images/plane.jpg";
import { Box, TextField, Button, Typography } from "@mui/material";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const result = await fetchPassengerLogin(email, password);
      if (result.success) {
        setError(null);
        console.log("yay")
      } else {
        setError(result.message || "Login failed.");
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <Box display="flex" height="100vh">
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${plane})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Box
        component="form"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
          sx={{ mb: 2, width: "80%" }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
          sx={{ mb: 2, width: "80%" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mb: 2,
            backgroundColor: "transparent",
            borderColor: "primary.main",
            color: "primary.main",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "#fff",
            },
          }}
        >
          Login
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Box>
  );
};

export default Login;
