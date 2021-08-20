import React, { useState, useEffect } from 'react';
import styles from '../../sass/aboutme/aboutme.module.scss';
import { Zoom } from 'react-awesome-reveal';
import Navbar from '../navbar/navbarOthers';
import Hi from '../../components/images/Hi.gif';
import { Linkedin } from '@styled-icons/bootstrap/Linkedin';
import { Email } from '@styled-icons/evaicons-solid/Email';
import { Github } from '@styled-icons/boxicons-logos/Github';
import { Portfolio } from '@styled-icons/zondicons/Portfolio';

const AboutMe = () => {

    return (
        <div className={styles.backAbout} >
                <Navbar />
            <div className={styles.sortAbout}>
                <Zoom className={styles.zoomAll} >
                    <div className={styles.boxAbout}>
                        <div className={styles.sortTitle}>
                            <Zoom className={styles.zoom} >
                                <p className={styles.title} >About Me</p>
                            </Zoom>
                        </div>
                        <div className={styles.sortMe} >
                            <Zoom className={styles.zoom} >
                                <p className={styles.me} >Hi, i'm Andrés Luis Logares, the person behind this website,
                                    you can contact me by the next ways</p>
                            </Zoom>
                        </div>
                        <div className={styles.twoColumns} >
                            <Zoom className={styles.zoomlLinks} >
                                <div className={styles.sortLinks} >
                                    <a
                                        style={{ textDecoration: 'none' }}
                                        target="_blank"
                                        className={styles.eachLink}
                                        href="https://www.linkedin.com/in/andr%C3%A9s-luis-logares-522595172/" >
                                        <p className={styles.links} ><Linkedin className={styles.iconLinks} />Linkedin </p>
                                    </a>
                                    <a
                                        style={{ textDecoration: 'none' }}
                                        target="_blank"
                                        className={styles.eachLink}
                                        href="https://github.com/AndresLLogares" >
                                        <p className={styles.links}><Github className={styles.iconLinks} /> Github</p>
                                    </a>
                                    <a
                                        style={{ textDecoration: 'none' }}
                                        target="_blank"
                                        className={styles.eachLink}
                                        href="https://andreslogares.netlify.app/">
                                        <p className={styles.links}><Portfolio className={styles.iconLinks} /> Portfolio</p>
                                    </a>
                                    <div className={styles.eachLink} >
                                        <p className={styles.links}><Email className={styles.iconLinks} />andresl940@hotmail.com</p>
                                    </div>
                                </div>
                            </Zoom>
                            <div className={styles.sortImage} >
                                <Zoom className={styles.zoom} >
                                    <img src={Hi} alt='' className={styles.image} />
                                </Zoom>
                            </div>
                        </div>
                    </div>
                </Zoom>
            </div>
        </div>
    )
}

export default AboutMe;