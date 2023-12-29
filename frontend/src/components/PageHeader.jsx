export const PageHeader = () => {
  return (
    <header className="bg-white shadow dark:bg-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
          Kafka Hello World <span className="pl-1">📈</span>
        </h1>
        <h2 className="dark:text-sate-400 text-md mt-2  hidden text-gray-500 md:block">
          Real time (fake) stock prices with Kafka, Postgres, Fastify and React
        </h2>
      </div>
    </header>
  );
};
