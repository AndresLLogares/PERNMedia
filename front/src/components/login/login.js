import React, { useState } from "react";
import styles from "../../sass/login/login.module.scss";
import { Zoom } from "react-awesome-reveal";
import { Email } from "@styled-icons/material/Email";
import { Password } from "@styled-icons/fluentui-system-filled/Password";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/SethAuthToken.js";
import { SETCURRENTUSER } from "../actions/index.js";
import { ArrowRightCircle } from "@styled-icons/bootstrap/ArrowRightCircle";
import { WindowClose } from "@styled-icons/boxicons-regular/WindowClose";

const Login = () => {
  let URL = "https://pinkbio.herokuapp.com/";

  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [email, setEmail] = useState("");

  const [popUp, setPopUp] = useState(true);

  const handleInputChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmitChange = async (event) => {
    event.preventDefault();
    await axios
      .post(URL + "login", {
        email: info.email.toLocaleLowerCase(),
        password: info.password,
      })
      .then(async (response) => {
        if (response.data.message !== "Welcome Back") {
          return toast.error(response.data.message);
        } else {
          await setInfo({
            password: "",
            email: "",
          });
          toast.success(
            response.data.message + " " + response.data.firstname + "!"
          );
          const { token } = response.data;
          const { firstname } = response.data;
          const { email } = response.data;
          await localStorage.setItem("jwtToken", token);
          await localStorage.setItem("UserName", firstname);
          await localStorage.setItem("Email", email);
          setAuthToken(token);
          const decoded = jwt_decode(token);
          dispatch(SETCURRENTUSER(decoded));
          setTimeout(
            () => (window.location.href = "https://pinkbio.netlify.app/Home"),
            1000
          );
        }
      });
  };

  const handlePopUp = () => {
    setPopUp(!popUp);
  };

  const handleReset = async (event) => {
    event.preventDefault();
    setEmail("");
    setPopUp(!popUp);
    await axios
      .post(URL + "geneLink", {
        email: email.toLocaleLowerCase(),
      })
      .then(async (response) => {
        if (response.data.success === true) {
          toast.success(response.data.message);
        } else {
          toast.error("E-Mail not found");
        }
      });
  };

  return (
    <div className={styles.boxForms}>
      <div className={styles.sorTforms}>
        <div className={styles.sortTitleForm}>
          <Zoom className={styles.zoom}>
            <p className={styles.titleForm}>Login</p>
          </Zoom>
        </div>
        <form onSubmit={handleSubmitChange} className={styles.form}>
          <Zoom className={styles.zoom}>
            <label className={styles.label}>
              <Email className={styles.iconsForm} /> E-Mail
            </label>
            <input
              type="email"
              name="email"
              value={info.email}
              onChange={handleInputChange}
              required={true}
              className={styles.input}
            />
          </Zoom>
          <Zoom className={styles.zoom}>
            <label className={styles.label}>
              <Password className={styles.iconsForm} /> Password
            </label>
            <input
              type="password"
              name="password"
              value={info.password}
              onChange={handleInputChange}
              required={true}
              className={styles.input}
            />
          </Zoom>
          <Zoom className={styles.zoom}>
            <div className={styles.sortButton}>
              <button type="submit" className={styles.button}>
                Go!
                <ArrowRightCircle className={styles.iconsFormLog} />
              </button>
            </div>
          </Zoom>
        </form>
        <Zoom className={styles.zoom}>
          <div className={styles.sortButton}>
            <button onClick={handlePopUp} className={styles.button}>
              Forgot your password?
            </button>
          </div>
        </Zoom>
      </div>
      {popUp ? null : (
        <form onSubmit={handleReset} className={styles.popUp}>
          <Zoom className={styles.zoom}>
            <div className={styles.buttonX}>
              <button onClick={handlePopUp} className={styles.buttonBack}>
                <WindowClose className={styles.iconButtons} />
              </button>
            </div>
            <label className={styles.labelPopUp}>
              <Email className={styles.iconsForm} /> E-Mail
            </label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={handleEmailChange}
              required={true}
              className={styles.inputPopUp}
            />
          </Zoom>
          <Zoom className={styles.zoom}>
            <div className={styles.sortButton}>
              <button type="submit" className={styles.button}>
                Send E-Mail
              </button>
            </div>
          </Zoom>
        </form>
      )}
    </div>
  );
};

export default Login;
