"use client"
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { useTheme } from "./ThemeContext"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const { theme, setTheme } = useTheme()
  const sections = useRef([])
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 100])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 200, 300, 500], [1, 0.5, 0.5, 0])

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("portfolio-theme")
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
      document.documentElement.classList.toggle("dark", prefersDark)
    }
  }, [setTheme])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("portfolio-theme", newTheme)
  }

  useEffect(() => {
    const handleScroll = () => {
      const pageYOffset = window.pageYOffset
      let newActiveSection = "hero"

      sections.current.forEach((section) => {
        const sectionOffsetTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (pageYOffset >= sectionOffsetTop - 100 && pageYOffset < sectionOffsetTop + sectionHeight - 100) {
          newActiveSection = section.id
        }
      })

      setActiveSection(newActiveSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const addToSectionRefs = (el) => {
    if (el && !sections.current.includes(el)) {
      sections.current.push(el)
    }
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className={`overflow-hidden bg-gradient-to-br from-white to-[#F3E9D2] ${theme === 'dark' ? 'dark:from-[#114B5F] dark:to-[#0c3542]' : 'light:from-[#A9D08E] light:to-[#C1F2C7]'} min-h-screen text-[#114B5F] dark:text-[#F3E9D2] transition-colors duration-300`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-60 h-60 bg-[#88D498] dark:bg-[#1A936F] rounded-full opacity-10 dark:opacity-20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-1/3 -right-20 w-80 h-80 bg-[#1A936F] dark:bg-[#88D498] rounded-full opacity-10 dark:opacity-20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-60 h-60 bg-[#C6DABF] dark:bg-[#C6DABF] rounded-full opacity-10 dark:opacity-20 blur-3xl"
          animate={{
            x: [0, 150, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>
      <main className="pt-20">
        {/* Hero Section */}
        <section
          id="hero"
          ref={addToSectionRefs}
          className="min-h-[90vh] flex items-center relative overflow-hidden"
        >
          <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ y: y1 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-medium text-[#1A936F] dark:text-[#88D498]">
                  Hello, I'm
                </h2>
                <h1 className="text-5xl md:text-6xl font-bold text-[#F3E9D2] dark:text-[#88D498]">
                  Bryan Sohan John
                </h1>
                <p className="text-xl text-[#114B5F]/70 dark:text-[#C6DABF]">
                  Student, Pursuing B.E in AI and ML
                </p>
              </div>

              <p className="text-[#114B5F]/70 dark:text-[#C6DABF] max-w-lg">
                My Goal is to obtain an innovative and challenging position in an
                organization that gives me an opportunity for self-improvement and
                leadership, while contributing to the symbolic growth of the
                organization.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-2 bg-[#1A936F] text-white dark:text-[#F3E9D2] rounded-full hover:bg-[#114B5F] dark:hover:bg-[#88D498] dark:hover:text-[#114B5F] transition-colors"
                >
                  Contact Me
                </button>

                <a
                  href="/b.pdf"
                  download="Bryan_Sohan_John_CV.pdf"
                  className="px-6 py-2 bg-transparent border border-[#1A936F] text-[#1A936F] dark:border-[#88D498] dark:text-[#88D498] rounded-full hover:bg-[#1A936F] hover:text-white dark:hover:bg-[#88D498] dark:hover:text-[#114B5F] transition-colors"
                >
                  Download CV
                </a>
              </div>


              <div className="flex gap-4 pt-4">
                <motion.a
                  href="https://linkedin.com/in/bryan-sohan-john"
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#1A936F]/10 dark:bg-[#1A936F] p-3 rounded-full text-[#1A936F] dark:text-white hover:bg-[#1A936F] hover:text-white dark:hover:bg-[#88D498] dark:hover:text-[#114B5F] transition-colors"
                  rel="noreferrer"
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="https://github.com/bryanjohn05"
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#1A936F]/10 dark:bg-[#1A936F] p-3 rounded-full text-[#1A936F] dark:text-white hover:bg-[#1A936F] hover:text-white dark:hover:bg-[#88D498] dark:hover:text-[#114B5F] transition-colors"
                  rel="noreferrer"
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="mailto:bryansohanjohn@gmail.com"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#1A936F]/10 dark:bg-[#1A936F] p-3 rounded-full text-[#1A936F] dark:text-white hover:bg-[#1A936F] hover:text-white dark:hover:bg-[#88D498] dark:hover:text-[#114B5F] transition-colors"
                >
                  <Mail size={20} />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              style={{ y: y2 }}
              className="relative"
            >
              <div className="relative w-full h-[400px] md:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A936F]/30 to-[#88D498]/30 dark:from-[#1A936F] dark:to-[#88D498] rounded-full opacity-20 dark:opacity-20 blur-3xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#1A936F]/20 dark:border-[#88D498]/30 shadow-xl shadow-[#1A936F]/10 dark:shadow-[#1A936F]/20">
                    <img src="/Bryan.jpg" alt="Bryan Sohan John" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            style={{ opacity }}
          >
            <div className="flex flex-col items-center">
              <p className="text-sm text-[#114B5F]/50 dark:text-[#C6DABF] mb-2">Scroll Down</p>
              <div className="w-6 h-10 border-2 border-[#114B5F]/30 dark:border-[#C6DABF] rounded-full flex justify-center">
                <motion.div
                  className="w-1.5 h-1.5 bg-[#114B5F]/50 dark:bg-[#C6DABF] rounded-full mt-2"
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" ref={addToSectionRefs} className="py-20 px-6 md:px-0 relative">
          <div className="container mx-auto px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                About <span className="text-[#1A936F] dark:text-[#88D498]">Me</span>
              </h2>
              <div className="mt-4 w-20 h-1 bg-[#1A936F] dark:bg-[#88D498] mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 md:gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold">
                  I'm <span className="text-[#1A936F] dark:text-[#88D498]">Bryan Sohan John</span>, a Student of AI & ML
                </h3>
                <p className="text-[#114B5F]/70 dark:text-[#C6DABF]">
                  I'm currently pursuing my Bachelor of Engineering in Artificial Intelligence and Machine Learning at
                  St. Joseph Engineering College, Mangalore. With a strong foundation in programming languages like
                  Python, ML, and JavaScript, I'm passionate about developing innovative solutions using cutting-edge
                  technologies.
                </p>
                <p className="text-[#114B5F]/70 dark:text-[#C6DABF]">
                  My experience includes internships in Salesforce Administration and Full Stack Web Development, where
                  I've gained practical knowledge in building real-world applications. I'm particularly interested in the
                  intersection of AI, Machine Learning, and web technologies. I am eager to explore how machine learning
                  can be integrated into various domains, from predictive analytics to intelligent web applications, to
                  create smarter, more efficient systems.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className="text-[#114B5F]/50 dark:text-[#C6DABF]">Email:</p>
                    <p className="font-medium">bryansohanjohn@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-[#114B5F]/50 dark:text-[#C6DABF]">Location:</p>
                    <p className="font-medium">Mangaluru, India</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-lg overflow-hidden border border-[#1A936F]/10 dark:border-[#88D498]/30 shadow-xl bg-white/50 dark:bg-[#114B5F]/50 transition-colors duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1A936F]/10 to-[#88D498]/10 dark:from-[#1A936F]/20 dark:to-[#88D498]/20 backdrop-blur-sm"></div>
                  <div className="relative p-6 md:p-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1A936F]/10 dark:bg-[#1A936F]/20 rounded-lg flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-bold text-[#1A936F] dark:text-[#88D498]">7+</span>
                      </div>
                      <div>
                        <h4 className="text-base md:text-lg font-medium">Projects Completed</h4>
                        <p className="text-[#114B5F]/60 dark:text-[#C6DABF] text-sm">Including web and ML applications</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1A936F]/10 dark:bg-[#88D498]/20 rounded-lg flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-bold text-[#1A936F] dark:text-[#88D498]">3</span>
                      </div>
                      <div>
                        <h4 className="text-base md:text-lg font-medium">Internships</h4>
                        <p className="text-[#114B5F]/60 dark:text-[#C6DABF] text-sm">In Salesforce and Web Development</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1A936F]/10 dark:bg-[#88D498]/20 rounded-lg flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-bold text-[#1A936F] dark:text-[#88D498]">8.74</span>
                      </div>
                      <div>
                        <h4 className="text-base md:text-lg font-medium">CGPA</h4>
                        <p className="text-[#114B5F]/60 dark:text-[#C6DABF] text-sm">Current academic performance</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1A936F]/10 dark:bg-[#88D498]/20 rounded-lg flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-bold text-[#1A936F] dark:text-[#88D498]">3</span>
                      </div>
                      <div>
                        <h4 className="text-base md:text-lg font-medium">Languages</h4>
                        <p className="text-[#114B5F]/60 dark:text-[#C6DABF] text-sm">English, Kannada, Hindi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Education Section */}
        <section
          id="education"
          ref={addToSectionRefs}
          className="py-20 bg-[#F3E9D2]/30 dark:bg-[#114B5F]/30 transition-colors duration-300 px-4 md:px-auto"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                My <span className="text-[#1A936F] dark:text-[#88D498]">Education</span>
              </h2>
              <div className="mt-4 w-20 h-1 bg-[#1A936F] dark:bg-[#88D498] mx-auto"></div>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#1A936F]/20 dark:bg-[#88D498]/30 transform md:translate-x-px"></div>

              {[
                {
                  degree: "BE IN ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING",
                  institution: "ST. JOSEPH ENGINEERING COLLEGE, MANGALORE",
                  period: "11/2021 - Present",
                  grade: "8.65 CGPA",
                  icon: "🎓",
                },
                {
                  degree: "CLASS XII (Karnataka State Board)",
                  institution: "ST. ALOYSIUS PU COLLEGE, MANGALORE",
                  period: "06/2019 - 07/2021",
                  grade: "Secured 88.33%",
                  icon: "🏢",
                },
                {
                  degree: "CLASS X (ICSE Board)",
                  institution: "ST. THERESA'S SCHOOL, MANGALORE",
                  period: "06/2018 - 04/2019",
                  grade: "Secured 90%",
                  icon: "🏫",
                },
              ].map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 * index }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                    <div className="bg-white dark:bg-[#114B5F]/70 border border-[#1A936F]/10 dark:border-[#88D498]/30 rounded-lg p-6 shadow-lg transition-colors duration-300">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1A936F] to-[#88D498]/70 dark:from-[#1A936F] dark:to-[#88D498]"></div>
                      <h4 className="text-xl text-[#1A936F] dark:text-[#88D498] font-semibold mb-2">{edu.degree}</h4>
                      <p className="text-[#114B5F]/70 dark:text-[#C6DABF] mb-2">{edu.institution}</p>
                      <p className="text-sm text-[#114B5F]/50 dark:text-[#C6DABF] mb-2">{edu.period}</p>
                      <p className="font-medium">{edu.grade}</p>
                    </div>
                  </div>

                  <div className="absolute left-0 md:left-1/2 w-10 h-10 bg-white dark:bg-[#114B5F] border-2 border-[#1A936F] dark:border-[#88D498] rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 transition-colors duration-300">
                    <span className="text-lg">{edu.icon}</span>
                  </div>

                  <div className="w-full md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" ref={addToSectionRefs} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Work <span className="text-[#1A936F] dark:text-[#88D498]">Experience</span>
              </h2>
              <div className="mt-4 w-20 h-1 bg-[#1A936F] dark:bg-[#88D498] mx-auto"></div>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {[
                {
                  title: "Web Development and Cloud Internship",
                  company: "Vision Flow Technologies Pvt. Ltd.",
                  period: "02/2025 - Present",
                  location: "Moodbidri, India",
                  description:
                    "Currently completing a virtual internship focused on web development and cloud technologies. Gaining hands-on experience in building web applications and working with cloud-based solutions to create scalable, efficient systems.",
                },
                {
                  title: "Salesforce: Administrator Virtual Internship",
                  company: "Salesforce in Partnership with AICTE",
                  period: "11/2023 - 12/2023",
                  location: "Mangalore, India",
                  description:
                    "Completed a comprehensive virtual internship program focused on Salesforce administration. Gained hands-on experience with Salesforce CRM platform, learning to configure, customize, and manage Salesforce applications.",
                },
                {
                  title: "Full Stack Web Development Internship",
                  company: "Zephyr Technologies & Solutions Pvt. Ltd.",
                  period: "10/2023 - 11/2023",
                  location: "Mangalore, India",
                  description:
                    "Worked on developing responsive web applications using modern web technologies. Collaborated with a team to design and implement user interfaces, backend functionality, and database integrations.",
                },
              ].map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <div className="bg-white dark:bg-[#114B5F]/70 border border-[#1A936F]/10 dark:border-[#88D498]/30 rounded-lg p-6 shadow-lg relative overflow-hidden transition-colors duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#1A936F] to-[#88D498]/70 dark:from-[#1A936F] dark:to-[#88D498]"></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
                      <div>
                        <h4 className="text-xl text-[#1A936F] dark:text-[#88D498] font-semibold">{exp.title}</h4>
                        <p className="text-[#114B5F]/70 dark:text-[#C6DABF]">{exp.company}</p>
                      </div>
                      <span className="px-3 py-1 bg-[#1A936F]/10 dark:bg-[#1A936F]/30 rounded-full text-sm w-fit">
                        {exp.period}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#114B5F]/50 dark:text-[#C6DABF] mb-4">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                    <p className="text-[#114B5F]/70 dark:text-[#C6DABF]">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          ref={addToSectionRefs}
          className="py-20 bg-[#F3E9D2]/30 dark:bg-[#114B5F]/30 transition-colors duration-300"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                My <span className="text-[#1A936F] dark:text-[#88D498]">Projects</span>
              </h2>
              <div className="mt-4 w-20 h-1 bg-[#1A936F] dark:bg-[#88D498] mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "SignSerenade: Your Voice in Signs",
                  date: "02/2025",
                  description:
                    "A platform for real-time sign language recognition and translation, leveraging the WLASL dataset and custom-made datasets to enhance accessibility for the deaf community. Features gesture recognition and a user-friendly interface for seamless learning and communication.",
                  tags: ["Python", "Mediapipe", "Ultralytics"],
                  icon: "👐",
                  link: "https://github.com/bryanjohn05/SignSerenade",
                },
                {
                  title: "CanSure: Breast Cancer Classification System",
                  date: "07/2024",
                  description:
                    "A web-based breast cancer classification system using Machine Learning to analyze and classify medical images. Implemented using FastAPI, HTML, CSS, JavaScript, and TensorFlow.",
                  tags: ["Machine Learning", "FastAPI", "TensorFlow"],
                  icon: "🔬",
                  link: "https://github.com/bryanjohn05/Breast-Cancer-Classification",
                },
                {
                  title: "AttendEase: Attendance Management System",
                  date: "03/2024",
                  description:
                    "A smart attendance management system using QR codes to monitor and track attendance. Implemented using PHP, HTML, CSS, JavaScript, and MySQL.",
                  tags: ["PHP", "MySQL", "QR Code"],
                  icon: "📊",
                  link: "https://github.com/bryanjohn05/Attendance-Management-System",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * (index % 3) }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link to={project.link}>
                    <div className="h-full bg-white dark:bg-[#114B5F]/70 border border-[#1A936F]/10 dark:border-[#88D498]/30 rounded-lg overflow-hidden group-hover:border-[#1A936F] dark:group-hover:border-[#88D498]/50 transition-colors shadow-lg">
                      <div className="h-48 bg-[#F3E9D2]/50 dark:bg-[#1A936F]/30 relative overflow-hidden transition-colors duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1A936F]/10 to-[#88D498]/10 dark:from-[#1A936F]/20 dark:to-[#88D498]/20"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/80 dark:bg-[#114B5F]/80 rounded-full flex items-center justify-center transition-colors duration-300">
                            <span className="text-3xl">{project.icon}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-xl text-[#1A936F] dark:text-[#88D498] font-semibold">{project.title}</h4>
                          <span className="px-2 py-1 bg-[#1A936F]/10 dark:bg-[#1A936F]/30 rounded-full text-xs">
                            {project.date}
                          </span>
                        </div>
                        <p className="text-[#114B5F]/70 dark:text-[#C6DABF] mb-4 line-clamp-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-[#1A936F]/10 dark:bg-[#1A936F]/30 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <a href="https://github.com/bryanjohn05?tab=repositories" target="_blank" rel="noreferrer">
                <button className="px-6 py-3 bg-transparent border border-[#1A936F] text-[#1A936F] dark:border-[#88D498] dark:text-[#88D498] rounded-full hover:bg-[#1A936F] hover:text-white dark:hover:bg-[#88D498] dark:hover:text-[#114B5F] transition-colors text-lg">
                  View All Projects
                </button>
              </a>
            </motion.div>
          </div>
        </section>
        {/* Certificates Section */}
        <section id="certificates" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-[#1A936F] dark:text-[#88D498]">Hackathons</span> & Certificates
              </h2>
              <div className="mt-4 w-20 h-1 bg-[#1A936F] dark:bg-[#88D498] mx-auto"></div>
            </motion.div>

            <div className="max-w-8xl mx-auto">
              <div className="flex flex-wrap justify-center gap-8">
                {[
                  {
                    title: "Hackathon At Engineer - NITK 2024",
                    issuer: "National Institute of Technology Karnataka (NITK)",
                    link: "https://drive.google.com/file/d/13uNZLv56vjqu3DiB1SoIF8ZNfGrrXxxw/view?usp=drivesdk",
                    icon: "🧑🏽‍💻",
                  },
                  {
                    title: "Full Stack Web Development",
                    issuer: "Zephyr Technologies",
                    link: "https://drive.google.com/file/d/1-RNXFDeOJndb605x9nocLeSO85KO5_xY/view?usp=drive_link",
                    icon: "💻",
                  },
                  {
                    title: "Introduction to Structured Query Language",
                    issuer: "Coursera",
                    link: "https://www.coursera.org/account/accomplishments/verify/VJUHKN3KJTVM",
                    icon: "🗃️",
                  },
                  {
                    title: "Salesforce: Administrator Virtual Internship",
                    issuer: "Salesforce & AICTE",
                    link: "https://smartinternz.com/internships/salesforce_certificates/c00dbb3ebc145c8522b27ac8ab979ca8",
                    icon: "☁️",
                  },
                ].map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * (index % 3) }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="group w-full sm:w-1/2 md:w-1/4 lg:w-1/4"
                  >
                    <div className="bg-white dark:bg-[#114B5F]/70 border border-[#1A936F]/10 dark:border-[#88D498]/30 rounded-lg overflow-hidden group-hover:border-[#1A936F] dark:group-hover:border-[#88D498]/50 transition-colors shadow-lg h-full">
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-[#1A936F]/10 dark:bg-[#1A936F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">{cert.icon}</span>
                          </div>
                          <div>
                            <h4 className="text-lg text-[#1A936F] dark:text-[#88D498] font-semibold">{cert.title}</h4>
                            <p className="text-[#114B5F]/70 dark:text-[#C6DABF] text-sm">{cert.issuer}</p>
                          </div>
                        </div>
                        <div className="mt-auto pt-4">
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center text-[#1A936F] dark:text-[#88D498] hover:underline"
                          >
                            View Certificate
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" ref={addToSectionRefs} className="py-20 bg-[#F3E9D2]/30 dark:bg-[#114B5F]/30 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Contact <span className="text-[#1A936F] dark:text-[#88D498]">Me</span>
              </h2>
              <div className="mt-4 w-20 h-1 bg-[#1A936F] dark:bg-[#88D498] mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-1 gap-10 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-semibold">Get In Touch</h3>
                <p className="text-[#114B5F]/70 dark:text-[#C6DABF]">
                  Feel free to reach out to me for any inquiries, opportunities, or just to say hello. I'm always open
                  to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1A936F]/10 dark:bg-[#1A936F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-[#1A936F] dark:text-[#88D498]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Email</h4>
                      <p className="text-[#114B5F]/70 dark:text-[#C6DABF]">bryansohanjohn@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1A936F]/10 dark:bg-[#1A936F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-[#1A936F] dark:text-[#88D498]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Phone</h4>
                      <p className="text-[#114B5F]/70 dark:text-[#C6DABF]">9900380315</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1A936F]/10 dark:bg-[#1A936F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-[#1A936F] dark:text-[#88D498]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Location</h4>
                      <p className="text-[#114B5F]/70 dark:text-[#C6DABF]">Mangaluru, India</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-lg font-medium mb-4">Connect With Me</h4>
                  <div className="flex gap-4">
                    <motion.a
                      href="https://linkedin.com/in/bryan-sohan-john"
                      target="_blank"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-[#1A936F]/10 dark:bg-[#1A936F] rounded-lg flex items-center justify-center text-[#1A936F] dark:text-[#F3E9D2] hover:bg-[#1A936F] hover:text-white dark:hover:bg-[#88D498] dark:hover:text-[#114B5F] transition-colors"
                      rel="noreferrer"
                    >
                      <Linkedin />
                    </motion.a>
                    <motion.a
                      href="https://github.com/bryanjohn05"
                      target="_blank"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-[#1A936F]/10 dark:bg-[#1A936F] rounded-lg flex items-center justify-center text-[#1A936F] dark:text-[#F3E9D2] hover:bg-[#1A936F] hover:text-white dark:hover:bg-[#88D498] dark:hover:text-[#114B5F] transition-colors"
                      rel="noreferrer"
                    >
                      <Github />
                    </motion.a>
                    {/* <motion.a
              href="https://bryanjohn05.github.io/Portfolio/"
              target="_blank"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-[#1A936F]/10 dark:bg-[#1A936F] rounded-lg flex items-center justify-center text-[#1A936F] dark:text-[#F3E9D2] hover:bg-[#1A936F] hover:text-white dark:hover:bg-[#88D498] dark:hover:text-[#114B5F] transition-colors"
              rel="noreferrer"
            >
              <span className="text-xl">🌐</span>
            </motion.a> */}
                  </div>
                </div>
              </motion.div>

              {/* <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bg-white dark:bg-[#114B5F]/70 border border-[#1A936F]/10 dark:border-[#88D498]/30 rounded-lg p-6 shadow-lg transition-colors duration-300">
          <h4 className="text-xl font-semibold mb-4">Send Me a Message</h4>
          <p className="text-[#114B5F]/70 dark:text-[#C6DABF] mb-6">
            Fill out the form below to get in touch with me.
          </p>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-2 bg-[#F3E9D2]/30 dark:bg-[#114B5F] border border-[#1A936F]/10 dark:border-[#88D498]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F] dark:focus:ring-[#88D498] focus:border-transparent transition-colors duration-300"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 bg-[#F3E9D2]/30 dark:bg-[#114B5F] border border-[#1A936F]/10 dark:border-[#88D498]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F] dark:focus:ring-[#88D498] focus:border-transparent transition-colors duration-300"
                  placeholder="Your Email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                className="w-full px-4 py-2 bg-[#F3E9D2]/30 dark:bg-[#114B5F] border border-[#1A936F]/10 dark:border-[#88D498]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F] dark:focus:ring-[#88D498] focus:border-transparent transition-colors duration-300"
                placeholder="Subject"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 bg-[#F3E9D2]/30 dark:bg-[#114B5F] border border-[#1A936F]/10 dark:border-[#88D498]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A936F] dark:focus:ring-[#88D498] focus:border-transparent resize-none transition-colors duration-300"
                placeholder="Your Message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#1A936F] text-white dark:text-[#F3E9D2] rounded-md hover:bg-[#114B5F] dark:hover:bg-[#88D498] dark:hover:text-[#114B5F] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div> */}
            </div>
          </div>
        </section>
      </main>



      <footer className="py-3 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-t border-[#1A936F]/10 dark:border-[#88D498]/30 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#114B5F]/70 dark:text-[#C6DABF]">
            © {new Date().getFullYear()} Bryan Sohan John. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}