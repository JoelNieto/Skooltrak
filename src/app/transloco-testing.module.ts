import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco';

import * as es from '../assets/i18n/es.json';

const getTranslocoTestingModule = (options: TranslocoTestingOptions = {}) =>
  TranslocoTestingModule.forRoot({
    langs: { es },
    translocoConfig: {
      availableLangs: ['es'],
      defaultLang: 'es',
    },
    preloadLangs: true,
    ...options,
  });

export default getTranslocoTestingModule;
