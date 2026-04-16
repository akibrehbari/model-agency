# SEO Setup for Cuhvet

## Overview
This document outlines all SEO optimizations implemented for cuhvet.com.

## 1. Meta Tags & Title
- **Title**: "Cuhvet | Get Seen. Get Paid"
- **Description**: Optimized for conversions with key benefits and earnings potential
- **Keywords**: 13 targeted keywords covering modeling, content creation, and career growth
- **Canonical URL**: Set to https://cuhvet.com

## 2. Open Graph (Facebook/LinkedIn)
- Title, description, and image optimized for social sharing
- OG image: `/og-image.jpg` (1200x630px recommended)
- Proper siteName and locale settings

## 3. Twitter Cards
- Summary large image card type
- Twitter handle: @cuhvet
- Optimized title and description for Twitter sharing

## 4. Structured Data (JSON-LD)

### Organization Schema (`layout.tsx`)
- Company name, URL, logo
- Contact information
- Social media profiles
- Contact point for customer service

### Website Schema (`page.tsx`)
- Site name and description
- Search action for better search integration

### Service Schema (`page.tsx`)
- Service type: Modeling Agency
- Area served: US
- Detailed service description
- Pricing information

### BreadcrumbList Schema (`page.tsx`)
- Navigation hierarchy for search engines
- All main sections linked

### FAQ Schema (`faq-section.tsx`)
- All 8 FAQ questions and answers
- Structured for Google's FAQ rich results
- Increases chances of appearing in featured snippets

### HowTo Schema (`how-it-works.tsx`)
- Step-by-step process schema
- 4 steps from application to earning
- Eligible for rich snippets in search results

### Review Schema (`testimonials-section.tsx`)
- Aggregate rating: 4.9/5
- Individual reviews from models
- Helps with trust signals in search results

## 5. Sitemap
- **File**: `src/app/sitemap.ts`
- Dynamic sitemap generation via Next.js
- All main sections included with priorities
- Change frequencies set appropriately

## 6. Robots.txt
- **Files**: `public/robots.txt` and `src/app/robots.ts`
- Allows all crawlers
- Blocks admin and API routes
- Sitemap reference included

## 7. PWA Manifest
- **File**: `public/manifest.json`
- App name and short name
- Theme colors matching brand
- Icon configurations (192x192 and 512x512)

## 8. Additional SEO Features
- Mobile-friendly viewport settings
- Apple mobile web app meta tags
- Theme color for browser chrome
- Proper language attribute (en)
- Google verification meta tag placeholder

## Next Steps

### Required Actions:
1. **Create OG Image**: Add `/public/og-image.jpg` (1200x630px) with Cuhvet branding
2. **Create Icons**: Add `/public/icon-192.png` and `/public/icon-512.png`
3. **Create Logo**: Add `/public/logo.png` for structured data
4. **Google Search Console**: 
   - Verify ownership
   - Replace `your-google-verification-code` in `layout.tsx`
   - Submit sitemap
5. **Update Social Handles**: Verify and update social media URLs if different
6. **Analytics**: Consider adding Google Analytics or similar

### Optional Enhancements:
- Add blog section for content marketing
- Create separate pages for better URL structure
- Add more location-specific content for local SEO
- Implement hreflang tags if targeting multiple countries
- Add video schema for testimonial videos
- Create a press/media kit page

## Testing
- Test structured data: https://search.google.com/test/rich-results
- Test mobile-friendliness: https://search.google.com/test/mobile-friendly
- Check page speed: https://pagespeed.web.dev/
- Validate sitemap: https://www.xml-sitemaps.com/validate-xml-sitemap.html

## Performance Tips
- Optimize images (WebP format, proper sizing)
- Enable Next.js image optimization
- Use proper caching headers
- Consider CDN for static assets
- Minimize JavaScript bundle size
