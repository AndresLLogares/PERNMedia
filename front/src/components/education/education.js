import React, { useState, useEffect, Fragment } from 'react';
import styles from '../../sass/education/education.module.scss';
import { Zoom } from 'react-awesome-reveal';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GETUSER } from '../actions/index.js';
import { Pen } from '@styled-icons/boxicons-regular/Pen';
import { Institution } from '@styled-icons/boxicons-solid/Institution';
import { Certificate } from '@styled-icons/fluentui-system-filled/Certificate';
import { CalendarDateFill } from '@styled-icons/bootstrap/CalendarDateFill';
import { TextDescription } from '@styled-icons/fluentui-system-filled/TextDescription';
import { WindowClose } from '@styled-icons/boxicons-regular/WindowClose';
import { Save } from '@styled-icons/boxicons-regular/Save';

const Education = () => {

    const [edit, setEdit] = useState(true);

    let URL = 'https://pinkbio.herokuapp.com/';

    const dispatch = useDispatch();

    let emailUser = localStorage.getItem('Email');

    const [education, setEducation] = useState({
        institute: '',
        degree: '',
        startdate: '',
        enddate: '',
        description: ''
    });

    const [popUpDelete, setPopUpDelete] = useState(true);

    let [idToDelete, setIdToDelete] = useState('');

    let user = useSelector(state => state.pink.user);

    useEffect(async () => {
        await dispatch(GETUSER(emailUser));
    }, [])

    const handleEdit = () => {
        setEdit(!edit);
    }

    const handleInputChange = (event) => {
        setEducation({ ...education, [event.target.name]: event.target.value })
    }

    const handleSubmitEducation = async (event) => {
        event.preventDefault()
        let id = 1
        if (user.education.length !== 0) {
            let idArray = user?.education?.map(item => item.Id)
            let max = Math.max.apply(null, idArray)
            id = max + 1;
        }
        await axios.post(URL + 'addeducation', {
            email: emailUser.toLocaleLowerCase(),
            id: id,
            institute: education.institute,
            degree: education.degree,
            startdate: education.startdate,
            enddate: education.enddate,
            description: education.description
        })
            .then(response => {
                toast.success(response.data.message)
            })
        await dispatch(GETUSER(emailUser));
        setEdit(!edit);
    }

    const handlePopUpDelete = (id) => {
        setPopUpDelete(!popUpDelete)
        setIdToDelete(id)
    }

    const handleDeleteEducation = async () => {
        await axios.post(URL + 'deleteeducation', {
            email: emailUser.toLocaleLowerCase(),
            id: idToDelete
        })
            .then(response => {
                toast.success(response.data.message)
            })
        await dispatch(GETUSER(emailUser));
        setPopUpDelete(!popUpDelete)
    }

    return (
        <div className={styles.boxEducation}>
            <div className={styles.sortTitle}>
                <Zoom className={styles.zoom} >
                    <p className={styles.titleEducation} >Education</p>
                </Zoom>
                <Zoom className={styles.zoom} >
                    <div className={styles.sortEducation}>
                        {user.education && user?.education.map((item, index) => (
                            <Fragment key={index} >
                                <div className={styles.sortOthers}>
                                    {popUpDelete ?
                                        null
                                        :
                                        <div className={styles.popUpDelete}>
                                            <Zoom className={styles.zoomPopUp} >
                                                <p className={styles.question} >Are you sure that you want to delete this education?</p>
                                                <div className={styles.sortButtonsPopUp} >
                                                    <button className={styles.buttonBack} onClick={handleDeleteEducation} >Yes</button>
                                                    <button className={styles.buttonBack} onClick={handlePopUpDelete} >No</button>
                                                </div>
                                            </Zoom>
                                        </div>
                                    }
                                </div>
                                <div className={styles.eachEducation} key={index}>
                                    <div className={styles.buttonXList}>
                                        <button onClick={() => handlePopUpDelete(item.Id)} className={styles.buttonBack} ><WindowClose className={styles.iconButtons} /></button>
                                    </div>
                                    <p className={styles.infoEducation} ><Institution className={styles.iconButtonsInfo} /> Institute:{item.institute}</p>
                                    <p className={styles.infoEducation}><Certificate className={styles.iconButtonsInfo} />Degree obtained:{item.degree}</p>
                                    <p className={styles.infoEducation}><CalendarDateFill className={styles.iconButtonsInfo} />Start Date:{item.startdate}</p>
                                    <p className={styles.infoEducation}><CalendarDateFill className={styles.iconButtonsInfo} />End Date:{item.enddate}</p>
                                    <p className={styles.infoEducation}><TextDescription className={styles.iconButtonsInfo} />Description:{item.description}</p>
                                    <hr className={styles.hrInfo} />
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </Zoom>
                {edit ?
                    null
                    :
                    <Fragment>
                        <div className={styles.popUp}>
                            <Zoom className={styles.zoomPopUp} >
                                <div className={styles.buttonX}>
                                    <button onClick={handleEdit} className={styles.buttonBack} ><WindowClose className={styles.iconButtons} /></button>
                                </div>
                                <form onSubmit={handleSubmitEducation} className={styles.form}>
                                    <label className={styles.label} ><Institution className={styles.iconButtonsForm} /> Institute</label>
                                    <input
                                        onChange={handleInputChange}
                                        className={styles.input}
                                        name='institute'
                                        required={true}
                                        type="text"
                                    />
                                    <label className={styles.label}><Certificate className={styles.iconButtonsForm} /> Degree obtained</label>
                                    <input
                                        onChange={handleInputChange}
                                        className={styles.input}
                                        name='degree'
                                        required={true}
                                        type="text"
                                    />
                                    <label className={styles.label}><CalendarDateFill className={styles.iconButtonsForm} /> Start date</label>
                                    <input
                                        onChange={handleInputChange}
                                        className={styles.input}
                                        name='startdate'
                                        lang='en'
                                        required={true}
                                        type="date"
                                    />
                                    <label className={styles.label}><CalendarDateFill className={styles.iconButtonsForm} /> End date</label>
                                    <input
                                        onChange={handleInputChange}
                                        className={styles.input}
                                        name='enddate'
                                        lang='en'
                                        required={true}
                                        type="date"
                                    />
                                    <label className={styles.label}><TextDescription className={styles.iconButtonsForm} /> Description</label>
                                    <textarea
                                        onChange={handleInputChange}
                                        className={styles.textarea}
                                        type="text"
                                        required={true}
                                        name='description'
                                    />
                                    <div className={styles.containerSave}>
                                        <button type="submit" className={styles.buttonBookPop} ><Save className={styles.iconButtons} /></button>
                                    </div>
                                </form>
                            </Zoom>
                        </div>
                    </Fragment>
                }
                <Zoom className={styles.zoomWidth} >
                    <div className={styles.sortEdit}>
                        <button onClick={handleEdit} className={styles.buttonBack} ><Pen className={styles.iconButtons} /></button>
                    </div>
                </Zoom>
            </div>
        </div>
    )
}

export default Education;