# 🏠 Accommodation Search with Weather

A modern Next.js full-stack application that helps users find accommodations based on real-time weather conditions. Built as an evaluation project for Warden, this app demonstrates modern web development practices with a focus on performance and user experience.

## 🚀 What This App Does

- **Smart Accommodation Search**: Find places to stay by name, city, or state
- **Live Weather Integration**: Real-time weather data from Open-Meteo API for each location
- **Intelligent Filtering**: Filter by temperature range, humidity, weather conditions, and amenities
- **Responsive Design**: Beautiful, mobile-first UI built with Tailwind CSS
- **Performance Optimized**: Server Components for fast initial loads and SEO

## 🏗️ Technical Architecture

### **Full-Stack Next.js Application**
- **Frontend**: React 19 + Next.js 15 + TypeScript
- **Backend**: Next.js API Routes (no separate server needed)
- **Database**: MySQL with Prisma ORM
- **Styling**: Tailwind CSS v4
- **Deployment**: Single application (frontend + backend unified)

### **Key Technical Decisions**
1. **Server Components**: Moved from client-side to server-side data fetching for better performance
2. **API Routes**: Consolidated backend logic into Next.js API routes instead of separate Express server
3. **Type Safety**: Full TypeScript integration with proper interfaces and type checking
4. **Modular Design**: Clean separation of concerns with dedicated directories for types, constants, utils, and components

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MySQL database

### Installation

1. **Clone and navigate to the project:**
   ```bash
   git clone <your-repo-url>
   cd warden-test-one
   ```

2. **Navigate to src directory:**
   ```bash
   cd src
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Update DATABASE_URL in .env with your MySQL connection string
   ```

5. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

6. **Set up database:**
   ```bash
   npx prisma db push
   ```

7. **Start development server:**
   ```bash
   npm run dev
   ```

8. **Visit the application:**
   ```
   http://localhost:3000
   ```

## 🗄️ Database Schema

The application uses a MySQL database with the following structure:

### Properties Table
- **id**: Unique identifier
- **name**: Accommodation name
- **city, state, country**: Location information (nullable)
- **lat, lng**: GPS coordinates for weather (nullable)
- **geohash5**: Geographic hash for location queries
- **isActive**: Availability status
- **tags**: JSON array of amenities (swimming-pool, gym, wifi, etc.)
- **createdAt, updatedAt**: Timestamps

## 🌤️ Weather Integration

Real-time weather data is fetched from Open-Meteo API for each accommodation's coordinates:

- **Temperature**: Current temperature in °C
- **Humidity**: Current relative humidity percentage
- **Weather Conditions**: Mapped from WMO weather codes:
  - Clear (code 0)
  - Cloudy (codes 1-3)
  - Drizzle (codes 51-57)
  - Rainy (codes 61-67, 80-82)
  - Snow (codes 71-77, 85-86)

## 🔧 API Endpoints

- **`/api/properties`**: Get all properties with optional search filtering
- **`/api/weather`**: Get weather data for specific coordinates (proxied from Open-Meteo)

## 🎨 UI Components

- **Header**: Clean app branding and title
- **PropertyFilters**: Interactive search and filter controls
- **PropertyWeatherCard**: Individual accommodation display with weather data
- **PropertiesGrid**: Responsive grid layout for results
- **ClientFilters**: Client-side filtering logic wrapper
- **LoadingState**: Beautiful loading indicators
- **ErrorState**: User-friendly error handling with retry options

## 🚀 Performance Features

### **Server Components**
- Data fetched server-side during rendering
- No loading spinners on initial page load
- Better SEO and Core Web Vitals
- Reduced client-side JavaScript bundle

### **Built-in Next.js Features**
- **`loading.tsx`**: Automatic loading UI
- **`error.tsx`**: Automatic error boundaries
- **API Routes**: Serverless backend functions
- **App Router**: Modern routing with nested layouts

## 🛠️ Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes to database
npx prisma studio    # Open Prisma Studio (database GUI)
```

## 📱 Responsive Design Features

- **Mobile-First**: Built with mobile users in mind
- **Collapsible Filters**: Filters collapse on mobile for better UX
- **Touch-Friendly**: Optimized for touch interactions
- **Adaptive Layouts**: Grid adjusts from 1 column (mobile) to 4 columns (desktop)
- **Smart Reset Button**: Only active when filters are applied

## 🔮 Technical Highlights

### **Problem Solving**
- **Weather Filter Logic**: Discovered and fixed critical issue where weather codes needed range-based filtering instead of exact matching
- **Type Safety**: Properly handled Prisma's nullable fields and JsonValue types
- **Performance**: Implemented Server Components for optimal data loading

### **Code Quality**
- **Modular Architecture**: Clean separation of concerns
- **Type Safety**: Full TypeScript integration
- **Error Handling**: Graceful error states and user feedback
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🚀 Deployment

This is a **single Next.js application** that can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- Any Node.js hosting platform

No separate backend server is needed - everything is contained within the Next.js app!

## 📝 Project History

This project evolved from:
1. **Initial State**: Separate Express backend + Next.js frontend
2. **Modularization**: Broke down monolithic components into reusable pieces
3. **UI Enhancement**: Implemented responsive, beautiful design with Tailwind CSS
4. **Backend Migration**: Moved all backend logic to Next.js API Routes
5. **Server Components**: Implemented server-side rendering for better performance
6. **Code Cleanup**: Removed duplicates, improved structure, enhanced t
