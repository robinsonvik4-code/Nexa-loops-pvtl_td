export const LEAD_SERVICE_OPTIONS = [
  'Social Media Management',
  'Content Creation',
  'Reels / Shorts',
  'Product Shoot',
  'Brand Shoot',
  'Model Management',
  'Shoot Management',
  'Website Development',
  'App Development',
  'Digital Advertising',
  'Branding',
  'Video Editing',
  'Image Editing',
  'YouTube Management',
  'Other'
] as const;

export const LEAD_BUDGET_OPTIONS = [
  'Not sure / Discuss first',
  'Under ₹25,000',
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹2,50,000',
  '₹2,50,000+'
] as const;

export const LEAD_TIMELINE_OPTIONS = [
  'AS SOON AS POSSIBLE',
  'THIS WEEK',
  'THIS MONTH',
  'JUST EXPLORING'
] as const;

export const mapServiceToLeadOption = (serviceTitle: string): string => {
  const value = serviceTitle.trim().toLowerCase();

  if (value.includes('reel') || value.includes('short')) return 'Reels / Shorts';
  if (value.includes('product photography') || value.includes('product video') || value.includes('product shoot')) return 'Product Shoot';
  if (value.includes('brand shoot')) return 'Brand Shoot';
  if (value.includes('model')) return 'Model Management';
  if (value.includes('shoot management')) return 'Shoot Management';
  if (value.includes('website') || value === 'web') return 'Website Development';
  if (value.includes('app development') || value.includes('mobile app')) return 'App Development';
  if (value.includes('advert') || value.includes('ads')) return 'Digital Advertising';
  if (value.includes('branding') || value.includes('creative design')) return 'Branding';
  if (value.includes('video editing')) return 'Video Editing';
  if (value.includes('image editing') || value.includes('retouch')) return 'Image Editing';
  if (value.includes('youtube')) return 'YouTube Management';
  if (value.includes('social media')) return 'Social Media Management';
  if (value.includes('content creation') || value === 'content') return 'Content Creation';

  const exact = LEAD_SERVICE_OPTIONS.find((option) => option.toLowerCase() === value);
  return exact || 'Other';
};
