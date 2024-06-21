## Rick and Morty Search Application

## Description
This project is a web application built using Next.js and TypeScript for the frontend, and Node.js with Express for the backend. It features authentication, data fetching from the Rick and Morty API, and different user roles (admin and non-admin) with specific feature access.

Both frontend and backend might be installed from the root run concurrently using those commands:

```bash
# Install dependencies for both frontend and backend
npm run install:all
# Run the frontend and backend concurrently
npm run dev
```

Docker is also supported for both frontend and backend. To build the Docker images, run the following commands:

```bash
npm run docker:build
# then
npm run docker:run
# to close the containers
npm run docker:stop
```

## Features
- Authentication: JWT-based login functionality.
- User Roles: Admin and non-admin with different access levels.
- Data Fetching: Fetches characters and episodes from the Rick and Morty API.
- Search: Real-time search with autocomplete suggestions.
- Responsive Design: Works across various screen sizes.

## Project Structure

```bash
/project-root
  /backend
    /src
    package.json
    tsconfig.json
    Dockerfile
  /frontend
    /src
    package.json
    tsconfig.json
    Dockerfile
  docker-compose.yml
  package.json
  .gitignore
  README.md
```

## Api Endpoints
- **POST /api/auth/login:** Authenticate user and return JWT token.
- **GET Rick and Morty API:** Fetches data from the [Rick and Morty API](https://rickandmortyapi.com/).

## Technologies
- **Frontend:**  Next.js, React, TypeScript, Material-UI
- **Backend:** Node.js, Express, TypeScript, JWT, bcrypt

## License
This project is licensed under the MIT License.

