import type { Driver } from '@/types';
import './loki';

const drivers = () => global.loki.getCollection<Driver>('drivers');

const insertDriver = (doc: Driver) => drivers().insert(doc) as Driver;

const findDrivers = (query?: LokiQuery<Driver>) => drivers().find(query);

const updateDrivers = (docs: Driver | Driver[]) => drivers().update(docs);

export { insertDriver, findDrivers, updateDrivers };
