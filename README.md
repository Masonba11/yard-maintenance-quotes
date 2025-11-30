# Yard Maintenance Quotes

A production-ready lead-generation website for connecting homeowners with local yard maintenance professionals.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## Features

- ✅ 60 location pages (10 metro areas × 6 cities each)
- ✅ SEO-optimized with dynamic metadata and sitemap
- ✅ Lead capture forms with Web3Forms integration
- ✅ Responsive, mobile-first design
- ✅ Schema.org structured data
- ✅ Conversion tracking ready (GA4/Google Ads)
- ✅ Easy to add/remove cities via config files

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:
   Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
```

Get your Web3Forms access key from [https://web3forms.com](https://web3forms.com)

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Adding/Removing Locations

Edit `src/data/locations.ts` to add or remove cities. The format is:

```typescript
{
  state: 'State Name',
  stateSlug: 'state-slug',
  city: 'City Name',
  citySlug: 'city-slug',
  displayName: 'City, ST',
  isPrimary: true/false,
  metroArea: 'Metro Area Name',
}
```

Location pages are automatically generated at `/locations/[state]/[city]`.

### Modifying Services

Edit `src/data/services.ts` to add, remove, or modify services.

### Form Integration

1. **Web3Forms**: Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in your environment variables
2. **CRM Webhook**: Add your webhook URL in `src/components/LeadForm.tsx` (see TODO comments)
3. **Conversion Tracking**: Add GA4/Google Ads tracking code in `src/components/LeadForm.tsx` (see TODO comments)

### SEO Configuration

- Update `app/layout.tsx` for site-wide metadata
- Each location page has auto-generated SEO content
- Sitemap is automatically generated at `/sitemap.xml`
- Robots.txt is configured at `/robots.txt`

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── locations/         # Dynamic location pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── faq/               # FAQ page
│   └── ...
├── src/
│   ├── components/        # Reusable React components
│   │   ├── LeadForm.tsx   # Lead capture form
│   │   ├── Hero.tsx       # Hero section
│   │   └── ...
│   └── data/              # Configuration data
│       ├── locations.ts   # All location data
│       └── services.ts    # Service definitions
└── ...
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The project is configured for Vercel with:

- Automatic sitemap generation
- Static generation for all location pages
- Optimized builds

### Other Platforms

This is a standard Next.js project and can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- Self-hosted with Node.js

## Customization

### Branding

- Update colors in `tailwind.config.ts`
- Modify brand name in `app/layout.tsx` and throughout components
- Update logo/favicon as needed

### Content

- All marketing copy is in component files
- Location-specific content is auto-generated but can be customized in `app/locations/[state]/[city]/page.tsx`

## Next Steps

1. ✅ Set up Web3Forms API key
2. ✅ Configure CRM webhook (if needed)
3. ✅ Add GA4/Google Ads conversion tracking
4. ✅ Customize branding and colors
5. ✅ Add custom domain
6. ✅ Test form submissions
7. ✅ Set up analytics

## Support

For questions or issues, refer to the code comments marked with `TODO` for integration points.
