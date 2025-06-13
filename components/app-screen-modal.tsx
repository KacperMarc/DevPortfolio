"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface AppScreen {
  id: number
  image: string
  title: string
  description: string
}

interface AppScreenModalProps {
  isOpen: boolean
  onClose: () => void
  screens: AppScreen[]
  initialScreen: number
  projectTitle: string
  projectColor: string
}

export default function AppScreenModal({
  isOpen,
  onClose,
  screens,
  initialScreen,
  projectTitle,
  projectColor,
}: AppScreenModalProps) {
  const [currentScreen, setCurrentScreen] = useState(initialScreen)

  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden"
      // Update current screen when initialScreen changes
      setCurrentScreen(initialScreen)
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen, initialScreen])

  const nextScreen = () => {
    setCurrentScreen((prev) => (prev + 1) % screens.length)
  }

  const prevScreen = () => {
    setCurrentScreen((prev) => (prev - 1 + screens.length) % screens.length)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") nextScreen()
      if (e.key === "ArrowLeft") prevScreen()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              {/* Image side */}
              <div className={`relative flex items-center justify-center p-6 md:p-10 bg-gray-950`}>
                <div className={`absolute inset-0 ${projectColor} blur-3xl opacity-10 -z-10`}></div>

                <div className="relative w-[280px] h-[560px] rounded-[40px] border-8 border-gray-800 overflow-hidden shadow-2xl">
                  <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 rounded-b-lg"></div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentScreen}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <Image
                        src={screens[currentScreen].image || "/placeholder.svg"}
                        alt={screens[currentScreen].title}
                        width={300}
                        height={600}
                        className="object-cover h-full"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={prevScreen}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Previous screen"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={nextScreen}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Next screen"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </div>

              {/* Content side */}
              <div className="p-6 md:p-10 flex flex-col">
                <div>
                  <h3 className="text-xl text-gray-400 mb-1">{projectTitle}</h3>
                  <h2 className="text-3xl font-bold mb-4">{screens[currentScreen].title}</h2>
                  <p className="text-gray-300">{screens[currentScreen].description}</p>
                </div>

                {/* Thumbnails navigation */}
                <div className="mt-auto pt-6">
                  <h4 className="text-sm text-gray-400 mb-3">All Screens</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {screens.map((screen, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentScreen(i)}
                        className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                          i === currentScreen ? `border-white ${projectColor}` : "border-gray-700"
                        }`}
                        aria-label={`View ${screen.title}`}
                      >
                        <Image
                          src={screen.image || "/placeholder.svg"}
                          alt={screen.title}
                          width={80}
                          height={160}
                          className="object-cover aspect-[9/16]"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Screen indicators */}
                <div className="mt-6 flex justify-center items-center gap-2">
                  {screens.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentScreen(i)}
                      className={`h-2 transition-all ${
                        i === currentScreen ? "w-6 bg-white" : "w-2 bg-gray-600"
                      } rounded-full`}
                      aria-label={`Go to screen ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
