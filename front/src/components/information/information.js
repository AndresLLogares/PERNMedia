import React, { useState, useEffect, Fragment } from "react";
import styles from "../../sass/information/information.module.scss";
import { Zoom } from "react-awesome-reveal";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GETUSER, GETCOUNTRIES, GETCITIES } from "../actions";
import { SearchLocation } from "@styled-icons/fa-solid/SearchLocation";
import { FileEarmarkPlusFill } from "@styled-icons/bootstrap/FileEarmarkPlusFill";
import { BookAdd } from "@styled-icons/boxicons-solid/BookAdd";
import { Subtitles } from "@styled-icons/material-rounded/Subtitles";
import { CLOUDINARY_URL, CLOUDINARY_PRESET } from "../Secret/Secret";
import { Save } from "@styled-icons/boxicons-regular/Save";
import { Link } from "@styled-icons/bootstrap/Link";
import { Skeleton } from "@material-ui/lab";
import { WindowClose } from "@styled-icons/boxicons-regular/WindowClose";
import { Pen } from "@styled-icons/boxicons-regular/Pen";

const Information = () => {
  let emailUser = localStorage.getItem("Email");

  let white =
    "https://res.cloudinary.com/andreslogares/image/upload/v1625771261/PlantillasPokemon/White_zrhnaf.jpg";

  let URL = "https://pinkbio.herokuapp.com/";

  let user = useSelector((state) => state.pink.user);

  let countries = useSelector((state) => state.pink.countries);

  let cities = useSelector((state) => state.pink.cities);

  let [myURL, setMyUrl] = useState("");

  const [country, SetCountry] = useState("");

  const [region, setRegion] = useState("Africa");

  const [popUp, setPopUp] = useState(true);

  const [popUpDelete, setPopUpDelete] = useState(true);

  const [title, setTitle] = useState("");

  const [file, setFile] = useState(white);

  const [edit, setEdit] = useState(true);

  const [flag, setFlag] = useState("");

  let [idToDelete, setIdToDelete] = useState("");

  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(GETUSER(emailUser));
  }, []);

  const handleRegion = (event) => {
    setRegion(event.currentTarget.value);
  };

  const handleCountry = (event) => {
    SetCountry(event.currentTarget.value);
  };

  const handlePopUp = () => {
    setPopUp(!popUp);
  };

  const handleURL = (event) => {
    setMyUrl(event.target.value);
  };

  const handlePopUpDelete = (id) => {
    setPopUpDelete(!popUpDelete);
    setIdToDelete(id);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleRegionButton = async () => {
    if (region === "") {
      return toast.error("You must select a region");
    }
    await dispatch(GETCOUNTRIES(region.toLocaleLowerCase()));
  };

  const handleCountryButton = async () => {
    if (country === "") {
      return toast.error("You must select a country");
    }
    await dispatch(GETCITIES(country.toLocaleLowerCase()));
  };

  const handleInputFile = () => {
    document.getElementById("filePop").click();
  };

  if (cities.length > 0) {
    setFlag(cities.data.flag);
  }

  const HandleAddFile = async (event) => {
    const fileToAdd = event?.currentTarget?.files[0];

    const formData = new FormData();
    formData.append("file", fileToAdd);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    const res = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setFile(res.data.secure_url);
    toast.success("Successfully uploaded");
  };

  const handleSubmitFile = async (event) => {
    event.preventDefault();
    let id = 1;
    if (user.others.length !== 0) {
      let idArray = user?.others?.map((item) => item.Id);
      let max = Math.max.apply(null, idArray);
      id = max + 1;
    }
    await axios
      .post(URL + "addothers", {
        email: emailUser.toLocaleLowerCase(),
        title: title,
        id: id,
        image: file,
        url: myURL,
      })
      .then((response) => {
        toast.success(response.data.message);
      });
    setPopUp(!popUp);
    await dispatch(GETUSER(emailUser));
  };

  const handleDeleteFile = async () => {
    await axios
      .post(URL + "deleteother", {
        email: emailUser.toLocaleLowerCase(),
        id: idToDelete,
      })
      .then((response) => {
        toast.success(response.data.message);
      });
    await dispatch(GETUSER(emailUser));
    setPopUpDelete(!popUpDelete);
  };

  const handleSubmitInfo = async (event) => {
    event.preventDefault();
    if (region === "Americas") {
      await setRegion("America");
    }
    await axios
      .post(URL + "addcountry", {
        email: emailUser.toLocaleLowerCase(),
        region: region.charAt(0).toUpperCase() + region.slice(1),
        flag: cities?.data?.flag,
        country: country.charAt(0).toUpperCase() + country.slice(1),
      })
      .then((response) => {
        toast.success(response.data.message);
      });
    await dispatch(GETUSER(emailUser));
  };

  return (
    <div className={styles.boxInformation}>
      <div className={styles.sortTitle}>
        <Zoom className={styles.zoom}>
          <p className={styles.titleInfo}>Information</p>
        </Zoom>
      </div>
      <div className={styles.twoColumns}>
        <Zoom className={styles.zoomWidht}>
          <div className={styles.firstColumn}>
            <p className={styles.eachInfo}>First Name: {user.name}</p>
            <p className={styles.eachInfo}>Last Name: {user.lastname}</p>
            <p className={styles.eachInfo}>E-Mail: {user.email}</p>
            <p className={styles.eachInfo}>Region: {user.region}</p>
            <p className={styles.eachInfo}>Country: {user.country}</p>
            <div className={styles.containerFlag}>
              <img src={user.flag} alt="" className={styles.flag} />
            </div>
            {edit ? null : (
              <Fragment>
                <p className={styles.eachInfo}>
                  Select your Region and Country
                </p>
                <select onChange={handleRegion} className={styles.select}>
                  <option>Africa</option>
                  <option>Americas</option>
                  <option>Asia</option>
                  <option>Europe</option>
                  <option>Oceania</option>
                </select>
                <button
                  onClick={handleRegionButton}
                  className={styles.buttonBack}
                >
                  <SearchLocation className={styles.iconButtons} />
                </button>
                {countries.length === 0 ? (
                  <select className={styles.selectNone} />
                ) : (
                  <Fragment>
                    <select onChange={handleCountry} className={styles.select}>
                      {countries.map((item, index) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleCountryButton}
                      className={styles.buttonBack}
                    >
                      <SearchLocation className={styles.iconButtons} />
                    </button>
                  </Fragment>
                )}
                <div className={styles.containerFlag}>
                  <img
                    src={cities.length !== 0 ? cities.data.flag : white}
                    alt=""
                    className={styles.flag}
                  />
                </div>
                <div className={styles.containerSave}>
                  <button
                    onClick={handleSubmitInfo}
                    className={styles.buttonBookPop}
                  >
                    <Save className={styles.iconBook} />
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </Zoom>
        <Zoom className={styles.zoomWidthSecond}>
          <div className={styles.secondColumn}>
            {edit ? null : (
              <Fragment>
                <p className={styles.eachInfo}>
                  You can add other information here, like images and links
                </p>
                <button onClick={handlePopUp} className={styles.buttonBook}>
                  <BookAdd className={styles.iconBook} />
                </button>
              </Fragment>
            )}
            <div className={styles.containerOthers}>
              {user.others &&
                user?.others.map((item, index) => (
                  <Fragment key={index}>
                    <div className={styles.sortOthers}>
                      <div className={styles.buttonXList}>
                        <button
                          onClick={() => handlePopUpDelete(item.Id)}
                          className={styles.buttonBack}
                        >
                          <WindowClose className={styles.iconButtons} />
                        </button>
                      </div>
                      {popUpDelete ? null : (
                        <div className={styles.popUpDelete}>
                          <Zoom className={styles.zoomPopUp}>
                            <p className={styles.eachInfoOthers}>
                              Are you sure that you want to delete this post?
                            </p>
                            <div className={styles.sortButtonsPopUp}>
                              <button
                                className={styles.buttonBack}
                                onClick={handleDeleteFile}
                              >
                                Yes
                              </button>
                              <button
                                className={styles.buttonBack}
                                onClick={handlePopUpDelete}
                              >
                                No
                              </button>
                            </div>
                          </Zoom>
                        </div>
                      )}
                      <p className={styles.eachInfoOthers}>{item.title}</p>
                      <a
                        className={styles.eachInfoOthersLink}
                        style={{ textDecoration: "none" }}
                        target="_blank"
                        rel="noreferrer"
                        href={item.url}
                      >
                        <div className={styles.divUrl}>{item.url}</div>{" "}
                      </a>
                      <Skeleton style={{ marginTop: "3%" }} width={"80%"} />
                      <Skeleton width={"80%"} animation={false} />
                      <Skeleton
                        style={{ marginBottom: "3%" }}
                        width={"80%"}
                        animation="wave"
                      />
                      <div className={styles.sortFileUSer}>
                        <img
                          className={styles.imageFile}
                          src={item.image}
                          alt=""
                        />
                      </div>
                    </div>
                  </Fragment>
                ))}
            </div>
          </div>
        </Zoom>
        {popUp ? null : (
          <div className={styles.popUp}>
            <Zoom className={styles.zoomPopUp}>
              <div className={styles.buttonX}>
                <button onClick={handlePopUp} className={styles.buttonBack}>
                  <WindowClose className={styles.iconButtons} />
                </button>
              </div>
              <form onSubmit={handleSubmitFile} className={styles.form}>
                <div className={styles.separateLabels}>
                  <div className={styles.eachLabel}>
                    <label className={styles.label}>
                      <Subtitles className={styles.iconsForm} /> Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      name="title"
                      onChange={handleTitle}
                      required={true}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.eachLabel}>
                    <label className={styles.label}>
                      <Link className={styles.iconsForm} />
                      Link
                    </label>
                    <input
                      type="text"
                      value={myURL}
                      name="myURL"
                      onChange={handleURL}
                      required={false}
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.sortButtonFile}>
                  <button
                    type="button"
                    onClick={handleInputFile}
                    className={styles.buttonBookPop}
                  >
                    <FileEarmarkPlusFill className={styles.iconBook} />
                  </button>
                </div>
                <input
                  onChange={HandleAddFile}
                  type="file"
                  style={{ display: "none" }}
                  id="filePop"
                  name="filePop"
                />
                <div className={styles.separateLabels}>
                  <div className={styles.eachLabel}>
                    <div className={styles.sortFile}>
                      <img
                        className={styles.imageFile}
                        alt=""
                        src={file !== "" ? file : ""}
                      />
                    </div>
                  </div>
                  <div className={styles.eachLabel}>
                    <div className={styles.sortFile}>
                      <input className={styles.inputURL} value={myURL} />
                      <Skeleton width={"80%"} />
                      <Skeleton width={"80%"} animation={false} />
                      <Skeleton width={"80%"} animation="wave" />
                    </div>
                  </div>
                </div>
                <button type="submit" className={styles.buttonBookPop}>
                  <Save className={styles.iconBook} />
                </button>
              </form>
            </Zoom>
          </div>
        )}
      </div>
      <button onClick={handleEdit} className={styles.buttonBack}>
        <Pen className={styles.iconButtons} />
      </button>
    </div>
  );
};

export default Information;
