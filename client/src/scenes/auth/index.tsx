import FlexBetween from "@/components/FlexBetween";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "./style.css";
import { useState } from "react";

const Authorisation = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const handleChange = (event: any) => {
    setInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  };

  const handleNext = () => {
    signInWithEmailAndPassword(auth, input.email, input.password)
      .then(() => {
        console.log("Logged In with", input.email);
        window.location.href = "/";
        localStorage.setItem("auth", "true");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <Box
      width="99vw"
      height="95vh"
      sx={{
        background:
          " linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(2,2,48,1) 85%)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <FlexBetween
        color="white"
        width="50rem"
        height="29rem"
        border="1px solid #71f5de"
        borderRadius="15px 55px"
        sx={{ background: "rgba(2,2,48,1)" }}
      >
        <Box width="50%" justifyContent="center" display="flex">
          <img
            src="/main.gif"
            alt="main_image"
            width="85%"
            style={{ borderRadius: "15px 55px" }}
          />
        </Box>
        <Box width="50%" className="right" height="100%">
          <Typography variant="h1" color="#71f5de" padding=" 0% 10%;">
            Financefocus
          </Typography>
          <form style={{ height: "50%" }}>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              onChange={handleChange}
            ></input>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              onChange={handleChange}
            ></input>
            <Button
              variant="outlined"
              onClick={handleNext}
              sx={{ borderRadius: "15px 55px" }}
            >
              Next
            </Button>

            <Typography
              variant="h5"
              marginLeft={1}
              sx={{ "&:hover": { color: "#71f5de" } }}
            >
              Don't have an account? <b>SignUP!</b>
            </Typography>
            <Typography variant="h5" marginLeft={1} color="#71f5de">
              <b> SignIn using google</b>
            </Typography>
          </form>
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default Authorisation;
