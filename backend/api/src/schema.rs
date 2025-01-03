use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug, Default)]
pub struct FilterOptions {
    pub page: Option<usize>,
    pub limit: Option<usize>,
}

#[derive(Deserialize, Debug)]
pub struct ParamOptions {
    pub id: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CreateProjectSchema {
    pub projectname: String,
    pub projecturl: String,
    pub imageurl: String, 
    pub subimageurl: String,
    pub description: String, 
    pub about: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub published: Option<bool>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateProjectSchema {
    pub projectname: Option<String>,
    pub projecturl: Option<String>,
    pub imageurl: Option<String>,
    pub subimageurl: Option<String>,
    pub description: Option<String>,
    pub about: Option<String>,
    pub published: Option<bool>,
}
