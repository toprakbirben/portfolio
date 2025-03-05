'use client'
import styles from './Home.module.css';
import React, { useRef, useEffect, useState } from 'react'
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GridLayout, { Layout } from "react-grid-layout";
import Lenis from '@studio-freight/lenis';
import { motion } from "motion/react"
import { AnimatePresence } from "motion/react"


export default function Home() {
  const lenis = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    lenis.current = new Lenis({
      duration: 0.6, // Control the duration of the scroll
      easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic easing for smooth stop
      smooth: true,
      smoothTouch: true, // Enable smooth scrolling on touch devices
    });

    const animate = (time) => {
      lenis.current.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      lenis.current.destroy();
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    lenis.current.scrollTo(element);
  };

  return (
    <div className={styles.container} data-scroll data-scroll-speed="0.9">
      <div className={styles.main_content}> 
        {navBar()}
        {torpak()}
        {about()}
      </div>
        {transition()}
      <div className={styles.main_content}>
        {project()}      
      </div>
      <div className={styles.end_content}> 
        {contact()}
        {pageFooter()}
      </div>
    </div>
  );
}

function transition() {
  return (
  <div className={styles.transition}>
    <h1> "but although all our knowledge begins with experience, it does not follow that it arises from experience." <br/> Immanuel Kant </h1>
  </div>
  );

}


function navBar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><a href="#toprak"><strong>toprak</strong></a></li>
        <div className={styles.rhs}>
          <li><a href="#about">about me</a></li>
          <li><a href="#project">projects</a></li>
          <li><a href="#contact">contact me</a></li>
        </div>
      </ul>
    </nav>
  );
}


function torpak() {
  return (
    <div className={styles.start} id="toprak">
      <div className={`${styles.grid_item} ${styles.svgContainer}`}>
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="clipPath">
              <circle cx="150" cy="150" r="150" fill="#D9D9D9" stroke="black" strokeWidth="5"/>
            </clipPath>
          </defs>          
        </svg>
        <img src="/torpak.png" alt="torpak" className={styles.image} />
      </div>
      <h1 className={styles.grid_item}><strong>2025</strong> graduate of Vrije Universiteit <strong>BSc Computer Science</strong></h1>
      <p className={styles.grid_item} >Here you can check out what I'm working on!</p>
    </div>
  );
}

function about() {
  return (
      <div id="about" className={styles.grid_sectors}>
        <SectionTitle text_info="Intro"/>
        <Divider/>
        <div className={styles.grid_item}>
          <p> 
            I was born and raised in Istanbul, and I am now located in Amsterdam. My academic journey builds on a foundation of curiosity and drive, 
            reflected in my diverse projects and experiences such as development of an application or making a portfolio website from scratch or even 
            my contribution in robotics field. Before my time in Amsterdam, I practiced my leadership and technical skills through four years of involvement 
            in FIRST Robotics, where I was introduced to many concepts such as teamwork, problem solving and during my last year I was honored to lead 
            my team in designing and building competition robots. These experiences taught me the value of teamwork, resilience, and pursuing innovation with a clear purpose.
          </p> 
        </div>
      </div>
  );
}

function project() {
  const [layout, setLayout] = useState<Layout[]>([
    { i: "a", x: 1, y: 3, w: 3, h: 3, minH: 2},
    { i: "b", x: 3, y: 3, w: 3, h: 3}
  ]);
  
  const handleLayoutChange = (newLayout: Layout[]) => {
    console.log("New Layout:", newLayout);
    setLayout(newLayout);
  };
  return (
    <div className={styles.project_sector}>
      <div id="project" className={styles.grid_sectors}>
        <SectionTitle text_info="Projects"/>  
        <Divider/>
        <div className={styles.grid_item}>
          <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1200}
            onLayoutChange={handleLayoutChange}
          >
            <div key="a" className={styles.proj_item}> 
              <GridItem 
                text_header = 'history/calendar automation' 
                idea='What if there was a way to see how many hours I spent on a webpage and organise my schedule more efficiently; just like screen time report'
                desc='This is a python script to increase productivity by integrating your history to your calendar via Google Calendar API.'
                github='https://github.com/toprakbir/GoogleCalendar-Automation'/>
            </div>
            <div key="b"className={styles.proj_item}> 
              <GridItem
                text_header = 'this.website;'
                idea= 'Instead of filling out templates, I decided to build my own website with my own design.'
                desc='This website is built developed on Next.js and React, and designed in Figma.'
                github='https://github.com/toprakbir/GoogleCalendar-Automation'/> 
            </div>
          </GridLayout>
        </div>
      </div>
    </div>
  );
}

function contact() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (accordion: string) => {
    setOpenAccordion(openAccordion === accordion ? null : accordion);
  };

  return (
    <div className={styles.contact} id="contact"> 
      <div className={styles.contact_container}> 
        <div className={styles.grid_sectors}> 
          <SectionTitle text_info="Resume"/>  
          <Divider/>
          <div className={styles.grid_item}> 
            <motion.div className={styles.parent_accordion}>
              <AnimatePresence>
                <motion.div
                  key="education"
                  onClick={() => toggleAccordion('education')}
                >
                  <motion.div className={styles.title}>
                    Education
                  </motion.div>
                </motion.div>
                {openAccordion === 'education' && (
                  <motion.div
                    key="education-content"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 0.3,
                      },
                    }}
                    exit={{ opacity: 0 }}
                    className={styles.content}
                  >
                    <div className={styles.group}> 
                      <h1> Vrije Universiteit Amsterdam - <i>Class of 2025</i></h1>
                      <p> Bachelor's in Computer Science</p>
                    </div>
                    <h1> Hisar School - <i> Class of 2022</i></h1>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.div className={styles.parent_accordion}>
              <AnimatePresence>
                <motion.div
                  key="v-experience"
                  onClick={() => toggleAccordion('v-experience')}
                >
                  <motion.div className={styles.title}>
                    Volunteer Experience
                  </motion.div>
                </motion.div>
                {openAccordion === 'v-experience' && (
                  <motion.div
                    key="v-experience-content"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 0.3,
                      },
                    }}
                    exit={{ opacity: 0 }}
                    className={styles.content}
                  >
                    <div> 
                      <h1>Robotics</h1>
                      <ul> 
                        <li>Took responsibility of team's leadership and mentorship during the 19/20 & 21/22 season.</li>
                        <li>Delved into various sub-sections such as electronics, programming, manufacturing and designing of the robot</li>
                        <li>Nominated in various awards and won Industrial Safety in 2019</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div className={styles.parent_accordion}>
              <AnimatePresence>
                <motion.div
                  key="skills"
                  onClick={() => toggleAccordion('skills')}
                >
                  <motion.div className={styles.title}>
                    Skills
                  </motion.div>
                </motion.div>
                {openAccordion === 'skills' && (
                  <motion.div
                    key="skills-content"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 0.3,
                      },
                    }}
                    exit={{ opacity: 0 }}
                    className={styles.content}
                  >
                    <div> 
                      <p>Proficient in Java, Python, Figma, HTML, CSS, React & its Frameworks, Problem Solving & App Development.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <img src="/divider.svg" alt="divider" className={`${styles.grid_item} ${styles.divider}`} />
  );
}

function GridItem({text_header, idea, desc, github}: {text_header: string, idea: string, desc:string, github: string}) {
  return (
    <div className={styles.proj_box}> 
      <p className ={styles.proj_head}>{text_header}</p>
      <p><br/>{idea}</p>
      <p><br/>{desc}</p>
      <footer> <a href={github}> <br/> <i>for more information</i> </a> </footer>
    </div>
      
  );
}

function SectionTitle({text_info}: {text_info: string}) {
  return (
    <div className={styles.grid_item}> 
      <h1>{text_info}</h1> 
    </div> 
  );
}

function pageFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>

        <div className={styles.footer_item} >
          <a href="https://linkedin.com/in/toprakbirben"> 
            <img src="/linkedin.webp" alt="linkedIn image"></img>          
            <p>toprakbirben</p>
          </a>
        </div>

        <div className={styles.footer_item}>
          <a href="https://github.com/toprakbir"> 
            <img src="/github.png" alt="github image"></img>  
            <p>toprakbir</p>
          </a>
        </div>

      </div>
    </footer>
  );
}

