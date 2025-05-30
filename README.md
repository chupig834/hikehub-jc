# CSCI577a Project

A modern web application built with Next.js, featuring authentication, dashboard, and data visualization capabilities.

## Features

- **Authentication System**: Secure user authentication using NextAuth.js
- **Dashboard**: Interactive dashboard with data visualization
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Type Safety**: Full TypeScript support
- **Data Management**: MongoDB integration with Mongoose
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Framework**: Next.js 15
- **Frontend**: React 19, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Data Visualization**: Recharts
- **Form Handling**: React Hook Form
- **Type Safety**: TypeScript

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd csci577a
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── (dashboard)/    # Dashboard pages
│   └── explore/        # Explore section
├── components/         # Reusable components
├── lib/               # Utility functions
├── models/            # Database models
├── public/            # Static assets
└── utils/             # Helper functions
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
