"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { AppWindow, Code, ExternalLink, Smartphone, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AppScreenModal from "./app-screen-modal"

interface AppScreen {
  id: number
  image: string
  title: string
  description: string
}

interface Project {
  id: number
  title: string
  description: string
  image: string
  color: string
  features: string[]
  technologies: string[]
  appStoreLink: string
  playStoreLink: string
  githubLink: string
  screens: AppScreen[]
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [currentScreen, setCurrentScreen] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalScreenIndex, setModalScreenIndex] = useState(0)

  const isEven = index % 2 === 0

  const nextScreen = () => {
    setCurrentScreen((prev) => (prev + 1) % project.screens.length)
  }

  const prevScreen = () => {
    setCurrentScreen((prev) => (prev - 1 + project.screens.length) % project.screens.length)
  }

  const openModal = (screenIndex: number) => {
    setModalScreenIndex(screenIndex)
    setModalOpen(true)
  }

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
      >
        <div className={`order-1 ${isEven ? "md:order-1" : "md:order-2"}`}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >

            
            <div className={`absolute inset-0 ${project.color} blur-3xl opacity-20 rounded-full -z-10`}></div>
            <div className="relative mx-auto w-[280px] h-[580px] rounded-[40px] border-8 border-gray-800 overflow-hidden shadow-2xl">
              <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 rounded-b-lg"></div>

              {/* Screen Carousel */}
              <div className="relative h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScreen}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.screens[currentScreen].image || "/placeholder.svg"}
                      alt={project.screens[currentScreen].title}
                      width={300}
                      height={600}
                      className="object-cover h-full"
                    />

                    {/* Expand button */}
                    <button
                      onClick={() => openModal(currentScreen)}
                      className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full hover:bg-black/70 transition-colors"
                      aria-label="Expand screen"
                    >
                      <Maximize2 className="h-4 w-4 text-white" />
                    </button>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2">
                  {project.screens.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentScreen(i)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        i === currentScreen ? "bg-white w-4" : "bg-white/50"
                      }`}
                      aria-label={`Go to screen ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow Controls */}
                <button
                  onClick={prevScreen}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1.5 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Previous screen"
                >
                  <ChevronLeft className="h-4 w-4 text-white" />
                </button>
                <button
                  onClick={nextScreen}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1.5 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Next screen"
                >
                  <ChevronRight className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {/* Screen Description */}
            <div className="mt-6 text-center">
              <h4 className="font-semibold text-lg">{project.screens[currentScreen].title}</h4>
              <p className="text-gray-400 text-sm mt-1">{project.screens[currentScreen].description}</p>
            </div>
          </motion.div>
        </div>

        <div className={`order-2 ${isEven ? "md:order-2" : "md:order-1"}`}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
            <p className="text-gray-300 text-lg mb-6">{project.description}</p>

            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3 flex items-center">
                <AppWindow className="mr-2 h-5 w-5" /> Key Features
              </h4>
              <ul className="grid grid-cols-2 gap-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-white mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-3 flex items-center">
                <Code className="mr-2 h-5 w-5" /> Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <Badge key={i} variant="outline" className="bg-gray-800 text-white border-gray-700">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-white text-black hover:bg-gray-200">
                <Smartphone className="mr-2 h-4 w-4" /> View Demo
              </Button>
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" /> Case Study
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal for expanded view */}
      <AppScreenModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        screens={project.screens}
        initialScreen={modalScreenIndex}
        projectTitle={project.title}
        projectColor={project.color}
      />
    </>
  )
}
