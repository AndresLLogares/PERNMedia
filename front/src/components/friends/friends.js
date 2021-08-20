import React, { useState, useEffect, Fragment } from 'react';
import styles from '../../sass/friends/friends.module.scss';
import { Zoom } from 'react-awesome-reveal';
import Navbar from '../navbar/navbarOthers';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { GETFRIENDS, GETUSER } from '../actions';
import noProfile from '../images/BATMAN.png';
import { Send } from '@styled-icons/fluentui-system-filled/Send';
import { Profile } from '@styled-icons/icomoon/Profile';
import { CheckCircle } from '@styled-icons/boxicons-regular/CheckCircle';
import { Cancel } from '@styled-icons/material-outlined/Cancel';
import { WindowClose } from '@styled-icons/boxicons-regular/WindowClose';
import axios from 'axios';
import NOFRIENDS from '../images/NOFRIENDS.gif';

const Friends = () => {

    const dispatch = useDispatch();

    let URL = 'https://pinkbio.herokuapp.com/';

    let friends = useSelector(state => state.pink.friends.friend);

    let user = useSelector(state => state.pink.user);

    let emailUser = localStorage.getItem('Email');

    const [popUpRemove, setPopUpRemove] = useState(false);

    const [uuidToDelete, setUuidToDelete] = useState('');

    useEffect(async () => {
        await dispatch(GETFRIENDS(emailUser));
        await dispatch(GETUSER(emailUser));
    }, [])

    const handleLinkProfile = (value) => {
        window.location.href = `http://localhost:3000/ProfileO?uuid=${value}`
    }

    const handleRemoveContact = async () => {
        await axios.post(URL + 'removecontact', {
            uuid: uuidToDelete
        })
            .then((response) => {
                toast.success('Friend deleted')
            })
        await dispatch(GETFRIENDS(emailUser));
        await dispatch(GETUSER(emailUser));
        setPopUpRemove(!popUpRemove)
    }

    const handlePopUpDelete = (id) => {
        setPopUpRemove(!popUpRemove)
        setUuidToDelete(id)
    }

    const handleAccept = async (uuid) => {
        await axios.post(URL + 'handlerequest', {
            uuid: uuid,
            fullname: user.fullname,
            profilePhoto: user.profilePhoto,
            useruuid: user.UUID
        })
            .then((response) => {
                toast.success(response.data.message)
            })
        await dispatch(GETFRIENDS(emailUser));
        await dispatch(GETUSER(emailUser));
    }

    return (
        <div className={styles.backFriends} >
            <Toaster />
            <Navbar />
            <div className={styles.sortTitleFriends}>
                <Zoom className={styles.zoom} >
                    <div className={styles.boxFriends}>
                        <p className={styles.titleFrinds} >These are your friends {user.fullname}</p>
                    </div>
                </Zoom>
            </div>
            <div className={styles.sortFriends}>
                {friends && friends.length === 0 ?
                    <Zoom className={styles.zoom} >
                        <div className={styles.boxFriends}>
                            <p className={styles.titleFrinds} >No friends or requests</p>
                        </div>
                        <div className={styles.boxImage}>
                            <img className={styles.imageNo} src={NOFRIENDS} alt='' />
                        </div>
                    </Zoom>
                    :
                    <Fragment>
                        {friends && friends.map((item, index) => (
                            <Fragment key={index}>
                                {item.request ?
                                    <Zoom className={styles.zoomFriends}>
                                        <div className={styles.eachFriend}>
                                            <img src={!item.image ? noProfile : item.image} alt='' className={styles.imageFriend} />
                                            <p className={styles.name} >{item.namefriend}</p>
                                            <div className={styles.sortButton}>
                                                <button onClick={() => handleAccept(item.uuid)} className={styles.buttonFriend} ><CheckCircle className={styles.icons} /> Accept</button>
                                                <button onClick={() => handlePopUpDelete(item.uuid)} className={styles.buttonFriend} ><Cancel className={styles.icons} />Reject</button>
                                            </div>
                                            {popUpRemove ?
                                                <div className={styles.popUpDelete}>
                                                    <Zoom className={styles.zoomPop} >
                                                        <p className={styles.question} >Are you sure you want to delete this contact?</p>
                                                        <div className={styles.sortButtonsPopUp} >
                                                            <button onClick={handleRemoveContact} className={styles.buttonBack}>Yes</button>
                                                            <button onClick={() => setPopUpRemove(!popUpRemove)} className={styles.buttonBack} >No</button>
                                                        </div>
                                                    </Zoom>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                    </Zoom>
                                    :
                                    <Zoom className={styles.zoomFriends}>
                                        <div className={styles.eachFriend}>
                                            <img src={!item.image ? noProfile : item.image} alt='' className={styles.imageFriend} />
                                            <p className={styles.name} >{item.namefriend}</p>
                                            <div className={styles.sortButton}>
                                                <button className={styles.buttonFriend} ><Send className={styles.icons} /> Send Message</button>
                                                <button onClick={() => handleLinkProfile(item.useruuid)} className={styles.buttonFriend} ><Profile className={styles.icons} /> See Profile</button>
                                            </div>
                                            <div className={styles.sortRemove}>
                                                <button className={styles.buttonBack} onClick={() => handlePopUpDelete(item.uuid)}>
                                                    <WindowClose className={styles.iconsSmall} /></button>
                                            </div>
                                            {popUpRemove ?
                                                <div className={styles.popUpDelete}>
                                                    <Zoom className={styles.zoomPop} >
                                                        <p className={styles.question} >Are you sure you want to delete this contact?</p>
                                                        <div className={styles.sortButtonsPopUp} >
                                                            <button onClick={handleRemoveContact} className={styles.buttonBack}>Yes</button>
                                                            <button onClick={() => setPopUpRemove(!popUpRemove)} className={styles.buttonBack} >No</button>
                                                        </div>
                                                    </Zoom>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                    </Zoom>
                                }
                            </Fragment>
                        ))}
                    </Fragment>
                }
            </div>
        </div>
    )
}

export default Friends;