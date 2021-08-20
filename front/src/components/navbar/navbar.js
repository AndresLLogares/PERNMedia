import React, { useState, useEffect, Fragment } from 'react';
import styles from '../../sass/navbar/navbar.module.scss';
import { ThMenu } from '@styled-icons/typicons/ThMenu';
import { Cancel } from '@styled-icons/material-rounded/Cancel';
import { Zoom } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import logo from '../images/LogoMedia.png';
import { Profile } from '@styled-icons/icomoon/Profile';
import { UserFriends } from '@styled-icons/fa-solid/UserFriends';
import { Home } from '@styled-icons/boxicons-regular/Home';
import { LogOut } from '@styled-icons/boxicons-regular/LogOut';
import { EmojiLaughingFill } from '@styled-icons/bootstrap/EmojiLaughingFill';
import { PeopleSearch } from '@styled-icons/fluentui-system-filled/PeopleSearch';
import { Message } from '@styled-icons/boxicons-regular/Message';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUTUSER, GETALLUSERS } from '../actions/index';
import toast, { Toaster } from 'react-hot-toast';
import noProfile from '../images/BATMAN.png';

const Navbar = () => {

    const [show, setShow] = useState(true);

    const [auto, setAuto] = useState('');

    const [userSearch, setUserSearch] = useState('')

    const dispatch = useDispatch();

    let allusers = useSelector(state => state.pink.allusers.users);

    const [width, setWidth] = useState(window.innerWidth);

    const [height, setHeight] = useState(window.innerHeight);

    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    }, []);

    useEffect(async () => {
        await dispatch(GETALLUSERS())
    }, []);

    const handleButton = () => {
        setShow(!show);
    }

    const handleLogOut = async () => {
        await dispatch(LOGOUTUSER());
        setTimeout(() => window.location.href = 'https://pinkbio.netlify.app/', 500);
    }

    const handleInputChange = (event) => {
        setUserSearch(event.target.value);
        setAuto(allusers.filter((item) =>
            item.full_name.toLowerCase().includes(userSearch.toLowerCase())
        ))
        if (event.target.value.length < 1) { setAuto([]) }
    }

    const handleSubmitChange = (event) => {
        event.preventDefault()
        if (userSearch === '') { return toast.error('Search cannot be empty') }
        else if (allusers.findIndex(item => item.full_name.toLowerCase() === userSearch.toLocaleLowerCase()) === -1) { return toast.error('This is not a valid name') }
        let uuid = allusers.filter(item => item.full_name.toLowerCase() === userSearch.toLocaleLowerCase());
        console.log(uuid[0].uuid)
        uuid = uuid[0].uuid;
        window.location.href = `https://pinkbio.netlify.app/ProfileO?uuid=${uuid}`
    }

    const handleAutoSearch = (value) => {
        window.location.href = `https://pinkbio.netlify.app/ProfileO?uuid=${value}`
    }

    return (
        <Fragment>
            {show ?
                <div className={styles.sortButton}>
                    <button onClick={handleButton} className={styles.button}>
                        <ThMenu className={styles.icons} />
                    </button>
                </div>
                :
                <div className={styles.sortButton}>
                    <button onClick={handleButton} className={styles.button}>
                        <Cancel className={styles.icons} />
                    </button>
                </div>
            }
            <div className={show ? styles.none : styles.sideBar} >
                <Zoom className={styles.zoom} >
                    <div className={styles.sortLinks}>
                        <div className={styles.sortLogo} >
                            <p className={styles.title}>Pink Bio!</p>
                            <img src={logo} alt='' className={styles.logo} />
                        </div>
                        {width > 1248 ?
                            null
                            :
                            <div className={styles.sortButtonOthers}>
                                <button onClick={handleButton} className={styles.button}>
                                    <Cancel className={styles.icons} />
                                </button>
                            </div>
                        }
                        <div className={styles.eachLink}>
                            <form onSubmit={handleSubmitChange} className={styles.form}>
                                <div className={styles.sortAutoInput}>
                                    <input
                                        type='text'
                                        placeholder='Search Friends...'
                                        required={false}
                                        onChange={handleInputChange}
                                        className={styles.input}
                                    />
                                    <div className={auto.length === 0 ? styles.noneAuto : styles.sortAuto}>
                                        {auto && auto.slice(0, 5).map((item, index) => (
                                            <div onClick={() => handleAutoSearch(item.uuid)} key={index} className={styles.eachAuto}>
                                                <img src={item.photo_profile ? item.photo_profile : noProfile} alt='' className={styles.imageAuto} />
                                                <p className={styles.nameAuto}>{item.full_name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={styles.eachLink}>
                            <Link
                                className={styles.responsive}
                                style={{ textDecoration: 'none' }}
                                to='/AboutMe' >
                                <button className={styles.buttonLinks}><EmojiLaughingFill className={styles.iconsLinks} />AboutMe</button>
                            </Link>
                        </div>
                        <div className={styles.eachLink}>
                            <Link
                                className={styles.responsive}
                                style={{ textDecoration: 'none' }}
                                to='/Home' >
                                <button className={styles.buttonLinks}><Home className={styles.iconsLinks} />Home</button>
                            </Link>
                        </div>
                        <div className={styles.eachLink}>
                            <Link
                                className={styles.responsive}
                                style={{ textDecoration: 'none' }}
                                to='/Profile' >
                                <button className={styles.buttonLinks}><Profile className={styles.iconsLinks} />Profile</button>
                            </Link>
                        </div>
                        <div className={styles.eachLink}>
                            <Link
                                className={styles.responsive}
                                style={{ textDecoration: 'none' }}
                                to='/Friends' >
                                <button className={styles.buttonLinks}><UserFriends className={styles.iconsLinks} />Friends</button>
                            </Link>
                        </div>
                        <div className={styles.eachLink}>
                            <Link
                                className={styles.responsive}
                                style={{ textDecoration: 'none' }}
                                to='/Messages' >
                                <button className={styles.buttonLinks}><Message className={styles.iconsLinks} />Messages</button>
                            </Link>
                        </div>
                        <div className={styles.eachLink}>
                            <button onClick={handleLogOut} className={styles.buttonLinks}><LogOut className={styles.iconsLinks} />Logout</button>
                        </div>
                    </div>
                </Zoom>
            </div>
        </Fragment>
    )
}

export default Navbar;