import React, { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    Snackbar,
    Alert,
    Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // For navigation
import WorldFlag from "react-world-flags";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
// import logo from "../../../assets/logo/SN (1).png";
import SendIcon from '@mui/icons-material/Send';
import { useCookies } from "react-cookie";
import { config } from "../config/Config";
import { apiList, invokeApi } from "../services/apiServices";


const SendOTP = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies();
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState("false");
    const [userName, setUserName] = useState("");
    const [branch, setBranch] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);



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


    // const verifyEmail = async (email) => {
    //     setLoading(true);
    //     let params = {
    //         email: email,
    //     };
    
    //     try {
    //         let response = await invokeApi(
    //             config.getMyCollege + apiList.getUserByEmail,
    //             params,
    //             cookies
    //         );
    
    //         if (response?.status === 200) {
    //             const { users } = response.data;
    //             if (users.name || users.branch) {
    //                 setUserName(users.name);
    //                 setBranch(users.branch);
    //             } else {
    //                 setUserName("");
    //                 setBranch("");
    //                 showSnackbar("No user found with the provided Email.", "error");
    //             }
    //         } else {
    //             setUserName("");
    //             setBranch("");
    //             showSnackbar("No user found with the provided Email.", "error");
    //         }
    //     } catch (error) {
    //         console.error("Error during get User:", error);
    //         showSnackbar("Something went wrong. Please try again later!!", "error");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    
    
    const handleTermsClick = () => {
        navigate("/terms");
    };
    
    // Validate email pattern
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };
    
    // Validate if email is filled and correct
    useEffect(() => {
        if (validateEmail(email)) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }, [email]);
    

    const handleSendOtp = async () => {
    
        // Simulate sending OTP (You can replace this with actual API call)
        console.log(`Sending OTP to ${email}`);
    
        setLoading(true);
    
        try {
            // Replace 'params' and 'cookies' with your actual values
            let response = await invokeApi(
                config.banking + apiList.sendOtp,
                { email:email }, // Assuming 'email' is sent in the API call
                cookies
            );
    
            if (response?.status === 200) {
                showSnackbar(
                    `OTP has been sent successfully to ${email}. Please check your inbox.`,
                    "success"
                );
                navigate(`/otp-verification/${email}`); 
            } else {
                showSnackbar("Something went wrong. Please try again later!!", "error");
            }
        } catch (error) {
            console.error("Error during send OTP:", error);
            showSnackbar("Something went wrong. Please try again later!!", "error");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            <Grid>
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
                    {/* Enhanced Top Design */}
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

                    {/* Logo positioned above the design */}
                    {/* <Box
                        component="img"
                        src={logo}
                        alt="Logo"
                        sx={{
                            width: "50%",
                            height: 60,
                            position: "absolute",
                            top: "60px",
                            zIndex: 1,
                        }}
                    /> */}

                    {/* Registration Heading */}
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontWeight: 600,
                            marginTop: "90px",
                            marginBottom: 2,
                        }}
                    >
                        Registration
                    </Typography>

                    {/* Mobile Input */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            width: "100%",
                            maxWidth: 400,
                            marginBottom: 2,
                            paddingTop: 4,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                width: "100%",
                            }}
                        >
                            {/* Country Code Box */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    padding: "8px 12px",
                                    borderRadius: "8px",
                                    backgroundColor: "#fff",
                                    fontWeight: 500,
                                    border: "1px solid #ddd",
                                }}
                            >
                                <WorldFlag
                                    code="IN"
                                    style={{
                                        width: "20px",
                                        height: "14px",
                                        borderRadius: "2px",
                                        border: "1px solid #ddd",
                                    }}
                                />
                                <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>+91</Typography>
                            </Box>

                            {/* Email Input */}
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => {
                                    const inputEmail = e.target.value;
                                        setEmail(inputEmail);
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon sx={{ color: "#007BFF", fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        borderRadius: "8px",
                                        backgroundColor: "#fff",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                    },
                                }}
                            />
                        </Box>

                        {/* Error/Helper Text */}
                        {email !== "" && !validateEmail(email) && (
                            <Typography
                                sx={{
                                    color: "error.main",
                                    fontSize: "12px",
                                    mt: 1, // Add margin-top to create spacing
                                }}
                            >
                                Invalid Email
                            </Typography>
                        )}
                    </Box>

                    {(userName !== "" || branch !== "") && (
                        <>
                            {/* Read-only First Name Input */}
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Name"
                                value={userName}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon sx={{ color: "#007BFF", fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        borderRadius: "8px",
                                        backgroundColor: "#F5F5F5",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                    },
                                }}
                                sx={{
                                    width: "100%",
                                    maxWidth: 400,
                                    marginBottom: 2,
                                }}
                            />

                            {/* Read-only Branch Name Input */}
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Branch"
                                value={branch}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon sx={{ color: "#007BFF", fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        borderRadius: "8px",
                                        backgroundColor: "#F5F5F5",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                    },
                                }}
                                sx={{
                                    width: "100%",
                                    maxWidth: 400,
                                    marginBottom: 2,
                                }}
                            />
                        </>
                    )}


                    {/* Terms & Conditions */}
                    <FormControlLabel
                        control={<Checkbox />}
                        label={
                            <Typography sx={{ fontSize: "14px" }}>
                                I have read and accept the{" "}
                                <Typography
                                    component="span"
                                    color="primary"
                                    sx={{ cursor: "pointer" }}
                                    onClick={handleTermsClick}
                                >
                                    Terms & Conditions
                                </Typography>
                            </Typography>
                        }
                        sx={{
                            maxWidth: 400,
                            textAlign: "center",
                            fontSize: "14px",
                            marginBottom: 2,
                        }}
                    />

                    {/* Send OTP Button */}
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

                        onClick={() => handleSendOtp()}
                        disabled={!isEmailValid}

                    >
                        Send OTP
                        {<SendIcon sx={{ ml: 1, mt: -0.5 }} />}
                    </Button>


                    {/* Made in India Section */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 3 }}>
                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>&copy; 2024 Developed by SN Info Systems</Typography>

                    </Box>

                    {/* Version */}
                    <Typography sx={{ marginTop: 1, color: "#888", fontSize: "12px" }}>Version 1.0</Typography>
                </Box>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={2000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    sx={{ width: "auto", mt: 15 }}
                >
                    <Alert
                        onClose={handleSnackbarClose}
                        severity={snackbarSeverity}
                        sx={{ width: "auto", fontSize: { xs: "14px" } }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Grid>
        </>
    );
};

export default SendOTP;