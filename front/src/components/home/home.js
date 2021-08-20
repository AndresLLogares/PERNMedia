import React, { useState, useEffect, Fragment } from 'react';
import styles from '../../sass/home/home.module.scss';
import { Zoom } from 'react-awesome-reveal';
import Navbar from '../navbar/navbar';
import News from '../news/news';
import toast, { Toaster } from 'react-hot-toast';
import Posts from '../posts/posthome';

const Home = () => {

    return (
        <Fragment>
            <Toaster />
            <Posts />
            <Navbar />
            <News />
        </Fragment>

    )
}

export default Home;