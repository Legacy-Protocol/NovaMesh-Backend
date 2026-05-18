use actix_web::{get, post, web, HttpResponse, Responder};
use sqlx::PgPool;

#[get("/healthz")]
async fn health() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({ "status": "ok" }))
}

#[post("/payments/x402")]
async fn x402_payment() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({ "status": "queued", "protocol": "x402" }))
}

#[post("/payments/mpp/session")]
async fn create_mpp_session() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({ "status": "created", "protocol": "mpp" }))
}

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(health);
    cfg.service(x402_payment);
    cfg.service(create_mpp_session);
}
