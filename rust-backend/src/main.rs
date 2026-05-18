use actix_web::{middleware::Logger, App, HttpServer};
use dotenvy::dotenv;
use std::env;
use tracing_subscriber::EnvFilter;

mod db;
mod routes;
mod stellar;

#[actix_web::main]
async fn main() -> anyhow::Result<()> {
    dotenv().ok();
    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::from_default_env())
        .init();

    let database_url = env::var("DATABASE_URL")?;
    let pool = db::create_pool(&database_url).await?;

    let host = env::var("RUST_BACKEND_HOST").unwrap_or_else(|_| "0.0.0.0".to_string());
    let port = env::var("RUST_BACKEND_PORT").unwrap_or_else(|_| "8080".to_string());
    let listen_addr = format!("{}:{}", host, port);

    tracing::info!(%listen_addr, "Starting NovaMesh Rust backend");

    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .app_data(pool.clone())
            .configure(routes::configure)
    })
    .bind(listen_addr)?
    .run()
    .await?;

    Ok(())
}
