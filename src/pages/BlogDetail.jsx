import React, { useEffect } from 'react';
import styles from '../style/BlogDetail.module.css';
import { useGetBlogsByIdQuery, useGetBlogsQuery } from '../redux/api';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, User, Clock, ChevronRight, Facebook, Twitter, Linkedin, Instagram, ArrowLeft } from 'lucide-react';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const { data, isLoading, error } = useGetBlogsByIdQuery(id, {
        skip: !id,
    });

    const { data: allBlogs } = useGetBlogsQuery();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (isLoading) return (
        <div className={styles.loaderContainer}>
            <motion.div
                className={styles.loader}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
    if (error) return <div className={styles.errorContainer}><h2>Something went wrong</h2></div>;
    if (!data) return null;

    // Process content to handle paragraphs
    const paragraphs = data.content ? data.content.split('\r\n').filter(p => p.trim() !== '') : [];

    return (
        <div className={styles.wrapper}>
            {/* Reading Progress Bar */}
            <motion.div className={styles.progressBar} style={{ scaleX }} />

            {/* Sticky Navigation / Header */}
            <div className={styles.navBar}>
                <button onClick={() => navigate(-1)} className={styles.backBtn}>
                    <ArrowLeft size={20} /> Back to Blogs
                </button>
            </div>

            <div className={styles.mainContainer}>
                {/* 1️⃣ Header Section */}
                <header className={styles.header}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={styles.metaTop}
                    >
                        <span className={styles.categoryBadge}>Digital Insights</span>
                        <span className={styles.dot}></span>
                        <span className={styles.readTime}>
                            <Clock size={14} /> {data.timeDuration || "5 min read"}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={styles.title}
                    >
                        {data.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className={styles.authorMeta}
                    >
                        <div className={styles.authorImg}>
                            <User size={20} />
                        </div>
                        <div className={styles.authorInfo}>
                            <span className={styles.authorName}>By {data.authorName}</span>
                            <span className={styles.postDate}>
                                <Calendar size={14} /> {new Date(data.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                    </motion.div>
                </header>

                {/* 2️⃣ Featured Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className={styles.featuredImageContainer}
                >
                    <div className={styles.imageOverlay} />
                    <img
                        src={`https://akash-backend-75iv.onrender.com/${data.images?.[0]}`}
                        alt={data.title}
                        className={styles.featuredImage}
                    />
                    {data.imageText && (
                        <p className={styles.imageCaption}>
                            {data.imageText}
                        </p>
                    )}
                </motion.div>

                {/* 3️⃣ Article Body with Sidebar Layout */}
                <div className={styles.articleLayout}>
                    {/* Main Content */}
                    <article className={styles.content}>
                        <div className={styles.introBlock}>
                            <p className={styles.introText}>
                                {data.shortDescription}
                            </p>
                        </div>

                        <div className={styles.mainBody}>
                            {paragraphs.map((text, index) => {
                                // Check if it's a heading (e.g. "1. SEO & Google Ranking")
                                if (/^\d+\./.test(text.trim())) {
                                    return <h3 key={index} className={styles.subheading}>{text}</h3>;
                                }
                                return <p key={index} className={styles.paragraph}>{text}</p>;
                            })}
                        </div>

                        {data.authorQuote && (
                            <motion.blockquote
                                whileInView={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.6 }}
                                className={styles.quote}
                            >
                                <span className={styles.quoteMark}>“</span>
                                {data.authorQuote}
                            </motion.blockquote>
                        )}

                        <div className={styles.articleFooter}>
                            <div className={styles.shareSection}>
                                <h4>Share this Article</h4>
                                <div className={styles.shareBtns}>
                                    <button className={styles.socialBtn}><Facebook size={18} /></button>
                                    <button className={styles.socialBtn}><Twitter size={18} /></button>
                                    <button className={styles.socialBtn}><Linkedin size={18} /></button>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarWidget}>
                            <h3>Recent Articles</h3>
                            <div className={styles.recentPosts}>
                                {allBlogs?.slice(0, 4).filter(b => b._id !== id).map(blog => (
                                    <div key={blog._id} className={styles.miniPost} onClick={() => navigate(`/BlogDetail/${blog._id}`)}>
                                        <div className={styles.miniPostImg}>
                                            <img src={`https://akash-backend-75iv.onrender.com/${blog.images?.[0]}`} alt="" />
                                        </div>
                                        <div className={styles.miniPostInfo}>
                                            <h4>{blog.title.length > 50 ? blog.title.substring(0, 50) + "..." : blog.title}</h4>
                                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.newsletterWidget}>
                            <h3>Growth & Strategy</h3>
                            <p>Get the latest MNC insights delivered directly to your inbox.</p>
                            <div className={styles.miniForm}>
                                <input type="email" placeholder="Your Email" />
                                <button>Join Now</button>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* 4️⃣ Reply Section */}
                <motion.section
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                    className={styles.replySection}
                >
                    <div className={styles.formBadge}>Join the Conversation</div>
                    <h3 className={styles.replyTitle}>Leave a Response</h3>
                    <p className={styles.replyNote}>
                        Your professional insights are highly valued.
                    </p>

                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.inputGroup}>
                            <div className={styles.field}>
                                <input type="text" placeholder="Full name*" required className={styles.input} />
                                <span className={styles.line}></span>
                            </div>
                            <div className={styles.field}>
                                <input type="email" placeholder="Email address*" required className={styles.input} />
                                <span className={styles.line}></span>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <textarea placeholder="Share your thoughts*" className={styles.textarea} required></textarea>
                            <span className={styles.line}></span>
                        </div>
                        <button type="submit" className={styles.submitBtn}>
                            Post Comment <ChevronRight size={18} />
                        </button>
                    </form>
                </motion.section>
            </div>
        </div>
    );
};

export default BlogDetail;
