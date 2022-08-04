import type { Driver } from '@/types';
import './loki';

const drivers = () => global.loki.getCollection('drivers');

const insertDriver = (doc: Driver) => drivers().insert(doc);

const findDrivers = () => drivers().find();

export { insertDriver, findDrivers };
