import React, { useState, useEffect } from "react";
import styles from "../../sass/profile/profile.module.scss";
import { Zoom } from "react-awesome-reveal";
import Navbar from "../navbar/navbarOthers";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { GETUSER } from "../actions";
import { Pen } from "@styled-icons/boxicons-regular/Pen";
import { CLOUDINARY_URL, CLOUDINARY_PRESET } from "../Secret/Secret";
import axios from "axios";
import Information from "../information/information.js";
import Education from "../education/education.js";
import Jobs from "../jobs/jobs.js";
import AddPosts from "../addposts/addpost.js";
import Post from "../posts/postuser.js";
import assignLogo from "./assignLogo.js";

const technologies = [
  { name: "Javascript" },
  { name: "Java" },
  { name: "React" },
  { name: "Python" },
  { name: "Mysql" },
  { name: "Postgresql" },
  { name: "Html" },
  { name: "CSS" },
  { name: "C++" },
  { name: "Mongodb" },
  { name: "Express" },
  { name: "Nodejs" },
  { name: "Yarn" },
  { name: "Angular" },
  { name: "PHP" },
  { name: "Rubyonrails" },
  { name: "Flutter" },
];

const Profile = () => {
  let emailUser = localStorage.getItem("Email");

  let URL = "https://pinkbio.herokuapp.com/";

  let user = useSelector((state) => state.pink.user);

  const [techno, setTechno] = useState("Javascript");

  let backPhoto = user?.backPhoto;

  let profilePhoto = user?.profilePhoto;

  let technologiesUser = user?.technologies;

  if (technologiesUser?.length > 0) {
    technologiesUser = assignLogo(technologiesUser);
  }

  let dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(GETUSER(emailUser));
  }, []);

  const handleAddTechno = async () => {
    await axios
      .post(URL + "addtechno", {
        technologies: techno,
        email: emailUser,
      })
      .then(async (response) => {
        toast.success(response.data.message);
        await dispatch(GETUSER(emailUser));
      });
  };

  const handleTechno = (event) => {
    setTechno(event.currentTarget.value);
  };

  const HandleImage = async (event) => {
    const file = event?.currentTarget?.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    const res = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    axios
      .post(URL + "UploadPhotos/back", {
        email: emailUser,
        photoUrl: res.data.url,
      })
      .then(async (response) => {
        toast.success(response.data.message);
        await dispatch(GETUSER(emailUser));
      });
  };

  const HandleImageProfile = async (event) => {
    const file = event?.currentTarget?.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    const res = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    axios
      .post(URL + "UploadPhotos/profile", {
        email: emailUser,
        photoUrl: res.data.url,
      })
      .then(async (response) => {
        toast.success(response.data.message);
        await dispatch(GETUSER(emailUser));
      });
  };

  const handleInputFile = () => {
    document.getElementById("file").click();
  };

  const handleInputFileProfile = () => {
    document.getElementById("fileProfile").click();
  };

  return (
    <div className={styles.backProfile}>
      <Navbar />
      <Toaster />
      <div className={styles.sortProfile}>
        <Zoom className={styles.zoom}>
          <div className={styles.backImage}>
            {!backPhoto ? (
              <div className={styles.noBack}>
                <p className={styles.titleNo}>Select a Picture</p>
              </div>
            ) : (
              <img alt="" src={backPhoto} className={styles.backImageSize} />
            )}
          </div>
        </Zoom>
        <div className={styles.sortButtonBack}>
          <Zoom className={styles.zoomBack}>
            <button className={styles.buttonBack} onClick={handleInputFile}>
              <Pen className={styles.iconButtons} />{" "}
            </button>
          </Zoom>
          <input
            onChange={HandleImage}
            type="file"
            style={{ display: "none" }}
            id="file"
            name="file"
          />
        </div>
        <div className={styles.sortComponents}>
          <AddPosts />
        </div>
        <div className={styles.container}>
          <div className={styles.sortProfilePicture}>
            <Zoom className={styles.zoomProfile}>
              <div className={styles.imageProfile}>
                {!profilePhoto ? (
                  <div className={styles.noBack}>
                    <p className={styles.titleNo}>Select a Picture</p>
                  </div>
                ) : (
                  <img
                    alt=""
                    src={profilePhoto}
                    className={styles.backImageSize}
                  />
                )}
              </div>
            </Zoom>
            <Zoom className={styles.zoomProfile}>
              <button
                className={styles.buttonBack}
                onClick={handleInputFileProfile}
              >
                <Pen className={styles.iconButtons} />{" "}
              </button>
            </Zoom>
            <input
              onChange={HandleImageProfile}
              type="file"
              style={{ display: "none" }}
              id="fileProfile"
              name="fileProfile"
            />
          </div>
          <div className={styles.sortTechnologies}>
            <Zoom className={styles.zoomTechonologies}>
              <div className={styles.boxTechonologies}>
                <p className={styles.titleTechno}>Technologies</p>
                <div className={styles.separateTechno}>
                  <div className={styles.sortSelect}>
                    <label className={styles.labelTechnologies}>
                      Add Technologies
                    </label>
                    <select onChange={handleTechno} className={styles.select}>
                      {technologies &&
                        technologies.map((item, index) => (
                          <option
                            className={styles.option}
                            key={index}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                    <button
                      onClick={handleAddTechno}
                      className={styles.buttonBack}
                    >
                      Add
                    </button>
                  </div>
                  <div className={styles.sortMyTechnologies}>
                    <p className={styles.titleMyTechnologies}>
                      My technologies
                    </p>
                    <div className={styles.sortListTechno}>
                      {technologiesUser &&
                        technologiesUser.map((item, index) => (
                          <div key={index} className={styles.eachTechno}>
                            <p className={styles.techno}>
                              <item.logo className={styles.iconButtonsTech} />
                              {item.name}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </Zoom>
          </div>
        </div>
        <div className={styles.sortProfile}>
          <div className={styles.sortComponents}>
            <Information />
            <Education />
            <Jobs />
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
