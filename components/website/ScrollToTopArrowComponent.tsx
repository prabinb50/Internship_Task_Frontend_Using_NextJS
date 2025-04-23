"use client";
import React, { useEffect } from 'react';
import { motion, useAnimation, useScroll } from "framer-motion";

export default function ScrollToTopArrow() {
    const { scrollY } = useScroll();  // Track vertical scroll position
    const controls = useAnimation(); // Controls for animation states

    // Effect to handle scroll position changes
    useEffect(() => {
        // Subscribe to scroll position changes
        const unsubscribe = scrollY.on("change", (latest) => {
            // Show the button when scrolled down more than 100px
            if (latest > 100) {
                controls.start({ opacity: 1, scale: 1 });
            }
            // Hide the button when near the top of the page
            else {
                controls.start({ opacity: 0, scale: 0 });
            }
        });

        // Cleanup subscription when component unmounts
        return () => unsubscribe();
    }, [scrollY, controls]);

    return (
        <motion.div
            className="fixed bottom-8 right-8 bg-white text-purple-600 p-4 rounded-full shadow-lg border-2 border-purple-600 cursor-pointer flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0 }} // Initial state (hidden)
            animate={controls}

            whileHover={{
                scale: 1.2,
                backgroundColor: "#6B46C1",
                color: "#FFFFFF",
            }}

            // Ensure button stays visible during interaction
            onMouseEnter={() => controls.start({ opacity: 1, scale: 1 })}
            onMouseLeave={() => scrollY.get() > 100 && controls.start({ opacity: 1, scale: 1 })}

            // Scroll to top of page when clicked
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            {/* Arrow up icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
        </motion.div>
    );
}