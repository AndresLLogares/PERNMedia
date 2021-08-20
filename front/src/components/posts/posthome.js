import React, { useState, useEffect, Fragment } from 'react';
import styles from '../../sass/posts/home.module.scss';
import { Zoom } from 'react-awesome-reveal';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GETPOSTS, GETUSER } from '../actions/index.js';
import { Like } from '@styled-icons/boxicons-solid/Like';
import { WindowClose } from '@styled-icons/boxicons-regular/WindowClose';

const dateDiffInDays = (a, b) => {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / 1000 * 60 * 60 * 24);
}

const PostHome = () => {

    const dispatch = useDispatch();

    let posts = useSelector(state => state.pink.posts.post);

    let URL = 'https://pinkbio.herokuapp.com/';

    let emailUser = localStorage.getItem('Email');

    let user = useSelector(state => state.pink.user);

    const [comment, setComment] = useState(true);

    const [addComment, setAddComment] = useState('');

    const [idToAddComment, setIdToAddComment] = useState('');

    useEffect(async () => {
        await dispatch(GETUSER(emailUser));
        await dispatch(GETPOSTS());
    }, [])

    const todays = new Date();

    const handleComment = (id) => {
        setComment(!comment);
        setIdToAddComment(id)
    }

    const handleAddComment = (event) => {
        setAddComment(event.target.value)
    }

    const handleAddCommentSubmit = async (event) => {
        event.preventDefault();
        await axios.post(URL + 'addcommenttopost', {
            comment: addComment,
            name: user.name + ' ' + user.lastname,
            date: new Date(),
            id: idToAddComment,
            email: emailUser
        })
            .then((response) => {
                toast.success(response.data.message)
            })
        await dispatch(GETPOSTS());

        setComment(!comment);
        setAddComment('')
    }

    const handleLikeAdd = async (id) => {
        await axios.post(URL + 'handlelike', {
            name: user.name + ' ' + user.lastname,
            id: id,
            email: emailUser,
        })
            .then((response) => {
                toast.success(response.data.message)
            })
        await dispatch(GETPOSTS());
    }

    const handleToProfile = (value) => {
        window.location.href = `https://pinkbio.netlify.app/ProfileO?uuid=${value}`
    }

    return (
        <div className={styles.backHome}>
            <div className={styles.boxPosts}>
                {comment ?
                    null
                    :
                    <div className={styles.popUpDelete}>
                        <Zoom className={styles.zoom} >
                            <div className={styles.buttonXList}>
                                <button onClick={handleComment} className={styles.buttonBack} >
                                    <WindowClose className={styles.iconButtons} /></button>
                            </div>
                            <form onSubmit={handleAddCommentSubmit} className={styles.form}>
                                <label className={styles.label}>
                                    Your Comment here...
                                </label>
                                <textarea
                                    type="text"
                                    onChange={handleAddComment}
                                    required={true}
                                    className={styles.textarea}
                                />
                                <button type="submit" className={styles.buttonCOmment}>Comment</button>
                            </form>
                        </Zoom>
                    </div>
                }
                <div className={styles.sortPosts}>
                    {posts && posts.map((item, index) => (
                        <div key={index} className={styles.eachPost}>
                            <div onClick={() => handleToProfile(item.useruuid)} className={styles.sortUp}>
                                <img src={item.picture} className={styles.picture} alt='' />
                                <p className={styles.nameUser}>{item.name}</p>
                            </div>
                            <p className={styles.titlePost}>{item.title}</p>
                            {item.image === '' ?
                                null
                                :
                                <div className={styles.imagePost}>
                                    <img src={item.image} className={styles.image} alt='' />
                                </div>
                            }
                            {item.description === '' ?
                                null
                                :
                                <div className={styles.sortDescription}>
                                    <p className={styles.description}>{item.description}</p>
                                </div>
                            }
                            <div className={styles.sortLikes}>
                                <button type="button" onClick={() => handleLikeAdd(item.Id)} className={styles.buttonBack} ><Like className={styles.iconButtons} /></button>
                                <button className={styles.buttonBack} >{item?.likes?.length ? item.likes.length : 0}</button>
                                <button onClick={() => handleComment(item.Id)} className={styles.buttonComment}>Comment</button>

                            </div>
                            <div className={styles.sortComment}>
                                {item.comments && item.comments.map((comment, index) => (
                                    <div key={index} className={styles.eachComment}>
                                        <Zoom className={styles.zoom} >
                                            <div className={styles.sortUpCOmment}>
                                                <p className={styles.name}>{comment.name}</p>
                                                <p className={styles.name}>{dateDiffInDays(todays, new Date(item.date))} Days ago</p>
                                            </div>
                                            <div className={styles.sortName}>
                                                <p className={styles.comment}>{comment.comment}</p>
                                            </div>
                                        </Zoom>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.sortComment}>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostHome;