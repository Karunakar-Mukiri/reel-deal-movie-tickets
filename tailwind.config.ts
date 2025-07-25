import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Luxury theme colors
				"luxury-gold": "hsl(var(--luxury-gold))",
				"luxury-gold-dark": "hsl(var(--luxury-gold-dark))",
				"luxury-burgundy": "hsl(var(--luxury-burgundy))",
				"luxury-burgundy-dark": "hsl(var(--luxury-burgundy-dark))",
				"luxury-cream": "hsl(var(--luxury-cream))",
				"luxury-charcoal": "hsl(var(--luxury-charcoal))",
				"luxury-charcoal-light": "hsl(var(--luxury-charcoal-light))",
				"luxury-bronze": "hsl(var(--luxury-bronze))",
				"luxury-pearl": "hsl(var(--luxury-pearl))",
				cinema: {
					gold: 'hsl(var(--cinema-gold))',
					purple: 'hsl(var(--cinema-purple))',
					blue: 'hsl(var(--cinema-blue))',
					dark: 'hsl(var(--cinema-dark))',
					darker: 'hsl(var(--cinema-darker))'
				},
				seat: {
					available: 'hsl(var(--seat-available))',
					selected: 'hsl(var(--seat-selected))',
					occupied: 'hsl(var(--seat-occupied))'
				}
			},
			backgroundImage: {
				'gradient-cinema': 'var(--gradient-cinema)',
				'gradient-gold': 'var(--gradient-gold)',
				'gradient-purple': 'var(--gradient-purple)',
				"gradient-luxury": "var(--gradient-luxury)",
				"gradient-burgundy": "var(--gradient-burgundy)",
				"gradient-elegant": "var(--gradient-elegant)",
			},
			boxShadow: {
				'cinema': 'var(--shadow-cinema)',
				'gold': 'var(--shadow-gold)',
				"luxury": "var(--shadow-luxury)",
				"burgundy": "var(--shadow-burgundy)",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
