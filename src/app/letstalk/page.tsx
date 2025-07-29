'use client'

import { Mail, Linkedin, Github, Instagram, MapPin, Send } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
// import Image from 'next/image' // next/image importu kaldırıldı ve img tag'i ile değiştirildi
import { useState } from 'react' // `useState` hookunu import etdiyinizdən əmin olun

// Definieer een interface voor de structuur van de formulierdata
interface FormData {
    name: string;
    email: string;
    message: string;
}

// Definieer een interface voor de structuur van de validatiefouten
interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
    general?: string; // Voor algemene foutmeldingen, bijv. van de backend
}

// Kontakt məlumatlarını təyin edirik
const data = {
    email: 'arzuimammadova@gmail.com',
    linkedin: 'https://www.linkedin.com/in/arzu-mammadova-892b25269',
    github: 'https://github.com/arzummammadova',
    instagram: ['arzummmm'], // Birdən çox hesab ola biləcəyi ehtimalına görə massiv kimi təyin olunub
    address: 'Baku, Azerbaijan',
}

const LetsTalk = () => {
    // Komponentin görünüş sahəsində olub olmadığını yoxlamaq üçün hook
    const { ref, inView } = useInView({ triggerOnce: true })

    // Form giriş məlumatlarını saxlamaq üçün state, met type FormData
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
    // Form göndərilməsi zamanı yüklənmə vəziyyətini idarə etmək üçün state
    const [loading, setLoading] = useState(false);
    // Göndərilmə statusunu idarə etmək üçün state ('success', 'error', və ya null)
    const [status, setStatus] = useState<string | null>(null);
    // Hər sahə üçün validasiya xəta mesajlarını saxlamaq üçün state, met type FormErrors
    const [validationErrors, setValidationErrors] = useState<FormErrors>({});

    /**
     * Frontend validasiya məntiqi.
     * Sahələrin boş olub olmadığını və email formatının düzgünlüyünü yoxlayır.
     * @returns {boolean} Forma düzgündürsə true, əks halda false qaytarır.
     */
    const validateForm = () => {
        // Gebruik FormErrors type voor de errors object
        const errors: FormErrors = {};
        if (!formData.name.trim()) {
            errors.name = 'Ad tələb olunur.';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email tələb olunur.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            // Email formatı üçün sadə regex
            errors.email = 'Email formatı düzgün deyil.';
        }
        if (!formData.message.trim()) {
            errors.message = 'Mesaj tələb olunur.';
        }
        setValidationErrors(errors); // Validasiya xətalarını yeniləyir
        return Object.keys(errors).length === 0; // Xəta yoxdursa true qaytarır
    };

    /**
     * Form giriş sahələrindəki dəyişiklikləri idarə edir.
     * `formData` state-ni yeniləyir və istifadəçi yazdıqca müvafiq validasiya xətalarını təmizləyir.
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Giriş dəyişikliyindən gələn event obyekti.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        // İstifadəçi yazdıqca dəyişən sahə üçün xətanı təmizləyir
        if (validationErrors[e.target.id as keyof FormErrors]) { // Type assertion toegevoegd
            setValidationErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[e.target.id as keyof FormErrors]; // Type assertion toegevoegd
                return newErrors;
            });
        }
    };

    /**
     * Form göndərilməsini idarə edir.
     * Validasiya aparır, məlumatları backende göndərir və UI statusunu yeniləyir.
     * @param {React.FormEvent<HTMLFormElement>} e - Form göndərilməsindən gələn event obyekti.
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Formun defolt göndərilmə davranışını (səhifə yenilənməsi) qarşısını alır

        // Əvvəlcə frontend validasiyası aparılır
        const isValid = validateForm();
        if (!isValid) {
            // Validasiya uğursuz olarsa, statusu 'error'a təyin edir və göndərməni dayandırır
            setStatus('error');
            return;
        }

        setLoading(true); // Göndərilmənin davam etdiyini göstərir
        setStatus(null); // Əvvəlki uğur/xəta mesajlarını təmizləyir
        setValidationErrors({}); // Əvvəlki cəhdlərdən qalan validasiya xətalarını təmizləyir

        try {
            // Form məlumatlarını Node.js backendinizə göndərir
            const response = await fetch('https://portfolio-arzu-api.onrender.com/api/contact', { // ƏHƏMİYYƏTLİ: Bu URL backendinizə uyğun olduğundan əmin olun!
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Form məlumatlarını JSON stringinə çevirir
            });

            const result = await response.json(); // Backenddən gələn JSON cavabı parse edir

            if (response.ok) {
                // Cavab statusu 2xx (uğurlu) olarsa
                setStatus('success');
                setFormData({ name: '', email: '', message: '' }); // Uğurlu olduqda form sahələrini təmizləyir
            } else {
                // Cavab statusu xəta olarsa (məsələn, 4xx, 5xx)
                setStatus('error');
                console.error('Form göndərmə xətası:', result.message);
                // Backenddən gələn xüsusi xəta mesajını göstərir
                setValidationErrors({ general: result.message || 'Gözlənilməz bir xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.' });
            }
        } catch (error: any) { // Specificeer het type van error als 'any' of 'unknown'
            // Şəbəkə xətalarını tutur (məsələn, backend işləmir, internet bağlantısı yoxdur)
            setStatus('error');
            console.error('Şəbəkə və ya server xətası:', error);
            setValidationErrors({ general: 'Serverə qoşulmaq mümkün olmadı. Zəhmət olmasa şəbəkə bağlantınızı yoxlayın və backendin işlədiyinə əmin olun.' });
        } finally {
            setLoading(false); // Uğurdan və ya uğursuzluqdan asılı olmayaraq yüklənmə vəziyyətini sıfırlayır
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 md:px-10 lg:py-20 md:py-18 sm:py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mx-auto px-12 w-full">
                {/* SOL TƏRƏF - KONTAKT MƏLUMATLARI */}
                <div className="grid grid-cols-1 md:h-70 sm:h-auto sm:grid-cols-2 gap-4 md:gap-6">
                    {/* Email Kontakt Kartı */}
                    <motion.div
                        whileHover={{ y: -5 }} // Sadə hover animasiyası
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

                    {/* LinkedIn Kontakt Kartı */}
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
                                    Mənimlə əlaqə saxlayın
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* GitHub Kontakt Kartı */}
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
                                    İşlərimə baxın
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Yerləşmə Kontakt Kartı */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="border-2 bg-green-50 p-4 rounded-xl md:rounded-2xl h-auto md:h-[100px] flex items-center"
                    >
                        <div className="flex items-center gap-3 w-full">
                            <div className="p-2 rounded-full bg-[#D4EDDA]">
                                <MapPin className="text-[#28A745]" size={20} />
                            </div>
                            <div className="flex-1 min-w-0 overflow-hidden">
                                <h3 className="font-medium text-gray-500 text-sm">Yerləşmə</h3>
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


                {/* SAĞ TƏRƏF - KONTAKT FORMU */}
                <motion.div
                    ref={ref} // Görünüş müşahidəçisi üçün istinad
                    initial={{ opacity: 0, x: 50 }} // Başlanğıc animasiya vəziyyəti
                    animate={inView ? { opacity: 1, x: 0 } : {}} // Görünüş sahəsində olduqda animasiya
                    transition={{ duration: 0.8, ease: 'easeOut' }} // Animasiya müddəti və yumşaq keçid
                    className="bg-white border-2 p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl"
                >
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Mənə mesaj göndərin</h3>
                    <p className="text-gray-600 mb-6 md:mb-8">Sizə ən qısa zamanda cavab verəcəm</p>

                    <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleSubmit} // handleSubmit funksiyasını əlavə edir
                    >
                        {/* Ad Giriş Sahəsi */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Adınız
                            </label>
                            <input
                                id="name"
                                type="text"
                                required // HTML5 daxili validasiya
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 md:py-3 rounded-lg border ${validationErrors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#9D75FF] focus:border-transparent transition`}
                                placeholder="Adınızı daxil edin"
                            />
                            {/* Ad üçün frontend validasiya xətasını göstərir */}
                            {validationErrors.name && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
                            )}
                        </div>

                        {/* Email Giriş Sahəsi */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Ünvanı
                            </label>
                            <input
                                id="email"
                                type="email"
                                required // HTML5 daxili validasiya
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 md:py-3 rounded-lg border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#9D75FF] focus:border-transparent transition`}
                                placeholder="sizin@emailiniz.com"
                            />
                            {/* Email üçün frontend validasiya xətasını göstərir */}
                            {validationErrors.email && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                            )}
                        </div>

                        {/* Mesaj Textarea Sahəsi */}
                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Mesajınız
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                required // HTML5 daxili validasiya
                                value={formData.message}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 md:py-3 rounded-lg border ${validationErrors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#9D75FF] focus:border-transparent transition`}
                                placeholder="Nəyi müzakirə etmək istərdiniz?"
                            ></textarea>
                            {/* Mesaj üçün frontend validasiya xətasını göstərir */}
                            {validationErrors.message && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.message}</p>
                            )}
                        </div>

                        {/* Göndər Düyməsi */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#000000] to-[#000000] text-white py-3 md:py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
                            disabled={loading} // Forma göndərilərkən düyməni deaktiv edir
                        >
                            {loading ? (
                                'Göndərilir...' // Yüklənmə zamanı "Göndərilir..." mətnini göstərir
                            ) : (
                                <>
                                    <Send size={18} className="text-white" />
                                    <span>Mesaj Göndər</span>
                                </>
                            )}
                        </button>

                        {/* Göndərilmə Status Mesajları */}
                        {status === 'success' && (
                            <p className="text-green-600 text-center mt-4">Mesaj uğurla göndərildi! Sizə tezliklə geri dönüş edəcəm.</p>
                        )}
                        {status === 'error' && !validationErrors.general && ( // Backenddən xüsusi sahə xətaları yoxdursa ümumi xətanı göstərir
                            <p className="text-red-600 text-center mt-4">Mesaj göndərilmədi. Zəhmət olmasa xətaları düzəldin və yenidən cəhd edin.</p>
                        )}
                        {validationErrors.general && ( // Backenddən gələn ümumi xətanı göstərir
                            <p className="text-red-500 text-center mt-4">{validationErrors.general}</p>
                        )}
                    </form>
                </motion.div>
            </div>

            {/* DEKORATİV ELEMENTLƏR (Şəkil yollarının public qovluğunda düzgün olduğunu fərz edərək) */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#CBBEFF] opacity-20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#A18AFF] opacity-20 rounded-full blur-3xl -z-10"></div>
            <div className="">
                {/* next/image yerine standart img tag'leri kullanıldı */}
                <img src="/images/line2.png" alt='Dekorativ xətt' width={600} height={200} className='absolute bottom-0 opacity-70 left-0 z-[-1] rotate-25' />
                <img src="/images/line2.png" alt='Dekorativ xətt' width={600} height={200} className='absolute top-5 opacity-70 right-0 z-[-1] rotate-0' />
            </div>

            <img src="/images/spark.png" alt='Dekorativ qığılcım' width={200} height={200} className='absolute top-0 left-0' />
            <img src="/images/spark.png" alt='Dekorativ qığılcım' width={200} height={200} className='absolute top-0 left-0 z-[-1]' />

            <img src="/images/spark.png" alt='Dekorativ qığılcım' width={200} height={200} className='absolute top-5 left-2 opacity-25 z-[-1]' />

            <img src="/images/spark2.png" alt='Dekorativ qığılcım' width={400} height={400} className='absolute top-20 opacity-60 left-0 z-[-1]' />

            <img src="/images/spark2.png" alt='Dekorativ qığılcım' width={400} height={400} className='absolute bottom-0 opacity-50 left-0 z-[-1]' />
            <img src="/images/spark2.png" alt='Dekorativ qığılcım' width={400} height={400} className='absolute top-0 opacity-20 right-0 z-[0]' />

            <img src="/images/spark2.png" alt='Dekorativ qığılcım' width={400} height={400} className='absolute right-0 bottom-0 z-[-1]' />
        </section>
    )
}

export default LetsTalk
