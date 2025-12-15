# TukTuk App Backend — API Reference

Base URL (local): `http://localhost:4000`

Environment variables (required)
- `PORT` (optional, default 4000)
- `MONGODB_URI` or other DB config used in `db/db.js`
- `JWT_SECRET` — used to sign auth tokens
- `RADAR_MAP_API` — Radar API key (for geocoding/routing)
- `MAPMYINDIA_STATIC_KEY` — MapMyIndia / Mappls access token (autocomplete)

Authentication
- The API uses JWT tokens. Tokens are returned on successful login/register for both users and captains (`{ token, user }` / `{ token, captain }`).
- Token may be provided either in `Cookie: token=<jwt>` or in the `Authorization` header as `Bearer <token>`.
- Protected routes require either `authUser` (for regular users) or `authCaptain` (for captains).

Routes summary

All routes are mounted in `app.js` with these prefixes:
- `/users` — user registration, login, profile, logout
- `/captains` — captain registration, login, profile, logout
- `/maps` — geocoding, distance/time and autocomplete
- `/rides` — create ride, get fare

1) Users

- POST `/users/register`
  - Body (application/json):
    ```json
    {
      "fullname": { "firstname": "John", "lastname": "Doe" },
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  - Response (201): `{ token, user }` — token is a JWT string; `user` is the created user object.
    - Example response (201) (from Postman):
      ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODgyOGQwNzZmMzhkNDM2M2UyMGUwODQiLCJpYXQiOjE3NTMzODYyNDd9.KEKZoFcUx8oBiz8B86yPEWoh1CiYhj8jeB7itaU7iPU",
        "user": {
          "fullname": { "firstname": "aditya", "lastname": "binjagermath" },
          "email": "test@gmail.com",
          "password": "$2b$10$ZfLlx6iVLXoFHE1TnBaMvOUEcyigF6wIcIORBYp0LekSjYTUHnOkC",
          "_id": "68828d076f38d4363e20e084",
          "__v": 0
        }
      }
      ```

- POST `/users/login`
  - Body: `{ email, password }`
  - Response (200): `{ token, user }` and cookie `token` is set (httpOnly).

- GET `/users/profile`
  - Auth: `authUser` (send cookie or Authorization header)
  - Response (200): `{ user: <user object> }`

- GET `/users/logout`
  - Auth: `authUser`
  - Response (200): `{ message: 'Logged out successfully' }` — server blacklists token and clears cookie.

2) Captains

- POST `/captains/register`
  - Body (application/json):
    ```json
    {
      "fullname": { "firstname": " ", "lastname": " " },
      "email": "captain@example.com",
      "password": "secretpass",
      "vehicle": {
        "color": " ",
        "plate": " ",
        "capacity": 3,
        "vehicleType": "auto" 
      }
    }
    ```
  - Response (201): `{ token, captain }`.
    - Example response (201) (from Postman):
      ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODg3Y2NmMDIyOTA3NWY0NmFjODViZDMiLCJpYXQiOjE3NTM3MzAyODgsImV4cCI6MTc1MzgxNjY4OH0.oSwFTw4RO5LiykdzWETGoupvov74Xb7tKKc68EY3sXE",
        "captain": {
          "fullname": { "firstname": "Bhishan", "lastname": "Kumar" },
          "email": "test_captain@gmail.com",
          "password": "$2b$10$DND5z0s0X/SsHTR/6z6aiej6z.jOp5XV1cwSX/vCfVj5aLkYSMWZ2",
          "status": "inactive",
          "vehicle": {
            "color": "red",
            "plate": "MH 13 XY 6969",
            "capacity": 3,
            "vehicleType": "auto"
          },
          "_id": "6887ccf0229075f46ac85bd3",
          "__v": 0
        }
      }
      ```

- POST `/captains/login`
  - Body: `{ email, password }`
  - Response (200): `{ token, captain }` and cookie `token` is set.

- GET `/captains/profile`
  - Auth: `authCaptain`
  - Response (200): `{ captain: <captain object> }`

- GET `/captains/logout`
  - Auth: `authCaptain`
  - Response (200): `{ message: 'Logged out successfully' }`.

3) Maps

- GET `/maps/get-coordinates`
  - Query params: `address` (string, min length 3)
  - Auth: `authUser` (protected)
  - Example: `/maps/get-coordinates?address=Solapur%20railway%20station`
  - Response (200): `{ coordinates: { latitude: number, longitude: number } }`
  - Errors: 400 for validation, 404 if coordinates not found.
    - Example request: `/maps/get-coordinates?address=Santoshi%20Mata%20Mandir,%20Jule%20Solpaur,%20Solapur%20413004`
    - Example response (200) (from Postman):
      ```json
      {
        "coordinates": {
          "latitude": 17.638996852083334,
          "longitude": 75.90406484166665
        }
      }
      ```
    - Errors: 400 for validation, 404 if coordinates not found.

- GET `/maps/get-distance-time`
  - Query params: `origin` (string), `destination` (string) — both required, min length 3
  - Auth: `authUser`
  - Example: `/maps/get-distance-time?origin=solapur%20railway%20station&destination=pune%20railway%20station`
  - Response (200): `{ distanceTime: { distanceMeters, durationSeconds, raw } }`
    - Implementation notes: service will geocode string addresses internally (Radar), call Radar route/distance, and return distance in meters and duration in seconds plus raw route object.
    - Example response (200) (from Postman):
      ```json
      {
        "distanceTime": {
          "meta": { "code": 200 },
          "routes": {
            "geodesic": {
              "distance": { "value": 204476.61232413497, "text": "204.5 km" }
            },
            "car": {
              "duration": { "value": 187.94554166666668, "text": "3 hrs 8 mins" },
              "distance": { "value": 240132, "text": "240.1 km" }
            },
            "foot": {
              "duration": { "value": 2759.73645, "text": "1 day 22 hrs" },
              "distance": { "value": 227653, "text": "227.7 km" }
            }
          }
        }
      }
      ```

- GET `/maps/get-suggestions`
  - Query params: `text` (string, min length 3)
  - Auth: `authUser`
  - Response (200): `{ suggestions: [ { address, name, eLoc, type }, ... ] }`
  - Implementation: MapMyIndia / Mappls autosuggest is used.
    - Example response (200) (from Postman):
      ```json
      {
        "suggestions": [
          { "address": "Maharashtra", "name": "Solapur", "eLoc": "2YZYU8", "type": "CITY" },
          { "address": "Solapur Airport Area, Shankar Nagar, Solapur, Maharashtra, 413224", "name": "Solapur Airport", "eLoc": "7F67T2", "type": "POI" },
          { "address": "Railway Line Road, Siddheshwar Peth, Solapur, Maharashtra, 413001", "name": "Solpaur Lokamangal Nagari Sahakari Patasanstha Maryadit", "eLoc": "WH2GKW", "type": "POI" },
          { "address": "North Kasba, Budhwar Peth, Solapur, Maharashtra, 413007", "name": "Loni Marathi Vidyalaya Solpaur", "eLoc": "PSB2WX", "type": "POI" },
          { "address": "10/22, Bhavani Peth, Solpaur, Solapur, Maharashtra, 413002", "name": "Bagadi Agencies", "eLoc": "M59AO8", "type": "POI" }
        ]
      }
      ```

4) Rides

- POST `/rides/create`
  - Auth: `authUser`
  - Body (application/json): `{ pickup: string, destination: string, vehicleType: 'auto'|'car'|'motorcycle' }`
  - Response (201): created `ride` object (as returned from `ride.service.createRide`).
  - Validation: pickup and destination min length 3; vehicleType must be valid.
    - Example response (201) (from Postman):
      ```json
      {
        "user": "69404ca27a90a7f624c8183f",
        "pickup": "pune",
        "destination": "mumbai",
        "fare": 2279.08364575,
        "status": "pending",
        "duration": 2.1028819166666666,
        "distance": 148.185,
        "_id": "694056f441ae31581292b2db",
        "__v": 0
      }
      ```

- GET `/rides/get-fare`
  - Auth: `authUser`
  - Query params: `pickup` (string), `destination` (string)
  - Response (200): fare information object (from `ride.service.getFare`).

---
Notes for frontend developer
- Include token on protected requests either via `Cookie` (sent automatically by browser if cookie present and same origin/cors configured) or set header: `Authorization: Bearer <token>`.
- All request bodies are `application/json`.
- Validation errors return `400` with `{ errors: [...] }` where each item contains `msg`, `param`, etc. (express-validator format).
- Typical success response shapes are shown above; some controllers wrap service results (e.g., `getDistanceTime` returns `{ distanceTime }`).

Example curl calls

Register user:
```
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"aditya","lastname":"reddy"},"email":"aditya@example.com","password":"adireddy@123"}'
```

Get coordinates (with token):
```
curl "http://localhost:4000/maps/get-coordinates?address=solapur%20railway%20station" \
  -H "Authorization: Bearer <TOKEN>"
```
---
Debugging
- Ensure `RADAR_MAP_API` and `MAPMYINDIA_STATIC_KEY` are present in backend `.env` (server will throw on startup if missing).
- If Radar returns 400 for route/distance, check that the service is sending coordinates as `lat,long` strings (the service now geocodes strings internally).

If you want, I can also produce a Postman collection or OpenAPI spec from these controllers — tell me which you prefer.

---
Backend maintained in `d:/TukTukApp/backend`
