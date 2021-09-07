import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GETNEWS } from "../actions";
import styles from "../../sass/news/news.module.scss";
import { ArrowRightSquareFill } from "@styled-icons/bootstrap/ArrowRightSquareFill";
import { Zoom } from "react-awesome-reveal";

const News = () => {
  const dispatch = useDispatch();

  const news = useSelector((state) => state.pink.news?.articles);

  useEffect(() => {
    const fetchNews = async () => {
      await dispatch(GETNEWS());
    };
    fetchNews();
  }, []);

  return (
    <div className={styles.sideBar}>
      <div className={styles.sortNews}>
        <Zoom className={styles.zoom}>
          <div className={styles.sortTitle}>
            <p className={styles.title}>News</p>
          </div>
        </Zoom>
        {news &&
          news.map((item, index) => (
            <Zoom key={index} className={styles.zoom}>
              <div className={styles.eachNews}>
                <div className={styles.news}>
                  <p className={styles.titleNews}>{item.title}</p>
                </div>
                <div className={styles.news}>
                  <p className={styles.description}>{item.description}</p>
                </div>
                <div className={styles.news}>
                  <img
                    className={styles.imageNews}
                    src={item.urlToImage}
                    alt=""
                  />
                </div>
                <div className={styles.sortButton}>
                  <a
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    className={styles.eachLink}
                    rel="noreferrer"
                    href={item.url}
                  >
                    <button className={styles.button}>
                      <ArrowRightSquareFill className={styles.icon} />
                    </button>
                  </a>
                </div>
              </div>
            </Zoom>
          ))}
      </div>
    </div>
  );
};

export default News;
