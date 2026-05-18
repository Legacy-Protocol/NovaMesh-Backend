# NovaMesh Backend

Backend implementation for NovaMesh, a crypto-native AI agent marketplace built on Stellar.

## Overview

This repository contains the Node.js + TypeScript backend for NovaMesh. It is designed to support core platform functionality including:

- OAuth-based user authentication
- Agent registry, discovery, and management APIs
- Payment orchestration for x402 and MPP flows
- Review, rating, and trust models
- Developer and admin APIs for monitoring and management

## Tech Stack

- Node.js 20+
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Redis
- Apollo GraphQL
- Winston logging
- Sentry error monitoring
- Datadog metrics
- GitHub Actions CI

## Backend Architecture

This implementation mirrors the PRD backend architecture:

- REST endpoints for auth, agent, and payment workflows
- GraphQL endpoint at `/graphql` for discovery and agent queries
- Redis caching for list and detail requests
- Prisma ORM mapping to PostgreSQL
- Winston and Express-Winston request logging
- Sentry integration for error monitoring
- Datadog-compatible metrics via StatsD

## Rust Backend

A lightweight Rust backend scaffold exists in `rust-backend/` for payment settlement and Stellar integration.

- `rust-backend/` contains an Actix-web service built for Tokio
- `sqlx` PostgreSQL connectivity
- Placeholder Stellar integration helpers in `rust-backend/src/stellar.rs`
- `rust-backend/Dockerfile` for containerized Rust deployment

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and update the values:

   ```bash
   cp .env.example .env
   ```

3. Generate the Prisma client:

   ```bash
   npm run prisma:generate
   ```

4. Apply the database migration:

   ```bash
   npm run prisma:migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/`
  - `index.ts` — app bootstrap
  - `app.ts` — Express application setup
  - `routes/` — route definitions for auth, agents, and payments
  - `controllers/` — request handlers and business logic entry points
  - `services/` — shared client instances and helpers
  - `middleware/` — error handling and request lifecycle middleware
  - `config.ts` — environment configuration
- `prisma/` — database schema and Prisma models
- `.github/workflows/` — CI pipeline

## Scripts

- `npm run dev` — start with `ts-node-dev`
- `npm run build` — compile TypeScript to `dist/`
- `npm start` — run compiled production build
- `npm run lint` — run ESLint
- `npm run format` — run Prettier
- `npm run prisma:generate` — generate Prisma client
- `npm run prisma:migrate` — apply database migrations
- `npm test` — run unit tests

## Docker

Build and run the backend in Docker:

```bash
docker build -t novamesh-backend .
docker run --env-file .env -p 4000:4000 novamesh-backend
```

## Notes

This repo is structured as a professional backend foundation for NovaMesh and follows the PRD technical requirements for Node.js, Express, PostgreSQL, Prisma, and a payment-focused service layer.
