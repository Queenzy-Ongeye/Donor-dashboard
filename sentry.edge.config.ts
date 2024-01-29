import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://86fd61da550a0492d26ec7055ce5c914@o1428800.ingest.sentry.io/4506058648780800",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
