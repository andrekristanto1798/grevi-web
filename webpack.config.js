const webpackMerge = require('webpack-merge');
const common = require('./webpack/webpack.common');
const commonPaths = require('./webpack/paths');

const NODE_ENV = process.env.NODE_ENV || 'development';

const envs = {
  development: 'dev',
  production: 'prod',
};

const { entryPath } = commonPaths;

const entry = {
  development: entryPath,
  production: entryPath,
};

/* eslint-disable global-require,import/no-dynamic-require */
const env = envs[NODE_ENV];
const envConfig = require(`./webpack/webpack.${env}.js`);
module.exports = webpackMerge(common, envConfig, { entry: entry[NODE_ENV] });
