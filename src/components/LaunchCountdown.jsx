import React, { useState, useEffect } from 'react';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

const SubscriptionModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save email to local storage
        const subscribedEmails = JSON.parse(localStorage.getItem('subscribedEmails')) || [];
        localStorage.setItem('subscribedEmails', JSON.stringify([...subscribedEmails, email]));
        // Close modal after subscription
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Stay Updated!</h2>
                <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest updates, product announcements, and exclusive offers.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="border border-gray-300 p-2 rounded-md w-full mb-4"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                            Subscribe
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const CountdownTimer = () => {
    const [time, setTime] = useState({});
    const [cursorStyle, setCursorStyle] = useState('');
    const [particles, setParticles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(calculateTimeLeft());
        }, 1000);

        const newParticles = [...Array(100)].map((_, index) => ({
            id: index,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 5 + 2,
            opacity: Math.random() * 0.5 + 0.5,
        }));

        setParticles(newParticles);

        const animateParticles = () => {
            setParticles((prevParticles) =>
                prevParticles.map((particle) => {
                    let newX = particle.x + particle.speedX;
                    let newY = particle.y + particle.speedY;

                    if (newX < 0 || newX > window.innerWidth) {
                        particle.speedX = -particle.speedX;
                    }

                    if (newY < 0 || newY > window.innerHeight) {
                        particle.speedY = -particle.speedY;
                    }

                    return { ...particle, x: newX, y: newY };
                })
            );

            requestAnimationFrame(animateParticles);
        };

        animateParticles();

        return () => clearInterval(timer);
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const calculateTimeLeft = () => {
        const targetDate = new Date('jul 10, 2024 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;

        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
        };
    };

    const handleMouseEnter = () => {
        setCursorStyle('pointer');
    };

    const handleMouseLeave = () => {
        setCursorStyle('');
    };

    const notifySubscribers = () => {
        const subscribedEmails = JSON.parse(localStorage.getItem('subscribedEmails')) || [];
        subscribedEmails.forEach((email) => {
            // Simulate notifying subscribers via console log
            console.log(`Notifying subscriber: ${email}`);
        });
    };

    const openGoogleReviewPage = () => {
        // Redirect to Google review page
        window.open('https://g.page/r/CdD3aYBDl7slEBI/review', '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
            <div className="particle-container absolute inset-0 pointer-events-none">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: `${particle.x}px`,
                            top: `${particle.y}px`,
                            width: `${particle.radius}px`,
                            height: `${particle.radius}px`,
                            backgroundColor: '#3B82F6',
                            borderRadius: '50%',
                            opacity: particle.opacity,
                            transition: 'transform 1s linear',
                        }}
                    ></div>
                ))}
            </div>
            <div className="p-12 sm:p-12 bg-gray-800 bg-opacity-70 sm:bg-opacity-90 rounded-lg shadow-lg text-center mx-auto max-w-4xl">
                <h1 className="text-3xl md:text-5xl font-semibold text-white mb-4">Setting New Benchmarks in Digital Transformation</h1>
                <p className="text-sm md:text-md text-gray-400 mb-6">Get ready to experience the future of digital solutions. Blue Design is coming soon, bringing you exceptional app and web development, captivating design, and social media strategies that connect.</p>
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-center md:space-x-8 mb-8">
                    <TimeUnit value={time.days} label="Days" />
                    <TimeUnit value={time.hours} label="Hours" />
                    <TimeUnit value={time.minutes} label="Minutes" />
                    <TimeUnit value={time.seconds} label="Seconds" />
                </div>
                <button
                    onClick={openModal}
                    className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ cursor: cursorStyle }}
                >
                    Stay Updated
                </button>
                <button
                    onClick={openGoogleReviewPage}
                    className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-transform transform hover:scale-105 ml-4"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ cursor: cursorStyle }}
                >
                    Drop a Review
                </button>

                <div className="sm:mt-1 mt-5 flex space-x-4 text-xl md:text-2xl sm:justify-end justify-center">
                    <a href="https://www.linkedin.com/company/mybluedesignco" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <FaLinkedin style={{ fontSize: '32px' }} />
                    </a>
                    <a href="https://www.instagram.com/mybluedesignco/" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <FaInstagram style={{ fontSize: '32px' }} />
                    </a>
                    <a href="https://www.facebook.com/mybluedesignco" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <FaFacebook style={{ fontSize: '32px' }} />
                    </a>
                </div>
            </div>
            <SubscriptionModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
   );
};

const TimeUnit = ({ value, label }) => (
   <div className="flex flex-col items-center w-full md:w-auto">
       <div className="relative w-32 h-32 md:w-32 md:h-32 flex items-center justify-center mb-2">
           <svg className="absolute w-full h-full">
               <circle className="text-gray-700" strokeWidth="6" stroke="currentColor" fill="transparent" r="52" cx="50%" cy="50%" />
               <circle
                   className="text-blue-500 hover:text-blue-400 transition-colors duration-300"
                   strokeWidth="6"
                   strokeLinecap="round"
                   stroke="currentColor"
                   fill="transparent"
                   r="52"
                   cx="50%"
                   cy="50%"
                   style={{
                       strokeDasharray: '326.56',
                       strokeDashoffset: (326.56 * (1 - (value / (label === 'Days' ? 365 : 60)))).toFixed(1),
                       transition: 'stroke-dashoffset 1s linear',
                   }}
               />
           </svg>
           <span className="text-2xl md:text-4xl text-white font-semibold z-10">{value}</span>
       </div>
       <span className="text-sm md:text-lg text-gray-400 font-medium">{label}</span>
   </div>
);

export default CountdownTimer;
