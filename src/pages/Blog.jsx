import React from 'react';
import styles from '../style/Blog.module.css';
import { useNavigate } from 'react-router-dom';
import { useGetBlogsQuery } from '../redux/api';
import { motion } from 'framer-motion';

const Blog = () => {
    const navigate = useNavigate()
    const { data, isLoading } = useGetBlogsQuery()

    return (
        <section className={styles.blogSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Our Latest <br /><span>Blog & Article</span></h2>
                    <p className={styles.subtitle}>Explore our latest blog and articles for insights on web design, SEO, and digital trends.</p>
                    <button className={styles.allBtn}>All <span>→</span></button>
                </div>

                <div className={styles.grid}>
                    {data?.map((post, index) => (
                        <motion.article
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => navigate(`/BlogDetail/${post._id}`)}
                            key={post._id}
                            className={styles.card}
                            style={{
                                position: 'sticky',
                                top: `${100 + index * 40}px`, // Stacking offset
                                zIndex: index + 1
                            }}
                        >
                            <div className={styles.content}>
                                <h3 className={styles.cardTitle}>{post.title}</h3>

                                <p className={styles.cardExcerpt}>
                                    {post.shortDescription}
                                </p>

                                <div className={styles.meta}>
                                    <span className={styles.date}>
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </span>

                                    <span className={styles.separator}>/</span>

                                    <span className={styles.author}>
                                        BY {post.authorName}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.imageWrapper}>
                                <img
                                    src={`https://akash-backend-75iv.onrender.com/${post.images?.[0]}`}
                                    alt={post.title}
                                    className={styles.image}
                                />
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;