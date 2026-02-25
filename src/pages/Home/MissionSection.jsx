import { motion } from "framer-motion";
import styles from "../../style/MissionSection.module.css";
import { IoIosArrowDropright } from "react-icons/io";
import { valuesData } from "../../components/data";

const titleText = "Company Mission";
const titleText2 = "Our mission is to empower businesses with strategy, technology, and measurable digital growth.";

// const listItems = [
//     "Digital Marketing",
//     "Branding Solution",
//     "Growth Tracking",
//     "Google Rankings"
// ];

const letterVariant = {
    hidden: { opacity: 0, rotateX: 90 },
    visible: (i) => ({
        opacity: 1,
        rotateX: 15,
        transition: {
            delay: i * 0.02,   // 🔥 reduced delay
            duration: 0.2,     // 🔥 reduced duration
            ease: "easeOut",
        },
    }),
};

const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.05,   // 🔥 reduced delay
            duration: 0.3,     // 🔥 reduced duration
            ease: "easeOut",
        },
    }),
};

const MissionSection = () => {
    return (
        <section className={styles.missionSection}>
            <div className={styles.container}>

                {/* Left Content */}
                <motion.div
                    className={styles.left}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.iconBox}>
                        <motion.img
                            src="/assets/mission-icon.svg"
                            alt="mission"
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.6 }}
                        />


                        <h4 className={styles.title}>
                            {titleText.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={letterVariant}
                                    initial="hidden"
                                    whileInView="visible"
                                    className={styles.char}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </h4>
                    </div>

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        CreaTech Squads adopts a client-centric approach, focusing on understanding each business’s unique goals and challenges. By leveraging data analytics and the latest digital tools, we formulate result-driven strategies that deliver measurable growth.
                    </motion.p>
                </motion.div>

                {/* Right List */}
                <motion.div
                    className={styles.right}
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div>
                        <div className={styles.listGrid}>
                            {valuesData?.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.listItem}
                                    custom={index}
                                    variants={itemVariant}
                                    initial="hidden"
                                    whileInView="visible"
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {/* <div className={styles.itemIcon}> */}
                                    <IoIosArrowDropright className={styles.itemIcon} />
                                    {/* </div> */}
                                    <div className={styles.content}>

                                        <div className={styles.itemText}>{item?.title}</div>
                                        <span className={styles.itemText}>{item?.description}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>


                        <h4 className={styles.title}>
                            {titleText2.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={letterVariant}
                                    initial="hidden"
                                    whileInView="visible"
                                    className={styles.char}
                                    style={{ fontSize: '22px', textAlign: 'center' }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </h4>

                    </div>



                </motion.div>

            </div>
        </section>
    );
};

export default MissionSection;