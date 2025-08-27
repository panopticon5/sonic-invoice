# Sonic Invoice

A music distribution platform for managing royalty calculations and invoice generation. This system allows users to track calculation progress for songs and issue invoices when appropriate.

## Features

- **Real-time Progress Tracking**: Monitor royalty calculation progress for each song
- **Invoice Management**: Issue and track invoices with progress snapshots
- **Responsive UI**: Built with [Mantine](https://mantine.dev/) for a modern, accessible interface
- **Persistent Storage**: Invoice history persists across sessions using Zustand + localStorage
- **Type Safety**: Built with TypeScript for better developer experience and code quality

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **State Management**: Zustand with persistence
- **UI Library**: Mantine v7
- **Testing**: Jest + React Testing Library
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with Express
- **API**: RESTful endpoints for song data
- **Development**: Automatic CORS configuration

## Project Structure

```
sonic-invoice/
├── backend/
│   ├── server.js          # Express server with songs endpoint
│   └── package.json       # Backend dependencies
│
└── frontend/
    ├── src/
    │   ├── components/    # React components
    │   │   ├── SongsTable.tsx      # Main songs table with progress tracking
    │   │   ├── InvoiceHistory.tsx  # Invoice timeline view
    │   │   ├── NotificationBanner.tsx # System notifications
    │   │   └── Header.tsx           # Application header
    │   │
    │   ├── store/         # State management
    │   │   └── invoiceStore.ts  # Zustand store for invoices
    │   │
    │   ├── tests/         # Test files
    │   │   ├── InvoiceStore.test.ts
    │   │   ├── InvoiceHistory.test.ts
    │   │   ├── NotificationBanner.test.ts
    │   │   └── SongsTable.test.ts
    │   │
    │   ├── api/           # API service layer
    │   ├── types.ts       # TypeScript type definitions
    │   ├── App.tsx        # Main application component
    │   ├── main.tsx       # Application entry point
    │   └── test-utils.tsx # Testing utilities
    │
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3001`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

## Testing

Run tests with:
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate test coverage
npm test -- --coverage
```

## Key Features

### Songs Management
- View all songs with current progress
- Track calculation progress with visual indicators
- Issue invoices for completed calculations

### Invoice System
- Create invoices with current progress snapshots
- View complete invoice history
- Track changes between invoice versions

### User Experience
- Real-time progress updates
- Responsive design for all screen sizes
- Intuitive interface with clear actions

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

### Code Style
- TypeScript for type safety
- Consistent component structure
- Comprehensive test coverage

## License

This project is licensed under the MIT License.