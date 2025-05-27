# 🎓 University Notification Aggregator

A high-performance, server-side rendered (SSR) web application built with **Next.js 15**, designed to aggregate and unify notifications published across multiple platforms such as WhatsApp, YouTube Live, university websites, and news channels.

## 🚀 Features

- 🔥 Fast SSR & Edge Rendering with Next.js 15
- 📱 Responsive UI (mobile-first design)
- 🌐 Unified notification feed from:
  - WhatsApp (via webhook/API/scraping)
  - YouTube Live Streams (YouTube Data API v3)
  - News channels (RSS feed or scraping)
  - University website (scraping or RSS)
- ⚡ Real-time update support via Webhooks/Sockets
- 🧠 Smart filtering by source
- 📅 Chronologically sorted timeline
- 🧩 Admin interface to monitor and manage data sources
- 🔒 Secure API routes with rate-limiting middleware
- 🧾 SEO-optimized pages with structured data (JSON-LD)

## 🧰 Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org)
- [React 18](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Prisma](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/) / [PlanetScale](https://planetscale.com/)
- [Redis / Upstash](https://upstash.com/) for caching
- [Cheerio](https://cheerio.js.org/) / [Puppeteer](https://pptr.dev/) for scraping
- [YouTube Data API v3](https://developers.google.com/youtube/v3)
- [Vercel Edge Functions](https://vercel.com/docs/functions/edge-functions) (for ultra-fast delivery)

## 🏗️ Local Development

### 1. Clone the repository
```bash
git clone https://github.com/your-username/university-notifier.git
cd university-notifier

```
2. Install dependencies
bash
Copy
Edit
npm install

4. Set up your environment variables
Create a .env.local file and populate the following:
```bash
env
Copy
Edit
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url
YOUTUBE_API_KEY=your_youtube_api_key
WHATSAPP_API_KEY=optional_if_applicable
```

4. Run the app locally
```bash
Copy
Edit
npm run dev
```
5. Build for production
```bash
Copy
Edit
npm run build
npm start
```
📦 Deployment
We recommend deploying this app to Vercel for full support of Next.js 15's features like App Router and Edge Functions.

🛡️ License
This project is licensed under the MIT License. See LICENSE for more info.

💡 Future Enhancements
Push notifications

Source health monitoring dashboard

AI-powered summarization of incoming notifications

Multilingual support

👨‍💻 Contributors
Your Name

Feel free to open an issue or submit a pull request! 🤝


