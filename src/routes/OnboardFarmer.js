import * as React from "react";
import {
  Button,
  ButtonGroup,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  Snackbar,
} from "@mui/material";

import MuiAlert from "@mui/material/Alert";
import notUploaded from "../assets/notUploaded.jpeg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { OnboardData } from "../data/onboardData";
import axios from "../axios-study";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "10px auto",
    alignItems: "center",
    width: "90%",
  },
  img_container: {
    height: 200,
    width: "100%",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  iconSuccess: {
    width: 50,
    height: 50,
    color: "green",
  },
  iconNotSuccess: {
    width: 50,
    height: 50,
    color: "red",
  },
  div: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  margin: {
    margin: "20px auto",
  },
};

const IconSuccess = () => {
  return <CheckCircleIcon style={styles.iconSuccess} />;
};

const IconNotSuccess = () => {
  return <CancelIcon style={styles.iconNotSuccess} />;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OnboardFarmer = () => {
  // states for toast
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
    setSuccessOpen(false);
  };

  // display states
  const [display, setDisplay] = React.useState([true, false, false, false]);

  // functions for basic information

  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [dob, setDob] = React.useState();
  const [phoneNum, setPhoneNum] = React.useState();
  const [phoneNum2, setPhoneNum2] = React.useState();

  // display functions for adhaar and kyc uploads

  const [adhaarFront, setAdhaarFront] = React.useState();
  const [adhaarBack, setAdhaarBack] = React.useState();
  const [passbook, setPassbook] = React.useState();
  const [kyc, setKyc] = React.useState();

  const uploadAdhaarFront = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64AdhaarFront(file);
  };
  const uploadAdhaarBack = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64AdhaarBack(file);
  };
  const uploadPassbook = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64Passbook(file);
  };
  const uploadKyc = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64Kyc(file);
  };

  const onLoadAdhaarFront = (fileString) => {
    setAdhaarFront(fileString);
  };
  const onLoadAdhaarBack = (fileString) => {
    setAdhaarBack(fileString);
  };
  const onLoadPassbook = (fileString) => {
    setPassbook(fileString);
  };
  const onLoadKyc = (fileString) => {
    setKyc(fileString);
  };

  const getBase64AdhaarFront = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoadAdhaarFront(reader.result);
    };
  };
  const getBase64AdhaarBack = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoadAdhaarBack(reader.result);
    };
  };
  const getBase64Passbook = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoadPassbook(reader.result);
    };
  };
  const getBase64Kyc = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoadKyc(reader.result);
    };
  };

  // functions for address & project part

  const [state, setState] = React.useState();
  const [district, setDistrict] = React.useState();
  const [taluka, setTaluka] = React.useState();
  const [village, setVillage] = React.useState();
  const [project, setProject] = React.useState();
  const [activity, setActivity] = React.useState();

  const [amount, setAmount] = React.useState();
  const [quantity, setQuantity] = React.useState();
  const [numberOfFarmers, setNumberOfFarmers] = React.useState();

  const changeState = (e) => {
    setState(e.target.value);
    setDistrict();
    setTaluka();
    setVillage();
  };

  const changeDistrict = (e) => {
    setDistrict(e.target.value);
    setTaluka();
    setVillage();
  };

  const changeTaluka = (e) => {
    setTaluka(e.target.value);
    setVillage();
  };
  const changeVillage = (e) => {
    setVillage(e.target.value);
  };

  const changeProject = (e) => {
    setProject(e.target.value);
  };

  const changeActivity = (e) => {
    setActivity(e.target.value);
  };

  // functions for notes
  const [note, setNote] = React.useState();

  // functions for checkbox
  const [checked, setChecked] = React.useState([false, false, false, false]);

  React.useEffect(() => {
    setChecked([
      firstName &&
        lastName &&
        dob &&
        phoneNum &&
        phoneNum2 &&
        phoneNum.length === 10 &&
        phoneNum2.length === 10,
      adhaarFront && adhaarBack && kyc && passbook,
      state &&
        district &&
        taluka &&
        village &&
        project &&
        activity &&
        quantity &&
        amount &&
        numberOfFarmers,
      note,
    ]);
  }, [
    firstName,
    lastName,
    dob,
    phoneNum,
    phoneNum2,
    adhaarBack,
    adhaarFront,
    kyc,
    passbook,
    note,
    activity,
    amount,
    district,
    state,
    taluka,
    village,
    project,
    quantity,
    numberOfFarmers,
  ]);

  // api call
  const createFarmer = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dob,
      phoneNumber: phoneNum,
      phoneNumber2: phoneNum2,
      notes: note,
      adhaarFrontImage: adhaarFront,
      adhaarBackImage: adhaarBack,
      passbookImage: passbook,
      kycImage: kyc,
      stateName: state,
      districtName: district,
      talukaName: taluka,
      villageName: village,
      projectName: project,
      activityName: activity,
      numberOfItemsSold: quantity,
      numberOfGoatFarmers: numberOfFarmers,
      amountReceived: amount,
    };

    let ok = false;
    for (let i = 0; i < checked.length; i++) {
      if (checked[i]) ok = true;
      else {
        ok = false;
        break;
      }
    }

    if (ok) {
      axios
        .post("/farmer/create-farmer", data)
        .then((response) => {
          setFirstName();
          setLastName();
          setDob();
          setAdhaarFront();
          setAdhaarBack();
          setKyc();
          setPassbook();
          setNote();
          setPhoneNum();
          setPhoneNum2();
          setState();
          setDistrict();
          setTaluka();
          setVillage();
          setProject();
          setActivity();
          setQuantity();
          setNumberOfFarmers();
          setAmount();
          setSuccessOpen(true);
          setDisplay([true, false, false, false]);
        })
        .catch((err) => {
          console.log(err);
          setErrorOpen(true);
        });
    } else {
      setErrorOpen(true);
    }
  };

  return (
    <Container
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Onboard Farmer</Typography>
      <Container style={{ width: "100%" }}>
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            margin: "30px 0",
            width: "100%",
          }}
        >
          <div style={styles.div}>
            {checked[0] ? <IconSuccess /> : <IconNotSuccess />}
            <Typography>Basic Details</Typography>
          </div>
          <div style={styles.div}>
            {checked[1] ? <IconSuccess /> : <IconNotSuccess />}
            <Typography>Adhaar and Kyc</Typography>
          </div>
          <div style={styles.div}>
            {checked[2] ? <IconSuccess /> : <IconNotSuccess />}
            <Typography>Address & Project</Typography>
          </div>
          <div style={styles.div}>
            {checked[3] ? <IconSuccess /> : <IconNotSuccess />}
            <Typography>Notes</Typography>
          </div>
        </Container>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "30px 0",
            width: "100%",
          }}
        >
          <Button onClick={() => setDisplay([true, false, false, false])}>
            Basic Details
          </Button>
          <Button onClick={() => setDisplay([false, true, false, false])}>
            Adhaar and KYC Verification
          </Button>

          <Button onClick={() => setDisplay([false, false, true, false])}>
            Address & Project Selection
          </Button>

          <Button onClick={() => setDisplay([false, false, false, true])}>
            Others (Notes)
          </Button>
        </ButtonGroup>

        <Container>
          {/* Basic Details Component */}
          {display[0] ? (
            <div style={styles.container}>
              <Typography variant="h5">Basic Details</Typography>
              <TextField
                key="firstName"
                label="First Name"
                style={{ margin: "10px 0" }}
                fullWidth
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
              />
              <TextField
                label="Last Name"
                style={{ margin: "10px 0" }}
                fullWidth
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              <TextField
                style={{ margin: "10px 0" }}
                type="date"
                fullWidth
                helperText="Enter Date Of Birth "
                onChange={(e) => {
                  setDob(e.target.value);
                }}
                value={dob}
              />
              <TextField
                style={{ margin: "10px 0" }}
                type="number"
                label="Phone Number 1"
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
                onChange={(e) => setPhoneNum(e.target.value)}
                value={phoneNum}
                fullWidth
              />
              <TextField
                style={{ margin: "10px 0" }}
                type="number"
                label="Phone Number 2"
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
                onChange={(e) => setPhoneNum2(e.target.value)}
                value={phoneNum2}
                fullWidth
              />
            </div>
          ) : (
            <></>
          )}

          {/* Adhaar and kyc component*/}
          {display[1] ? (
            <div style={styles.container}>
              <Typography variant="h5">KYC & Adhaar Upload</Typography>
              <Container
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                  margin: "20px auto",
                  flexWrap: "wrap",
                }}
              >
                <Card sx={{ width: 300, margin: 1 }}>
                  <div style={styles.img_container}>
                    {adhaarFront && adhaarFront.length ? (
                      <img src={adhaarFront} alt="" style={styles.img} />
                    ) : (
                      <img src={notUploaded} alt="" style={styles.img} />
                    )}
                  </div>
                  <CardContent>
                    <Typography gutterBottom align="center">
                      Upload Adhaar Front Side
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      component="label"
                      style={{ margin: "0px auto" }}
                    >
                      Upload
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={uploadAdhaarFront}
                      />
                    </Button>
                  </CardActions>
                </Card>

                <Card sx={{ width: 300, margin: 1 }}>
                  <div style={styles.img_container}>
                    {adhaarBack && adhaarBack.length ? (
                      <img src={adhaarBack} alt="" style={styles.img} />
                    ) : (
                      <img src={notUploaded} alt="" style={styles.img} />
                    )}
                  </div>
                  <CardContent>
                    <Typography gutterBottom align="center">
                      Upload Adhaar Back Side
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      component="label"
                      style={{ margin: "0px auto" }}
                    >
                      Upload
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={uploadAdhaarBack}
                      />
                    </Button>
                  </CardActions>
                </Card>

                <Card sx={{ width: 300, margin: 1 }}>
                  <div style={styles.img_container}>
                    {passbook && passbook.length ? (
                      <img src={passbook} alt="" style={styles.img} />
                    ) : (
                      <img src={notUploaded} alt="" style={styles.img} />
                    )}
                  </div>
                  <CardContent>
                    <Typography gutterBottom align="center">
                      Upload Passbook Image
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      component="label"
                      style={{ margin: "0px auto" }}
                    >
                      Upload
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={uploadPassbook}
                      />
                    </Button>
                  </CardActions>
                </Card>

                <Card sx={{ width: 300, margin: 1 }}>
                  <div style={styles.img_container}>
                    {kyc && kyc.length ? (
                      <img src={kyc} alt="" style={styles.img} />
                    ) : (
                      <img src={notUploaded} alt="" style={styles.img} />
                    )}
                  </div>
                  <CardContent>
                    <Typography gutterBottom align="center">
                      Upload KYC Image
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      component="label"
                      style={{ margin: "0px auto" }}
                    >
                      Upload
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={uploadKyc}
                      />
                    </Button>
                  </CardActions>
                </Card>
              </Container>
            </div>
          ) : (
            <></>
          )}

          {/* Address & Project Selection */}
          {display[2] ? (
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" style={styles.margin}>
                Address and Project Selection
              </Typography>
              <>
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state}
                  label="Select State"
                  select
                  onChange={changeState}
                  fullWidth
                  style={styles.margin}
                >
                  {OnboardData.State.map((item) => (
                    <MenuItem value={item.Name}>{item.Name}</MenuItem>
                  ))}
                </TextField>

                {state === "Uttar Pradesh (उत्तर प्रदेश)" ? (
                  <TextField
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={district}
                    label="Select District"
                    select
                    onChange={changeDistrict}
                    fullWidth
                    style={styles.margin}
                  >
                    {OnboardData.State[0].District.map((item) => (
                      <MenuItem value={item.DistrictName}>
                        {item.DistrictName}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <>
                    <TextField
                      label="Enter District Name If State Not Uttar Pradesh"
                      fullWidth
                      style={styles.margin}
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </>
                )}

                {state &&
                state === "Uttar Pradesh (उत्तर प्रदेश)" &&
                district ? (
                  <TextField
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={taluka}
                    label="Select Taluka"
                    select
                    onChange={changeTaluka}
                    fullWidth
                    style={styles.margin}
                  >
                    {(() => {
                      const index = OnboardData.State[0].District.findIndex(
                        (object) => object.DistrictName === district
                      );
                      return OnboardData.State[0].District[index].Taluka.map(
                        (item) => (
                          <MenuItem value={item.TalukaName}>
                            {item.TalukaName}
                          </MenuItem>
                        )
                      );
                    })()}
                  </TextField>
                ) : (
                  <TextField
                    label="Enter Taluka Name"
                    fullWidth
                    style={styles.margin}
                    onChange={(e) => setTaluka(e.target.value)}
                    value={taluka}
                  />
                )}

                {state === "Uttar Pradesh (उत्तर प्रदेश)" &&
                district &&
                taluka ? (
                  <TextField
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={village}
                    label="Select Village"
                    select
                    onChange={changeVillage}
                    fullWidth
                    style={styles.margin}
                  >
                    {(() => {
                      const districtIndex =
                        OnboardData.State[0].District.findIndex(
                          (object) => object.DistrictName === district
                        );

                      const talukaIndex = OnboardData.State[0].District[
                        districtIndex
                      ].Taluka.findIndex(
                        (object) => object.TalukaName === taluka
                      );

                      console.log(talukaIndex);
                      return OnboardData.State[0].District[
                        districtIndex
                      ].Taluka[talukaIndex].Villages.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ));
                    })()}
                  </TextField>
                ) : (
                  <TextField
                    label="Enter Village Name"
                    fullWidth
                    style={styles.margin}
                    onChange={(e) => setVillage(e.target.value)}
                    value={village}
                  />
                )}

                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={project}
                  label="Select Project"
                  select
                  onChange={changeProject}
                  fullWidth
                  style={styles.margin}
                >
                  {OnboardData.Project.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </TextField>

                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={activity}
                  label="Select Activity"
                  select
                  onChange={changeActivity}
                  fullWidth
                  style={styles.margin}
                >
                  {OnboardData.Activity.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  label="No. of items's sold"
                  style={styles.margin}
                  type="number"
                  onChange={(e) => setQuantity(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="No. of goat farmers"
                  style={styles.margin}
                  type="number"
                  onChange={(e) => setNumberOfFarmers(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Amount Received"
                  style={styles.margin}
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </>
            </Container>
          ) : (
            <></>
          )}

          {/* Notes */}
          {display[3] ? (
            <div style={styles.container}>
              <Typography variant="h5">Notes</Typography>
              <TextField
                label="Enter the Notes"
                fullWidth
                multiline
                minRows={15}
                style={{ margin: "20px auto" }}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button variant="contained" onClick={createFarmer}>
                Onboard Farmer
              </Button>
            </div>
          ) : (
            <></>
          )}
        </Container>
        <Snackbar
          open={errorOpen}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Fill all fields !!! else put dummy and fill in notes section
          </Alert>
        </Snackbar>

        <Snackbar
          open={successOpen}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Farmer onboarded successfully
          </Alert>
        </Snackbar>
      </Container>
    </Container>
  );
};

export default OnboardFarmer;
