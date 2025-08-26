# Sonic Invoice

A music distribution platform for managing royalty calculations and invoice generation. This system allows users to track calculation progress for songs and issue invoices when appropriate.

## Features

- **Real-time Progress Tracking**: Monitor royalty calculation progress for each song
- **Invoice Generation**: Issue invoices with a single click, capturing current progress
- **Invoice History**: Complete timeline of all issued invoices with detailed information
- **Persistent Storage**: Invoice history persists across browser sessions using [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) + localStorage
- **Live Updates**: Automatic polling for progress updates every 30 seconds
- **Responsive UI**: Built with [Mantine](https://ui.mantine.dev/) components for a professional, modern interface

## Architecture

### Backend (Express.js)
- Express server
- RESTful API endpoint for songs data
- Simulated progress updates every 20 seconds
- CORS enabled for frontend communication

### Frontend (React + TypeScript)
- **Component Architecture**:
  - `SongsTable`: Displays songs with progress tracking and invoice actions
  - `InvoiceHistory`: Timeline view of all issued invoices with timestamps
  - `NotificationBanner`: Displays system notifications and errors
  - `Header`: Main navigation and application title
- **State Management**: Zustand for global state with persistence
- **UI Library**: Mantine v7 for professional, accessible components
- **Build Tool**: Vite for fast development and optimized builds

## Project Structure

```
royalty-processing/
├── backend/
│   ├── server.js           # Express server with songs endpoint
│   └── package.json        # Backend dependencies
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── SongsTable.tsx      # Main songs table component
    │   │   └── InvoiceHistory.tsx  # Invoice history timeline
    │   ├── api/
    │   │   └── songsApi.ts         # API service layer
    │   ├── store/
    │   │   └── invoiceStore.ts     # Zustand store for invoices
    │   ├── types.ts                # TypeScript interfaces
    │   ├── App.tsx                 # Main application component
    │   ├── main.tsx                # Entry point
    │   └── index.css               # Global styles
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## Setup Instructions

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

## Usage

1. **View Songs**: The main table displays all songs with their current calculation progress
2. **Issue Invoice**: Click the "Issue Invoice" button to create an invoice with the current progress
3. **View Invoice Details**: After issuing, see the timestamp and captured progress directly in the table row
4. **Track History**: The right panel shows a complete timeline of all issued invoices
5. **Progress Updates**: The system automatically fetches updated progress values every 30 seconds

## Technical Decisions

### State Management Pattern
- **Zustand** was chosen for its simplicity and built-in persistence middleware
- Invoice history is stored in localStorage for persistence across sessions
- Component state for UI-specific concerns (loading, notifications)

### UI/UX Considerations
- **Visual Progress Indicators**: Color-coded progress bars (red < 30%, yellow < 70%, green >= 70%)
- **Real-time Feedback**: Notifications on successful invoice creation
- **Progress Change Detection**: Visual indicators when progress has changed since last invoice
- **Responsive Design**: Works seamlessly on desktop and tablet devices

### Performance Optimizations
- Polling interval balanced between real-time updates and server load
- Memoization of expensive computations
- Efficient re-rendering with proper React patterns

## Production Considerations

For transitioning this MVP to production:

### Scalability
- Implement WebSocket connections for real-time updates instead of polling
- Add pagination for large song datasets
- Implement virtual scrolling for invoice history
- Use Redis for caching frequently accessed data

### Security
- Add authentication/authorization (JWT tokens)
- Implement rate limiting on API endpoints
- Add input validation and sanitization
- Use HTTPS in production
- Implement CSRF protection

### Data Management
- Replace in-memory data with proper database (PostgreSQL/MongoDB)
- Implement data versioning for invoice audit trails
- Add database migrations strategy
- Implement backup and recovery procedures

### Monitoring & Observability
- Add comprehensive logging (Winston/Pino)
- Implement error tracking (Sentry)
- Add performance monitoring (New Relic/DataDog)
- Create health check endpoints
- Implement distributed tracing

### Testing
- Unit tests for business logic (Jest)
- Integration tests for API endpoints (Supertest)
- Component testing (React Testing Library)
- E2E testing (Cypress/Playwright)
- Load testing for performance benchmarks

### Deployment
- Containerize with Docker
- Set up CI/CD pipeline (GitHub Actions/GitLab CI)
- Use environment variables for configuration
- Implement blue-green deployments
- Add CDN for static assets

### Additional Features
- Bulk invoice generation
- Export functionality (CSV/PDF)
- Advanced filtering and search
- Role-based access control
- Webhook notifications for external systems
- Analytics dashboard for business insights

## Notes

- The backend simulates progress updates every 20 seconds to demonstrate real-time capabilities
- Invoice data persists in browser localStorage - clearing browser data will reset history
- The system is designed as an MVP with clear paths for production enhancement

## Contact

If you have any questions or need clarification about the implementation, please feel free to reach out.