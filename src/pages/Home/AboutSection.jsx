import { motion } from "framer-motion";
import styles from "../../style/AboutSection.module.css";
// import MissionSection from "./MissionSection";

const letterVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.03, ease: "easeOut" }
    })
};

const AboutSection = () => {
    const title = "Reimagining the brand potential best digital marketing";


    const features = [
        "Digital Marketing",
        "Branding Solution",
        "Growth Tracking",
        "Google Rankings",
    ];

    return (
        <>
            <section className={styles.aboutSection}>
                <div className={styles.aboutContainer}>


                    {/* Left Side: Image with Overlapping Card */}
                    <div className={styles.visualColumn}>
                        <motion.div
                            className={styles.imageWrapper}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Front image */}
                            <img className={styles.visualColumn_image} src="/assets/about.jpg" alt="Team working" />

                            {/* Back rotating image */}
                            <motion.img
                                src="/assets/icon-rt.png"
                                className={styles.imageRounded}
                                animate={{ rotate: 360 }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 12,
                                    ease: "linear"
                                }}
                            />
                        </motion.div>


                        {/* The Overlapping Black Card */}
                        <motion.div
                            className={styles.blackCard}
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className={styles.counterBox}>
                                <h3>9<span>+</span></h3>
                                <p> Years of Experience</p>
                            </div>

                            <div className={styles.cardDivider}></div>

                            <div className={styles.cardContent}>
                                <div className={styles.cardIcon}>
                                    <img src={'/assets/coronalogo.png'} alt="Icon" width={30} style={{ borderRadius: '50%' }} />
                                </div>
                                <p>
                                    CreaTech Squads is a dynamic digital solutions company dedicated to empowering businesses through innovative and results-driven digital strategies.
                                </p>
                                <div className={styles.buttonGroup}>
                                    <button className={styles.moreBtn}>More About</button>
                                    <div className={styles.arrowCircle}>↗</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Text Content */}
                    <div className={styles.contentColumn}>
                        <span className={styles.subTitle}>
                            <span className={styles.star}>★</span> About Company
                        </span>

                        <h2 className={styles.title}>
                            {title.split(" ").map((word, i) => (
                                <span key={i} className={styles.wordWrapper}>
                                    <motion.span
                                        custom={i}
                                        variants={letterVariant}
                                        initial="hidden"
                                        whileInView="visible"
                                        className={styles.word}
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                </span>
                            ))}
                        </h2>
                    </div>
                </div>

                {/* Decorative Floating 3D Spiral */}
                <motion.img
                    src="/assets/about-sp.png"
                    className={styles.floatingSpiral}
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 5 }}
                />
            </section>


        </>
    );
};

export default AboutSection;