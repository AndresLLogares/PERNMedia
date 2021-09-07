import React, { useState, useEffect, Fragment } from "react";
import styles from "../../sass/posts/posts.module.scss";
import { Zoom } from "react-awesome-reveal";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GETUSER, GETPOSTBYUSER } from "../actions/index.js";
import { CLOUDINARY_URL, CLOUDINARY_PRESET } from "../Secret/Secret";
import { Subtitles } from "@styled-icons/material-twotone/Subtitles";
import { TextDescription } from "@styled-icons/fluentui-system-filled/TextDescription";
import { WindowClose } from "@styled-icons/boxicons-regular/WindowClose";
import { Pen } from "@styled-icons/boxicons-regular/Pen";
import { Photo } from "@styled-icons/foundation/Photo";
import { Save } from "@styled-icons/boxicons-regular/Save";
import { v4 as uuidv4 } from "uuid";

const Posts = () => {
  const [edit, setEdit] = useState(true);

  let URL = "https://pinkbio.herokuapp.com/";

  const [postToAdd, setPostToAdd] = useState({
    title: "",
    description: "",
  });

  const [imagePost, setImagePost] = useState("");

  const dispatch = useDispatch();

  let emailUser = localStorage.getItem("Email");

  console.log(emailUser);

  const handleEdit = () => {
    setEdit(!edit);
  };

  let formatDate = new Intl.DateTimeFormat("en");

  let dateToday = formatDate.formatToParts();

  const today =
    dateToday[0].value +
    dateToday[1].value +
    dateToday[2].value +
    dateToday[3].value +
    dateToday[4].value;

  useEffect(async () => {
    await dispatch(GETUSER(emailUser));
    await dispatch(GETPOSTBYUSER(emailUser));
  }, []);

  let user = useSelector((state) => state.pink.user);

  const handleInputChange = (event) => {
    setPostToAdd({ ...postToAdd, [event.target.name]: event.target.value });
  };

  const handleInputFile = () => {
    document.getElementById("filePost").click();
  };

  const handleImage = async (event) => {
    const file = event?.currentTarget?.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    const res = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    await setImagePost(res.data.url);
    toast.success("Successfully uploaded");
  };

  const handleSubmitChange = async (event) => {
    event.preventDefault();
    let id = uuidv4();
    await axios
      .post(URL + "addposts", {
        email: emailUser.toLocaleLowerCase(),
        id: id,
        picture: user.profilePhoto,
        name: user.name + " " + user.lastname,
        useruuid: user.UUID,
        title: postToAdd.title,
        image: imagePost,
        date: today,
        description: postToAdd.description,
      })
      .then((response) => {
        toast.success(response.data.message);
      });
    await dispatch(GETUSER(emailUser));
    await dispatch(GETPOSTBYUSER(emailUser));
    setEdit(!edit);
    setImagePost("");
    setPostToAdd({ title: "", description: "" });
  };

  return (
    <Fragment>
      <div className={styles.boxPost}>
        <Zoom className={styles.zoom}>
          <button onClick={handleEdit} className={styles.buttonPoast}>
            Create a post
          </button>
        </Zoom>
      </div>
      {edit ? null : (
        <div className={styles.popUp}>
          <Zoom className={styles.zoom}>
            <div className={styles.buttonX}>
              <button onClick={handleEdit} className={styles.buttonBack}>
                <WindowClose className={styles.iconButtons} />
              </button>
            </div>
            <form onSubmit={handleSubmitChange} className={styles.form}>
              <label className={styles.label}>
                <Subtitles className={styles.iconButtonsForm} />
                Title
              </label>
              <input
                onChange={handleInputChange}
                name="title"
                className={styles.input}
                type="text"
              />
              <label className={styles.label}>
                <Photo className={styles.iconButtonsForm} />
                Image
              </label>
              <div className={styles.containerSave}>
                <button
                  onClick={handleInputFile}
                  type="button"
                  className={styles.buttonBookPop}
                >
                  <Pen className={styles.iconButtons} />
                </button>
              </div>
              <input
                onChange={handleImage}
                type="file"
                style={{ display: "none" }}
                id="filePost"
                name="filePost"
              />
              {imagePost ? (
                <div className={styles.sortFileUSer}>
                  <img
                    className={styles.imageFile}
                    src={imagePost}
                    alt=""
                    className={styles.imageFile}
                  />
                </div>
              ) : null}
              <label className={styles.label}>
                <TextDescription className={styles.iconButtonsForm} />
                Description
              </label>
              <textarea
                onChange={handleInputChange}
                name="description"
                className={styles.textarea}
              />
              <div className={styles.containerSave}>
                <button type="submit" className={styles.buttonBookPop}>
                  <Save className={styles.iconButtons} />
                </button>
              </div>
            </form>
          </Zoom>
        </div>
      )}
    </Fragment>
  );
};

export default Posts;
