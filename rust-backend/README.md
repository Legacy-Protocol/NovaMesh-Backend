# NovaMesh Rust Backend

This directory contains a Rust backend scaffold for NovaMesh payment processing and Stellar integration.

## Overview

The Rust service is designed to support:

- `Tokio` async runtime
- `Actix-web` HTTP server
- `sqlx` PostgreSQL database access
- `stellar-sdk` / Stellar integration
- Payment session orchestration and settlement logic

## Getting Started

1. Install Rust from https://www.rust-lang.org/tools/install
2. Configure environment variables in `.env`
3. Run the service:
   ```bash
   cargo run
   ```

## Project Structure

- `src/main.rs` — service entrypoint
- `src/routes.rs` — HTTP route definitions
- `src/db.rs` — database connection management
- `src/stellar.rs` — Stellar integration placeholders

## Notes

This repository uses a Rust service scaffold to mirror the PRD backend architecture in a separate service boundary from the Node.js API.
