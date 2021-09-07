import React, { useState } from "react";
import styles from "../../sass/reset/reset.module.scss";
import { Zoom } from "react-awesome-reveal";
import { Email } from "@styled-icons/material/Email";
import { Password } from "@styled-icons/fluentui-system-filled/Password";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { ArrowRightCircle } from "@styled-icons/bootstrap/ArrowRightCircle";

const Reset = () => {
  let URL = "https://pinkbio.herokuapp.com/";

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };

  const handleSubmitChange = async (event) => {
    event.preventDefault();
    await axios
      .post(URL + "reset", {
        email: info.email.toLocaleLowerCase(),
        newpassword: info.password,
      })
      .then(async (response) => {
        if (response.data.success === true) {
          toast.success(response.data.message);
          setInfo({ email: "", password: "" });
          return setTimeout(
            () => (window.location.href = "https://pinkbio.netlify.app/"),
            1000
          );
        } else {
          return toast.error(response.data.message);
        }
      });
  };

  return (
    <div className={styles.backReset}>
      <div className={styles.sortReset}>
        <Toaster />
        <Zoom className={styles.zoom}>
          <div className={styles.boxReset}>
            <div className={styles.sortTitleReset}>
              <Zoom className={styles.zoom}>
                <p className={styles.resetTitle}>Reset Password</p>
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
                  <Password className={styles.iconsForm} />
                  New Password
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
                    Reset
                    <ArrowRightCircle className={styles.iconsFormLog} />
                  </button>
                </div>
              </Zoom>
            </form>
          </div>
        </Zoom>
      </div>
    </div>
  );
};

export default Reset;
