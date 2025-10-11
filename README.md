# Task List

This project was built with **Next.js 15**, **React 19**, **TailwindCSS**, **Shadcn**, and **TypeScript**. It includes automated testing using **Cypress** and follows the **Test-Driven Development** (TDD) methodology.

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.4
- **Language**: TypeScript 5.9.3
- **UI Library**: React 19.2.0
- **Styling**: TailwindCSS 3.4.18 + Shadcn UI
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma 6.17.1
- **Testing**: Cypress 15.4.0
- **Icons**: Lucide React

## 📋 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun
- PostgreSQL database (Supabase recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-list
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
```bash
# Copy the example file
copy .env.example .env

# Edit .env with your Supabase credentials
```

4. Generate Prisma Client:
```bash
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🗄️ Database Configuration

This project uses **Prisma** with **Supabase** PostgreSQL database.

### Environment Variables

Your `.env` file should contain:

```env
# Supabase Database URLs
DATABASE_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-REGION.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-REGION.pooler.supabase.com:6543/postgres"

# Node Environment
NODE_ENV=development

# Supabase Project (optional)
SUPABASE_URL="https://PROJECT_REF.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
```

**Important:** Replace `PROJECT_REF`, `PASSWORD`, and `REGION` with your actual Supabase credentials.

### Prisma Commands

```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# View database in Prisma Studio
npx prisma studio

# Run migrations (development)
npx prisma migrate dev

# Apply migrations (production)
npx prisma migrate deploy

# Check migration status
npx prisma migrate status
```

For detailed database setup instructions, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).

## 🧪 Testing with Cypress

This project uses **Cypress 15.4.0** for component and E2E testing.

### Run Tests

```bash
# Open Cypress UI (interactive mode)
npm run cypress:open

# Open Component Testing directly
npm run cypress:component

# Open E2E Testing directly
npm run cypress:e2e

# Run all component tests (headless)
npm test

# Run all tests in CI mode
npm run cypress:run
```

### Test Coverage

- ✅ **Component Tests**: Button, TaskForm, TaskItem, TaskList, CanvasInput, ActionBar
- ✅ **Hook Tests**: useMobileDetection, useTaskManager
- ✅ **Helper Tests**: getStyledText
- ✅ **E2E Tests**: Complete task management flow

For detailed testing documentation, see [CYPRESS_GUIDE.md](./CYPRESS_GUIDE.md).

## 🏗️ Build and Deploy

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Deployment

The application is deployed on Vercel:

**Live URL:** [https://task-list-6kisxc2m5-liamr0s-projects.vercel.app/](https://task-list-6kisxc2m5-liamr0s-projects.vercel.app/)

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint

# Database
npx prisma generate      # Generate Prisma Client
npx prisma studio        # Open Prisma Studio
npx prisma migrate dev   # Run migrations (dev)

# Testing
npm run cypress:open     # Open Cypress UI
npm run cypress:component # Component tests
npm run cypress:e2e      # E2E tests
npm test                 # Run component tests (headless)
```