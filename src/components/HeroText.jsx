import { motion } from "framer-motion";
import styles from "../style/HeroText.module.css";
import { useNavigate } from "react-router-dom";

const lines = [
    "Complete IT -",
    "Digital Marketing Solution",
    "Under One Roof"
];

const letterAnimation = {
    hidden: { opacity: 0, rotateX: 90 },
    visible: (i) => ({
        opacity: 1,
        rotateX: 15,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: "easeOut"
        }
    })
};

const HeroText = () => {

    const navigate = useNavigate()


    return (
        <motion.div
            className={styles.textBox}
            initial="hidden"
            animate="visible"
        >
            <h1 className={styles.title}>
                {lines.map((line, lineIndex) => (
                    <div key={lineIndex} className={styles.line}>
                        {line.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={letterAnimation}
                                className={
                                    line === "Under One Roof" ? styles.highlight : styles.letter
                                }
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>
                ))}
            </h1>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={styles.btn}
                onClick={() => navigate('/about')}
            >
                Discover More <span>→</span>
            </motion.button>
        </motion.div>
    );
};

export default HeroText;