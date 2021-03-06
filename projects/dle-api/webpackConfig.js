const path = require('path')
const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')
const { EnvironmentPlugin } = require('webpack')

const localEnv = require('dotenv').config()
const sharedEnv = require('dotenv').config({
  path: path.resolve('..', 'shared', '.env')
})

const serverlessConfig = {
  target: 'node',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: slsw.lib.entries,
  optimization: { minimize: true },
  performance: { hints: 'warning' },
  externals: [
    nodeExternals({
      allowlist: ['semver']
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(t|j)s?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve('dist'),
    filename: '[name].js'
  }
}

serverlessConfig.plugins = [
  new EnvironmentPlugin({
    AUTH_SECRET: sharedEnv.parsed.AUTH_SECRET,
    JWT_PRIVATE_KEY: sharedEnv.parsed.JWT_PRIVATE_KEY,
    // STRIPE_SECRET_KEY: localEnv.parsed.STRIPE_SECRET_KEY_LIVE,
    STRIPE_SECRET_KEY: localEnv.parsed.STRIPE_SECRET_KEY_TEST
  })
]

if (process.env.NODE_ENV === 'development') {
  serverlessConfig.mode = 'development'
  serverlessConfig.devtool = 'nosources-source-map'
  serverlessConfig.optimization.minimize = false
  serverlessConfig.output.sourceMapFilename = '[file].map'
} else {
  serverlessConfig.externals.push('aws-sdk')
}

module.exports = serverlessConfig
