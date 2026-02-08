WalkJournal is a personal walking log built to track treadmill and outdoor sessions, visualize progress, and keep a running history in a private database.

## Features
- Add walking sessions with duration, distance, steps and calories
- Total stats dashboard plus current-week stats with last-week comparisons
- Latest walk summary
- Distance trend chart (weekly/monthly)
- Year heatmap for daily distance
- Journey progress section with map and route legs

## Tech Stack

- **Next.js** (App Router)
- **React + TypeScript**
- **Tailwind CSS** for styling
- **Drizzle ORM** with **SQLite Cloud** for data storage
- **Chart.js** for bar charts and heatmaps
- **Leaflet** for the journey/progress map


## Getting Started

### Prerequisites
- Node.js 18+ recommended
- A SQLite Cloud database

### Database Setup
1. Create a SQLite Cloud database named `walkjournal.db`.
2. Run the schema in [db/schema.sql](db/schema.sql) to create `walk_sessions` and `goals` tables.
3. Import the data in [data/goals.csv](data/goals.csv) into the `goals` table.

### Environment Variables
Create a `.env.local` file in the project root:

```
SQLITE_CLOUD_CONNECTION_STRING=your_sqlite_cloud_connection_string
```

### Install and Run
```
npm install
npm run dev
```

Open http://localhost:3000 to view the app.

## Project Notes
- This project is built for personal use and portfolio learning.
- There is no public deployment at the moment.

## Contributing
This is a personal project, but feedback and suggestions are welcome.
