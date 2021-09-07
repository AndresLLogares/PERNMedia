import React, { useState, useEffect, Fragment } from "react";
import styles from "../../sass/profile/profileOut.module.scss";
import { Zoom } from "react-awesome-reveal";
import Navbar from "../navbar/navbarOthers";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  GETUSERUUID,
  GETUSER,
  GETFRIENDSUUID,
  GETPOSTBYUUID,
} from "../actions";
import axios from "axios";
import assignLogo from "./assignLogo.js";
import logo from "../images/LogoMedia.png";
import noProfile from "../images/BATMAN.png";
import { Skeleton } from "@material-ui/lab";
import { Institution } from "@styled-icons/boxicons-solid/Institution";
import { Certificate } from "@styled-icons/fluentui-system-filled/Certificate";
import { CalendarDateFill } from "@styled-icons/bootstrap/CalendarDateFill";
import { TextDescription } from "@styled-icons/fluentui-system-filled/TextDescription";
import { AddUser } from "@styled-icons/entypo/AddUser";
import { Work } from "@styled-icons/material-sharp/Work";
import { PositionForward } from "@styled-icons/fluentui-system-filled/PositionForward";
import { WindowClose } from "@styled-icons/boxicons-regular/WindowClose";
import { Like } from "@styled-icons/boxicons-solid/Like";
import { v4 as uuidv4 } from "uuid";
import { RemoveUser } from "@styled-icons/entypo/RemoveUser";

const dateDiffInDays = (a, b) => {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor(((utc2 - utc1) / 1000) * 60 * 60 * 24);
};

const ProfileOut = (props) => {
  const search = props.location.search;

  const params = new URLSearchParams(search);

  const UUID = params.get("uuid");

  let URL = "https://pinkbio.herokuapp.com/";

  const [comment, setComment] = useState(true);

  const [addComment, setAddComment] = useState("");

  const [idToAddComment, setIdToAddComment] = useState("");

  let emailUser = localStorage.getItem("Email");

  let user = useSelector((state) => state.pink.userUUID);

  let userOut = useSelector((state) => state.pink.user);

  let posts = useSelector((state) => state.pink.postuuid?.posts);

  let friends = useSelector((state) => state.pink.friendsuuid?.friend);

  let backPhoto = user?.backPhoto;

  let profilePhoto = user?.profilePhoto;

  let technologiesUser = user?.technologies;

  const todays = new Date();
  console.log(userOut);

  if (technologiesUser?.length > 0) {
    technologiesUser = assignLogo(technologiesUser);
  }

  let dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(GETUSERUUID(UUID));
    await dispatch(GETFRIENDSUUID(UUID));
    await dispatch(GETUSER(emailUser));
    await dispatch(GETPOSTBYUUID(UUID));
  }, []);

  const handleAddContact = async () => {
    await axios
      .post(URL + "addfriends", {
        uuid: uuidv4(),
        user: user?.email,
        emailfriend: userOut?.email,
        namefriend: userOut?.fullname,
        imagefriend: userOut?.profilePhoto,
        useruuid: user?.uuid,
        frienduuid: userOut?.UUID,
      })
      .then((response) => {
        toast.success(response.data.message);
      });
    await dispatch(GETUSER(emailUser));
    await dispatch(GETFRIENDSUUID(UUID));
  };

  const handleComment = (id) => {
    setComment(!comment);
    setIdToAddComment(id);
  };

  const handleAddComment = (event) => {
    setAddComment(event.target.value);
  };

  const handleAddCommentSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(URL + "addcommenttopost", {
        comment: addComment,
        name: user.name + " " + user.lastname,
        date: new Date(),
        id: idToAddComment,
        email: emailUser,
      })
      .then((response) => {
        toast.success(response.data.message);
      });
    await dispatch(GETUSERUUID(UUID));
    await dispatch(GETPOSTBYUUID(UUID));
    await dispatch(GETUSER(emailUser));
    setComment(!comment);
    setAddComment("");
  };

  const handleLikeAdd = async (id) => {
    await axios
      .post(URL + "handlelike", {
        name: user.name + " " + user.lastname,
        id: id,
        email: emailUser,
      })
      .then((response) => {
        toast.success(response.data.message);
      });
    await dispatch(GETUSERUUID(UUID));
    await dispatch(GETPOSTBYUUID(UUID));
    await dispatch(GETUSER(emailUser));
  };

  const handleRemoveContact = async () => {
    let uuid = await friends.filter((item) => item.emailfriend === emailUser);
    await axios
      .post(URL + "removecontact", {
        uuid: uuid[0].uuid,
      })
      .then((response) => {
        toast.success(response.data.message);
      });
    await dispatch(GETUSERUUID(UUID));
    await dispatch(GETPOSTBYUUID(UUID));
    await dispatch(GETUSER(emailUser));
    await dispatch(GETFRIENDSUUID(UUID));
  };

  return (
    <div className={styles.backProfile}>
      <Navbar />
      <Toaster />
      <div className={styles.sortProfile}>
        <Zoom className={styles.zoom}>
          <div className={styles.backImage}>
            {!backPhoto ? (
              <img alt="" src={logo} className={styles.backImageNone} />
            ) : (
              <img alt="" src={backPhoto} className={styles.backImageSize} />
            )}
          </div>
        </Zoom>
        <div className={styles.container}>
          <div className={styles.sortProfilePicture}>
            <Zoom className={styles.zoomProfile}>
              <div className={styles.imageProfile}>
                {!profilePhoto ? (
                  <img
                    alt=""
                    src={noProfile}
                    className={styles.backImageSize}
                  />
                ) : (
                  <img
                    alt=""
                    src={profilePhoto}
                    className={styles.backImageSize}
                  />
                )}
              </div>
            </Zoom>
          </div>
          <div className={styles.sortTechnologies}>
            <Zoom className={styles.zoomTechonologies}>
              <div className={styles.boxTechonologies}>
                <p className={styles.titleTechno}>Technologies</p>
                <div className={styles.separateTechno}>
                  <div className={styles.sortMyTechnologies}>
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
        {user.email !== emailUser ? (
          <div className={styles.sortButtonAdd}>
            {friends &&
            friends.findIndex((item) => item.emailfriend === emailUser) !==
              -1 ? (
              <Zoom className={styles.zoomAdd}>
                <button
                  onClick={handleRemoveContact}
                  className={styles.buttonFriend}
                >
                  <RemoveUser className={styles.iconFriend} />
                  Remove Contact
                </button>
              </Zoom>
            ) : (
              <Zoom className={styles.zoomAdd}>
                <button
                  onClick={handleAddContact}
                  className={styles.buttonFriend}
                >
                  <AddUser className={styles.iconFriend} />
                  Add Contact
                </button>
              </Zoom>
            )}
          </div>
        ) : null}
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
              </div>
            </Zoom>
            <Zoom className={styles.zoomWidthSecond}>
              <div className={styles.secondColumn}>
                <div className={styles.containerOthers}>
                  {user.others &&
                    user?.others.map((item, index) => (
                      <Fragment key={index}>
                        <div className={styles.sortOthers}>
                          <p className={styles.eachInfoOthers}>{item.title}</p>
                          <a
                            className={styles.eachInfoOthersLink}
                            style={{ textDecoration: "none" }}
                            rel="noreferrer"
                            target="_blank"
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
          </div>
        </div>
        <div className={styles.boxInformation}>
          <div className={styles.sortTitle}>
            <Zoom className={styles.zoom}>
              <p className={styles.titleInfo}>Education</p>
            </Zoom>
          </div>
          <Zoom className={styles.zoom}>
            <div className={styles.sortEducation}>
              {user.education &&
                user?.education.map((item, index) => (
                  <Fragment key={index}>
                    <div className={styles.eachEducation}>
                      <p className={styles.infoEducation}>
                        <Institution className={styles.iconButtonsInfo} />{" "}
                        Institute:{item.institute}
                      </p>
                      <p className={styles.infoEducation}>
                        <Certificate className={styles.iconButtonsInfo} />
                        Degree obtained:{item.degree}
                      </p>
                      <p className={styles.infoEducation}>
                        <CalendarDateFill className={styles.iconButtonsInfo} />
                        Start Date:{item.startdate}
                      </p>
                      <p className={styles.infoEducation}>
                        <CalendarDateFill className={styles.iconButtonsInfo} />
                        End Date:{item.enddate}
                      </p>
                      <p className={styles.infoEducation}>
                        <TextDescription className={styles.iconButtonsInfo} />
                        Description:{item.description}
                      </p>
                      <hr className={styles.hrInfo} />
                    </div>
                  </Fragment>
                ))}
            </div>
          </Zoom>
        </div>
        <div className={styles.boxInformation}>
          <div className={styles.sortTitle}>
            <Zoom className={styles.zoom}>
              <p className={styles.titleInfo}>Work experience</p>
            </Zoom>
          </div>
          <Zoom className={styles.zoom}>
            <div className={styles.sortJobs}>
              {user.jobs &&
                user?.jobs.map((item, index) => (
                  <Fragment key={index}>
                    <div className={styles.eachEducation} key={index}>
                      <p className={styles.infoEducation}>
                        <PositionForward className={styles.iconButtonsInfo} />
                        Job Position:{item.jobposition}
                      </p>
                      <p className={styles.infoEducation}>
                        <Work className={styles.iconButtonsInfo} />
                        Employment Type:{item.employmenttype}
                      </p>
                      <p className={styles.infoEducation}>
                        <CalendarDateFill className={styles.iconButtonsInfo} />
                        Start Date:{item.startdate}
                      </p>
                      <p className={styles.infoEducation}>
                        <CalendarDateFill className={styles.iconButtonsInfo} />
                        End Date:{item.enddate}
                      </p>
                      <p className={styles.infoEducation}>
                        <TextDescription className={styles.iconButtonsInfo} />
                        Description:{item.description}
                      </p>
                      <hr className={styles.hrInfo} />
                    </div>
                  </Fragment>
                ))}
            </div>
          </Zoom>
        </div>
        <div className={styles.boxPosts}>
          {comment ? null : (
            <div className={styles.popUpDelete}>
              <Zoom className={styles.zoom}>
                <div className={styles.buttonXList}>
                  <button onClick={handleComment} className={styles.buttonBack}>
                    <WindowClose className={styles.iconButtons} />
                  </button>
                </div>
                <form onSubmit={handleAddCommentSubmit} className={styles.form}>
                  <label className={styles.label}>Your Comment here...</label>
                  <textarea
                    type="text"
                    onChange={handleAddComment}
                    required={true}
                    className={styles.textarea}
                  />
                  <button type="submit" className={styles.buttonCOmment}>
                    Comment
                  </button>
                </form>
              </Zoom>
            </div>
          )}
          <div className={styles.sortPosts}>
            {posts &&
              posts.map((item, index) => (
                <div key={index} className={styles.eachPost}>
                  <Zoom className={styles.zoom}>
                    <p className={styles.titlePost}>{item.title}</p>
                    {item.image === "" ? null : (
                      <div className={styles.imagePost}>
                        <img src={item.image} className={styles.image} alt="" />
                      </div>
                    )}
                    {item.description === "" ? null : (
                      <div className={styles.sortDescription}>
                        <p className={styles.description}>{item.description}</p>
                      </div>
                    )}
                    <div className={styles.sortLikes}>
                      <button
                        type="button"
                        onClick={() => handleLikeAdd(item.Id)}
                        className={styles.buttonBack}
                      >
                        <Like className={styles.iconButtons} />
                      </button>
                      <button className={styles.buttonBack}>
                        {item?.likes?.length ? item.likes.length : 0}
                      </button>
                      <button
                        onClick={() => handleComment(item.Id)}
                        className={styles.buttonComment}
                      >
                        Comment Here
                      </button>
                    </div>
                    <div className={styles.sortComment}>
                      {item.comments &&
                        item.comments.map((comment, index) => (
                          <div key={index} className={styles.eachComment}>
                            <Zoom className={styles.zoom}>
                              <div className={styles.sortUpCOmment}>
                                <p className={styles.name}>{comment.name}</p>
                                <p className={styles.name}>
                                  {dateDiffInDays(todays, new Date(item.date))}{" "}
                                  Days ago
                                </p>
                              </div>
                              <div className={styles.sortName}>
                                <p className={styles.comment}>
                                  {comment.comment}
                                </p>
                              </div>
                            </Zoom>
                          </div>
                        ))}
                    </div>
                    <div className={styles.sortComment}></div>
                  </Zoom>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOut;
