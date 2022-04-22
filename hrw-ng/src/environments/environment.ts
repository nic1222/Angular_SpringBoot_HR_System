// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //localhost
  apiBaseUrl: 'http://localhost:8080/api',
  //iphone
  // apiBaseUrl: 'https://172.20.10.5:8083/api',
  //home
  // apiBaseUrl: 'https://192.168.1.3:8083/api',
  // apiBaseUrl: 'https://192.168.100.5:8083/api',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
