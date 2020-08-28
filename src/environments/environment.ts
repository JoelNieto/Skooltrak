// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlAPI: 'https://localhost:5001/api/',
  /* urlAPI: 'https://api-moises.skooltrak.com/api/', */
  defaultLogo: 'assets/img/skooltrak-logo.svg',
  currentYear: 2020,
  firebase: {
    apiKey: 'AIzaSyCp5xCK__3Be3zus9szNAdbKs2Aa747GBw',
    authDomain: 'skooltrak-2019.firebaseapp.com',
    databaseURL: 'https://skooltrak-2019.firebaseio.com',
    projectId: 'skooltrak-2019',
    storageBucket: '',
    messagingSenderId: '871891364813',
    appId: '1:871891364813:web:7719cdd7ea147ba1'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
