import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { postData } from "./Api.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 *  Displays Copyright data
 * @function
 * @param {Props} props
 * @returns {JSX.Element}- Copyright Component
 */
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Learn Languages App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

/**
 * Signup component page for user registration.
 *
 * @component
 * @returns {JSX.Element} - The SignUp component.
 */
export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  /**
   * Handles form submission for user registration.
   *
   * @function
   * @async
   * @param {Object} event - The form submission event.
   * @property {Object} data - Data containing username and password signup information.
   * @property {promise<Object>} res - Promise response containing the signup authorization data.
   * @throws {Error} Throws error if issues occur during the user registration process.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
      role: "student",
    };
    console.log(data);
    try {
      const res = await postData("/api/users/signup", data);
      if (res.message === "User registered successfully") {
        // Successful signup
        console.log("User registered successfully");
        setErrorMessage("");
        navigate("/signin");
      } else if (res.error === "Username already in use") {
        // Username already in use
        setErrorMessage(
          "Username already in use. Please choose a different username."
        );
      } else {
        // Handle other status codes
        console.log("Unexpected response status:", res.status);
        setErrorMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {errorMessage && (
              <Typography variant="body2" color="error" gutterBottom>
                {errorMessage}
              </Typography>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
