import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Snackbar,
    Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
// import logo from "../../../assets/logo/SN (1).png";
import SendIcon from '@mui/icons-material/Send';
import { useCookies } from "react-cookie";
import { config } from "../config/Config";
import { apiList, invokeApi } from "../services/apiServices";


const OTPVerification = () => {
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(300);
    const navigate = useNavigate();
    const { email } = useParams();
    const [cookies, setCookie] = useCookies();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };


    const handleChange = (value) => {
        setOtp(value);
    };

    const resendOtp = () => {
        setTimer(300);
    };

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer]);

    // Login API
    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        let params = {
            otp:otp
        };

        console.log("Email",email);
        

        try {
            let response = await invokeApi(
                config.banking + `/api/otp/verify-otp/v1?email=${email}`,
                params,
                cookies
            );
        
            if (response?.status === 200) {
                showSnackbar(
                    `OTP has been sent successfully to ${email}. Please check your inbox.`,
                    "success"
                );
                navigate(`/mpin-creation`); 
            } else {
                showSnackbar("Something went wrong. Please try again later!!", "error");
            }
        } catch (error) {
            console.error("Error during login:", error);
            showSnackbar("An unexpected error occurred. Please try again later!", "error");
        } finally {
            setLoading(false);
        }
        
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
            }`;
    };

    return (
        <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 3,
                height: "85.5vh",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "200px",
                  background: "#E3F2FD",
                  clipPath: "ellipse(75% 50% at 50% 0)",
                  zIndex: -1,
                }}
              />

            {/* Top Logo Section */}
            {/* <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                    width: "50%",
                    height: 60,
                    position: "absolute",
                    top: 68,
                }}
            /> */}

            {/* OTP Section */}
            <Box sx={{ textAlign: "center" }}>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ marginBottom: 2, mt: 3 }}
                >
                    OTP Verification
                </Typography>
                <Typography sx={{ margin: "10px 0", color: "grey.700", mt: 2}}>
                    OTP has been sent to <strong> {email}</strong>
                </Typography>

                <Box
                    sx={{ display: "flex", gap: 1, justifyContent: "center", marginTop: 2 }}
                >
                    {/* {otp.map((data, index) => ( */}
                        <TextField
                            variant="outlined"
                            // inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
                            value={otp}  
                            onChange={(e) => handleChange(e.target.value)}
                            // sx={{ width: , borderRadius: 1 }}
                        />
                    {/* ))} */}
                </Box>

                <Typography sx={{ margin: "20px 0" }}>
                    {timer > 0 ? (
                        <span
                            style={{
                                color: timer < 10 ? "red" : "inherit",
                                fontWeight: timer < 10 ? "bold" : "normal",
                            }}
                        >
                            {formatTime(timer)}
                        </span>
                    ) : (
                        <Button
                            onClick={resendOtp}
                            variant="text"
                            sx={{ color: "#0000", textDecoration: "underline" }}
                        >
                            Resend OTP
                        </Button>
                    )}
                </Typography>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        maxWidth: 400,
                        marginBottom: 3,
                        padding: "12px",
                        background: "linear-gradient(145deg, #007BFF, #0056b3)",
                        color: "#fff",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "50px",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            background: "linear-gradient(145deg, #0056b3, #003366)",
                            boxShadow: "0 6px 15px rgba(0, 123, 255, 0.3)",
                            transform: "scale(1.05)",
                        },
                    }}
                    endIcon={<SendIcon sx={{ mt: -0.5 }} />}
                    onClick={() => handleLogin()}
                >
                    Submit
                </Button>

            </Box>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{ width: "auto" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: "auto", fontSize: { xs: "14px" } }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default OTPVerification;