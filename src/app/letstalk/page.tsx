'use client'

import { Mail, Linkedin, Github, Instagram, MapPin, Send } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
    general?: string;
}

const data = {
    email: 'arzuimammadova@gmail.com',
    linkedin: 'https://www.linkedin.com/in/arzu-mammadova-892b25269',
    github: 'https://github.com/arzummammadova',
    instagram: ['arzummmm'],
    address: 'Baku, Azerbaijan',
}

const LetsTalk = () => {
    const { ref, inView } = useInView({ triggerOnce: true })

    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<FormErrors>({});

    const validateForm = () => {
        const errors: FormErrors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name is required.';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email format.';
        }
        if (!formData.message.trim()) {
            errors.message = 'Message is required.';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        if (validationErrors[e.target.id as keyof FormErrors]) {
            setValidationErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[e.target.id as keyof FormErrors];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            setStatus('error');
            return;
        }

        setLoading(true);
        setStatus(null);
        setValidationErrors({});

        try {
            const response = await fetch('https://portfolio-arzu-api.onrender.com/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
                console.error('Form submission error:', result.message);
                setValidationErrors({
                    general: result.message || 'An unexpected error occurred. Please try again.',
                });
            }
        } catch (error: any) {
            setStatus('error');
            console.error('Network or server error:', error);
            setValidationErrors({
                general: 'Unable to connect to the server. Please check your connection and make sure the backend is running.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 md:px-10 lg:py-20 md:py-18 sm:py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mx-auto px-12 w-full">
                {/* LEFT SIDE – CONTACT INFO */}
                <div className="grid grid-cols-1 md:h-70 sm:h-auto sm:grid-cols-2 gap-4 md:gap-6">
                    {/* Email */}
                    <motion.div whileHover={{ y: -5 }} className="bg-red-50 p-4 border-2 rounded-xl md:rounded-2xl h-auto md:h-[100px] flex items-center">
                        <div className="flex items-center gap-3 w-full">
                            <div className="p-2 rounded-full bg-[#FFE2E2]">
                                <Mail className="text-[#FF6B6B]" size={20} />
                            </div>
                            <div className="flex-1 min-w-0 overflow-hidden">
                                <h3 className="font-medium text-gray-500 text-sm">Email</h3>
                                <a href={`mailto:${data.email}`} className="text-[#9D75FF] hover:underline text-sm md:text-base break-words block">
                                    {data.email}
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* LinkedIn */}
                    <motion.div whileHover={{ y: -5 }} className="bg-blue-50 p-4 border-2 rounded-xl md:rounded-2xl h-auto md:h-[100px] flex items-center">
                        <div className="flex items-center gap-3 w-full">
                            <div className="p-2 rounded-full bg-[#E0F7FA]">
                                <Linkedin className="text-[#0077B5]" size={20} />
                            </div>
                            <div className="flex-1 min-w-0 overflow-hidden">
                                <h3 className="font-medium text-gray-500 text-sm">LinkedIn</h3>
                                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#9D75FF] hover:underline text-sm md:text-base break-words block">
                                    Connect with me
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* GitHub */}
                    <motion.div whileHover={{ y: -5 }} className="p-4 border-2 bg-amber-50 rounded-xl md:rounded-2xl h-auto md:h-[100px] flex items-center">
                        <div className="flex items-center gap-3 w-full">
                            <div className="p-2 rounded-full bg-[#F2F2F2]">
                                <Github className="text-[#333333]" size={20} />
                            </div>
                            <div className="flex-1 min-w-0 overflow-hidden">
                                <h3 className="font-medium text-gray-500 text-sm">GitHub</h3>
                                <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-[#9D75FF] hover:underline text-sm md:text-base break-words block">
                                    View my work
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Location */}
                    <motion.div whileHover={{ y: -5 }} className="border-2 bg-green-50 p-4 rounded-xl md:rounded-2xl h-auto md:h-[100px] flex items-center">
                        <div className="flex items-center gap-3 w-full">
                            <div className="p-2 rounded-full bg-[#D4EDDA]">
                                <MapPin className="text-[#28A745]" size={20} />
                            </div>
                            <div className="flex-1 min-w-0 overflow-hidden">
                                <h3 className="font-medium text-gray-500 text-sm">Location</h3>
                                <span className="text-[#9D75FF] text-sm md:text-base break-words block">
                                    {data.address}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT SIDE – CONTACT FORM */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="bg-white border-2 p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl"
                >
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Send Me a Message</h3>
                    <p className="text-gray-600 mb-6 md:mb-8">I'll get back to you as soon as possible.</p>

                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 md:py-3 rounded-lg border ${validationErrors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#9D75FF] focus:border-transparent transition`}
                                placeholder="Enter your name"
                            />
                            {validationErrors.name && <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 md:py-3 rounded-lg border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#9D75FF] focus:border-transparent transition`}
                                placeholder="your@email.com"
                            />
                            {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                            <textarea
                                id="message"
                                rows={4}
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 md:py-3 rounded-lg border ${validationErrors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#9D75FF] focus:border-transparent transition`}
                                placeholder="What would you like to discuss?"
                            ></textarea>
                            {validationErrors.message && <p className="text-red-500 text-xs mt-1">{validationErrors.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#000000] to-[#000000] text-white py-3 md:py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : (
                                <>
                                    <Send size={18} className="text-white" />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>

                        {/* Status Messages */}
                        {status === 'success' && (
                            <p className="text-green-600 text-center mt-4">Message sent successfully! I'll get back to you soon.</p>
                        )}
                        {status === 'error' && !validationErrors.general && (
                            <p className="text-red-600 text-center mt-4">Message not sent. Please fix the errors and try again.</p>
                        )}
                        {validationErrors.general && (
                            <p className="text-red-500 text-center mt-4">{validationErrors.general}</p>
                        )}
                    </form>
                </motion.div>
            </div>

            {/* DECORATIVE ELEMENTS */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#CBBEFF] opacity-20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#A18AFF] opacity-20 rounded-full blur-3xl -z-10"></div>
            <div>
                <img src="/images/line2.png" alt="Decorative line" width={600} height={200} className="absolute bottom-0 opacity-70 left-0 z-[-1] rotate-25" />
                <img src="/images/line2.png" alt="Decorative line" width={600} height={200} className="absolute top-5 opacity-70 right-0 z-[-1] rotate-0" />
            </div>

            <img src="/images/spark.png" alt="Decorative spark" width={200} height={200} className="absolute top-0 left-0" />
            <img src="/images/spark.png" alt="Decorative spark" width={200} height={200} className="absolute top-0 left-0 z-[-1]" />
            <img src="/images/spark.png" alt="Decorative spark" width={200} height={200} className="absolute top-5 left-2 opacity-25 z-[-1]" />
            <img src="/images/spark2.png" alt="Decorative spark" width={400} height={400} className="absolute top-20 opacity-60 left-0 z-[-1]" />
            <img src="/images/spark2.png" alt="Decorative spark" width={400} height={400} className="absolute bottom-0 opacity-50 left-0 z-[-1]" />
            <img src="/images/spark2.png" alt="Decorative spark" width={400} height={400} className="absolute top-0 opacity-20 right-0 z-[0]" />
            <img src="/images/spark2.png" alt="Decorative spark" width={400} height={400} className="absolute right-0 bottom-0 z-[-1]" />
        </section>
    )
}

export default LetsTalk
