# API Endpoints

## HTML API

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Goals

- `GET /api/goals`
  - Goals index/search
  - accepts `tag_name` query param to list goals by tag
  - accepts pagination params (if I get there)
- `POST /api/goals`
- `GET /api/goals/:id`
- `PATCH /api/goals/:id`
- `DELETE /api/goals/:id`

### Cards

- `POST /api/cards`
- `GET /api/cards/:id`
- `PATCH /api/cards/:id`

### Nav Bar

- `POST /api/navbar`
- `GET /api/navbar/:id`

### Sidebar

- `POST /api/sidebar`
- `GET /api/sidebar/:id`
- `PATCH /api/sidebar/:id`
