# CreatorPlan

**Your strategic companion on the journey to 10,000 subscribers—and the real opportunities that follow.**

![CreatorPlan - Laravel + shadcn/ui + InertiaJS](https://raw.githubusercontent.com/mahmudz/laravel-shadcn-app-panel/main/public/repository-cover.png)

---

## The Vision

Reaching 10,000 subscribers on YouTube isn’t just a number. It’s the moment everything changes.

When you hit 10K, you unlock YouTube Partner Program monetization. You gain access to real cashflow from ads, memberships, and Super Chat. Brands start reaching out for sponsorships. Your content becomes a business, not just a hobby.

But here’s the truth: most creators never make it to 10K. They post inconsistently, chase trends without strategy, and burn out before they see results.

**CreatorPlan exists to make sure you’re not one of them.**

This tool walks with you through every phase of your growth journey. It helps you build a clear strategy, plan your content systematically, and track the metrics that actually matter. Think of it as your strategic workspace—the place where you transform from someone who posts videos into a creator who builds a sustainable YouTube business.

When climbing a mountain, getting to the top is the goal. CreatorPlan is your map, your compass, and your progress tracker all in one.

---

## What This Tool Does For You

### 1\. **Defines Your Growth Strategy**

You’ll answer the questions that separate successful creators from everyone else:

- Who exactly is your audience?
- What problem do you solve for them?
- What are your core content pillars?
- How will you balance long-form content with Shorts?

Your strategy becomes your north star. Every video you create should work toward this plan.

### 2\. **Plans Your Content 12 Weeks Ahead**

Stop scrambling for video ideas the night before you need to film. Use the content calendar to:

- Map out titles and topics for the next quarter
- Schedule upload dates strategically
- Track production status from planning to publishing
- Organize SEO keywords for discoverability

When you plan ahead, you create momentum. Momentum builds audiences.

### 3\. **Tracks Your Progress With Real Metrics**

Record your KPIs monthly:

- Subscriber count (your path to 10K)
- Average retention rate (are people watching?)
- Total watch hours (the algorithm’s favorite metric)
- Notes on what’s working and what isn’t

You can’t improve what you don’t measure. This dashboard shows you exactly where you stand and what needs to change.

### 4\. **Guides You Through Monetization Phases**

CreatorPlan recognizes three distinct phases of growth:

- **Phase 1: 0–10K subscribers** — Build your foundation and reach monetization
- **Phase 2: 10K–100K subscribers** — Scale your content and revenue streams
- **Phase 3: 100K+ subscribers** — Establish yourself as a major creator

Each phase requires different strategies. The tool shows you which phase you’re in and what milestone comes next.

### 5\. **Keeps Everything In One Place**

Your strategy, your calendar, your metrics—all scoped to your account. Access it from your desktop while you’re planning or from your phone when inspiration strikes.

---

## The Opportunity Waiting At 10K

Here’s what unlocks when you reach your first 10,000 subscribers:

**💰 Ad Revenue**  
Your videos start generating passive income through YouTube’s Partner Program. Every view becomes potential cashflow.

**🤝 Sponsorship Deals**  
Brands actively seek creators with engaged audiences of 10K+. A single sponsored video can earn $500–$2,000 or more.

**👥 Community Features**  
Unlock memberships, Super Chat, and other tools that let your biggest fans support you directly.

**📈 Algorithm Boost**  
YouTube’s algorithm favors channels that demonstrate consistent growth and engagement. Crossing 10K signals you’re worth promoting.

**🎯 Career Options**  
You’re no longer just a hobbyist. You’re a content entrepreneur with real business opportunities.

The journey to 10K is challenging. But it’s the most important milestone in your creator career. Everything you build after becomes easier because you’ve proven you can grow an audience and keep them engaged.

---

## Technologies

This template combines powerful modern technologies to deliver a seamless creator experience:

- [**Laravel 11**](https://laravel.com/docs/) \- Robust PHP framework for the backend API
- [**shadcn/ui**](https://ui.shadcn.com/docs) \- Beautiful, accessible UI components
- [**InertiaJS**](https://inertiajs.com/) \- Modern monolith architecture connecting Laravel and React
- [**React 18 with TypeScript**](https://react.dev/) \- Type-safe, component-based frontend
- [**Tailwind CSS**](https://tailwindcss.com/) \- Utility-first styling framework
- [**Laravel Sanctum**](https://laravel.com/docs/sanctum) \- API authentication
- [**Laravel Socialite**](https://laravel.com/docs/socialite) \- Google OAuth integration
- **PostgreSQL or MySQL** \- Reliable data persistence

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **PHP >= 8.2**
- **Composer** (for PHP package management)
- **Node.js & npm** (for frontend dependencies)
- **MySQL or PostgreSQL** ([compatible database](https://laravel.com/docs/11.x/database#configuration))
- **Google OAuth credentials** (for authentication)

---

## Installation

Follow these steps to get CreatorPlan running on your local machine:

### 1\. Clone the repository

```bash
git clone https://github.com/yourusername/creatorplan.git
cd creatorplan

```

### 2\. Install PHP dependencies

```bash
composer install

```

### 3\. Configure environment

```bash
cp .env.example .env
php artisan key:generate

```

Update your `.env` file with:

- Database credentials (DB\_DATABASE, DB\_USERNAME, DB\_PASSWORD)
- Google OAuth client ID and secret (GOOGLE\_CLIENT\_ID, GOOGLE\_CLIENT\_SECRET)
- App URL and frontend URL
- Session and cache configuration

### 4\. Run database migrations

```bash
php artisan migrate

```

### 5\. (Optional) Seed the database

```bash
php artisan db:seed

```

### 6\. Install frontend dependencies and build

For development:

```bash
npm install && npm run dev

```

For production:

```bash
npm install && npm run build

```

### 7\. Start the development server

```bash
php artisan serve

```

Access the application in your browser at `http://localhost:8000` by default.

---

## Project Structure

```
creatorplan/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── StrategyController.php
│   │   │   ├── ContentCalendarController.php
│   │   │   ├── KpiController.php
│   │   │   └── DashboardController.php
│   │   └── Requests/
│   │       ├── StrategyRequest.php
│   │       ├── ContentCalendarRequest.php
│   │       └── KpiRequest.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Strategy.php
│   │   ├── ContentCalendar.php
│   │   └── Kpi.php
│   └── Services/
├── database/
│   ├── migrations/
│   │   ├── create_users_table.php
│   │   ├── create_strategies_table.php
│   │   ├── create_content_calendar_table.php
│   │   └── create_kpis_table.php
│   └── seeders/
├── routes/
│   ├── web.php
│   └── api.php
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   │   ├── ui/ (shadcn components)
│   │   │   ├── Dashboard/
│   │   │   ├── Strategy/
│   │   │   ├── ContentCalendar/
│   │   │   └── KPI/
│   │   ├── Pages/
│   │   │   ├── Auth/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Strategy.tsx
│   │   │   ├── ContentCalendar.tsx
│   │   │   └── KPIs.tsx
│   │   ├── types/
│   │   └── app.tsx
│   └── views/
├── public/
├── .env.example
├── package.json
├── composer.json
└── README.md

```

---

## Core Features

### Authentication System

- Google sign-in and sign-up using Laravel Socialite
- Session management with Laravel Sanctum
- Protected routes on both frontend and backend
- User data scoped to authenticated accounts

### Growth Strategy Editor

Build your five-step framework:

- Define your target audience
- Identify the problem you solve
- Establish content pillars
- Set your long-form vs Shorts mix
- Save and update your strategy anytime

### 12-Week Content Calendar

Plan your content systematically:

- Week-by-week video planning
- Title and topic organization
- Upload date scheduling
- Format selection (Long-form or Shorts)
- Status tracking (Planned → Filming → Editing → Scheduled → Published)
- SEO keyword management

### Monthly KPI Tracking

Monitor your growth metrics:

- Subscriber count progression
- Average retention rate
- Total watch hours
- Monthly notes and observations
- Historical data visualization

### Dashboard Overview

See everything at a glance:

- Current monetization phase with progress
- Next subscriber milestone
- Upcoming content (next 4 weeks)
- Latest KPI summary
- Quick navigation to all sections

### Responsive Design

- Mobile-first approach using Tailwind CSS
- Touch-friendly interfaces
- Desktop-optimized layouts
- Seamless experience across all devices

---

## API Endpoints

### Authentication

- `POST /api/auth/google` \- Initiate Google OAuth
- `POST /api/auth/callback` \- Handle OAuth callback
- `POST /api/auth/logout` \- Log out user
- `GET /api/auth/user` \- Get authenticated user

### Strategy

- `GET /api/strategy` \- Fetch user’s strategy
- `POST /api/strategy` \- Create strategy
- `PUT /api/strategy/{id}` \- Update strategy

### Content Calendar

- `GET /api/content-calendar` \- Fetch all entries
- `POST /api/content-calendar` \- Create entry
- `PUT /api/content-calendar/{id}` \- Update entry
- `DELETE /api/content-calendar/{id}` \- Delete entry

### KPIs

- `GET /api/kpis` \- Fetch all KPI records
- `POST /api/kpis` \- Create KPI entry
- `PUT /api/kpis/{id}` \- Update KPI
- `DELETE /api/kpis/{id}` \- Delete KPI

### Dashboard

- `GET /api/dashboard` \- Fetch aggregated dashboard data

---

## Database Schema

### users

- `id` \- Primary key
- `name` \- User’s full name
- `email` \- Email address
- `google_id` \- Google OAuth identifier
- `avatar` \- Profile picture URL
- `created_at`, `updated_at`

### strategies

- `id` \- Primary key
- `user_id` \- Foreign key to users
- `audience` \- Target audience description
- `audience_problem` \- Problem you solve
- `content_pillars` \- JSON array of content themes
- `longform_percentage` \- Percentage of long-form content
- `shorts_percentage` \- Percentage of Shorts content
- `created_at`, `updated_at`

### content\_calendar

- `id` \- Primary key
- `user_id` \- Foreign key to users
- `week_number` \- Week 1-12
- `title` \- Video title
- `topic` \- Video topic/theme
- `upload_date` \- Scheduled upload date
- `format` \- Long-form or Shorts
- `status` \- Planned, Filming, Editing, Scheduled, Published
- `seo_keywords` \- JSON array of keywords
- `created_at`, `updated_at`

### kpis

- `id` \- Primary key
- `user_id` \- Foreign key to users
- `month` \- Month (1-12)
- `year` \- Year
- `subscribers` \- Total subscriber count
- `retention_rate` \- Average retention percentage
- `watch_hours` \- Total watch hours
- `notes` \- Monthly observations
- `created_at`, `updated_at`

---

## Deployment

### Backend (Laravel)

Deploy to any PHP hosting platform:

- **Laravel Forge** \- Automated deployment and server management
- **DigitalOcean App Platform** \- Simple PaaS deployment
- **AWS Elastic Beanstalk** \- Scalable cloud hosting
- **Heroku** \- Quick deployment with add-ons

Configure your production `.env` with:

- Production database credentials
- Google OAuth production settings
- Proper APP\_URL and session configuration
- Cache and queue drivers

### Frontend (Inertia + React)

Build the production assets:

```bash
npm run build

```

Inertia serves the frontend through Laravel, so deploy both together. Ensure your web server (Nginx/Apache) is configured to route all requests through Laravel’s `public/index.php`.

---

## Usage

### Getting Started as a Creator

1. **Sign in with Google** \- Access your personal workspace
2. **Define your strategy** \- Answer the five key questions about your channel
3. **Plan your content** \- Fill out your 12-week calendar with video ideas
4. **Track your metrics** \- Log your KPIs monthly to monitor growth
5. **Review your dashboard** \- Check your progress and upcoming content

### Best Practices

- Update your content calendar every Sunday for the week ahead
- Log your KPIs on the first day of each month
- Review your strategy quarterly and adjust based on what’s working
- Use the status tracking to stay organized during production
- Add detailed SEO keywords to improve discoverability

---

## Customization

This template is designed to be customized for your specific needs:

- Modify the monetization phase thresholds in the dashboard logic
- Add custom KPI metrics that matter to your niche
- Extend the content calendar with additional fields
- Integrate with YouTube API for automated data sync
- Add collaboration features for team-based channels

Feel free to adapt CreatorPlan to fit your unique creator journey!

---

## Contributing

This project welcomes contributions from the creator community. If you have ideas to make CreatorPlan even better:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License - Use this tool to build your YouTube business.

---

## Contact

If you have questions, feedback, or support requests, reach out:

**Email:** [your-email@example.com](mailto:your-email@example.com)  
**GitHub:** [github.com/yourusername/creatorplan](https://github.com/yourusername/creatorplan)

---

## Your Journey Starts Now

You have the tool. You have the plan. Now it’s time to execute.

Map out your strategy. Fill your content calendar. Track your progress every month. Stay consistent, stay focused, and watch your subscriber count climb.

When you hit 10,000 subscribers, you’ll look back at this moment and realize: this was when everything changed.

**Let’s build your YouTube business together.**

---

**Built for creators who are serious about growth.**  
**CreatorPlan - Your path to 10K and beyond.**