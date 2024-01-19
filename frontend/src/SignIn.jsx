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
import { postData } from "./Api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

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
 * Component representing the Login page for user authentication.
 *
 * @component
 * @returns {JSX.Element} The JSX element of the Login component.
 */
export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  /**
   * Handles form submission for user login.
   *
   * @function
   * @async
   * @param {Object} event - The form submission event.
   * @property {Object} data - Data containing username and password login information.
   * @property {promise<Object>} res - Promise response containing the access authorization data.
   * @property {Object} decodedToken - Decoded information from token containing the username and user role.
   * @property {string} role - Role decoded from accessToken.
   * @throws {Error} Throws error if issues occur during login process.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    console.log(data);
    try {
      const res = await postData("/api/users/login", data);
      if (res.accessToken) {
        const decodedToken = jwtDecode(res.accessToken);
        const { name, role } = decodedToken;

        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("role", role);

        setErrorMessage("");
        if (role === "student") {
          navigate("/dashboard");
        }

        if (role === "admin") {
          navigate("/admin/dashboard");
        }
      } else if (res !== null && res.accessToken === null) {
        setErrorMessage("Error while logging in, please try again.");
      } else {
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
