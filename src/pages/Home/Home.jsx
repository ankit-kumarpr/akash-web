import React from 'react'
import Hero from './Hero'
import AboutSection from './AboutSection'
import MissionSection from './MissionSection'
import ServicesSection from './ServicesSection'
import SkillSection from './SkillSection'
import TeamSection from './TeamSection'
import HowItWorks from './HowItWorks'
import Blog from '../Blog'
import FAQ from '../FAQ'
// import HeroText from './HeroText'

function Home() {
    return (
        <>
            {/* <Navbar />/ */}
            <Hero />
            <AboutSection />
            <MissionSection />
            <ServicesSection />
            <SkillSection />
            <TeamSection />
            <HowItWorks />
            <Blog />
            <FAQ />

            {/* <Footer /> */}
        </>
    )
}

export default Home
