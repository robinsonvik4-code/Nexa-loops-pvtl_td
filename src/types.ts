export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  category: 'content' | 'shoots' | 'tech' | 'growth' | 'design';
  icon: string;
  popular?: boolean;
}

export interface ReelItem {
  id: string;
  title: string;
  category: 'Fashion' | 'Jewellery' | 'Real Estate' | 'Beauty' | 'Products' | 'Business Promotions';
  description: string;
  thumbnail: string;
  videoUrl: string;
  tag: string;
  duration?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  industry: 'FASHION' | 'JEWELLERY' | 'REAL ESTATE' | 'PRODUCT' | 'WEBSITES' | 'SOCIAL MEDIA';
  service: string;
  description: string;
  image: string;
  tags: string[];
}

export interface BtsItem {
  id: string;
  title: string;
  category: string;
  description: string;
  setupDetails: string;
  gear: string;
  image: string;
}

export interface ProductShootBtsItem {
  id: string;
  title: string;
  clientCategory: string;
  btsImage: string;
  finalImage: string;
  setupNotes: string[];
  finalResultNotes: string[];
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export interface LeadFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  brandName: string;
  service: string;
  budgetRange: string;
  startTime: string;
  message: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Process & Timelines' | 'Pricing & Commercials' | 'Partnership & Rights';
  highlight?: string;
}

