# Build Stage
FROM rust:latest AS builder

WORKDIR /app

# Copy Cargo files
COPY Cargo.toml Cargo.lock ./

# Create dummy main.rs for caching (optional)
RUN mkdir -p src && echo "fn main() {}" > src/main.rs

# Build dependencies
RUN cargo build --release

# Copy source code and sqlx metadata
COPY . .
COPY .sqlx .

# Enable offline mode for SQLx
ENV SQLX_OFFLINE=true

# Build the final binary
RUN cargo build --release

# Runtime Stage
FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    ca-certificates \
    openssl \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the migrations folder to the runtime stage
# COPY --from=builder /app/migrations ./migrations

# Copy the binary
COPY --from=builder /app/target/release/api .

EXPOSE 8000
CMD ["./api"]