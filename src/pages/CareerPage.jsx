import React from "react";
import { motion } from "framer-motion";
import styles from "../style/CareerPage.module.css";
import { FaBriefcase, FaUsers, FaRocket } from "react-icons/fa";
import { useGetCareerQuery } from "../redux/api";


const CareerPage = () => {

  const { data } = useGetCareerQuery()

  return (
    <div className={styles.careerPage}>

      {/* HERO */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Join Our Team</h1>
        <p>Build your future with us</p>
      </motion.section>

      {/* STATS */}
      <motion.section className={styles.stats}>
        <div className={styles.statsGrid}>
          <motion.div whileHover={{ scale: 1.05 }} className={styles.statCard}>
            <FaUsers />
            <h3>50+</h3>
            <span>Team Members</span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className={styles.statCard}>
            <FaBriefcase />
            <h3>120+</h3>
            <span>Projects</span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className={styles.statCard}>
            <FaRocket />
            <h3>10+</h3>
            <span>Years Experience</span>
          </motion.div>
        </div>
      </motion.section>

      {/* JOB LIST */}
      <section className={styles.jobsSection}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Open Positions
        </motion.h2>

        <div className={styles.jobsGrid}>
          {data?.map((job, i) => (
            <motion.div
              key={job._id}
              className={styles.jobCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Job ID */}
              {/* <span className={styles.jobId}>
                {job._id.slice(-6).toUpperCase()}
              </span> */}

              {/* Job Title */}
              <h3>{job.jobTitle}</h3>

              {/* Description */}
              <p>{job.description}</p>

              {/* Meta Info */}
              <div className={styles.jobMeta}>
                <span>📍 {job.location}</span>
                <span>💼 {job.experience} Years</span>
                <span>💰 ₹{job.salary}</span>
              </div>

              <button>Apply Now →</button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className={styles.cta}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Ready to Start Your Career?</h2>
        <p>Send your resume and become part of our creative team.</p>
        <button>Send Resume</button>
      </motion.section>

    </div>
  );
};

export default CareerPage;
