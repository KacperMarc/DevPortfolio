"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, ExternalLink, Github, Smartphone, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"

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
      image: "/vehicles.png?height=600&width=300",
      color: "bg-sky-500",
      features: ["Timetable Lookup", "Vehicle Tracking", "Route Search", "Ticket Purchase"],
      technologies: ["Swift", "UIKit", "Combine", "RestAPI"],
      appStoreLink: "#",
      playStoreLink: "#",
      githubLink: "#",
      screens: [
        
        {
          id: 1,
          image: "/vehicles.png?height=600&width=300&text=Vehicle Map",
          title: "Vehicle Map",
          description:
            "The map feature displays the real-time location of buses and trams, showing their exact position, direction of travel, and any delays relative to the schedule. Users can easily track vehicles across the city’s transit network for accurate and up-to-date travel planning.",
        },
        {
          id: 2,
          image: "/vehicleinfo.png?height=600&width=300&text=Vehicle Information",
          title: "Vehicle Information",
          description:
            "The app displays real-time details about a specific vehicle, including its current location, direction of travel, and any delays relative to the schedule.",
        },
        {
          id: 3,
          image: "/stopinfo.png?height=600&width=300&text=Stop Information",
          title: "Stop Information",
          description:
            "The stop departure feature lists all upcoming bus and tram departures from a selected stop, including times, routes, and any delays. Users can quickly check when the next vehicle will arrive at their chosen stop.",
        },
        {
          id: 4,
          image: "/timetable.png?height=600&width=300&text=Timetable",
          title: "Timetable",
          description:
          "The timetable feature provides a detailed schedule of departures for a selected bus or tram, showing all planned stops and times for a given route. Users can view upcoming departures and plan their journey based on the vehicle’s timetable."
        },
        {
          id: 5,
          image: "/lineinfo1.png?height=600&width=300&text=Timetable",
          title: "Line Information",
          description:
          "This view displays detailed information about a public transport line, including its type, route description, and list of stops. It also shows the line's trajectory on a map along with real-time vehicle locations."
        },
        {
          id: 6,
          image: "/lineinfo2.png?height=600&width=300&text=Timetable",
          title: "Line Information",
          description:
          "This view displays detailed information about a public transport line, including its type, route description, and list of stops. It also shows the line's trajectory on a map along with real-time vehicle locations."
        },
        {
          id: 7,
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
        "This app is a hub for automotive enthusiasts, enabling users to organize and join car meetups, connect with local and global communities, and shop official brand merchandise. It also offers built-in navigation to event locations and streaming of a dedicated music station to enhance the on-the-road experience.",
      image: "/placeholder.svg?height=600&width=300",
      color: "bg-purple-500",
      features: ["Community Building", "Organising Meetings", "Navigation", "Radio Features", "Brand Shop" ],
      technologies: ["Flutter", "Firebase"],
      appStoreLink: "#",
      playStoreLink: "#",
      githubLink: "#",
      screens: [
        {
          id: 1,
          image: "/main.png?height=600&width=300&text=Dashboard",
          title: "Home Screen",
          description:
            "The view features key widgets that allow the user to navigate to core sections of the application: Radio, Navigation, and Events.",
        },
        {
          id: 2,
          image: "/nav.png?height=600&width=300&text=Navigation",
          title: "Navigation",
          description:
            "The navigation view displays local events directly on the map, shows your current location and the vehicle you're driving, and allows you to navigate to selected event locations.",
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
      color: "bg-emerald-500",
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
          <a href="#projects">
		  <Button variant="ghost" size="icon" className="text-white">
            <ChevronDown className="h-8 w-8" />
            <span className="sr-only">Scroll down</span>
          </Button>
		  </a>

        </motion.div>
      </motion.section>

      {/* Projects Section */}
        <section className="py-20 px-4 md:px-8" id="projects">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Skontaktuj się ze mną</h2>
          <p className="text-xl mb-10 text-gray-300">
            Chętnie porozmawiam o nowych projektach i możliwościach. Znajdziesz mnie tutaj:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-white text-black hover:bg-gray-200">
              <a href="https://www.linkedin.com/in/kacper-marciszewski-67480a355/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="kacper.marciszewski222@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Email Me
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://github.com/KacperMarc" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-black border-t border-gray-800">
  <div className="max-w-6xl mx-auto text-center">
    <p className="text-gray-400">MarciszewskiDev © 2025 All rights reserved</p>
  </div>
</footer>

    </div>
  )
}
