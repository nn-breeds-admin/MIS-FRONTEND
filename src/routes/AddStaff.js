import * as React from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Container,
  Button,
  Typography,
  Snackbar,
  AppBar,
  Box,
  Toolbar,
} from "@mui/material";

import MuiAlert from "@mui/material/Alert";
import axios from "../axios-study";
import { isAdminLoggedOut, isLoggedOut } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddStaff = () => {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
    setOpen(false);
    setErrorOpen(false);
  };

  const addMember = () => {
    if (name.length > 0 && password.length >= 8) {
      const user = {
        userName: name,
        password: password,
      };

      axios
        .post("/staff/check-member", user)
        .then((response) => {
          if (response.data.isExists) {
            setErrorOpen(true);
          }
        })
        .catch((error) => {
          setErrorOpen(true);
        });

      axios
        .post("/staff/add-staff", user)
        .then((response) => {
          setSuccessOpen(true);
          setName("");
          setPassword("");
          console.log(response);
        })
        .catch((error) => {
          setErrorOpen(true);
          setName("");
          setPassword("");
          console.log(error);
          return;
        });
    } else {
      setOpen(true);
      setName("");
      setPassword("");
    }
  };

  const logout = () => {
    dispatch(isAdminLoggedOut());
    dispatch(isLoggedOut());
    navigate("/");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin
            </Typography>
            <Button color="inherit" variant="outlined" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container
        style={{
          width: "100%",
          marginTop: 50,
          overflowY: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">Add Staff Members</Typography>
        <TextField
          label="Enter the User Name"
          style={{ width: "80%", marginTop: "30px" }}
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <TextField
          label="Enter the password"
          style={{ width: "80%", marginTop: "30px" }}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <Button
          variant="contained"
          style={{ marginTop: "30px" }}
          onClick={addMember}
        >
          Add New User
        </Button>

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Please enter valid user name and password of more than 8 characters
            long !!
          </Alert>
        </Snackbar>
        <Snackbar
          open={successOpen}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Success !!
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorOpen}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Choose different username and password
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default AddStaff;
