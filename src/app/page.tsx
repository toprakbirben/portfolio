'use client'

import styles from './Home.module.css';
import React, {useState } from 'react'
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { motion } from "motion/react"
import { AnimatePresence } from "motion/react"
import Image from "next/image"
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { Layout } from 'antd';
import { Button } from 'antd';
import {LinkedinOutlined, GithubOutlined } from '@ant-design/icons';






export default function Home() {

  return(
    <div>
      <Layout>
        <Layout.Header >{NavBar()}</Layout.Header>
        <Layout>
          <Layout.Content >
            {Torpak()}
            {About()}
            {Transition()}
            {Project()}
            {Contact()}
            {PageFooter()}
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
}

function Transition() {
  return (
  <div className={styles.transition}>
    <h1> &apos;but although all our knowledge begins with experience, it does not follow that it arises from experience.&apos; <br/> Immanuel Kant </h1>
  </div>
  );

}

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <ul>
          <li><a href="#toprak"><strong>toprak</strong></a></li>
          <li><a href="#resume">contact me</a></li>
          <li><a href="#project">projects</a></li>
          <li><a href="#about">about me</a></li>
      </ul>
    </nav>
  );
}


function Torpak() {
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
        <Image src="/torpak.png" alt="torpak" width={907} height={1384}className={styles.image}/>
        
      </div>
      <h1 className={styles.grid_item}> Graduate of <strong> BSc Computer Science</strong></h1>
      <p className={styles.grid_item} >Here you can check out what I&apos;m working on!</p>
    </div>
  );
}

function About() {

  return(
    <div id = "about" className={styles.layout}> 
      <Layout>
        <Layout className={styles.section_layout}> 
          <Layout.Sider style={{ fontSize: '36px', fontWeight: 'bold', color:'#E43D12', width: '100%', height: 'auto', textAlign: 'center'}} className={styles.layout_sider}> <SectionTitle text_info='About'/> </Layout.Sider>
          <Layout.Content style={{ width: '100%', height: 'auto'}}> 
            <p style = {{ fontSize: '20px', textAlign: 'justify', lineHeight: '1.6'}}> 
              I was born and raised in Istanbul, and I am now located in Amsterdam. My academic journey builds on a foundation of curiosity and drive, 
              reflected in my diverse projects and experiences such as development of an application or making a portfolio website from scratch or even 
              my contribution in robotics field. Before my time in Amsterdam, I practiced my leadership and technical skills through four years of involvement 
              in FIRST Robotics, where I was introduced to many concepts such as teamwork, problem solving and during my last year I was honored to lead 
              my team in designing and building competition robots. These experiences taught me the value of teamwork, resilience, and pursuing innovation with a clear purpose.
            </p>
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
    
  );
}

function Project() {

  const portfolioText = "A clean, responsive personal website built from scratch to showcase my work, experience, and technical skills. It's designed to serve as a digital resume and portfolio hub, featuring project highlights, links to my GitHub repos, and a simple yet modern UI. This project demonstrates my web design abilities, proficiency with HTML/CSS/JS, and commitment to maintain a professional online presence.";
  const moreThanTasksText = "A productivity tool focused on task management with an emphasis on meaning and self-reflection. MoreThanTasks lets users not only track tasks, but also categorize them by purpose, set long‑term visions, and reflect on progress. It's more than a to-do list — it helps structure work around personal goals. I built this to improve my own productivity workflow and showcase my skills in building full-stack, goal-oriented applications.";
  const calendarAutomationText = "A Python based tool that automates the creation of Google Calendar events by analyzing your Chrome browsing history. Using SQL queries on the Chrome history database, it extracts key information such as how long you spent on a tab and when you last visited it—and then automatically generates corresponding events in your Google Calendar via the Calendar API. This project showcases my skills in data processing, API integration, and automation.";

  return(
    <div className={styles.layout}> 
      <Layout id="project">
        <Layout className={styles.section_layout}> 
          <Layout.Sider style={{ fontSize: '36px', fontWeight: 'bold', color:'#E43D12'}}> <SectionTitle text_info='Projects'/> </Layout.Sider>
          <Layout.Content className={styles.project_layout}> 
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12}> <Card title="Personal Portfolio Website" style={{ backgroundColor: '#E7E4DA', borderColor: '#E43D12', borderWidth: 1.5, borderRadius: 12 }} extra={<a href="https://github.com/toprakbirben/portfolio">More</a>}>{portfolioText}</Card> </Col> 
              <Col xs={24} sm={24} md={12}> <Card title="more-than-tasks" style={{ backgroundColor: '#E7E4DA', borderColor: '#E43D12', borderWidth: 1.5, borderRadius: 12 }} extra={<a href="https://github.com/toprakbirben/morethantasks">More</a>}>{moreThanTasksText} </Card> </Col> 
              <Col xs={24} sm={24} md={12}> <Card title="Calendar Automation" style={{ backgroundColor: '#E7E4DA', borderColor: '#E43D12', borderWidth: 1.5, borderRadius: 12 }} extra={<a href="https://github.com/toprakbirben/GoogleCalendar-Automation">More</a>}>{calendarAutomationText}</Card> </Col> 
            </Row>
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
}

function Contact() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (accordion: string) => {
    setOpenAccordion(openAccordion === accordion ? null : accordion);
  };

  const openInNewTab = (filePath: string) => {
    window.open(filePath, "_blank", "noopener,noreferrer");
  };

  return(
    <div id = "resume" className={styles.layout}> 
      <Layout>
        <Layout className={styles.section_layout}> 
          <Layout.Sider style={{ fontSize: '36px', fontWeight: 'bold', color:'#E43D12'}}>
            <a onClick={() => openInNewTab("/SarpToprakBirben_Resume.pdf")}> 
              <SectionTitle text_info='Resume'/>
            </a> 
          </Layout.Sider>
          <Layout.Content style= {{ width: '100%', height: 'auto'}}> 
          <motion.div className={styles.parent_accordion}>
              <AnimatePresence>
                <motion.div
                  key="work-experience"
                  onClick={() => toggleAccordion('work-experience')}
                >
                  <motion.div className={styles.title}>
                    Work Experience
                  </motion.div>
                </motion.div>
                {openAccordion === 'work-experience' && (
                  <motion.div
                    key="work-experience-content"
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
                      <h1 className={styles.edu_line}>
                        <span>
                          <strong>Trein Vertraging</strong> - Software Developer Intern
                        </span>

                        <span className={styles.edu_year}>
                          <i>2025 December - Present</i>
                        </span>
                      </h1>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

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
                      <h1 className={styles.edu_line}>
                        <span>
                          <strong>Vrije Universiteit</strong> - Bsc Computer Science
                        </span>

                        <span className={styles.edu_year}>
                          <i>2025</i>
                        </span>
                      </h1>
                      <h1 className={styles.edu_line}>
                        <span>
                          <strong>Hisar School</strong>
                        </span>

                        <span className={styles.edu_year}>
                          <i>2018-2022</i>
                        </span>
                      </h1>                   
                    </div>
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
                    <div className={styles.group}> 
                      <div className={styles.edu_item}>
                        <h1 className={styles.edu_line}>
                          <span>
                            <strong>Robotics</strong> - FIRST Robotics Competition
                          </span>

                          <span className={styles.edu_year}>
                            <i>2018-2022</i>
                          </span>
                        </h1>

                        <ul className={styles.edu_list}>
                          <li>Took responsibility of team&apos;s leadership and mentorship during the 19/20 & 21/22 season.</li> 
                          <li>Delved into various sub-sections such as electronics, programming, manufacturing and designing of the robot</li> 
                          <li>Nominated in various awards and won Industrial Safety in 2019</li>
                        </ul>
                      </div>

                      <div className={styles.edu_item}>
                        <h1 className={styles.edu_line}>
                          <span>
                            <strong>Coding Summit</strong> - Hisar School
                          </span>

                          <span className={styles.edu_year}>
                            <i>2021 & 2022</i>
                          </span>
                        </h1>

                        <ul className={styles.edu_list}>
                          <li>Volunteered to teach introductory Java programming to all age groups with diverse academic backgrounds.</li> 
                          <li>Explained core concepts such as classes, methods and object-oriented programming in an accessible and engaging way.</li> 
                          <li>Supported learners by answering questions, debugging code, and reinforcing problem-solving skills.</li> 
                          <li>Students experienced hands-on exercises and small projects, to build their first functional Java code.</li>
                        </ul>
                      </div>
                    </div>


                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
}

function SectionTitle({text_info}: {text_info: string}) {
  return (
    <div> 
      <h1>{text_info}</h1> 
    </div> 
  );
}

//Direkt contact me
function PageFooter() {
  return (
    <footer className={styles.footer}>
      <div>
        <h1>Contact me</h1>
        <div>
          <Button type="link" icon={<LinkedinOutlined />} size="large" style={{color: 'inherit', textDecoration: 'none' }}>
            <a href="https://www.linkedin.com/in/toprakbirben/">
              LinkedIn
            </a>
          </Button>
          <Button type="link" icon={<GithubOutlined />} size="large" style={{color: 'inherit', textDecoration: 'none' }}>
            <a href="https://github.com/toprakbirben">
              Github
            </a>
          </Button>
        </div>
        <div>
          <p><strong>Email:</strong> birbentoprak@gmail.com</p>
          <p><strong>Location:</strong> Amsterdam, Noord Holland</p>
        </div>
      </div>
    </footer>
  );
}
