# Bewerbungshelfer

A comprehensive German job application assistant that helps users create professional cover letters and resumes using AI. The platform provides intelligent document generation, resume optimization, and professional headshot generation services.

## Architecture Overview

This is a full-stack web application built with:

- **Backend**: Rust/Axum web service with PostgreSQL database
- **Frontend**: React/TypeScript SPA
- **AI Integration**: OpenAI API for content creation and optimization
- **Image Processing**: Claid and Replicate APIs for headshot generation
- **Infrastructure**: Nginx reverse proxy, PostgreSQL database, systemd services

## Project Structure

```
├── frontend/          # React/TypeScript frontend application
├── backend/           # Rust workspace with backend services
│   ├── cover-letter/  # Main application service
│   └── claid/         # Image processing service integration
├── operations/        # Deployment and infrastructure scripts (see operations/operations.md)
└── auxiliary/         # Documentation, queries, and administrative tools, encrypted
```

## Local Development

### Prerequisites

- rustc, cargo (for backend compilation)
- Node.js and npm (for frontend development)  
- git-crypt (for accessing encrypted credentials)
- Access to the git-crypt symmetric key for credential decryption
- Stripe CLI (optional, for payment testing)

### Quick Start

1. **Clone and decrypt credentials**:
```bash
git clone <repository-url>
cd <cloned dir>
git-crypt unlock <path-to-symmetric-key>
```

2. **Start the database**:
```bash
cd backend/cover-letter
./start_database
```

3. **Start the backend service**:
```bash
cd backend/cover-letter
cargo run --features "credentials" --bin cover-letter
```

4. **Generate TypeScript bindings**:
```bash
cd backend/cover-letter
cargo test --features "credentials"
```

5. **Start the frontend development server**:
```bash
cd frontend
npm start
```

6. **Setup stripe webhook proxy for payment testing** (optional):
```bash
stripe login
stripe listen --forward-to localhost:3001/api/stripe
```

7. **Access the application**:
   - Frontend: http://localhost:3001 (served via backend proxy due to CORS)
   - API endpoints: http://localhost:3001/api/*
   - Direct frontend dev server: http://localhost:3000


### Database Management

**Interactive database access**:
```bash
cd backend/cover-letter
./start_database --interactive
```

## Architecture Components

### Core Components

**Frontend (React SPA)**
- **Production**: Compiled/bundled by npm, served by nginx
- **Local dev**: Served by npm start on localhost:3000, proxied by backend on localhost:3001 (due to CORS)

**Backend (Rust/Axum)**
- Main application service handling API endpoints
- Connects to PostgreSQL via SQLx (including compile-time SQL verification)  
- Serves frontend in development mode
- Runs on localhost:3001 in development
- TypeScript type bindings generated via ts-rs (see `backend/cover-letter/bindings/`, regenerate with `cargo test --features "credentials"`)

**Database (PostgreSQL)**
- **Production**: Running on same VM as backend, localhost connections only
- **Local dev**: Docker container via start_database script
- SQLx requires database running for compilation of backend

**Infrastructure (Production)**
- **Debian VM**: Hosts nginx, backend service, and PostgreSQL
- **Nginx**: Reverse proxy doing TLS termination, serving frontend and forwarding /api to backend
- **systemd**: Process management for backend service

### External Integrations

**Payment Processing**
- **Stripe**: Customer sessions, webhooks for payment notifications
- **Local dev**: Stripe CLI forwards webhooks

**AI Services**  
- **OpenAI API**: Cover letter generation and content optimization (see integrations/prompting.rs)
- **Replicate.com**: LORA fine tuning of Flux Dev model for headshot generation
- **Claid.ai**: Image processing for uploaded headshot photos

**Email server**
- **SMTP** for signin, signup emails
- **Local dev**: backend prints emails to std::out

## Deployment

The application supports two environments:

- **Production**: `bewerbungshelfer.net`
- **Integration**: `integration.bewerbungshelfer.net`

### Infrastructure Setup

See `operations/operations.md`

### Deploy Application

For detailed deployment instructions, see `operations/operations.md`. Quick deployment:

```bash
cd operations
./deploy [--production|--integration]
```
