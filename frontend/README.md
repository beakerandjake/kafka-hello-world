# frontend

Allows you to view historical price data of the stocks as well as realtime price information. 

Built with `react`, `vite`, `chart.js`, and `tailwindcss`. 

## Usage

This application depends on the api container, and is intended to be ran through docker compose.

At the root of the repo run:

```sh
docker compose up -d
```

After all containers have started, navigate to `http://localhost:8080` in your browser.

**NOTE**: The frontend runs in its own container and listens on the internal docker compose network on port 80 (by default). It is exposed to the host machine via a separate container called `reverse-proxy` which is exposed at `localhost:8080` (by default).