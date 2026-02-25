import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Instagram, ArrowUpRight, MoveRight } from 'lucide-react';
import './TeamSection.css';
import { useGetTermQuery } from '../../redux/api';

// Import Swiper components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function TeamSection() {
  const [activeId, setActiveId] = useState(null);

  const { data } = useGetTermQuery();

  useEffect(() => {
    if (data && data.length > 0 && !activeId) {
      setActiveId(data[0]._id);
    }
  }, [data, activeId]);

  return (
    <div className='parent'>
      <section className="team-section">

        <img src="/assets/Object-2.png" className="teamcontainer1" alt="" />
        <img src="/assets/Object-2.png" className="teamcontainer2" alt="" />

        <div className="team-container">
          <header className="team-header">
            <span className="team-badge">
              <span style={{ color: 'var(--neon-green)' }}>✦</span> Our Team
            </span>
            <h2 className="team-title">
              Meet Our Experienced <br />
              <span>Team People</span>
            </h2>
          </header>

          <div className="team-slider-container">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              navigation={true}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="team-swiper"
            >
              {data?.map((member) => (
                <SwiperSlide key={member._id}>
                  <div
                    className={`team-card ${activeId === member._id ? 'active' : ''}`}
                    onMouseEnter={() => setActiveId(member._id)}
                  >
                    <div className="card-top">
                      <div className="name-wrapper">
                        <div className="accent-bar" />
                        <div>
                          <h3 className="member-name">{member.name}</h3>
                          <p className="member-role">{member.position}</p>
                        </div>
                      </div>

                      <div className="arrow-circle">
                        {activeId === member._id ? (
                          <MoveRight size={22} />
                        ) : (
                          <ArrowUpRight size={22} />
                        )}
                      </div>
                    </div>

                    <div className="image-area">
                      <div className="inner-shape" />

                      <div className="teamImage">
                        <img
                          src="/assets/team-shape.png"
                          alt="bg"
                          className="team-bg"
                        />

                        <img
                          src={`https://akash-backend-75iv.onrender.com/${member.image}`}
                          alt={member.name}
                          className="member-img"
                        />

                        <div className="overlay"></div>
                      </div>

                      <AnimatePresence>
                        {activeId === member._id && (
                          <motion.div
                            className="social-float"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                          >
                            {/* ✅ LinkedIn */}
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-btn"
                              >
                                <Linkedin size={18} />
                              </a>
                            )}

                            {/* ✅ Instagram */}
                            {member.instagram && (
                              <a
                                href={member.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-btn"
                              >
                                <Instagram size={18} />
                              </a>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}
