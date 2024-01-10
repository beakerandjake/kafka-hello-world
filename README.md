<!-- adapted from: https://github.com/othneildrew/Best-README-Template -->
<a name="readme-top"></a>

<!-- logo -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://github.com/beakerandjake/kafka-hello-world/assets/1727349/84216fce-a0df-491b-8931-0b1a1349f973" alt="Logo" width="80" height="80">
  </a>
  <h2 align="center">kafka-hello-world</h2>
  <p align="center">
    Real time (fake) stock prices with Kafka.
  </p>
</div>


<!-- table of contents -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#architecture-diagram">Architecture Diagram</a></li>
  </ol>
</details>

<!-- about -->
## About

![project-screenshot]

Created while I was learning Kafka, I needed a stream of realtime data to work with and stock prices came to mind. 

The project is composed of different applications which are orchestrated by docker compose. 

A single Producer continually publishes price change messages to a topic with multiple Consumers. 

- One Consumer saves each price event to a database.
- Another Consumer aggregates these rows into time buckets.
- A final Consumer pushes price events to the frontend via SSE. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![Kafka][Kafka]][Kafka-url]
[![Postgres][Postgres]][Postgres-url]
[![Nginx][Nginx]][Nginx-url]
[![Docker][Docker]][Docker-url]
[![Fastify][Fastify]][Fastify-url]
[![Vite][Vite]][Vite-url]
[![React][React]][React-url]
[![Chart.js][Chart.js]][Chart.js-url]
[![TailwindCSS][TailwindCSS]][TailwindCSS-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- getting started -->
## Getting Started

Installation is easy thanks to docker compose, you just need to clone this repository then run the `up` command.

### Prerequisites

Docker Compose must be installed on your machine. It can be installed through docker desktop or [docker engine][install-docker-url].

### Installation

1. Clone this repo
   ```sh
   git clone https://github.com/beakerandjake/kafka-hello-world
   ```
2. Start the application
   ```sh
   docker compose up -d
   ```

To stop the application
   ```sh
   docker compose down
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

Once the containers are all started navigate to `http://localhost:8080` in your browser. You should see prices continually update, if you leave it running you can see the price chart change over time.

To view the price events you can create a console consumer:

```sh
docker exec -it kafka kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic stock_price_changes
```

You can also follow the consumer logs:
```sh
docker logs consumer-realtime --follow
```
```sh
docker logs consumer-aggregate --follow
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Architecture Diagram -->
## Architecture Diagram

![project-architecture]

See a specific component's README file for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[project-screenshot]: https://github.com/beakerandjake/kafka-hello-world/assets/1727349/d9f7bf11-d548-43e1-817c-0055e18a562e
[project-architecture]: https://github.com/beakerandjake/kafka-hello-world/assets/1727349/fa3b1072-904c-4b7a-b4b8-6e6995e53df3

[Kafka]: https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka
[Kafka-url]: https://kafka.apache.org/
[Postgres]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/
[Nginx]: https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white
[Nginx-url]: https://nginx.org
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Fastify]: https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white
[Fastify-url]: https://fastify.dev/
[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Chart.js]: https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white
[Chart.js-url]: https://www.chartjs.org/
[install-docker-url]: https://docs.docker.com/engine/install/
