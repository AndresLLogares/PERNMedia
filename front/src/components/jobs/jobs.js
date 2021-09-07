import React, { useState, useEffect, Fragment } from "react";
import styles from "../../sass/jobs/jobs.module.scss";
import { Zoom } from "react-awesome-reveal";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GETUSER } from "../actions";
import { Pen } from "@styled-icons/boxicons-regular/Pen";
import { WindowClose } from "@styled-icons/boxicons-regular/WindowClose";
import { Save } from "@styled-icons/boxicons-regular/Save";
import { CalendarDateFill } from "@styled-icons/bootstrap/CalendarDateFill";
import { Work } from "@styled-icons/material-sharp/Work";
import { PositionForward } from "@styled-icons/fluentui-system-filled/PositionForward";
import { TextDescription } from "@styled-icons/fluentui-system-filled/TextDescription";

const Jobs = () => {
  const [edit, setEdit] = useState(true);

  let URL = "https://pinkbio.herokuapp.com/";

  const dispatch = useDispatch();

  let emailUser = localStorage.getItem("Email");

  const [jobs, setJobs] = useState({
    jobposition: "",
    employmenttype: "",
    companyname: "",
    location: "",
    startdate: "",
    enddate: "",
    description: "",
  });

  let [idToDelete, setIdToDelete] = useState("");

  const [popUpDelete, setPopUpDelete] = useState(true);

  let user = useSelector((state) => state.pink.user);

  useEffect(async () => {
    await dispatch(GETUSER(emailUser));
  }, []);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleInputChange = (event) => {
    setJobs({ ...jobs, [event.target.name]: event.target.value });
  };

  const handleSubmitJobs = async (event) => {
    event.preventDefault();
    let id = 1;
    if (user.jobs.length !== 0) {
      let idArray = user?.jobs?.map((item) => item.Id);
      let max = Math.max.apply(null, idArray);
      id = max + 1;
    }
    await axios
      .post(URL + "addjobs", {
        email: emailUser.toLocaleLowerCase(),
        id: id,
        jobposition: jobs.jobposition,
        employmenttype: jobs.employmenttype,
        startdate: jobs.startdate,
        enddate: jobs.enddate,
        description: jobs.description,
      })
      .then((response) => {
        toast.success(response.data.message);
      });
    await dispatch(GETUSER(emailUser));
    setEdit(!edit);
  };

  const handlePopUpDelete = (id) => {
    setPopUpDelete(!popUpDelete);
    setIdToDelete(id);
  };

  const handleDeleteJobs = async () => {
    await axios
      .post(URL + "deletejobs", {
        email: emailUser.toLocaleLowerCase(),
        id: idToDelete,
      })
      .then((response) => {
        toast.success(response.data.message);
      });
    await dispatch(GETUSER(emailUser));
    setPopUpDelete(!popUpDelete);
  };

  return (
    <div className={styles.boxJobs}>
      <div className={styles.sortTitle}>
        <Zoom className={styles.zoom}>
          <p className={styles.titleJobs}>Work experience</p>
        </Zoom>
      </div>
      <Zoom className={styles.zoom}>
        <div className={styles.sortJobs}>
          {user.jobs &&
            user?.jobs.map((item, index) => (
              <Fragment key={index}>
                <div className={styles.sortOthers}>
                  {popUpDelete ? null : (
                    <div className={styles.popUpDelete}>
                      <Zoom className={styles.zoomPopUp}>
                        <p className={styles.question}>
                          Are you sure that you want to delete this job?
                        </p>
                        <div className={styles.sortButtonsPopUp}>
                          <button
                            className={styles.buttonBack}
                            onClick={handleDeleteJobs}
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
                </div>
                <div className={styles.eachEducation} key={index}>
                  <div className={styles.buttonXList}>
                    <button
                      onClick={() => handlePopUpDelete(item.Id)}
                      className={styles.buttonBack}
                    >
                      <WindowClose className={styles.iconButtons} />
                    </button>
                  </div>
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
      {edit ? null : (
        <Fragment>
          <div className={styles.popUp}>
            <Zoom className={styles.zoomPopUp}>
              <div className={styles.buttonX}>
                <button onClick={handleEdit} className={styles.buttonBack}>
                  <WindowClose className={styles.iconButtons} />
                </button>
              </div>
              <form onSubmit={handleSubmitJobs} className={styles.form}>
                <label className={styles.label}>
                  <PositionForward className={styles.iconButtonsForm} /> Job
                  Position
                </label>
                <input
                  onChange={handleInputChange}
                  className={styles.input}
                  name="jobposition"
                  required={true}
                  type="text"
                />
                <label className={styles.label}>
                  <Work className={styles.iconButtonsForm} />
                  Employment Type
                </label>
                <input
                  onChange={handleInputChange}
                  className={styles.input}
                  name="employmenttype"
                  required={true}
                  type="text"
                />
                <label className={styles.label}>
                  <CalendarDateFill className={styles.iconButtonsForm} /> Start
                  date
                </label>
                <input
                  onChange={handleInputChange}
                  className={styles.input}
                  name="startdate"
                  lang="en"
                  required={true}
                  type="date"
                />
                <label className={styles.label}>
                  <CalendarDateFill className={styles.iconButtonsForm} /> End
                  date
                </label>
                <input
                  onChange={handleInputChange}
                  className={styles.input}
                  name="enddate"
                  lang="en"
                  required={true}
                  type="date"
                />
                <label className={styles.label}>
                  <TextDescription className={styles.iconButtonsForm} />{" "}
                  Description
                </label>
                <textarea
                  onChange={handleInputChange}
                  className={styles.textarea}
                  type="text"
                  required={true}
                  name="description"
                />
                <div className={styles.containerSave}>
                  <button type="submit" className={styles.buttonBookPop}>
                    <Save className={styles.iconButtons} />
                  </button>
                </div>
              </form>
            </Zoom>
          </div>
        </Fragment>
      )}
      <Zoom className={styles.zoomWidth}>
        <div className={styles.sortEdit}>
          <button onClick={handleEdit} className={styles.buttonBack}>
            <Pen className={styles.iconButtons} />
          </button>
        </div>
      </Zoom>
    </div>
  );
};

export default Jobs;
