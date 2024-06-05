

## RESTful API Documentation for CREDITFIT API

In the project directory, you can run:

### `npm run start`

Runs the project in production mode.

### `npm run start:dev`

Runs the project in development mode with watch mode enabled.

### `npm run migrate:run`

Runs database migrations to apply changes to the database schema.

### `npm run migrate:revert`

Reverts the last applied database migration.

### Base URL

`http://yourapiurl.com/`
https://www.postman.com/josiaalmeida/workspace/creditfit

---

### Company Endpoints

#### Create a Company

- **URL:** `/company`
- **Method:** `POST`
- **Description:** Creates a new company.
- **Request Body:**

  ```json
  {
    "company_name": "string"
  }
````

- **Response:**

  - **Status:** `201 Created`
  - **Body:**

    ```json
    {
      "id": "number",
      "company_name": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

- **Errors:**
  - `400 Bad Request` - If validation fails.

---

### Authentication Endpoints

#### Signup

- **URL:** `/auth/signup`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**

  ```json
  {
    "full_name": "string",
    "cpf": "string",
    "email": "string",
    "password": "string",
    "role": "string", //employee or representative
    "cnpj": "string", //only representative
    "companyName": "string", //only representative
    "companyId": "number", //only emplyee
    "salary": "number" //only emplyee
  }
  ```

- **Response:**

  - **Status:** `201 Created`
  - **Body:**

    ```json
    {
      "user": {
        "id": "number",
        "full_name": "string",
        "cpf": "string",
        "email": "string",
        "role": "string",
        "companyName": "string",
        "companyId": "number",
        "salary": "number",
        "createdAt": "string",
        "updatedAt": "string"
      },
      "access_token": "string"
    }
    ```

- **Errors:**
  - `400 Bad Request` - If validation fails.

#### Signin

- **URL:** `/auth/signin`
- **Method:** `POST`
- **Description:** Authenticates a user.
- **Request Body:**

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- **Response:**

  - **Status:** `200 OK`
  - **Body:**

    ```json
    {
      "user": {
        "id": "number",
        "full_name": "string",
        "cpf": "string",
        "email": "string",
        "role": "string",
        "companyName": "string",
        "companyId": "number",
        "salary": "number",
        "createdAt": "string",
        "updatedAt": "string"
      },
      "access_token": "string"
    }
    ```

- **Errors:**
  - `401 Unauthorized` - If authentication fails.

#### Get Profile

- **URL:** `/auth/profile`
- **Method:** `GET`
- **Description:** Retrieves the profile of the authenticated user.
- **Headers:**

  - `Authorization: Bearer {access_token}`

- **Response:**

  - **Status:** `200 OK`
  - **Body:**

    ```json
    {
      "id": "number",
      "full_name": "string",
      "cpf": "string",
      "email": "string",
      "role": "string",
      "companyName": "string",
      "companyId": "number",
      "salary": "number",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

- **Errors:**
  - `401 Unauthorized` - If the token is missing or invalid.

---

### Loan Request Endpoints

#### Create a Loan Request

- **URL:** `/loan/request`
- **Method:** `POST`
- **Description:** Creates a new loan request for an employee.
- **Headers:**

  - `Authorization: Bearer {access_token}`

- **Request Body:**

  ```json
  {
    "amount": "number",
    "term": "number"
  }
  ```

- **Response:**

  - **Status:** `201 Created`
  - **Body:**

    ```json
    {
      "message": "Solicitação criada com sucesso",
      "data": [
        {
          "term": "number",
          "amount": "number",
          "expireMonth": "string",
          "expireMonthDate": "string",
          "status": "string"
        }
      ]
    }
    ```

- **Errors:**
  - `400 Bad Request` - If validation fails.
  - `403 Forbidden` - If the user is not an employee.
  - `401 Unauthorized` - If the token is missing or invalid.

---

### Error Handling

The API uses standard HTTP status codes to indicate the success or failure of an API request. Here are the common status codes used:

- `200 OK` - The request was successful.
- `201 Created` - The resource was successfully created.
- `400 Bad Request` - The request could not be understood or was missing required parameters.
- `401 Unauthorized` - Authentication failed or user does not have permissions for the desired action.
- `403 Forbidden` - Authentication succeeded but authenticated user does not have access to the requested resource.
- `404 Not Found` - The requested resource could not be found.
- `500 Internal Server Error` - An error occurred on the server.

---

````markdown
### Company Endpoints

#### List Companies

- **URL:** `/company`
- **Method:** `GET`
- **Description:** Retrieves a list of all companies.
- **Response:**

  - **Status:** `200 OK`
  - **Body:**

    ```json
    [
      {
        "id": "number",
        "company_name": "string",
        "createdAt": "string",
        "updatedAt": "string"
      },
      {
        "id": "number",
        "company_name": "string",
        "createdAt": "string",
        "updatedAt": "string"
      },
      ...
    ]
    ```
````

#### Create a Company

**Request:**

```bash
curl -X POST http://yourapiurl.com/api/company \
-H "Content-Type: application/json" \
-d '{
  "company_name": "Tech Solutions"
}'
```

**Response:**

```json
{
  "id": 1,
  "company_name": "Tech Solutions",
  "createdAt": "2023-06-01T00:00:00.000Z",
  "updatedAt": "2023-06-01T00:00:00.000Z"
}
```

#### Signup

**Request:**

```bash
curl -X POST http://yourapiurl.com/api/auth/signup \
-H "Content-Type: application/json" \
-d '{
  "full_name": "John Doe",
  "cpf": "12345678900",
  "email": "john.doe@example.com",
  "password": "securepassword",
  "role": "employee",
  "salary": 3000
}'
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "full_name": "John Doe",
    "cpf": "12345678900",
    "email": "john.doe@example.com",
    "role": "employee",
    "salary": 3000,
    "createdAt": "2023-06-01T00:00:00.000Z",
    "updatedAt": "2023-06-01T00:00:00.000Z"
  },
  "access_token": "jwt-token"
}
```

#### Create a Loan Request

**Request:**

```bash
curl -X POST http://yourapiurl.com/api/loan/request \
-H "Content-Type: application/json" \
-H "Authorization: Bearer jwt-token" \
-d '{
  "amount": 5000,
  "term": 3
}'
```

**Response:**

```json
{
  "message": "Solicitação criada com sucesso",
  "data": [
    {
      "term": 1,
      "amount": 1666.67,
      "expireMonth": "2023-07-01T00:00:00.000Z",
      "expireMonthDate": "01/07/2023",
      "status": "Pendente"
    },
    {
      "term": 2,
      "amount": 1666.67,
      "expireMonth": "2023-08-01T00:00:00.000Z",
      "expireMonthDate": "01/08/2023",
      "status": "Pendente"
    },
    {
      "term": 3,
      "amount": 1666.67,
      "expireMonth": "2023-09-01T00:00:00.000Z",
      "expireMonthDate": "01/09/2023",
      "status": "Pendente"
    }
  ]
}
```

```markdown
# CREDITFIT API Documentation

## Database Configuration

The CREDITFIT API uses SQL Server for data storage.

### SQL Server Configuration

- **Database:** Your_SQL_Server_Database_Name

### Environment Variables

Set the following environment variables:
```

ENV: NEST_HOST=Your_SQL_Server_Host
NEST_PORT=Your_SQL_Server_Port
NEST_USERNAME=Your_SQL_Server_Username
NEST_PASSWORD=Your_SQL_Server_Password
NEST_DATABASE=Your_SQL_Server_Database_Name
NEST_SECRET_TOKEN=Your_Secret_Token

````
