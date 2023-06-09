import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Link,
  Divider,
  Box,
  useMediaQuery,
  Stack,
  Pagination
} from "@mui/material";
import { paymentHistory } from "../../../Features/Slices/companySlice/Companyprofile";
import {useDispatch,useSelector} from "react-redux"
const HistoryPage = () => {
  const dispathch=useDispatch()
  const subscriptionHistory=useSelector((state)=>state?.profile?.paymentHistory
  )
  console.log(subscriptionHistory,"history");
  

  useEffect(() => {
     dispathch(paymentHistory())
  },[dispathch,paymentHistory]) 

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = subscriptionHistory?.slice((page - 1) * rowsPerPage,
  (page - 1) * rowsPerPage + rowsPerPage);
  
console.log(paymentHistory);
  return (
    <Box>
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom>
          Payment History
        </Typography>
        <Divider />
        {paginatedData?.length > 0 ? (
          <Grid
            container
            spacing={2}
            sx={{ marginTop: "1rem", borderRadius: "20px" }}
          >
            {paginatedData&& paginatedData.map((payment) => (
              <Grid key={payment.id} item xs={12} sm={12} md={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      sx={{ color: "rgb(125, 125, 125)", fontSize: "13px" }}
                      gutterBottom
                    >
                      PLAN
                    </Typography>
                    <Typography
                      variant="h5"
                      color={"rgb(0, 0, 0)"}
                      gutterBottom
                    >
                      {payment.planName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgb(125, 125, 125)", fontSize: "13px" }}
                    >
                      {payment.startDate}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Typography variant="body1" sx={{ marginRight: "1rem" }}>
                      Validity:<Typography variant="body1">{payment.validity}</Typography>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      ₹{payment.totalAmount}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      marginTop: "auto",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      sx={{ color: "rgb(125, 125, 125)", fontSize: "13px" }}
                    >
                      PAYMENT MODE
                      <br />
                      <Typography variant={"body1"} color={"rgb(0, 0, 0);"}>
                        {/* {payment.paymentMode} */} Paypal
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body1"
                      textAlign={"center"}
                      sx={{ color: "rgb(125, 125, 125)", fontSize: "13px" }}
                    >
                      PaymentId{" "}
                      <Link href="#" color="primary">
                        <br />
                        <Typography variant="body1" color={"rgb(0, 0, 0);"}>
                          {payment.paymentId}
                        </Typography>
                      </Link>
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign={"end"}
                      sx={{ color: "rgb(125, 125, 125)", fontSize: "13px" }}
                    >
                       ENDDATE
                      <br />
                      <Typography variant="body1" color={"rgb(0, 0, 0)"}>
                      {payment.endDate}

                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
      <Divider sx={{ marginTop: "30px" }}  />

              </Grid>

            ))}
            
          </Grid>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No payment history found.
          </Typography>
        )}
      </Container>
      <Divider sx={{ marginTop: "30px" }} />
      <Stack
        spacing={2}
        style={{ marginTop: "2rem", display: "flex", alignItems: "center" }}
      >
        <Pagination
          count={Math.ceil(subscriptionHistory?.length / rowsPerPage)}
          shape="roundedpage"
          color="primary"
          variant="outlined"
          onChange={handleChangePage}
        />
      </Stack>
    </Box>
  );
};

export default HistoryPage;
