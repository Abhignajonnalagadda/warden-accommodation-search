# 🏠 Accommodation Search with Weather

A modern Next.js application for finding accommodations with real-time weather insights.

## 🚀 Features

- **Accommodation Search**: Find places to stay by name, city, or state
- **Real-time Weather**: Live weather data for each accommodation location
- **Smart Filtering**: Filter by temperature, humidity, weather conditions, and amenities
- **Responsive Design**: Mobile-first, beautiful UI with Tailwind CSS
- **Type Safety**: Full TypeScript integration
- **Modern Architecture**: Next.js 15 with App Router

## 🏗️ Architecture

This is a **full-stack Next.js application** that combines:
- **Frontend**: React 19 + Next.js 15 + TypeScript
- **Backend**: Next.js API Routes (no separate server needed)
- **Database**: MySQL with Prisma ORM
- **Styling**: Tailwind CSS v4

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MySQL database

### Installation

1. **Clone and navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Update DATABASE_URL in .env
   ```

4. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

5. **Run database migrations:**
   ```bash
   npx prisma db push
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```

7. **Visit the application:**
   ```
   http://localhost:3000
   ```

## 🗄️ Database

The application uses a MySQL database with the following main table:

### Properties Table
- **id**: Unique identifier
- **name**: Accommodation name
- **city, state, country**: Location information
- **lat, lng**: GPS coordinates for weather
- **isActive**: Availability status
- **tags**: JSON array of amenities
- **createdAt, updatedAt**: Timestamps

## 🌤️ Weather Integration

Real-time weather data is fetched from Open-Meteo API for each accommodation's coordinates, including:
- Temperature (°C)
- Humidity (%)
- Weather conditions (Clear, Cloudy, Rainy, etc.)

## 🔧 API Endpoints

- **`/api/properties`**: Get all properties (with optional search)
- **`/api/weather`**: Get weather data for specific coordinates

## 🎨 UI Components

- **Header**: App title and branding
- **PropertyFilters**: Search and filter controls
- **PropertyWeatherCard**: Individual accommodation display
- **PropertiesGrid**: Grid layout for results
- **LoadingState**: Loading indicators
- **ErrorState**: Error handling and retry

## 🚀 Deployment

This is a **single Next.js application** that can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

No separate backend server is needed!

## 🛠️ Development

- **`npm run dev`**: Start development server
- **`npm run build`**: Build for production
- **`npm run start`**: Start production server
- **`npm run lint`**: Run ESLint

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:
- Responsive grid layouts
- Touch-friendly interactions
- Mobile-optimized filters
- Adaptive weather displays

## 🔮 Future Enhancements

- User authentication and favorites
- Advanced filtering and sorting
- Weather forecasts (7-day)
- Map integration
- Booking functionality
