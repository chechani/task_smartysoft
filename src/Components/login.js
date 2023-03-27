import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "350px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, "auto"),
    borderRadius: "20px",
    fontWeight: "bold",
    padding: "10px 0",
    fontSize: "1.2rem",
  },
  input: {
    fontSize: "1.2rem",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
}));

function Login() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  React.useEffect(() => {
    let auth = localStorage.getItem("result");

    if (auth) {
      navigate("/");
    }
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsValid(true);
  
    fetch("https://smartysoftware.in/api/method/professional.login.app_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usr: email,
        pwd: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message) {
          localStorage.setItem("result", JSON.stringify(data));
          localStorage.setItem("key",JSON.stringify(data.key_details.api_key));
          localStorage.setItem("secret",JSON.stringify(data.key_details.api_secret));
          setIsLoggedIn(true);
          navigate("/");
        } else {
          setIsValid(false);
          setErrorMessage("Invalid login credentials");
        }
      })
      .catch((error) => {
        setIsValid(false);
        if (error.message === "Network response was not ok") {
          setErrorMessage("Invalid login credentials");
        } else if (error.message.includes("usr")) {
          setErrorMessage("Invalid email");
        } else if (error.message.includes("pwd")) {
          setErrorMessage("Invalid password");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      });
  };
  
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography className={classes.heading} component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            className={classes.input}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            className={classes.input}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end"> 
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
           {isValid ? null : (
            <Typography variant="body1" color="error">
              {errorMessage}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
export default Login;

















// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Link, useNavigate } from "react-router-dom";
// import { Card } from "@mui/material";

// const theme = createTheme();

// export default function Login() {
//     const [email, setEmail] = React.useState("");
//     const [password, setPassword] = React.useState("");
//     //   const navigate = useNavigate();

//     //   React.useEffect(() => {
//     //     let auth = localStorage.getItem("user");

//     //     if (auth) {
//     //       navigate("/");
//     //     }
//     //   }, []);

//     //   const handleSubmit = async (event) => {
//     //     event.preventDefault();
//     //     console.log("email, password", email, password);
//     //     let result = await fetch("http://localhost:5000/login", {
//     //       method: "post",
//     //       body: JSON.stringify({ email, password }),
//     //       headers: {
//     //         "Content-Type": "application/json",
//     //       },
//     //     });
//     //     result = await result.json();
//     //     console.log(result);
//     //     if (result.email) {
//     //       localStorage.setItem("user", JSON.stringify(result));
//     //       navigate("/");
//     //     } else {
//     //       alert("please enter correct details");
//     //     }
//     //   };

//     return (
//         <Card sx={{ maxWidth: 400, ml: 55, mt: 15 }}>
//             <ThemeProvider theme={theme}>
//                 <Container component="main" maxWidth="xs">
//                     <CssBaseline />
//                     <Box
//                         sx={{
//                             marginTop: 6,
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                         }}
//                     >
//                         <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
//                             <LockOutlinedIcon />
//                         </Avatar>
//                         <Typography component="h1" variant="h5">
//                             Sign in
//                         </Typography>
//                         <Box
//                             component="form"
//                             //   onSubmit={handleSubmit}
//                             noValidate
//                             sx={{ mt: 1 }}
//                         >
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 id="email"
//                                 label="Email Address"
//                                 name="email"
//                                 autoComplete="email"
//                                 autoFocus
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 InputLabelProps={{ style: { fontSize: 11, fontWeight: "bolder" } }}
//                                 sx={{ m: 1, width: "35ch" }}
//                                 InputProps={{
//                                     sx: {
//                                         height: "45px",
//                                         fontSize: "12px",
//                                     }
//                                 }}
//                             />
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 type="password"
//                                 id="password"
//                                 autoComplete="current-password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 InputLabelProps={{ style: { fontSize: 11, fontWeight: "bolder" } }}
//                                 sx={{ m: 1, width: "35ch" }}
//                                 InputProps={{
//                                     sx: {
//                                         height: "45px",
//                                         fontSize: "12px",
//                                     }
//                                 }}
//                             />
//                             <Button
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"

//                                 sx={{mt: 3, mb: 2, ml:2, width: "35ch" }}
//                             >
//                                 Sign In
//                             </Button>
//                             <Grid container mb={2}>
//                                 <Grid item>
//                                     <span>Don't have an account? </span>
//                                     <Link
//                                         to="/signup"
//                                         variant="body2"
//                                         style={{ textDecoration: "none" }}

//                                     >
//                                         Sign Up
//                                     </Link>
//                                 </Grid>
//                             </Grid>
//                         </Box>
//                     </Box>
//                 </Container>
//             </ThemeProvider>
//         </Card>
//     );
// }
