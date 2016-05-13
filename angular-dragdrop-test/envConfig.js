angular.module('envConfig', []);
angular.module('envConfig').constant('ENV_CONFIG', {
  version:'0.1.0',
  apiClient: {
    debug: true,
    hostname: 'api.meinunterricht.de',
    port: 443,
    maxParallelRequests: 10,
    tokenDataStore: 'cookie',
    tokenDataKey: 'muTestAuthTokenData',
    tokenDataDomain: '.meinunterricht.de'
  }
});
