import _merge from 'lodash/merge';
import type { Driver } from '@/types';
import { loki } from './loki';

const drivers = () => loki.getCollection<Driver>('drivers');

const seedDrivers = (tenant: string) => {
  drivers().insert({
    name: 'Charlie Conway',
    phoneNumber: '(650) 555-1212',
    tenant,
  } as Driver);

  drivers().insert({
    name: 'Adam Banks',
    phoneNumber: '(415) 444-3131',
    tenant,
  } as Driver);

  drivers().insert({
    name: 'Greg Goldberg',
    phoneNumber: '(212) 333-1515',
    tenant,
  } as Driver);
};

const insertDriver = (tenant: string, doc: Omit<Driver, 'tenant'>) =>
  drivers().insert({
    ...doc,
    tenant,
  }) as Driver;

const findDrivers = (tenant: string, query: LokiQuery<Driver> = {}) =>
  drivers().find(
    _merge(query, {
      tenant: {
        $eq: tenant,
      },
    })
  );

const updateDrivers = (docs: Driver | Driver[]) => drivers().update(docs);

const removeDrivers = (tenant: string) => {
  drivers().removeWhere({
    tenant: {
      $eq: tenant,
    },
  });
};

export { insertDriver, findDrivers, updateDrivers, removeDrivers, seedDrivers };
