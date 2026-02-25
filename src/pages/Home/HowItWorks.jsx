import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "../../style/HowItWorks.module.css";

// More precise path for smoother rocket movement
const PRECISE_PATH = `
M 101 0
L 101 150
Q 101 200 101 250
L 101 350
Q 101 400 101 450
L 101 550
Q 101 600 101 650
L 101 750
Q 101 800 101 850
`;

const steps = [
  {
    id: "01",
    title: "In-depth market research and digital strategy planning",
    desc: "Understand your audience & opportunities",
    side: "left",
  },
  {
    id: "02",
    title: "Build powerful websites, apps & custom software",
    desc: "Create a strong digital foundation",
    side: "right",
  },
  {
    id: "03",
    title: "Boost visibility with SEO & marketplace optimization",
    desc: "Drive traffic, reach & conversions",
    side: "left",
  },
  {
    id: "04",
    title: "Scale your brand with social media & growth solutions",
    desc: "Sustainable growth & engagement",
    side: "right",
  },
];
export default function HowItWorks() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const pathProgress = useTransform(smooth, [0, 1], [0, 1]);

  const rocketY = useTransform(smooth, (progress) => {
    return progress * 800; // Total path height
  });

  const rocketRotation = useTransform(smooth, (progress) => {
    // Add subtle tilt based on position
    const tilt = Math.sin(progress * Math.PI * 2) * 10;
    return `${tilt}deg`;
  });

  // Alternative simpler rocket
  const SimpleRocket = ({ style }) => (
    <svg
      style={style}
      width="60"
      height="60"
      viewBox="0 0 24 24"
      fill="none"
      className={styles.rocket}
    >
      {/* Rocket Body */}
      <path
        d="M12 2L16 7L12 12L8 7L12 2Z"
        fill="var( --primary-color)"
        stroke="var( --primary-color)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Rocket Tail */}
      <path
        d="M12 12V22"
        stroke="var( --primary-color)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Wings */}
      <path
        d="M8 10L4 14"
        stroke="var( --primary-color)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 10L20 14"
        stroke="var( --primary-color)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <section ref={ref} className={styles.wrapper}>
      <div className={styles.header}>
        <h2>How It Works</h2>
        <p>Our Step-by-Step Marketing Process</p>
      </div>

      {/* SVG PATH Container */}
      <div className={styles.pathWrapper}>
        <svg viewBox="0 0 202 850" className={styles.svg}>
          {/* Gray background path */}
          <path
            d={PRECISE_PATH}
            className={styles.grayPath}
          />

          {/* Green animated path */}
          <motion.path
            d={PRECISE_PATH}
            className={styles.greenPath}
            style={{ pathLength: pathProgress }}
          />
        </svg>
      </div>

      {/* Rocket with Motion div for better control */}
      <motion.div
        className={styles.rocket}
        style={{
          position: 'absolute',
          left: '50%',
          top: rocketY,
          x: '-50%',
          rotate: rocketRotation,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <SimpleRocket />
        {/* Rocket Trail */}
        <div className={styles.rocketTrail}
          style={{
            position: 'absolute',
            top: '50%',
            left: '-20px',
            transform: 'translateY(-50%)'
          }}
        />
      </motion.div>

      {/* Cards */}
      <div className={styles.cards}>
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            className={`${styles.cardWrap} ${styles[step.side]}`}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className={styles.card}>
              <span className={styles.bigNumber}>{step.id}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>

            <span className={styles.circle}>{i + 1}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
