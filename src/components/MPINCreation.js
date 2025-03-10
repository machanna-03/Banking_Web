import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import SendIcon from "@mui/icons-material/Send";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const MPINCreation = () => {
  const [mpin, setMpin] = useState("");
  const [showMpin, setShowMpin] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
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
    if (/^\d{0,4}$/.test(value)) {
      setMpin(value);
    }
  };

  const handleSubmit = () => {
    if (mpin.length !== 4) {
      showSnackbar("Please enter a 4-digit MPIN.", "error");
      return;
    }

    setCookie("userMPIN", mpin, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });
    showSnackbar("MPIN successfully created!", "success");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  // Reset the MPIN when the page is loaded
  useEffect(() => {
    setMpin("");
  }, []);

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
      <Box sx={{ maxWidth: 400 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 2 }}>
          Create Your MPIN
        </Typography>
        <Typography sx={{ margin: "10px 0", color: "grey.700" }}>
          Please enter a 4-digit MPIN for secure access.
        </Typography>

        <TextField
          variant="outlined"
          type={showMpin ? "text" : "password"}
          inputProps={{ maxLength: 4, style: { textAlign: "center" } }}
          value={mpin}
          onChange={(e) => handleChange(e.target.value)}
          sx={{ width: "100%", marginBottom: 3 }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setShowMpin(!showMpin)}>
                {showMpin ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
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
          onClick={handleSubmit}
        >
          Submit
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
    </Box>
  );
};

export default MPINCreation;
