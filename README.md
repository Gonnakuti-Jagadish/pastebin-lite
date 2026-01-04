# Pastebin Lite

A Pastebin-like web application that allows users to create and share text pastes using a unique URL.  
Pastes can optionally expire based on time (TTL) or the number of views.

This project was built as part of a take-home assignment and focuses on backend correctness, persistence, and API design.

---

## Tech Stack

- **Next.js** (App Router)
- **Node.js** (via Next.js runtime)
- **PostgreSQL** (Neon)
- **Prisma ORM**
- **Vercel** (Deployment)

---

## Features

- Create a paste containing arbitrary text
- Generate a shareable URL for each paste
- View pastes via API or HTML page
- Optional time-based expiry (TTL)
- Optional maximum view count
- Deterministic expiry support for automated testing
- Safe rendering of paste content (no script execution)

---

## How to Run the App Locally

### Prerequisites
- Node.js (v18 or later)
- npm
- A PostgreSQL database (Neon recommended)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Gonnakuti-Jagadish/pastebin-lite.git
   cd pastebin-lite
2.Install dependencies:

npm install


3.Create a .env file in the project root:

DATABASE_URL=<your_postgres_connection_string>
TEST_MODE=1


4.Start the development server:

npm run dev


5.Open the app in your browser:

http://localhost:3000