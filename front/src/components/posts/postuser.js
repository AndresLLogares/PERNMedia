import React, { useState, useEffect, Fragment } from 'react';
import styles from '../../sass/posts/user.module.scss';
import { Zoom } from 'react-awesome-reveal';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GETUSER, GETPOSTBYUSER } from '../actions/index.js';
import { Like } from '@styled-icons/boxicons-solid/Like';
import { WindowClose } from '@styled-icons/boxicons-regular/WindowClose';

const dateDiffInDays = (a, b) => {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / 1000 * 60 * 60 * 24);
}

const PostUser = () => {

    const [deletePost, setDeletePost] = useState(true);

    const [comment, setComment] = useState(true);

    const [addComment, setAddComment] = useState('');

    const [idToAddComment, setIdToAddComment] = useState('');

    const [idToDelete, setIdToDelete] = useState('');

    let URL = 'https://pinkbio.herokuapp.com/';

    const dispatch = useDispatch();

    let user = useSelector(state => state.pink.user);

    let posts = useSelector(state => state.pink.postuser?.posts);

    let emailUser = localStorage.getItem('Email');

    const todays = new Date();

    useEffect(async () => {
        await dispatch(GETUSER(emailUser));
        await dispatch(GETPOSTBYUSER(emailUser));
    }, [])

    const handleDelete = (id) => {
        setDeletePost(!deletePost);
        setIdToDelete(id)
    }

    const handleComment = (id) => {
        setComment(!comment);
        setIdToAddComment(id)
    }

    const handleAddComment = (event) => {
        setAddComment(event.target.value)
    }

    const handleDeletePost = async (event) => {
        event.preventDefault();
        await axios.post(URL + 'deleteposts', {
            email: emailUser,
            id: idToDelete
        })
            .then((response) => {
                toast.success(response.data.message)
            })
        setIdToDelete('')
        setDeletePost(!deletePost);
        await dispatch(GETPOSTBYUSER(emailUser));
        await dispatch(GETUSER(emailUser));
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
        await dispatch(GETUSER(emailUser));
        await dispatch(GETPOSTBYUSER(emailUser));
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
        await dispatch(GETUSER(emailUser));
        await dispatch(GETPOSTBYUSER(emailUser));
    }

    return (
        <div className={styles.boxPosts}>
            {deletePost ?
                null
                :
                <div className={styles.popUpDelete}>
                    <Zoom className={styles.zoom} >
                        <p className={styles.question} >Are you sure that you want to delete this post?</p>
                        <div className={styles.sortButtonsPopUp}>
                            <button className={styles.buttonBack} onClick={handleDeletePost} >Yes</button>
                            <button className={styles.buttonBack} onClick={handleDelete} >No</button>
                        </div>
                    </Zoom>
                </div>
            }
            {comment ?
                null
                :
                <div className={styles.popUpDelete}>
                    <Zoom className={styles.zoom} >
                        <div className={styles.buttonXList}>
                            <button onClick={handleComment} className={styles.buttonBack} ><WindowClose className={styles.iconButtons} /></button>
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
                        <div className={styles.buttonXList}>
                            <button onClick={() => handleDelete(item.Id)} className={styles.buttonBack} ><WindowClose
                             className={styles.iconButtons} /></button>
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
                            <button onClick={() => handleComment(item.Id)} className={styles.buttonComment}>Comment Here</button>
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
    )
}

export default PostUser;