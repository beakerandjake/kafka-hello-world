# reverse-proxy

A simple nginx reverse proxy container which serves the website and api. Allows the frontend and api to communicate without having to use CORS. Leverages the networking created by docker compose.

Forwards requests containing: **/api** to the api container at http://api:3000/ and all other requests to the frontend container at http://frontend:80

## Usage

At the root of the repo run:

```
docker compose up
```

After all containers have started, navigate to `http://localhost:8080` in your browser.
