"use client";
import React, { useEffect, useState } from "react";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  TextField,
  Container,
  Avatar,
  Typography,
  Grid,
  Paper,
  Button,
  createTheme,
  Snackbar,
  Alert,
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";
import styles from "./login.module.css";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import { useRouter } from "next/navigation";
const theme = createTheme();

// const useStyles = makeStyles(() => ({
//   container: {
//     background: "#0b478ceb",
//     height: "100vh",
//   },
//   login: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//   },
//   paper: {
//     width: "700px",
//     display: "flex",
//     height: "369.250px",
//     flexDirection: "row",
//     alignItems: "center",
//     // padding: "20px",
//     borderRadius: "10px",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: "#3cb1a0",
//   },
//   form: {
//     display: "flex",
//     alignItems: "center",
//     flexDirection: "column",
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   leftSide: {
//     color: "#fff",
//     display: "flex",
//     background: "#1565c0 url(images/login-bg.png) no-repeat",
//     flexDirection: "column",
//     backgroundSize: "cover",
//     height: "inherit",
//     alignItems: "center",
//     padding: "20px",
//   },
//   rightSide: {
//     width: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, .15)",
//     backdropFilter: "blur(5px)",
//     padding: "20px",
//   },
// }));

export default function LoginPage() {
  const [params, setParams] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  function valueChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const { value, name } = e.target;
    setParams({ ...params, [name]: value });
  }

  const login = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:7000/api/login", {
        ...params,
        role: "admin",
      });
      if (data?.type === "error") {
        setError({ type: "error", message: data?.message || data?.error });
        setLoading(false);
      }
      if (data?.type === "success") {
        setError({ type: "success", message: data?.message || data?.error });
        localStorage.setItem("token", data?.token);
        setLoading(false);
        router.push("/admin/users");
      }
    } catch (e) {
      const { data } = e.response;
      setLoading(false);
      setError({ type: "error", message: data?.error || data?.message });
    }
  };
  // const classes = useStyles();
  useEffect(() => {
    console.log(error, "-- erro ");
  }, [error]);

  return (
    <Container maxWidth={"xl"} className={styles.container}>
      {/*<SnowStorm flakesMax={1000} flakesMaxActive={500} />*/}
      <Grid item md={12} className={styles.login}>
        <Paper elevation={3} className={styles.paper}>
          <Grid item md={6} className={styles.leftSide}>
            <Player
              autoplay
              loop
              src="https://assets7.lottiefiles.com/packages/lf20_ymbzgxgc.json"
              style={{ height: "280px", width: "300px", marginTop: "25px" }}
            >
              <Controls visible={false} />
            </Player>
            {/*<img src={'images/logo.png'} style={{objectFit:'contain',height:'40px'}}/>*/}
          </Grid>
          <Grid item md={6} className={styles.rightSide}>
            <form
              className={styles.form}
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                // Login(e);
              }}
            >
              <Avatar className={styles.avatar}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <TextField
                name="email"
                label="Username"
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                margin="normal"
                fullWidth
                onChange={valueChange}
              />
              <TextField
                onChange={valueChange}
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                size="small"
                margin="normal"
                fullWidth
              />
              <Button
                type="submit"
                fullWidth
                color="primary"
                disabled={loading}
                variant="contained"
                // style={{ background: "#1565c0", color: "#fff" }}
                className={styles.submit}
                onClick={() => login()}
              >
                Sign In
              </Button>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid> */}
            </form>
          </Grid>
        </Paper>
      </Grid>

      {Object.keys(error).length && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={!!error?.type}
          autoHideDuration={6000}
          onClose={() => {
            setError({});
          }}
        >
          <Alert
            onClose={() => setError({})}
            severity={error?.type}
            sx={{ width: "100%" }}
          >
            {error?.message}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
}
