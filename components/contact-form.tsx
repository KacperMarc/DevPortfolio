"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { sendEmail } from "@/app/actions"

type FormStatus = "idle" | "submitting" | "success" | "error"

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  async function handleSubmit(formData: FormData) {
    setFormStatus("submitting")

    try {
      const result = await sendEmail(formData)

      if (result.success) {
        setFormStatus("success")
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      } else {
        setFormStatus("error")
        setErrorMessage(result.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setFormStatus("error")
      setErrorMessage("An unexpected error occurred. Please try again later.")
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      if (formStatus === "success" || formStatus === "error") {
        setFormStatus("idle")
      }
    }, 5000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <form id="contact-form" action={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your name" required className="bg-gray-800 border-gray-700" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            className="bg-gray-800 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            placeholder="What is this regarding?"
            required
            className="bg-gray-800 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your message here..."
            required
            className="min-h-[150px] bg-gray-800 border-gray-700"
          />
        </div>

        <Button type="submit" className="w-full" disabled={formStatus === "submitting"}>
          {formStatus === "idle" && (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}

          {formStatus === "submitting" && (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          )}

          {formStatus === "success" && (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Message Sent!
            </>
          )}

          {formStatus === "error" && (
            <>
              <AlertCircle className="mr-2 h-4 w-4" />
              Failed to Send
            </>
          )}
        </Button>

        {formStatus === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-400 text-center"
          >
            Thank you for your message! I'll get back to you soon.
          </motion.p>
        )}

        {formStatus === "error" && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-center">
            {errorMessage}
          </motion.p>
        )}
      </form>
    </motion.div>
  )
}
