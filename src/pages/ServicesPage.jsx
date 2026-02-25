import React from "react";
import { motion } from "framer-motion";
import styles from "../style/ServicesPage.module.css";
// import { FaBullhorn, FaPalette, FaRocket } from "react-icons/fa";

import { FaSearch, FaLaptopCode, FaCogs, FaShoppingCart, FaBullhorn, FaShieldAlt } from "react-icons/fa";

const services = [
  {
    id: "001",
    title: "SEO Optimization",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop",
    icon: <FaSearch />,
  },
  {
    id: "002",
    title: "Website & App Development",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop",
    icon: <FaLaptopCode />,
  },
  {
    id: "003",
    title: "Custom Software (CRM / ERP)",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    icon: <FaCogs />,
  },
  {
    id: "004",
    title: "Amazon & Flipkart Management",
    img: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop",
    icon: <FaShoppingCart />,
  },
  {
    id: "005",
    title: "Social Media Management",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop",
    icon: <FaBullhorn />,
  },
  {
    id: "006",
    title: "Cyber Security Solutions",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    icon: <FaShieldAlt />,
  },
];

const ServicesPage = () => {
  return (
    <div className={styles.servicesPage}>

      {/* HERO */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Services</h1>
        <p>Home / Services</p>
      </motion.section>

      {/* SERVICES GRID */}
      <section className={styles.servicesSection}>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.cardHeader}>
                <span>{service.id}</span>
                <div className={styles.icon}>{service.icon}</div>
              </div>

              <img src={service.img} alt={service.title} />

              <h3>{service.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;
