use std::sync::Arc;

use axum::{
    routing::{get, post, patch},
    Router,
};

use crate::{
    handler::{
        project_list_handler, health_checker_handler, create_project_handler, edit_project_handler
    },
    AppState,
};

pub fn create_router(app_state: Arc<AppState>) -> Router {
    Router::new()
        .route("/api/test", get(health_checker_handler))
        .route("/api/projects", get(project_list_handler))
        .route("/api/projects", post(create_project_handler))
        .route("/api/projects/:id", patch(edit_project_handler))
        .with_state(app_state)
}