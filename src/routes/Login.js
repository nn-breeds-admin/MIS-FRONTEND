import React from "react";
import {
  Container,
  TextField,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { useDispatch } from "react-redux";
import { isAuth } from "../redux/actions/index.js";
import { useNavigate } from "react-router-dom";
import axios from "../axios-study";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorOpen, setErrorOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  const authHandle = () => {
    const userData = {
      userName: user,
      password: password,
    };
    axios
      .post("/staff/check-member", userData)
      .then((response) => {
        if (response.data.isExists) {
          navigate("/dashboard", {
            state: {
              name: user,
            },
          });
          dispatch(isAuth());
        } else {
          setErrorOpen(true);
        }
      })
      .catch((error) => {
        setErrorOpen(true);
      });
  };

  return (
    <Container
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5">M.I.S DASHBOARD</Typography>
      <div style={{ width: "60%", margin: "30px auto" }}>
        <TextField
          label="Enter your ID"
          variant="outlined"
          fullWidth
          onChange={(e) => {
            setUser(e.target.value);
          }}
          value={user}
        />
      </div>
      <div style={{ width: "60%", margin: "30px auto" }}>
        <TextField
          label="Enter Password"
          variant="outlined"
          type="password"
          fullWidth
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
      </div>
      <Button variant="contained" onClick={authHandle}>
        Log In
      </Button>

      <Snackbar open={errorOpen} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          User is not in the database
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
