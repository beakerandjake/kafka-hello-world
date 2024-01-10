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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

🚧 README under construction 🚧

<!-- about -->
## About

![project-screenshot]

Created while I was learning Kafka, I needed a stream of realtime data to work with and stock prices came to mind. 

The project is composed of different applications which are orchestrated by docker compose. 

A single Producer continually publishes price change messages to a topic which get consumed by multiple Consumers. 

- One Consumer saves each price event to a database, another Consumer aggregates these rows into time buckets.
- A final Consumer pushes these events to the frontend via SSE. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

![Kafka]
![Postgres]
![Nginx]
![Docker]
![Fastify]
![Vite]
![React]
![Chart.js]
![TailwindCSS]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Run

```
docker compose up -d
```



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[project-screenshot]: https://github.com/beakerandjake/kafka-hello-world/assets/1727349/d9f7bf11-d548-43e1-817c-0055e18a562e

[Kafka]: https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka
[Postgres]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[Nginx]: https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Fastify]: https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white
[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Chart.js]: https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white
