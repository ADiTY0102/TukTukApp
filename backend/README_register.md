# 📌 POST /users/register

This endpoint is used to register a new user by storing their personal details (first name, last name, email, and password) into the system.

---

## 📤 Request

### Method:
`POST`

### URL:
`/users/register`

### Headers:
```http
Content-Type: application/json
```

### Body (JSON):
```json
{
  "fullname": {
    "firstname": "aditya",
    "lastname": "binjagermath"
  },
  "email": "test@gmail.com",
  "password": "$2b$10$ZfLlx6iVLXoFHE1TnBaMvOUEcyigF6wIcIORBYp0LekSjYTUHnOkC"
}
```

---

## ✅ Validation Rules

- `email`: Must be a valid email format.
- `fullname.firstname`: Required and must be at least 3 characters long.
- `fullname.lastname`: Optional, but if provided, must be at least 3 characters long.
- `password`: Required and must be at least 8 characters long.

---

## 📥 Successful Response

### Status Code: `201 Created`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODgyOGQwNzZmMzhkNDM2M2UyMGUwODQi
                        LCJpYXQiOjE3NTMzODYyNDd9.KEKZoFcUx8oBiz8B86yPEWoh1CiYhj8jeB7itaU7iPU",
  "user": {
    "_id": "68828d076f38d4363e20e084",
    "fullname": {
      "firstname": "aditya",
      "lastname": "binjagermath"
    },
    "email": "test@gmail.com",
    "__v": 0
  }
}
```

---

## ❌ Error Responses

### `400 Bad Request` - Validation Failure
```json
{
  "errors": [
    {
      "msg": "Password should be at least 8 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### `500 Internal Server Error` - Server Issue
```json
{
  "error": "Something went wrong"
}
```

---

## 🛠 Implementation Details

- Passwords are hashed using `bcrypt` before storing.
- A JWT token is generated upon successful registration.
- Validation is handled using `express-validator`.

---

## 🔒 Notes

- Ensure `.env` includes a valid `JWT_SECRET` for token generation.
- Email must be unique; attempting to register an already existing email will result in an error.

---
