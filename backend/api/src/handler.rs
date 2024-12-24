use std::sync::Arc;

use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde_json::json;

use crate::{
    model::ProjectModel,
    schema::{CreateProjectSchema, FilterOptions, UpdateProjectSchema},
    AppState,
};


pub async fn health_checker_handler() -> impl IntoResponse {
    const MESSAGE: &str = "Simple CRUD API with Rust, SQLX, Postgres,and Axum";

    let json_response = serde_json::json!({
        "status": "success",
        "message": MESSAGE
    });

    Json(json_response)
}


pub async fn project_list_handler(
    opts: Option<Query<FilterOptions>>,
    State(data): State<Arc<AppState>>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let Query(opts) = opts.unwrap_or_default();

    let limit = opts.limit.unwrap_or(10);
    let offset = (opts.page.unwrap_or(1) - 1) * limit;

    let query_result = sqlx::query_as!(
        ProjectModel,
        r#"
        SELECT 
            id,
            projectname,
            projecturl,
            imageurl,
            subimageurl,
            description,
            about,
            published,
            created_at as "created_at: _",
            updated_at as "updated_at: _"
        FROM projects 
        ORDER BY id 
        LIMIT $1 OFFSET $2
        "#,
        limit as i32,
        offset as i32
    )
    .fetch_all(&data.db)
    .await;

    if query_result.is_err() {
        let error_response = serde_json::json!({
            "status": "fail",
            "message": "Something bad happened while fetching all note items",
        });
        return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(error_response)));
    }

    let projects = query_result.unwrap();

    let json_response = serde_json::json!({
        "status": "success",
        "results": projects.len(),
        "projects": projects
    });
    Ok(Json(json_response))
}


pub async fn create_project_handler(
    State(data): State<Arc<AppState>>,
    Json(body): Json<CreateProjectSchema>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let query_result = sqlx::query_as!(
        ProjectModel,
        r#"
        INSERT INTO projects (
            projectname, 
            projecturl, 
            imageurl, 
            subimageurl, 
            description, 
            about,
            published
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *
        "#,
        body.projectname.to_string(),
        body.projecturl.to_string(),
        body.imageurl.to_string(),
        body.subimageurl.to_string(),
        body.description.to_string(),
        body.about.to_string(),
        body.published
    )
    .fetch_one(&data.db)
    .await;

    match query_result {
        Ok(project) => {
            let project_response = json!({
                "status": "success",
                "data": json!({
                    "project": project
                })
            });
            Ok((StatusCode::CREATED, Json(project_response)))
        }
        Err(e) => {
            if e.to_string()
                .contains("duplicate key value violates unique constraint")
            {
                let error_response = json!({
                    "status": "fail",
                    "message": "Project with that name already exists",
                });
                Err((StatusCode::CONFLICT, Json(error_response)))
            } else {
                Err((
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json(json!({
                        "status": "error",
                        "message": format!("{:?}", e)
                    }))
                ))
            }
        }
    }
}

pub async fn edit_project_handler(
    Path(id): Path<uuid::Uuid>,
    State(data): State<Arc<AppState>>,
    Json(body): Json<UpdateProjectSchema>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let query_result = sqlx::query_as!(ProjectModel, "SELECT * FROM projects WHERE id = $1", id)
        .fetch_one(&data.db)
        .await;

    if query_result.is_err() {
        let error_response = json!({
            "status": "fail",
            "message": format!("Project with ID: {} not found", id)
        });
        return Err((StatusCode::NOT_FOUND, Json(error_response)));
    }

    let now = chrono::Utc::now();
    let project = query_result.unwrap();

    let query_result = sqlx::query_as!(
        ProjectModel,
        r#"
        UPDATE projects 
        SET projectname = $1,
            projecturl = $2,
            imageurl = $3,
            subimageurl = $4,
            description = $5,
            about = $6,
            published = $7,
            updated_at = $8 
        WHERE id = $9
        RETURNING *
        "#,
        body.projectname.unwrap_or(project.projectname),
        body.projecturl.unwrap_or(project.projecturl),
        body.imageurl.unwrap_or(project.imageurl),
        body.subimageurl.unwrap_or(project.subimageurl),
        body.description.unwrap_or(project.description),
        body.about.unwrap_or(project.about),
        body.published.or(project.published),
        now,
        id
    )
    .fetch_one(&data.db)
    .await;

    match query_result {
        Ok(project) => {
            let project_response = json!({
                "status": "success",
                "data": json!({
                    "project": project
                })
            });
            Ok(Json(project_response))
        }
        Err(err) => {
            Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({
                    "status": "error",
                    "message": format!("{:?}", err)
                }))
            ))
        }
    }
}