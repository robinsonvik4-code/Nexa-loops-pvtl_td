import {
  ServiceItem,
  ReelItem,
  ProjectItem,
  BtsItem,
  ProductShootBtsItem,
  BeforeAfterItem,
  FaqItem
} from '../types';

export const COMPANY_CONTACT = {
  name: 'Nexa Loops',
  phone: '+91 75999 93336',
  rawPhone: '917599993336',
  email: 'nexaloopofficial@gmail.com',
  location: 'Dauhrra Mafi, Aligarh, Uttar Pradesh, India',
  tagline: 'INNOVATE. CONNECT. ELEVATE.',
  defaultWhatsAppMessage: 'Hi Nexa Loops, I visited your website and would like to discuss a project.'
};

export const getWhatsAppUrl = (customMessage?: string) => {
  const msg = customMessage || COMPANY_CONTACT.defaultWhatsAppMessage;
  return `https://wa.me/${COMPANY_CONTACT.rawPhone}?text=${encodeURIComponent(msg)}`;
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    shortDesc: 'Strategic grid curation, community growth, daily engagement, and targeted algorithm optimization.',
    category: 'growth',
    icon: 'Share2',
    popular: true
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    shortDesc: 'High-impact brand storytelling, carousel narratives, viral scripts, and trend-focused visual assets.',
    category: 'content',
    icon: 'Sparkles',
    popular: true
  },
  {
    id: 'reels-video-shorts',
    title: 'Reels / Video Shorts',
    shortDesc: 'Punchy 9:16 vertical video production engineered for retention, watch time, and conversion hooks.',
    category: 'content',
    icon: 'Film',
    popular: true
  },
  {
    id: 'product-photography',
    title: 'Product Photography',
    shortDesc: 'Studio-grade e-commerce, macro closeups, catalog shoots, and high-fashion luxury product staging.',
    category: 'shoots',
    icon: 'Camera'
  },
  {
    id: 'product-video-shoots',
    title: 'Product Video Shoots',
    shortDesc: 'Dynamic turntable rotations, liquid splashes, lighting transitions, and commercial 4K video ads.',
    category: 'shoots',
    icon: 'Video'
  },
  {
    id: 'brand-shoots',
    title: 'Brand Shoots',
    shortDesc: 'Full-scale lifestyle, editorial, and commercial lookbooks that define brand authority and status.',
    category: 'shoots',
    icon: 'Users',
    popular: true
  },
  {
    id: 'digital-advertising',
    title: 'Digital Advertising',
    shortDesc: 'High-ROI Meta, Google, and YouTube ad campaigns configured for lead generation and direct sales.',
    category: 'growth',
    icon: 'TrendingUp'
  },
  {
    id: 'website-development',
    title: 'Website Development',
    shortDesc: 'Bespoke, lightning-fast, high-converting digital storefronts and modern web experiences.',
    category: 'tech',
    icon: 'Globe',
    popular: true
  },
  {
    id: 'app-development',
    title: 'App Development',
    shortDesc: 'Native and cross-platform mobile experiences designed with intuitive UX and rock-solid architecture.',
    category: 'tech',
    icon: 'Smartphone'
  },
  {
    id: 'image-editing',
    title: 'Image Editing',
    shortDesc: 'Flawless skin retouching, color grading, frequency separation, and high-end commercial compositing.',
    category: 'design',
    icon: 'Sliders'
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    shortDesc: 'Rhythmic pacing, sound design, motion graphics, kinetic typography, and Hollywood-level grading.',
    category: 'content',
    icon: 'Scissors'
  },
  {
    id: 'branding-creative-design',
    title: 'Branding & Creative Design',
    shortDesc: 'Complete visual identity systems, logos, brand guidelines, packaging, and digital collateral.',
    category: 'design',
    icon: 'Palette'
  },
  {
    id: 'model-hiring-coordination',
    title: 'Model Hiring / Coordination',
    shortDesc: 'Talent casting, portfolio curation, stylist coordination, and on-set talent management.',
    category: 'shoots',
    icon: 'UserCheck'
  },
  {
    id: 'shoot-management',
    title: 'Shoot Management',
    shortDesc: 'End-to-end studio booking, lighting equipment logistics, crew coordination, and production schedules.',
    category: 'shoots',
    icon: 'ClipboardCheck'
  },
  {
    id: 'youtube-channel-management',
    title: 'YouTube Channel Management',
    shortDesc: 'Thumbnail optimization, retention editing, SEO titles, publishing strategy, and audience growth.',
    category: 'growth',
    icon: 'Tv'
  }
];

export const REELS_DATA: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'Luxe Emerald Diamond Collection',
    category: 'Jewellery',
    description: 'Macro 4K lighting tracking shot capturing facet reflections with dynamic speed-ramps and luxury sound design.',
    thumbnail: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=720&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-showing-a-diamond-ring-41221-large.mp4',
    tag: 'Macro 4K Luxury'
  },
  {
    id: 'reel-2',
    title: 'Cyber Midnight Streetwear Drop',
    category: 'Fashion',
    description: 'High-contrast studio shoot with neon rim lighting, fast-paced sync cuts, and directional model posing.',
    thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=720&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-neon-light-40742-large.mp4',
    tag: 'Streetwear Launch'
  },
  {
    id: 'reel-3',
    title: 'The Skyview Penthouse Walkthrough',
    category: 'Real Estate',
    description: 'Ultra-smooth cinematic gimbal motion tracking through floor-to-ceiling glass architecture with twilight mood.',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=720&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-modern-apartment-interior-41544-large.mp4',
    tag: 'Architectural Tour'
  },
  {
    id: 'reel-4',
    title: 'Botanical Hydration Serum Glow',
    category: 'Beauty',
    description: 'Crisp macro droplet captures, texture swatch spreads, and skin-tone true color graded transitions.',
    thumbnail: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=720&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-drops-of-liquid-falling-into-water-41804-large.mp4',
    tag: 'Skincare Formula'
  },
  {
    id: 'reel-5',
    title: 'Aura Minimalist Mechanical Watch',
    category: 'Products',
    description: 'Exploded component lighting, satin metal finish highlights, and subtle mechanical tick sound design.',
    thumbnail: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=720&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-watch-in-movement-41481-large.mp4',
    tag: 'Commercial Staging'
  },
  {
    id: 'reel-6',
    title: 'Genesis Tech SaaS Reveal',
    category: 'Business Promotions',
    description: 'Kinetic 3D typography, screen captures on glass mockup devices, and high-energy conversion pitch.',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=720&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-42981-large.mp4',
    tag: 'SaaS Viral Promo'
  }
];

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'p-1',
    title: 'Vanguard Royal Silk Collection',
    industry: 'FASHION',
    service: 'Brand Shoot & Reels Campaign',
    description: 'Comprehensive editorial lookbook and 18 vertical reels produced in studio with multi-angle diffusion and professional styling.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=80',
    tags: ['Editorial Lookbook', 'Studio Lighting', '18 Reels Produced']
  },
  {
    id: 'p-2',
    title: 'Kalyan Heritage Polki Ornaments',
    industry: 'JEWELLERY',
    service: 'Macro 4K Video & Stills',
    description: 'Dedicated macro turntable shoot highlighting 22K gold craftsmanship, uncompressed facet reflections, and social catalog cards.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&auto=format&fit=crop&q=80',
    tags: ['Macro Lens', 'Facet Lighting', 'E-Commerce Ready']
  },
  {
    id: 'p-3',
    title: 'The Sovereign Aligarh Residency',
    industry: 'REAL ESTATE',
    service: 'Cinematic Property Film & Web Showcase',
    description: 'Ultra-wide twilight drone footage, interior gimbal tracking, and a dedicated high-converting landing page for villa inquiries.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000&auto=format&fit=crop&q=80',
    tags: ['Drone 4K', 'Virtual Tour', 'Landing Page']
  },
  {
    id: 'p-4',
    title: 'Norden Minimalist Audio Gear',
    industry: 'PRODUCT',
    service: 'Commercial Product Video & Retouching',
    description: 'Monochromatic dark studio set with custom acrylic risers, acoustic splash effects, and razor-sharp macro details.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&auto=format&fit=crop&q=80',
    tags: ['Commercial Studio', 'Color Separation', 'Ad Creatives']
  },
  {
    id: 'p-5',
    title: 'Zenith Logistics Global Portal',
    industry: 'WEBSITES',
    service: 'Full-Stack Web Development & UI/UX',
    description: 'Dark-mode modern enterprise portal featuring instant rate calculator, interactive route map, and seamless lead capture.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
    tags: ['Next.js React', 'Interactive UI', 'Lead Capture Engine']
  },
  {
    id: 'p-6',
    title: 'Urban Bloom Organics Brand Growth',
    industry: 'SOCIAL MEDIA',
    service: 'Full Account Management & Production',
    description: '30-day organic content blitz: aesthetic grid design, carousel education, daily stories, and targeted local ad management.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
    tags: ['Grid Architecture', 'Meta Ads', 'Community Management']
  }
];

export const BTS_DATA: BtsItem[] = [
  {
    id: 'bts-1',
    title: 'Studio Lighting Setup',
    category: 'LIGHTING RIG',
    description: 'Balanced 3-point softbox overhead diffused grid with color-gel rim lights for seamless edge definition.',
    setupDetails: 'Profoto D2 strobes + Aputure 600d key with 150cm octabox and negative fill flags.',
    gear: 'Aputure Light Storm, C-Stands, Double-diffused Scrims',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'bts-2',
    title: 'Cinema Camera Rigging',
    category: 'CAMERA SETUP',
    description: 'Sony FX3 with cinema prime lenses mounted on DJI Ronin gimbal with wireless follow-focus and monitor feed.',
    setupDetails: '4K 120fps recording in 10-bit 4:2:2 S-Log3 for maximum grading latitude.',
    gear: 'Sony FX3, Sigma 24-70mm Art f/2.8, SmallRig Cage & Matte Box',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'bts-3',
    title: 'Model Direction & Posing',
    category: 'CREATIVE DIRECTION',
    description: 'Collaborative moodboard-driven pacing ensuring natural posture, genuine micro-expressions, and brand fit.',
    setupDetails: 'Live storyboard iPad synchronization so talent sees framing in real time.',
    gear: 'Direct communication, live music playlist, calibrated staging',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'bts-4',
    title: 'Monitor Review & Tethering',
    category: 'QUALITY CONTROL',
    description: 'Live Capture One tethering allows clients and creative directors to evaluate focus, color, and framing on 32" calibrated displays.',
    setupDetails: 'Instant color profile application matching brand palette prior to final signoff.',
    gear: 'Calibrated EIZO 4K Display, Tether Tools USB-C Cable',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'bts-5',
    title: 'Macro Product Positioning',
    category: 'STAGING & PROPS',
    description: 'Precision anti-static turntable, micro-levellers, and custom acrylic blocks eliminating stray dust and vibrations.',
    setupDetails: 'Automated 360-degree motorized turntable synchronized with camera shutter.',
    gear: 'Motorized Turntable, Polarizing Filters, Precision Tweezers',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'bts-6',
    title: 'On-Set Crew Collaboration',
    category: 'PRODUCTION FLOW',
    description: 'Seamless coordination between lighting technicians, prop stylists, makeup artists, and video operators.',
    setupDetails: 'Time-blocked production schedules ensuring zero dead time and maximum footage output.',
    gear: 'Wireless Comms, Production Checklists, Multi-zone Studio',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80'
  }
];

export const PRODUCT_SHOOT_BTS_DATA: ProductShootBtsItem[] = [
  {
    id: 'ps-1',
    title: 'Luxury Perfume Staging',
    clientCategory: 'FRAGRANCE & COSMETICS',
    btsImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    finalImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80',
    setupNotes: [
      'Dual optical spot snoots with honeycomb grids to isolate glass neck',
      'Black velvet light trap behind to deepen internal reflection',
      'Fine mist spray at 1/8000s strobe sync speed'
    ],
    finalResultNotes: [
      'Crystal clarity with zero dust or micro-scratches',
      'Golden liquid brilliance with radiant warm backlight',
      'Ready for high-end digital e-commerce and billboard prints'
    ]
  },
  {
    id: 'ps-2',
    title: 'Artisan Mechanical Timepiece',
    clientCategory: 'LUXURY ACCESSORIES',
    btsImage: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=800&auto=format&fit=crop&q=80',
    finalImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
    setupNotes: [
      'Circular polarizing filter eliminating dome crystal glare',
      'Macro 90mm f/2.8 lens focus-stacked across 14 exposures',
      'Custom brushed aluminium base with subtle shadow gradient'
    ],
    finalResultNotes: [
      'Every gear tooth and engraved numeral tack-sharp',
      'Satin titanium bezel highlights with organic contrast',
      'High-converting commercial hero asset'
    ]
  },
  {
    id: 'ps-3',
    title: 'Organic Botanical Skincare Jar',
    clientCategory: 'BEAUTY & WELLNESS',
    btsImage: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=800&auto=format&fit=crop&q=80',
    finalImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    setupNotes: [
      'Soft top-diffusion silk tent providing seamless white wrap-around',
      'Real botanical leaves placed at deliberate focal distances for depth',
      'Warm fill bounce card enriching wooden bamboo lid textures'
    ],
    finalResultNotes: [
      'Pure organic, clean aesthetic instilling immediate trust',
      'Natural depth-of-field drawing direct gaze to typography',
      'Optimized for Instagram Shop and Amazon A+ content'
    ]
  }
];

export const BEFORE_AFTER_DATA: BeforeAfterItem[] = [
  {
    id: 'ba-1',
    title: 'High-Fashion Editorial Retouching',
    category: 'Image Editing',
    description: 'Frequency separation preserving real pore texture while eliminating blemishes, balancing skin tones, and refining makeup contours.',
    beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80',
    afterImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=900&auto=format&fit=crop&q=80',
    beforeLabel: 'Raw Studio Capture',
    afterLabel: 'Commercial Retouch'
  },
  {
    id: 'ba-2',
    title: 'Architectural Real Estate Enhancement',
    category: 'Real Estate Editing',
    description: 'Replacing overcast dull skies with vibrant sunset gradients, lifting deep shadow interiors, and straightening optical lens distortion.',
    beforeImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&auto=format&fit=crop&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80',
    beforeLabel: 'Flat Daytime Exposure',
    afterLabel: 'HDR Twilight Luxury'
  },
  {
    id: 'ba-3',
    title: 'Commercial Product Color & Reflection Grading',
    category: 'Product Retouching',
    description: 'Stripping unwanted studio reflections, perfecting glass transparency, polishing edges, and aligning true brand Pantone shades.',
    beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80',
    afterImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=900&auto=format&fit=crop&q=80',
    beforeLabel: 'Unretouched Staging',
    afterLabel: 'Studio Mirror Polish'
  },
  {
    id: 'ba-4',
    title: 'Cinematic Atmosphere & Color Grade',
    category: 'Creative Enhancement',
    description: 'Transforming flat neutral video log profiles into rich, moody teal-and-orange cinematic looks with film grain and blooming highlights.',
    beforeImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=80',
    afterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=80',
    beforeLabel: 'Flat Camera Profile',
    afterLabel: 'Cinematic Color Grade'
  }
];

export const WORK_PROCESS = [
  {
    step: '01',
    name: 'DISCOVER',
    title: 'Understand the brand and goal.',
    desc: 'We dive deep into your market position, target demographics, aesthetic benchmarks, and primary conversion objectives.'
  },
  {
    step: '02',
    name: 'STRATEGY',
    title: 'Build the right content and marketing direction.',
    desc: 'Developing viral hooks, moodboards, technical specifications, and production timelines engineered specifically to drive leads.'
  },
  {
    step: '03',
    name: 'CREATE',
    title: 'Produce visuals, reels, websites and campaigns.',
    desc: 'High-end studio shoots, cinema camera operation, modern web engineering, and precision color grading bring the concept to life.'
  },
  {
    step: '04',
    name: 'LAUNCH',
    title: 'Publish and promote.',
    desc: 'Deployment of responsive digital experiences, scheduling optimized reels, and launching conversion-focused ad funnels.'
  },
  {
    step: '05',
    name: 'OPTIMIZE',
    title: 'Improve based on response and performance.',
    desc: 'Monitoring click-through rates, watch times, and form submissions to continually refine creative assets for higher ROI.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Process & Timelines',
    question: 'How long do reels, shoots, websites, or editing projects take?',
    answer: 'Turnaround depends on scope, shoot complexity, revision needs, media volume, and approval speed. We confirm the expected delivery schedule in writing before work begins so both sides have a clear timeline.',
    highlight: 'Timeline confirmed before project kickoff'
  },
  {
    id: 'faq-2',
    category: 'Process & Timelines',
    question: 'How does the revision and approval workflow work?',
    answer: 'Revision rounds and approval milestones are defined in the quotation or project scope. Feedback can be consolidated by the client so changes remain clear, traceable, and efficient.',
    highlight: 'Revision scope defined in your quotation'
  },
  {
    id: 'faq-3',
    category: 'Process & Timelines',
    question: 'Can Nexa Loops help with scripts, concepts, and creative direction?',
    answer: 'Yes. We can work from your existing brief or help develop concepts, hooks, scripts, shot direction, and content structure. The exact creative deliverables are agreed before production starts.',
    highlight: 'Flexible creative support based on scope'
  },
  {
    id: 'faq-4',
    category: 'Pricing & Commercials',
    question: 'How are projects priced?',
    answer: 'Pricing is based on the actual scope, production requirements, deliverables, locations, talent, editing effort, and ongoing management needs. One-time projects and recurring retainers are both available, with commercial terms confirmed in the approved quotation.',
    highlight: 'Scope-based quotations with clear deliverables'
  },
  {
    id: 'faq-5',
    category: 'Pricing & Commercials',
    question: 'Are studio, equipment, travel, and talent costs included?',
    answer: 'Included items vary by project. Your quotation will clearly state what is included and identify any external costs such as special locations, travel, props, models, or third-party rentals before approval.',
    highlight: 'Included and external costs stated before approval'
  },
  {
    id: 'faq-6',
    category: 'Pricing & Commercials',
    question: 'Can we start with a small pilot project?',
    answer: 'Yes. A smaller defined project can be a practical way to test the workflow before moving to a larger campaign or monthly retainer. We can suggest a suitable pilot after understanding your goal.',
    highlight: 'Pilot projects available when appropriate'
  },
  {
    id: 'faq-7',
    category: 'Partnership & Rights',
    question: 'Who owns the final assets and raw files?',
    answer: 'Usage rights, ownership of final deliverables, raw files, project files, licensed media, and third-party assets are defined in the quotation or agreement for each project. We do not rely on blanket ownership claims that may not fit every production.',
    highlight: 'Rights are defined project by project'
  },
  {
    id: 'faq-8',
    category: 'Partnership & Rights',
    question: 'Can you work with clients outside Aligarh?',
    answer: 'Yes. Many creative, editing, advertising, and web services can be managed remotely. Product-shoot logistics, travel, shipping, and live approvals can be planned based on the project requirements.',
    highlight: 'Remote collaboration supported'
  },
  {
    id: 'faq-9',
    category: 'Partnership & Rights',
    question: 'Can you sign an NDA for confidential projects?',
    answer: 'NDA requests can be discussed before confidential materials are shared. Any confidentiality obligations should be documented in a mutually approved agreement appropriate to the project.',
    highlight: 'NDA requests can be reviewed before sharing confidential material'
  }
];
