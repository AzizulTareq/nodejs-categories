# API Documentation

This document provides information about the API endpoints of the Category Service.

## Setup

Before you start using the API, please follow these setup instructions.

## 1. Environment Variables

Create a `.env` file in the root directory of the project and add your MongoDB connection URL as follows:

```plaintext
MONGO_URL=your_mongodb_connection_url_here
```
## 2. Clone the Project

To get the source code for the Category Service, you can clone the project from the GitHub repository. Open your terminal and run the following command:

```bash
git clone git@github.com:AzizulTareq/nodejs-categories.git
```

## 3. Initialize Dependencies

Navigate to the project directory and install the required dependencies using npm:

```bash
cd nodejs-categories
npm install
```

## 4. Start the Server

 Start the API server using the following command:

```bash
npm start
```

## Create a New Category

- **Endpoint:** `POST /create`
- **Description:** Create a new category.
- **Request Body:**
  - `name` (string): The name of the category (required).
  - `parent` (string): The ID of the parent category (optional).
- **Response:** Returns the created category.

## Update a Category

- **Endpoint:** `PUT /update/:id`
- **Description:** Update an existing category.
- **Request Parameters:**
  - `id` (string): The ID of the category to update.
- **Request Body:**
  - `name` (string): The updated name of the category (optional).
  - `active` (boolean): Set the category's active status (optional).
- **Response:** Returns the updated category.

## Deactivate a Category, Deactivate it's child categories as well (if any)

- **Endpoint:** `DELETE /deactivate/:id`
- **Description:** Deactivate a category and its child categories recursively.
- **Request Parameters:**
  - `id` (string): The ID of the category to deactivate.
- **Response:** Returns a success message after deactivation.

## Search a Category with Parent (if any)

- **Endpoint:** `GET /get/:id`
- **Description:** Retrieve a single category with its parent (if any).
- **Request Parameters:**
  - `id` (string): The ID of the category to retrieve.
- **Response:** Returns the category and its parent category.

## Get All Categories

- **Endpoint:** `GET /get`
- **Description:** Retrieve all categories.
- **Response:** Returns a list of all categories.
