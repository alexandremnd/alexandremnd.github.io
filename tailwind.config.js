tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter", "sans-serif"],
                space: ["Space Grotesk", "sans-serif"],
            },
            colors: {
                "quantum-blue": "#0066ff",
                "quantum-purple": "#8b5cf6",
                "quantum-pink": "#ec4899",
                "neon-cyan": "#00ffff",
                "dark-bg": "#0a0a0f",
                "darker-bg": "#050508",
                "card-bg": "rgba(15, 15, 25, 0.8)",
                "glass-border": "rgba(255, 255, 255, 0.1)",
            },
            animation: {
                float: "float 6s ease-in-out infinite",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite alternate",
                "slide-up": "slide-up 0.8s ease-out forwards",
                "particle-float": "particle-float 20s linear infinite",
                "particle-drift": "particle-drift 15s ease-in-out infinite",
                "gradient-shift": "gradient-shift 3s ease-in-out infinite",
                "text-glow": "text-glow 2s ease-in-out infinite alternate",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "pulse-glow": {
                    "0%": {
                        boxShadow: "0 0 20px rgba(0, 102, 255, 0.3)",
                    },
                    "100%": {
                        boxShadow: "0 0 40px rgba(0, 102, 255, 0.6)",
                    },
                },
                "slide-up": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(60px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                "particle-float": {
                    "0%": {
                        transform: "translateY(100vh) rotate(0deg)",
                    },
                    "100%": {
                        transform: "translateY(-100vh) rotate(360deg)",
                    },
                },
                "particle-drift": {
                    "0%, 100%": {
                        transform: "translateX(0px)",
                    },
                    "50%": {
                        transform: "translateX(30px)",
                    },
                },
                "gradient-shift": {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                "text-glow": {
                    "0%": {
                        textShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
                    },
                    "100%": {
                        textShadow: "0 0 40px rgba(0, 255, 255, 0.8), 0 0 60px rgba(139, 92, 246, 0.3)",
                    },
                },
            },
        },
    },
};