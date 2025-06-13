"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, ExternalLink, Github, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import ContactForm from "@/components/contact-form"
import { describe } from "node:test"

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const projects = [
    {
      id: 1,
      title: "ZDiTM - Transport Company App",
      description: "A comprehensive application for urban public transportation, enabling users to check real-time departure schedules, track the live location of buses and trams, and plan optimal routes from one stop to another.",
      image: "/timetable.png?height=600&width=300",
      color: "bg-rose-500",
      features: ["Timetable Lookup", "Vehicle Tracking", "Route Search", "Ticket Purchase"],
      technologies: ["Swift", "UIKit", "Combine", "RestAPI"],
      appStoreLink: "#",
      playStoreLink: "#",
      githubLink: "#",
      screens: [
        {
          id: 1,
          image: "/timetable.png?height=600&width=300&text=Timetable",
          title: "Timetable",
          description:
          "The timetable feature provides a detailed schedule of departures for a selected bus or tram, showing all planned stops and times for a given route. Users can view upcoming departures and plan their journey based on the vehicle’s timetable."
        },
        {
          id: 2,
          image: "/vehicles.png?height=600&width=300&text=Vehicle Map",
          title: "Vehicle Map",
          description:
            "The map feature displays the real-time location of buses and trams, showing their exact position, direction of travel, and any delays relative to the schedule. Users can easily track vehicles across the city’s transit network for accurate and up-to-date travel planning.",
        },
        {
          id: 3,
          image: "/vehicleinfo.png?height=600&width=300&text=Vehicle Information",
          title: "Vehicle Information",
          description:
            "The app displays real-time details about a specific vehicle, including its current location, direction of travel, and any delays relative to the schedule.",
        },
        {
          id: 4,
          image: "/stopinfo.png?height=600&width=300&text=Stop Information",
          title: "Stop Information",
          description:
            "The stop departure feature lists all upcoming bus and tram departures from a selected stop, including times, routes, and any delays. Users can quickly check when the next vehicle will arrive at their chosen stop.",
        },
        {
          id: 5,
          image: "/routesearch.png?height=600&width=300&text=Route Search",
          title: "Route Search",
          description: "The route search function enables users to find the best transit connections from point A to point B, providing detailed options with departure times, transfers, and estimated travel duration. It optimizes travel planning by offering real-time data and alternative routes across the city’s public transport network."
        },
      ],
    },
    {
      id: 2,
      title: "WruumApp",
      description:
        "Personal finance management app with budget tracking, expense categorization, and financial insights.",
      image: "/placeholder.svg?height=600&width=300",
      color: "bg-emerald-500",
      features: ["Community Building"],
      technologies: ["Flutter", "Firebase"],
      appStoreLink: "#",
      playStoreLink: "#",
      githubLink: "#",
      screens: [
        {
          id: 1,
          image: "/main.png?height=600&width=300&text=Dashboard",
          title: "App Overview",
          description:
            "Get a complete picture of your financial health with our intuitive dashboard. View your income, expenses, savings, and investments at a glance. Interactive charts help you understand your spending patterns and identify areas for improvement.",
        },
        {
          id: 2,
          image: "/nav.png?height=600&width=300&text=Navigation",
          title: "Navigation",
          description:
            "Create and manage custom budgets for different spending categories. Set monthly limits and receive alerts when you're approaching your thresholds. The app provides smart suggestions based on your spending history to help you save more.",
        },
        {
          id: 3,
          image: "/shop.png?height=600&width=300&text=Shop",
          title: "Brand Shop",
          description:
            "Still under construction.",
        },
      ],
    },
    {
      id: 3,
      title: "KanarRadar",
      description: "A mobile app designed to help public transport users avoid fines by offering real-time alerts about ticket inspections. It provides tools like a control feed, map with inspection locations, and account settings for a seamless and worry-free travel experience.",
      image: "/placeholder.svg?height=600&width=300",
      color: "bg-sky-500",
      features: ["Fine Avoidance", "Real Time Feed","Inspection Map", "Push Notifications"],
      technologies: ["Flutter", "Firebase", "OpenStreetMap","GitHub"],
      appStoreLink: "#",
      playStoreLink: "#",
      githubLink: "#",
      screens: [
        {
          id: 1,
          image: "/feed.png?height=600&width=300&text=Feed",
          title: "Feed",
          description:
            "The app features a real-time feed displaying user-generated or official posts about ongoing ticket inspections, including the line, vehicle, and direction of travel.",
        },
        {
          id: 2,
          image: "/map.png?height=600&width=300&text=Map",
          title: "Map overview",
          description:
            "The interactive map displays pins marking recent ticket inspection locations, visible for one hour to indicate where controls are active. Users can view these pins to anticipate checks and ensure they have a valid ticket before boarding(Still under construction).",
        },
        {
          id: 3,
          image: "/account.png?height=600&width=300&text=Account",
          title: "Account",
          description:
            "The account settings view allows users to manage their profile, app preferences and also change city in case of relocation.",
        },
        {
          id: 4,
          image: "/notifications.png?height=600&width=300&text=Notifications Feed",
          title: "Notifications Feed",
          description:
            "The notification feed delivers real-time alerts about nearby ticket inspections and other users reaction to our posts.",
        },
      ],
    },
  ]

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.1], [0, -50])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale, y }}
        className="h-screen flex flex-col items-center justify-center relative px-4 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Mobile App Portfolio</h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-12 text-gray-300">
          Showcasing innovative mobile applications built with cutting-edge technologies
        </p>
        <Smartphone className="w-16 h-16 mb-8 text-white" />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="absolute bottom-10"
        >
          <Button variant="ghost" size="icon" className="text-white">
            <ChevronDown className="h-8 w-8" />
            <span className="sr-only">Scroll down</span>
          </Button>
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <section className="py-20 px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Featured Projects</h2>
        <div className="max-w-6xl mx-auto space-y-40">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl mb-10 text-gray-300">
            Interested in working together? Fill out the form below and I'll get back to you as soon as possible.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">© 2025 Mobile App Portfolio. All rights reserved.</p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button variant="ghost" size="icon">
              <ExternalLink className="h-5 w-5" />
              <span className="sr-only">Website</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
