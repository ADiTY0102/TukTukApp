# TukTuk App Backend — API Reference

Base URL (local): `http://localhost:3000`

Environment variables (required)
- `PORT` (optional, default 3000)
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
      "fullname": { "firstname": "Ahmad", "lastname": "Khan" },
      "email": "captain@example.com",
      "password": "secretpass",
      "vehicle": {
        "color": "red",
        "plate": "MH12AB1234",
        "capacity": 3,
        "vehicleType": "auto" // one of ["auto","motorcycle","car"]
      }
    }
    ```
  - Response (201): `{ token, captain }`.

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

- GET `/maps/get-distance-time`
  - Query params: `origin` (string), `destination` (string) — both required, min length 3
  - Auth: `authUser`
  - Example: `/maps/get-distance-time?origin=solapur%20railway%20station&destination=pune%20railway%20station`
  - Response (200): `{ distanceTime: { distanceMeters, durationSeconds, raw } }`
    - Implementation notes: service will geocode string addresses internally (Radar), call Radar route/distance, and return distance in meters and duration in seconds plus raw route object.

- GET `/maps/get-suggestions`
  - Query params: `text` (string, min length 3)
  - Auth: `authUser`
  - Response (200): `{ suggestions: [ { address, name, eLoc, type }, ... ] }`
  - Implementation: MapMyIndia / Mappls autosuggest is used.

4) Rides

- POST `/rides/create`
  - Auth: `authUser`
  - Body (application/json): `{ pickup: string, destination: string, vehicleType: 'auto'|'car'|'motorcycle' }`
  - Response (201): created `ride` object (as returned from `ride.service.createRide`).
  - Validation: pickup and destination min length 3; vehicleType must be valid.

- GET `/rides/get-fare`
  - Auth: `authUser`
  - Query params: `pickup` (string), `destination` (string)
  - Response (200): fare information object (from `ride.service.getFare`).

Notes for frontend developer
- Include token on protected requests either via `Cookie` (sent automatically by browser if cookie present and same origin/cors configured) or set header: `Authorization: Bearer <token>`.
- All request bodies are `application/json`.
- Validation errors return `400` with `{ errors: [...] }` where each item contains `msg`, `param`, etc. (express-validator format).
- Typical success response shapes are shown above; some controllers wrap service results (e.g., `getDistanceTime` returns `{ distanceTime }`).

Example curl calls

Register user:
```
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"John","lastname":"Doe"},"email":"john@example.com","password":"password123"}'
```

Get coordinates (with token):
```
curl "http://localhost:3000/maps/get-coordinates?address=solapur%20railway%20station" \
  -H "Authorization: Bearer <TOKEN>"
```

Debugging tips
- Ensure `RADAR_MAP_API` and `MAPMYINDIA_STATIC_KEY` are present in backend `.env` (server will throw on startup if missing).
- If Radar returns 400 for route/distance, check that the service is sending coordinates as `lat,long` strings (the service now geocodes strings internally).

If you want, I can also produce a Postman collection or OpenAPI spec from these controllers — tell me which you prefer.

---
Backend maintained in `d:/TukTukApp/backend` — give this `README.md` to the frontend dev for integration.
