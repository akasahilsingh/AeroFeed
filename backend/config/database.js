// // const path = require('path');

// // module.exports = ({ env }) => {
// //   const client = env('DATABASE_CLIENT', 'sqlite');

// //   const connections = {
// //     mysql: {
// //       connection: {
// //         host: env('DATABASE_HOST', 'localhost'),
// //         port: env.int('DATABASE_PORT', 3306),
// //         database: env('DATABASE_NAME', 'strapi'),
// //         user: env('DATABASE_USERNAME', 'strapi'),
// //         password: env('DATABASE_PASSWORD', 'strapi'),
// //         ssl: env.bool('DATABASE_SSL', false) && {
// //           key: env('DATABASE_SSL_KEY', undefined),
// //           cert: env('DATABASE_SSL_CERT', undefined),
// //           ca: env('DATABASE_SSL_CA', undefined),
// //           capath: env('DATABASE_SSL_CAPATH', undefined),
// //           cipher: env('DATABASE_SSL_CIPHER', undefined),
// //           rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
// //         },
// //       },
// //       pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
// //     },
// //     postgres: {
// //       connection: {
// //         connectionString: env('DATABASE_URL'),
// //         host: env('DATABASE_HOST', 'localhost'),
// //         port: env.int('DATABASE_PORT', 5432),
// //         database: env('DATABASE_NAME', 'strapi'),
// //         user: env('DATABASE_USERNAME', 'strapi'),
// //         password: env('DATABASE_PASSWORD', 'strapi'),
// //         ssl: env.bool('DATABASE_SSL', false) && {
// //           key: env('DATABASE_SSL_KEY', undefined),
// //           cert: env('DATABASE_SSL_CERT', undefined),
// //           ca: env('DATABASE_SSL_CA', undefined),
// //           capath: env('DATABASE_SSL_CAPATH', undefined),
// //           cipher: env('DATABASE_SSL_CIPHER', undefined),
// //           rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
// //         },
// //         schema: env('DATABASE_SCHEMA', 'public'),
// //       },
// //       pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
// //     },
// //     sqlite: {
// //       connection: {
// //         filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
// //       },
// //       useNullAsDefault: true,
// //     },
// //   };

// //   return {
// //     connection: {
// //       client,
// //       ...connections[client],
// //       acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
// //     },
// //   };
// // };

const path = require("path");

module.exports = ({ env }) => ({
  connection: {
    client: env("DATABASE_CLIENT", "sqlite"),

    connection:
      env("DATABASE_CLIENT") === "postgres"
        ? {
            host: env("DATABASE_HOST"),
            port: env.int("DATABASE_PORT"),
            database: env("DATABASE_NAME"),
            username: env("DATABASE_USERNAME"),
            password: env("DATABASE_PASSWORD"),
            ssl: env.bool("DATABASE_SSL", false)
              ? { rejectUnauthorized: false }
              : false,
          }
        : {
            filename: path.join(
              __dirname,
              "..",
              env("DATABASE_FILENAME", ".tmp/data.db")
            ),
          },

    useNullAsDefault: env("DATABASE_CLIENT", "sqlite") === "sqlite",
  },
});


// const path = require("path");

// module.exports = ({ env }) => ({
//   connection: {
//     client: env("DATABASE_CLIENT", "sqlite"),

//     connection:
//       env("DATABASE_CLIENT") === "postgres"
//         ? {
//             // --- FIX 1: Prioritize the full connection string from Render ---
//             // If DATABASE_URL is set (which it is on Render), the host/port/user below are ignored.
//             // This is the most reliable way to connect.
//             connectionString: env('DATABASE_URL'), 
            
//             // --- Fallback fields (only used if connectionString is empty/missing) ---
//             host: env("DATABASE_HOST"),
//             port: env.int("DATABASE_PORT"),
//             database: env("DATABASE_NAME"),
//             username: env("DATABASE_USERNAME"),
//             password: env("DATABASE_PASSWORD"),

//             // --- FIX 2: Correct SSL Configuration for Render ---
//             // Render requires a specific format for SSL to work.
//             ssl: env.bool("DATABASE_SSL", false)
//               ? { rejectUnauthorized: false } // We set rejectUnauthorized to false here.
//               : false,
//           }
//         : {
//             // --- SQLite (Local Development) ---
//             filename: path.join(
//               __dirname,
//               "..",
//               "..",
//               env("DATABASE_FILENAME", ".tmp/data.db")
//             ),
//           },

//     useNullAsDefault: env("DATABASE_CLIENT", "sqlite") === "sqlite",
//   },
// });