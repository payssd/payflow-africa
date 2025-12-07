# PayFlow Africa Landing Page - Design Guidelines

## Design Approach
**System:** Dark-themed custom design with modern SaaS aesthetics, drawing inspiration from platforms like Stripe, Vercel, and Linear for dark UI patterns.

## Core Design Principles
- **Dark elegance**: Rich dark backgrounds with gradient accents and glowing effects
- **Glassmorphism**: Frosted glass effects with subtle borders and transparency
- **Premium feel**: Shadows, glows, and sophisticated animations throughout
- **Motion-forward**: Smooth, purposeful animations that enhance rather than distract

## Typography System
- **Headings**: Bold, large-scale typography (64px hero, 48px sections, 32px subsections)
- **Body**: Clean, readable sans-serif at 16-18px
- **Accent text**: Gradient text effects on key headlines
- **Hierarchy**: Strong contrast between heading sizes for clear content structure

## Layout & Spacing
**Spacing primitives**: Tailwind units of 4, 8, 12, 16, 20, 24, 32
- Sections: py-20 to py-32 for generous breathing room
- Component padding: p-8 to p-12
- Card spacing: gap-8 for grids
- Consistent vertical rhythm throughout

## Color Palette
- **Backgrounds**: Rich dark grays (#0a0a0a, #111, #1a1a1a)
- **Accents**: Vibrant gradients (purple-to-blue, cyan-to-purple)
- **Borders**: Subtle glowing borders with gradient effects
- **Text**: White primary, gray-400 secondary, gradient for emphasis
- **Glassmorphism**: Semi-transparent backgrounds with blur effects

## Component Library

### Hero Section
- Full viewport height (min-h-screen)
- Animated gradient background with floating particles/blobs
- Large headline (64px+) with gradient text treatment
- Dual CTA buttons: Primary "Start Free Trial" + Secondary "Book Demo"
- Hero illustration/graphic on right side showing payroll automation concept
- Buttons with blurred backgrounds when over animated elements

### Feature Cards
- 8 feature cards in 2-3-3 grid (2 cols mobile, 3 cols tablet, 4 cols desktop)
- Glassmorphism effect with frosted backgrounds
- Glowing borders on hover
- Icon at top, title, short description
- Subtle scale animation on hover
- Features: Automated Payroll, HR Dashboard, Employee Dashboard, Payslip Generation, CSV Upload, Departments & Permissions, Compliance, Flutterwave Billing

### How It Works Section
- 3-step horizontal timeline on desktop, stacked on mobile
- Large icons representing each step
- Connecting lines/arrows between steps
- Cards with glassmorphism treatment
- Steps: Create Company Account → Add Employees/Upload CSV → Run Payroll & Generate Payslips

### Dashboard Preview Section
- 3 preview cards (Company, HR, Employee dashboards)
- Mock dashboard screenshots/illustrations
- 3D tilt effect on hover using transform
- Subtle shadow and glow effects
- Side-by-side on desktop, stacked on mobile

### Pricing Section
- Monthly/Yearly toggle switch with smooth transition
- 3 pricing tiers in equal-width columns
- Featured/recommended plan with highlighted border
- Glassmorphic cards with gradient accents
- Clear feature lists with checkmarks
- "14-day free trial" badge prominently displayed
- CTA buttons at bottom of each plan

### FAQ Section
- Accordion-style with 6-8 common questions
- Smooth expand/collapse animations
- Plus/minus icon rotation on toggle
- Dark cards with subtle borders
- Questions about trial, pricing, compliance, data security, employee limits, CSV format, support, African compliance

### Footer
- Dark background with subtle gradient
- 4-column layout (desktop), stacked (mobile)
- PayFlow Africa logo and tagline
- Quick links: Product, Pricing, Resources, Company
- Social media icons with hover glow effect
- Copyright and legal links at bottom

## Animations & Interactions
**Framer Motion implementation:**
- Fade-in on scroll for sections (stagger children)
- Slide-up animations for cards entering viewport
- Hover scale (1.05) on interactive cards
- Subtle floating/bobbing animation on hero illustration
- Smooth page transitions
- Button hover: scale + glow effect
- Dashboard preview: 3D tilt on mouse move

## Images
- **Hero image**: Large illustration showing African business professionals using payroll software, vibrant but dark-themed, positioned on right side of hero
- **Dashboard previews**: 3 mock dashboard screenshots showing Company view (analytics), HR view (employee management), Employee view (payslip/profile)
- All images should have subtle glow/shadow effects to integrate with dark theme

## Responsive Behavior
- **Mobile** (< 768px): Single column, stacked sections, reduced text sizes
- **Tablet** (768-1024px): 2-column grids, moderate spacing
- **Desktop** (> 1024px): Full multi-column layouts, maximum spacing, 3D effects enabled

## Accessibility
- High contrast text (white on dark backgrounds)
- Interactive elements with clear focus states
- Keyboard navigation for all interactive components
- Smooth scroll behavior with reduced motion respect

This landing page should feel premium, modern, and trustworthy—positioning PayFlow Africa as a sophisticated, Africa-focused payroll solution with enterprise-grade capabilities.