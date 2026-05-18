FROM rust:1.76-slim
WORKDIR /usr/src/novamesh-rust-backend

COPY Cargo.toml Cargo.lock ./
COPY src ./src

RUN apt-get update \
    && apt-get install -y --no-install-recommends pkg-config libssl-dev ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN cargo build --release

CMD ["./target/release/novamesh_rust_backend"]
