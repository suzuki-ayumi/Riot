// Karma configuration
// Generated on ...

module.exports = function(config) {
  config.set({
    autoWatchBatchDelay: 2000,
    basePath: '',
    frameworks: ['browserify', 'mocha'],
    files: [
      './dist/es5-shim.js',
      './dist/es5-sham.js',
      './app/**/__tests__/*.spec.js',
      './app/**/__tests__/*.spec.jsx',
      {
        pattern: './app/**/*.js',
        included: false,
        served: false,
      },
      {
        pattern: './app/**/*.jsx',
        included: false,
        served: false,
      },
    ],
    exclude: [],
    preprocessors: {
      './app/**/__tests__/*.spec.js': ['browserify'],
      './app/**/__tests__/*.spec.jsx': ['browserify'],
    },
    reporters: ['spec', 'osx'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    client: {
      captureConsole: true,
    },
    browserify: {
      transform: ['reactify'],
    },
    osxReporter: {
      host: 'localhost',
      port: 2337
    }
  });
};
