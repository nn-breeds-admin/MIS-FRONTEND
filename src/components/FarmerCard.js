import React from "react";

import { Card, Stack, Typography } from "@mui/material";

const FarmerCard = (props) => {
  return (
    <Card style={{ padding: 10, margin: "10px 0" }} elevation={4}>
      <Stack spacing={1}>
        <Typography
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h5" style={{ margin: "10px" }}>
            First Name : {props.firstName}
          </Typography>
          <Typography variant="h5" style={{ margin: "10px" }}>
            Last Name : {props.lastName}
          </Typography>
        </Typography>
        <Typography
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" style={{ margin: "10px" }}>
            Date Of Birth : {props.dateOfBirth}
          </Typography>
          <Typography variant="h6" style={{ margin: "10px" }}>
            Phone Number : {props.phoneNumber}
          </Typography>
          <Typography variant="h6" style={{ margin: "10px" }}>
            Phone Number 2 : {props.phoneNumber2}
          </Typography>
        </Typography>

        <Typography
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" style={{ margin: "10px" }}>
            State Name : {props.stateName}
          </Typography>
          <Typography variant="h6" style={{ margin: "10px" }}>
            District Name : {props.districtName}
          </Typography>
        </Typography>

        <Typography
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" style={{ margin: "10px" }}>
            Taluka Name : {props.talukaName}
          </Typography>
          <Typography variant="h6" style={{ margin: "10px" }}>
            Village Name : {props.villageName}
          </Typography>
        </Typography>

        <Typography
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" style={{ margin: "10px" }}>
            Project Name : {props.projectName}
          </Typography>
          <Typography variant="h6" style={{ margin: "10px" }}>
            Activity Name : {props.activityName}
          </Typography>
        </Typography>

        <Typography
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" style={{ margin: "10px" }}>
            Items Sold : {props.numberOfItemsSold}
          </Typography>
          <Typography variant="h6" style={{ margin: "10px" }}>
            Number of goat farmers : {props.numberOfGoatFarmers}
          </Typography>
          <Typography variant="h6" style={{ margin: "10px" }}>
            Amount Received : {props.amountReceived} ₹
          </Typography>
        </Typography>

        <Typography variant="h6" style={{ margin: "10px" }}>
          Notes : {props.notes}
        </Typography>

        <Typography
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography style={{ height: 200, width: 300, margin: "20px 0" }}>
            <img
              alt=""
              src={props.adhaarFrontImage}
              style={{ width: "100%", height: "100%" }}
            />
          </Typography>
          <Typography style={{ height: 200, width: 300, margin: "20px 0" }}>
            <img
              alt=""
              src={props.adhaarBackImage}
              style={{ width: "100%", height: "100%" }}
            />
          </Typography>
        </Typography>
        <Typography
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography style={{ height: 200, width: 300, margin: "20px 0" }}>
            <img
              alt=""
              src={props.passbookImage}
              style={{ width: "100%", height: "100%" }}
            />
          </Typography>
          <Typography style={{ height: 200, width: 300, margin: "20px 0" }}>
            <img
              alt=""
              src={props.kycImage}
              style={{ width: "100%", height: "100%" }}
            />
          </Typography>
        </Typography>
      </Stack>
    </Card>
  );
};

export default FarmerCard;
