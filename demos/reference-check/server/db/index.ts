declare global {
  /* eslint-disable no-inner-declarations,no-var,vars-on-top */
  var loki: Loki;
  var publicApiKey: string;
  var privateApiKey: string;
  /* eslint-enable no-inner-declarations,no-var,vars-on-top */
}

export * from './drivers';
