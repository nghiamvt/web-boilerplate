const fs = require('fs');
const dotenv = require('dotenv');
const paths = require('./paths');

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
    `${paths.dotenv}.${process.env.NODE_ENV}.local`,
    `${paths.dotenv}.${process.env.NODE_ENV}`,
    process.env.NODE_ENV !== 'test' && `${paths.dotenv}.local`,
    paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
        dotenv.config({
            path: dotenvFile,
        });
    }
});

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment() {
    const raw = Object.keys(process.env)
        .filter(key => REACT_APP.test(key))
        .reduce((env, key) => {
            return Object.assign({}, env, {
                [key]: process.env[key],
            });
        },
        {
            NODE_ENV: process.env.NODE_ENV || 'development',
            PUBLIC_URL: paths.appPublicPath,
            HOST: process.env.HOST || '0.0.0.0',
            PORT: parseInt(process.env.PORT) || 3000,
        });
    // Stringify all values so we can feed into Webpack DefinePlugin
    const stringified = {
        'process.env': Object.keys(raw).reduce((env, key) => {
            return Object.assign({}, env, {
                [key]: JSON.stringify(raw[key]),
            });
        }, {}),
    };

    return { raw, stringified };
}

module.exports = getClientEnvironment;
