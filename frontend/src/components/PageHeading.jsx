/**
 * Heading which sits at the top of every page.
 */
export const PageHeading = () => (
  <header className="bg-white shadow dark:bg-slate-800">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
        Kafka Hello World <span className="pl-1">📈</span>
      </h1>
      <h2 className="text-sm mt-2 hidden  text-gray-500 md:block dark:text-slate-400">
        Real time (fake) stock prices with Kafka
      </h2>
    </div>
  </header>
);
