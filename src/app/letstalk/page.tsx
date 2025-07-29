'use client'

import { Mail, Linkedin, Github, Instagram, MapPin, Send } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react' // Ensure useState is imported

// Define contact data
const data = {
    email: 'arzuimammadova@gmail.com',
    linkedin: 'https://www.linkedin.com/in/arzu-mammadova-892b25269',
    github: 'https://github.com/arzummammadova',
    instagram: ['arzummmm'], // Assuming this might be an array if there are multiple handles
    address: 'Baku, Azerbaijan',
}

const LetsTalk = () => {
    // Hook for checking if the component is in view for animation
    const { ref, inView } = useInView({ triggerOnce: true })

    // State to hold form input data
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    // State to manage loading status during form submission
    const [loading, setLoading] = useState(false);
    // State to manage the submission status ('success', 'error', or null)
    const [status, setStatus] = useState(null);
    // State to hold validation error messages for each field
    const [validationErrors, setValidationErrors] = useState({});

    /**
     * Client-side form validation logic.
     * Checks if fields are empty and if email format is valid.
     * @returns {boolean} True if the form is valid, false otherwise.
     */
    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name is required.';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            // Basic regex for email format validation
            errors.email = 'Email is invalid.';
        }
        if (!formData.message.trim()) {
            errors.message = 'Message is required.';
        }
        setValidationErrors(errors); // Update validation errors state
        return Object.keys(errors).length === 0; // Return true if no errors were found
    };

    /**
     * Handles changes in form input fields.
     * Updates formData state and clears relevant validation errors as user types.
     * @param {Object} e - The event object from the input change.
     */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        // Clear specific validation error for the changed field as user types
        if (validationErrors[e.target.id]) {
            setValidationErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[e.target.id]; // Remove the error for this field
                return newErrors;
            });
        }
    };

    /**
     * Handles form submission.
     * Performs validation, sends data to backend, and updates UI status.
     * @param {Object} e - The event object from the form submission.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior (page reload)

        // Perform client-side validation first
        const isValid = validateForm();
        if (!isValid) {
            // If validation fails, set status to error and stop submission
            setStatus('error');
            return;
        }

        setLoading(true); // Indicate that submission is in progress
        setStatus(null); // Clear any previous success/error messages
        setValidationErrors({}); // Clear any existing validation errors from previous attempts

        try {
            // Send the form data to your Node.js backend
            const response = await fetch('http://localhost:5000/api/contact', { // IMPORTANT: Ensure this URL matches your backend!
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Convert form data to JSON string
            });

            const result = await response.json(); // Parse the JSON response from the backend

            if (response.ok) {
                // If the response status is 2xx (success)
                setStatus('success');
                setFormData({ name: '', email: '', message: '' }); // Clear the form fields on success
            } else {
                // If the response status is an error (e.g., 4xx, 5xx)
                setStatus('error');
                console.error('Form submission error:', result.message);
                // Display the specific error message from the backend if available
                setValidationErrors({ general: result.message || 'An unexpected error occurred. Please try again.' });
            }
        } catch (error) {
            // Catch network errors (e.g., backend not running, no internet connection)
            setStatus('error');
            console.error('Network or server error:', error);
            setValidationErrors({ general: 'Could not connect to the server. Please check your network connection and ensure the backend is running.' });
        } finally {
            setLoading(false); // Reset loading state regardless of success or failure
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 md:px-10 lg:py-20 md:py-18 sm:py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mx-auto px-12 w-full">
                {/* LEFT SIDE - CONTACT INFO */}
                <div className="grid grid-cols-1 md:h-70 sm:h-auto sm:grid-cols-2 gap-4 md:gap-6">
                    {/* Email Contact Card */}
                    <motion.div
                        whileHover={{ y: -5 }} // Simple hover animation
                        className="bg-red-50 p-4 border-2 rounded-xl md:rounded-2xl h-auto md:h-[100px] flex items-center"
                    >
                        <div className="flex items-center gap-3 w-full">
                            <div className="p-2 rounded-full bg-[#FFE2E2]">
                                <Mail className="text-[#FF6B6B]" size={20} />
                            </div>
                            <div className="flex-1 min-w-0 overflow-hidden">
                                <h3 className="font-medium text-gray-500 text-sm">Email</h3>
                                <a
                                    href={`mailto:${data.email}`}
                                    className="text-[#9D75FF] hover:underline text-sm md:text-base break-words block"
                                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                >
                                    {data.email}
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* LinkedIn Contact Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-blue-50 p-4 border-2 rounded-xl md:rounded-2xl h-auto md:h-[100px] flex items-center"
                    >
                        <div className="flex items-center gap-3 w-full">
                            <div className="p-2 rounded-full bg-[#E0F7FA]">
                                <Linkedin className="text-[#0077B5]" size={20} />
                            </div>
                            <div className="flex-1 min-w-0 overflow-hidden">
                                <h3 className="font-medium text-gray-500 text-sm">LinkedIn</h3>
                                <a
                                    href={data.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#9D75FF] hover:underline text-sm md:text-base break-words block"
                                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                >
                                    Connect with me
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* GitHub Contact Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-4 border-2 bg-amber-50 rounded-xl md:rounded-2xl h-auto md:h-[100px] flex items-center"
                    >
                        <div className="flex items-center gap-3 w-full">
                            <div className="p-2 rounded-full bg-[#F2F2F2]">
                                <Github className="text-[#333333]" size={20} />
                            </div>
                            <div className="flex-1 min-w-0 overflow-hidden">
                                <h3 className="font-medium text-gray-500 text-sm">GitHub</h3>
                                <a
                                    href={data.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#9D75FF] hover:underline text-sm md:text-base break-words block"
                                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                >
                                    View my work
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Location Contact Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="border-2 bg-green-50 p-4 rounded-xl md:rounded-2xl h-auto md:h-[100px] flex items-center"
                    >
                        <div className="flex items-center gap-3 w-full">
                            <div className="p-2 rounded-full bg-[#D4EDDA]">
                                <MapPin className="text-[#28A745]" size={20} />
                            </div>
                            <div className="flex-1 min-w-0 overflow-hidden">
                                <h3 className="font-medium text-gray-500 text-sm">Location</h3>
                                <span
                                    className="text-[#9D75FF] text-sm md:text-base break-words block"
                                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                >
                                    {data.address}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>


                {/* RIGHT SIDE - CONTACT FORM */}
                <motion.div
                    ref={ref} // Reference for intersection observer
                    initial={{ opacity: 0, x: 50 }} // Initial animation state
                    animate={inView ? { opacity: 1, x: 0 } : {}} // Animate when in view
                    transition={{ duration: 0.8, ease: 'easeOut' }} // Animation duration and easing
                    className="bg-white border-2 p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl"
                >
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Send me a message</h3>
                    <p className="text-gray-600 mb-6 md:mb-8">I'll get back to you as soon as possible</p>

                    <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleSubmit} // Attach the handleSubmit function
                    >
                        {/* Name Input Field */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Your Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                required // HTML5 built-in validation
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 md:py-3 rounded-lg border ${validationErrors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#9D75FF] focus:border-transparent transition`}
                                placeholder="Enter your name"
                            />
                            {/* Display client-side validation error for name */}
                            {validationErrors.name && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
                            )}
                        </div>

                        {/* Email Input Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required // HTML5 built-in validation
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 md:py-3 rounded-lg border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#9D75FF] focus:border-transparent transition`}
                                placeholder="your@email.com"
                            />
                            {/* Display client-side validation error for email */}
                            {validationErrors.email && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                            )}
                        </div>

                        {/* Message Textarea Field */}
                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                required // HTML5 built-in validation
                                value={formData.message}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 md:py-3 rounded-lg border ${validationErrors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#9D75FF] focus:border-transparent transition`}
                                placeholder="What would you like to discuss?"
                            ></textarea>
                            {/* Display client-side validation error for message */}
                            {validationErrors.message && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#000000] to-[#000000] text-white py-3 md:py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
                            disabled={loading} // Disable button when form is submitting
                        >
                            {loading ? (
                                'Sending...' // Show "Sending..." text when loading
                            ) : (
                                <>
                                    <Send size={18} className="text-white" />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>

                        {/* Submission Status Messages */}
                        {status === 'success' && (
                            <p className="text-green-600 text-center mt-4">Message sent successfully! I'll get back to you soon.</p>
                        )}
                        {status === 'error' && !validationErrors.general && ( // Show general error if no specific field errors from backend
                            <p className="text-red-600 text-center mt-4">Failed to send message. Please correct the errors and try again.</p>
                        )}
                        {validationErrors.general && ( // Display a general error from backend if any
                            <p className="text-red-500 text-center mt-4">{validationErrors.general}</p>
                        )}
                    </form>
                </motion.div>
            </div>

            {/* DECORATIVE ELEMENTS (Assuming image paths are correct in public folder) */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#CBBEFF] opacity-20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#A18AFF] opacity-20 rounded-full blur-3xl -z-10"></div>
            <div className="">
                <Image src="/images/line2.png" alt='Decorative line' width={600} height={200} className='absolute bottom-0 opacity-70 left-0 z-[-1] rotate-25' />
                <Image src="/images/line2.png" alt='Decorative line' width={600} height={200} className='absolute top-5 opacity-70 right-0 z-[-1] rotate-0' />
            </div>

            <Image src="/images/spark.png" alt='Decorative spark' width={200} height={200} className='absolute top-0 left-0' />
            <Image src="/images/spark.png" alt='Decorative spark' width={200} height={200} className='absolute top-0 left-0 z-[-1]' />

            <Image src="/images/spark.png" alt='Decorative spark' width={200} height={200} className='absolute top-5 left-2 opacity-25 z-[-1]' />

            <Image src="/images/spark2.png" alt='Decorative spark' width={400} height={400} className='absolute top-20 opacity-60 left-0 z-[-1]' />

            <Image src="/images/spark2.png" alt='Decorative spark' width={400} height={400} className='absolute bottom-0 opacity-50 left-0 z-[-1]' />
            <Image src="/images/spark2.png" alt='Decorative spark' width={400} height={400} className='absolute top-0 opacity-20 right-0 z-[0]' />

            <Image src="/images/spark2.png" alt='Decorative spark' width={400} height={400} className='absolute right-0 bottom-0 z-[-1]' />
        </section>
    )
}

export default LetsTalk
