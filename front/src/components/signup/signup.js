import React, { useState, useEffect } from "react";
import styles from "../../sass/login/login.module.scss";
import { Zoom } from "react-awesome-reveal";
import { Email } from "@styled-icons/material/Email";
import { Password } from "@styled-icons/fluentui-system-filled/Password";
import { DriveFileRenameOutline } from "@styled-icons/material-rounded/DriveFileRenameOutline";
import { CalendarNumber } from "@styled-icons/ionicons-solid/CalendarNumber";
import Calendar from "react-calendar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FileSignature } from "@styled-icons/fa-solid/FileSignature";
import { v4 as uuidv4 } from "uuid";

const calculateAge = (dob) => {
  let difference = Date.now() - dob.getTime();
  let age = new Date(difference);

  return Math.abs(age.getUTCFullYear() - 1970);
};

const changeMonth = (month) => {
  if (month === "Jan") {
    month = 1;
    return month;
  } else if (month === "Feb") {
    month = 2;
    return month;
  } else if (month === "Mar") {
    month = 3;
    return month;
  } else if (month === "Apr") {
    month = 4;
    return month;
  } else if (month === "May") {
    month = 5;
    return month;
  } else if (month === "Jun") {
    month = 6;
    return month;
  } else if (month === "Jul") {
    month = 7;
    return month;
  } else if (month === "Aug") {
    month = 8;
    return month;
  } else if (month === "Sep") {
    month = 9;
    return month;
  } else if (month === "Oct") {
    month = 10;
    return month;
  } else if (month === "Nov") {
    month = 11;
    return month;
  } else if (month === "Dec") {
    month = 12;
    return month;
  }
};

const SignUp = () => {
  let URL = "https://pinkbio.herokuapp.com/";

  const [info, setInfo] = useState({
    email: "",
    password: "",
    controlpassword: "",
    name: "",
    lastname: "",
  });

  const [date, setDate] = useState(new Date());

  let monthDate = date.toString().slice(4, 7);

  monthDate = changeMonth(monthDate);

  if (monthDate < 10) {
    monthDate = "0" + monthDate;
  }

  let dayDate = date.toString().slice(8, 10);

  let yearDate = date.toString().slice(11, 15);

  const dateOfBirthday = yearDate + "/" + monthDate + "/" + dayDate;

  const age = calculateAge(
    new Date(Number(yearDate), Number(monthDate), Number(dayDate))
  );

  const handleInputChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };

  const handleSubmitChange = async (event) => {
    event.preventDefault();
    if (info.controlpassword !== info.password) {
      return toast.error("Passwords do not match");
    } else if (age < 16) {
      return toast.error("You must be at least 16 years old");
    }
    await axios
      .post(URL + "signup", {
        name: info.name,
        email: info.email.toLocaleLowerCase(),
        password: info.password,
        lastname: info.lastname,
        age: age,
        dateOfBirthday: dateOfBirthday,
        uuid: uuidv4(),
      })
      .then(async (response) => {
        console.log(response);
        if (response.data.message !== "Thanks for registering") {
          return toast.error(response.data.message);
        } else {
          await setInfo({
            password: "",
            controlpassword: "",
            name: "",
            email: "",
            lastname: "",
          });
          toast.success(response.data.message);
          setTimeout(
            () => (window.location.href = "https://pinkbio.netlify.app/"),
            1000
          );
        }
      });
  };

  return (
    <div className={styles.boxForms}>
      <div className={styles.sorTforms}>
        <div className={styles.sortTitleForm}>
          <Zoom className={styles.zoom}>
            <p className={styles.titleForm}>Sign Up</p>
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
            <label className={styles.label}>
              <Password className={styles.iconsForm} />
              Repeat Password
            </label>
            <input
              type="password"
              name="controlpassword"
              value={info.controlpassword}
              onChange={handleInputChange}
              required={true}
              className={styles.input}
            />
          </Zoom>
          <Zoom className={styles.zoom}>
            <label className={styles.label}>
              <CalendarNumber className={styles.iconsForm} />
              Date of birth
            </label>
            <Calendar
              onChange={setDate}
              calendarType="ISO 8601"
              value={date}
              className={styles.calendar}
              maxDate={new Date()}
              locale="en"
            />
            <div className={styles.miniBox}>
              <p className={styles.miniText}>Date of birth: {dateOfBirthday}</p>
            </div>
            <div className={styles.miniBox}>
              <p className={styles.miniText}>Age: {age}</p>
            </div>
          </Zoom>
          <Zoom className={styles.zoom}>
            <label className={styles.label}>
              <DriveFileRenameOutline className={styles.iconsForm} />
              First Name
            </label>
            <input
              type="text"
              name="name"
              value={info.name}
              onChange={handleInputChange}
              required={true}
              className={styles.input}
            />
          </Zoom>
          <Zoom className={styles.zoom}>
            <label className={styles.label}>
              <DriveFileRenameOutline className={styles.iconsForm} />
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={info.lastname}
              onChange={handleInputChange}
              required={true}
              className={styles.input}
            />
          </Zoom>
          <Zoom className={styles.zoom}>
            <div className={styles.sortButton}>
              <button type="submit" className={styles.button}>
                <FileSignature className={styles.iconsForm} />
                Sing Up!
              </button>
            </div>
          </Zoom>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
