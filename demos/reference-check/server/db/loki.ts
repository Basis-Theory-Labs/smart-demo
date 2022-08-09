import Loki from 'lokijs';
import type { Driver } from '@/types';

declare global {
  // eslint-disable-next-line no-inner-declarations,no-var,vars-on-top
  var loki: Loki;
}

const seedDrivers = () => {
  const drivers = global.loki.addCollection<Driver>('drivers', {
    disableMeta: true,
  });

  drivers.on('insert', (doc) => {
    // eslint-disable-next-line no-param-reassign
    doc.id = doc.$loki;
  });

  drivers.insert({
    name: 'Charlie Conway',
    phoneNumber: '(650) 555-1212',
  } as Driver);

  drivers.insert({
    name: 'Adam Banks',
    phoneNumber: '(415) 444-3131',
  } as Driver);

  drivers.insert({
    name: 'Greg Goldberg',
    phoneNumber: '(212) 333-1515',
  } as Driver);
};

if (!global.loki) {
  global.loki = new Loki('reference-check.db');
  seedDrivers();
}

export {};
