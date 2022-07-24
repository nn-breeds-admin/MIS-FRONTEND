import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isAdminAuth, isLoggedOut } from "../redux/actions/index";

import {
  TextField,
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Modal,
  Snackbar,
} from "@mui/material";

import MuiAlert from "@mui/material/Alert";

import AgricultureIcon from "@mui/icons-material/Agriculture";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import LockIcon from "@mui/icons-material/Lock";

import notRegistered from "../assets/no-farmer-registered.jpeg";

import FarmerCard from "../components/FarmerCard";
import axios from "../axios-study";

const drawerWidth = 260;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const handleLogout = () => {
    dispatch(isLoggedOut());
    navigate("/");
  };

  const [errorOpen, setErrorOpen] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  const verifyAdmin = () => {
    const data = { code: code };
    axios
      .post("/staff/check-admin", data)
      .then((response) => {
        if (response.data.isAdmin) {
          dispatch(isAdminAuth());
          navigate("/add-staff");
        } else {
          console.log("not found");
          setErrorOpen(true);
          setCode("");
        }
      })
      .catch((error) => {
        setCode("");
        setOpen(false);
        setErrorOpen(true);
        console.log(error);
      });
  };

  const [farmers, setFarmers] = React.useState();
  const [loader, setLoader] = React.useState(true);
  React.useEffect(() => {
    axios
      .get("/farmer/get-farmers")
      .then((response) => {
        setFarmers(response.data);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ display: "flex", opacity: loader ? "50%" : "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-around" }}>
          <Typography variant="h6" noWrap component="div">
            MIS DASHBOARD
          </Typography>
          <Typography variant="h6">User : {location.state.name}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding style={{ margin: "10px 0" }}>
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText>Existing Farmers</ListItemText>
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem disablePadding style={{ margin: "10px 0" }}>
            <ListItemButton onClick={() => navigate("/onboard")}>
              <ListItemIcon>
                <AgricultureIcon />
              </ListItemIcon>
              <ListItemText>Onboard Farmer</ListItemText>
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem disablePadding style={{ margin: "10px 0" }}>
            <ListItemButton onClick={handleOpen}>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText>Add Staff Members</ListItemText>
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem disablePadding style={{ margin: "10px 0" }}>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Log Out</ListItemText>
            </ListItemButton>
          </ListItem>

          <Divider />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <>
          {!loader && farmers && farmers.length ? (
            <>
              {farmers.map((item) => (
                <>
                  <FarmerCard
                    firstName={item.firstName}
                    lastName={item.lastName}
                    phoneNumber={item.phoneNumber}
                    phoneNumber2={item.phoneNumber2}
                    notes={item.notes}
                    dateOfBirth={item.dateOfBirth}
                    adhaarFrontImage={item.adhaarFrontImage}
                    adhaarBackImage={item.adhaarBackImage}
                    passbookImage={item.passbookImage}
                    kycImage={item.kycImage}
                    stateName={item.stateName}
                    districtName={item.districtName}
                    talukaName={item.talukaName}
                    villageName={item.villageName}
                    projectName={item.projectName}
                    activityName={item.activityName}
                    numberOfItemsSold={item.numberOfItemsSold}
                    numberOfGoatFarmers={item.numberOfGoatFarmers}
                    amountReceived={item.amountReceived}
                  />
                </>
              ))}
            </>
          ) : (
            <Typography
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "80vh",
              }}
            >
              <Typography variant="h4">No Farmer Registered !</Typography>
              <img src={notRegistered} alt="" />
              <Button variant="contained" onClick={() => navigate("/onboard")}>
                Onboard Farmer Now
              </Button>
            </Typography>
          )}
        </>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
            >
              Enter the code
            </Typography>
            <TextField
              label="Enter the code"
              fullWidth
              style={{ marginTop: 20 }}
              type="password"
              onChange={(e) => setCode(e.target.value)}
              value={code}
            />
            <Button
              variant="contained"
              style={{ margin: "20px auto" }}
              onClick={verifyAdmin}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </Box>
      <Snackbar
        open={errorOpen}
        autoHideDuration={2000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Wrong code entered
        </Alert>
      </Snackbar>
    </Box>
  );
}
