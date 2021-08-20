import React, { useState, useEffect, Fragment } from 'react';
import styles from '../../sass/messages/messages.module.scss';
import { Zoom } from 'react-awesome-reveal';
import Navbar from '../navbar/navbarOthers';
import toast, { Toaster } from 'react-hot-toast';
import { GETFRIENDS, GETUSER } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import noProfile from '../images/BATMAN.png';
import { Send } from '@styled-icons/fluentui-system-filled/Send';
import axios from 'axios';


const dateDiffInDays = (a, b) => {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / 1000 * 60 * 60 * 24);
}

const Messages = () => {

    const dispatch = useDispatch();

    let URL = 'https://pinkbio.herokuapp.com/';

    let emailUser = localStorage.getItem('Email');

    let friends = useSelector(state => state.pink.friends.friend);

    const [friendMessage, setFriendMessage] = useState('');

    const [messageFriend, setMessageFriend] = useState('');

    const [uuidMessage, setUuidMessage] = useState('');

    let user = useSelector(state => state.pink.user);

    const todays = new Date();

    useEffect(async () => {
        await dispatch(GETFRIENDS(emailUser));
        await dispatch(GETUSER(emailUser));
    }, [])

    const handleFriend = (value, uuid) => {
        setFriendMessage(value);
        setUuidMessage(uuid)
    }

    const handleInputChange = (event) => {
        setMessageFriend(event.target.value);
    }

    const handleSubmitChange = async (event) => {
        event.preventDefault();
        if (messageFriend === '') {
            return toast.error('Message can not be empty');
        }
        await axios.post(URL + 'handlemessage', {
            date: Date.now(),
            uuid: uuidMessage,
            message: messageFriend,
            author: user.fullname
        })
            .then(response => {
                toast.success(response.data.message)
            })
        setMessageFriend('');
        await dispatch(GETFRIENDS(emailUser));
        await dispatch(GETUSER(emailUser));
    }

    console.log(friends)

    return (
        <div className={styles.containerMessages}>
            <Toaster />
            <Navbar />
            <div className={styles.sortTitleMessages}>
                <Zoom className={styles.zoom} >
                    <div className={styles.boxMessages}>
                        <p className={styles.titleMessages} >Messages</p>
                    </div>
                </Zoom>
            </div>
            <div className={styles.sortTwoBoxes}>
            <Zoom className={styles.zoom} >
                    <div className={styles.sortFriends}>
                        {friends && friends.map((item, index) => (
                            <Fragment key={index} >
                                {item.request ?
                                    null
                                    :
                                    <div onClick={() => handleFriend(item.emailfriend, item.uuid)} className={styles.eachFriend}>
                                        <img src={!item.image ? noProfile : item.image} alt='' className={styles.imageFriend} />
                                        <p className={styles.name} >{item.namefriend}</p>
                                    </div>
                                }
                            </Fragment>
                        ))}
                    </div>
                </Zoom>
                <Zoom className={styles.zoom} >
                    <div className={styles.sortMessages}>
                        <Fragment>
                            {friendMessage === '' ?
                                null
                                :
                                <Fragment>
                                    {friends && friends.filter(item => item.emailfriend === friendMessage).map((item, key) => (
                                        <Fragment>
                                            <div className={styles.upMessages}>
                                                <img src={!item.image ? noProfile : item.image} alt='' className={styles.imageFriendMessages} />
                                                <p className={styles.name} >{item.namefriend}</p>
                                            </div>
                                            <div className={styles.sortBox}>
                                                <div className={styles.eachMessage}>
                                                    <Fragment>
                                                        {item.messages.map((item, key) => (
                                                            <div className={item.author === user.fullname ? styles.boxMe : styles.boxOther}>
                                                                <Fragment>
                                                                    {item.author === user.fullname ?
                                                                        <p className={styles.textMeLittle} >From: Me</p>
                                                                        :
                                                                        <p className={styles.textMeLittle} >From: {item.author}</p>
                                                                    }
                                                                </Fragment>
                                                                <p className={styles.textMeLittle}>{dateDiffInDays(todays, new Date(item.date))} Days ago</p>
                                                                <p className={styles.textMe} >{item.message}</p>
                                                            </div>
                                                        ))}
                                                    </Fragment>
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))}
                                </Fragment>
                            }
                        </Fragment>
                        <div className={styles.sortSendMessage}>
                            <form
                                onSubmit={handleSubmitChange}
                                className={styles.form}>
                                <textarea
                                    value={messageFriend}
                                    onChange={handleInputChange}
                                    className={styles.textarea}
                                    type="text"
                                />
                                <button type="submit" className={styles.buttonBack} ><Send className={styles.icons} /></button>
                            </form>
                        </div>
                    </div>
                </Zoom>
            </div>
        </div >
    )
}

export default Messages;