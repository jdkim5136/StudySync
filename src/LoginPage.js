import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import LPMod from "./LoginPage.module.css";
import handleSubmit from "./firebase-setup/handlesubmit";
import { useRef } from "react";
import { auth } from "./firebase-setup/firebase";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, sendPasswordResetEmail,
confirmPasswordReset } from "firebase/auth";


export default function LoginPage() {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth();
    const Nav = useNavigate();

    useEffect(() => {
          if (auth.currentUser != null) {
            Nav('/');
            alert('You are already logged in.');
          } else {
            return;
          }
        });

    const signIn = (e) => {

        e.preventDefault()
        setPersistence(auth, browserLocalPersistence)
        .then(()=>
        {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) =>{
            console.log(userCredential);
            console.log("sign in!");
            nav("/");
        })
        .catch((error) => {
            console.log(error);
            console.log("no sign in");
            alert("Email or password was wrong, try again.")
        })
        })
        .catch((error) => {
            console.log(error);
            console.log("no sign in");
            alert("Email or password was wrong, try again.")
        });
    }
    const forgotPassword = (e) => {
        e.preventDefault()
        setPersistence(auth, browserLocalPersistence)
        .then(()=>
        {
        sendPasswordResetEmail(auth, email)
        .then((userCredential) =>{
            console.log(userCredential);
            console.log("reset password email sent");
            alert("An email has been sent with a link to reset your password.")
            nav("/");
        })
        .catch((error) => {
            console.log(error);
            console.log("email not sent");
            alert("Invalid email.")
        })
        })
        .catch((error) => {
            console.log(error);
            console.log("email not sent");
            alert("Invalid email.")
        });
    }
    return (
        <div className={LPMod.login}>
            <h1>
                Login to StudySync! 😎
            </h1>
        <form onSubmit={signIn}>
            <label>
                <p>Email</p>
                <input type="text" 
                onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <div>
            </div>
            <label>
                <p>Password</p>
                <input type="password" 
                onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <div className={LPMod.container}>
                <button type="submit">Login</button>
            </div>
            </form>
            <div className={LPMod.forgot-password}>
                <form onSubmit={forgotPassword}>
                    <button type="submit">Forgot password?</button>
                </form>               
            </div>

            <div className={LPMod.login}>
                <h1>Don't have an account?</h1>
                <Link to="/signup">
                <button type="submit">Sign Up</button>
                </Link>
            </div>
        </div>
    )
}