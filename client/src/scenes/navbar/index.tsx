import { useState } from "react";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import { Box, Typography } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

const Navbar = () => {
  const [selected, setSelected] = useState("dashboard");

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color="#d1d3da">
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Financefocus
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: "#71f5de" } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : "#6b6d74",
              textDecoration: "inherit",
            }}
          >
            dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: "#71f5de" } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? "inherit" : "#6b6d74",
              textDecoration: "inherit",
            }}
          >
            predictions
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: "#71f5de" } }}>
          <Link
            to="/auth"
            onClick={() => {
              signOut(auth)
                .then(() => console.log("Logged out"))
                .catch((err) => console.log(err.message));
            }}
            style={{
              textDecoration: "inherit",
              color: "#71f5de",
            }}
          >
            Log out
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
