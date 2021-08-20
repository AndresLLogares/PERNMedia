import React, { useState, useEffect } from 'react';
import styles from '../../sass/landpage/landpage.module.scss';
import '../../sass/landpage/landpage.scss';
import { Zoom } from 'react-awesome-reveal';
import logo from '../images/LogoMedia.png';
import Login from '../login/login';
import SingUp from '../signup/signup';
import toast, { Toaster } from 'react-hot-toast';

const LandPage = () => {

    const [change, setChange] = useState(true);

    const handleInputChange = () => {
        setChange(!change)
    }

    return (
        <div className={styles.backLand} >
            <div className={styles.sortLand} >
                <Toaster />
                <Zoom className={styles.zoom} >
                    <div className={styles.sortFirstTitle} >
                        <div className={styles.boxTitle}>
                            <p className={styles.firstTitle} >Welcome to</p>
                            <p className={styles.secondTitle}>Pink Bio!</p>
                        </div>
                    </div>
                    <div className={styles.sortLogo} >
                        <img src={logo} alt='' className={styles.logo} />
                    </div>
                </Zoom>
                <Zoom className={styles.zoom} >
                    <div className={styles.sortCheck}>
                        <input onChange={handleInputChange} type="checkbox" name="checkbox" id="checkbox" />
                        <label htmlFor="checkbox" className="switch"></label>
                    </div>
                </Zoom>
                {change ?
                    <div className={styles.sortForms} >
                        <Login />
                    </div>
                    :
                    <div className={styles.sortForms} >
                        <SingUp />
                    </div>
                }
                <Zoom className={styles.footer} >
                    <div className={styles.footerDiv} >
                        <a style={{ textDecoration: 'none' }}
                            target="_blank"
                            rel="license"
                            href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                            <img className={styles.imageLic} alt="Licencia Creative Commons"
                                src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a>
                        <br />Esta obra está bajo una <a style={{ textDecoration: 'none', color: '#231B1B' }}
                            target="_blank"
                            rel="license"
                            href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                            Licencia Creative Commons Atribución-NoComercial-Compartir-Igual 4.0 Internacional</a>.
                    </div>
                </Zoom>
            </div>
        </div>
    )
}

export default LandPage;