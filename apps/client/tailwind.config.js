/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 豪华金色调色板
        golden: {
          50: '#FFFEF7',
          100: '#FFFACD',
          200: '#FFF8DC',
          300: '#FFE135',
          400: '#FFD700',
          500: '#FFC107',
          600: '#FF8F00',
          700: '#FF6F00',
          800: '#E65100',
          900: '#BF360C',
        },
        // 赌场专用颜色
        casino: {
          gold: '#FFD700',
          darkGold: '#B8860B',
          lightGold: '#FFEF94',
          red: '#DC143C',
          green: '#228B22',
          black: '#0A0A0A',
          darkGray: '#1A1A1A',
          cardGray: '#2D2D2D',
        },
        // 现代科技霓虹色彩
        neon: {
          blue: '#00D4FF',
          purple: '#8B5CF6',
          pink: '#F472B6',
          cyan: '#06B6D4',
          green: '#10B981',
          orange: '#F59E0B',
        },
        tech: {
          dark: '#0F0F23',
          darker: '#050510',
          card: '#1A1A2E',
          accent: '#16213E',
        }
      },
      fontFamily: {
        'casino': ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'elegant': ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'modern': ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'golden': '0 0 20px rgba(255, 215, 0, 0.5)',
        'golden-lg': '0 0 30px rgba(255, 215, 0, 0.7)',
        'neon-gold': '0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 15px #FFD700',
        'neon-blue': '0 0 5px #00D4FF, 0 0 10px #00D4FF, 0 0 20px #00D4FF',
        'neon-purple': '0 0 5px #8B5CF6, 0 0 10px #8B5CF6, 0 0 20px #8B5CF6',
        'neon-cyan': '0 0 5px #06B6D4, 0 0 10px #06B6D4, 0 0 20px #06B6D4',
        'tech-glow': '0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
      },
      backgroundImage: {
        'casino-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #2D2D2D 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #FFC107 50%, #FF8F00 100%)',
        'tech-gradient': 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
        'neon-gradient': 'linear-gradient(135deg, #00D4FF 0%, #8B5CF6 50%, #F472B6 100%)',
        'cyber-grid': 'linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)',
      },
      keyframes: {
        'spin-fast': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'flip-3d': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        }
      },
      animation: {
        'spin-fast': 'spin-fast 0.1s linear infinite', // Adjust duration as needed
        'spin-slow': 'spin-slow 0.5s linear infinite', // Adjust duration as needed
        'flip-3d': 'flip-3d 0.5s linear infinite', // Adjust duration as needed
      },
    },
  },
  plugins: [],
}