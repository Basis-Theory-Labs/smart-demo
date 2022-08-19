import Loki from 'lokijs';
import type { Driver } from '@/types';

const MINUTE = 1000 * 60;
const HOUR = MINUTE * 60;

if (!global.loki) {
  global.loki = new Loki('reference-check.db');
  global.loki.addCollection<Driver>('sessions', {
    ttl: HOUR, // 1 hour for the document to be stale
    ttlInterval: 10 * MINUTE, // clear stale docs ever 10 min
  });
  global.loki
    .addCollection<Driver>('drivers', {
      ttl: HOUR, // 1 hour for the document to be stale
      ttlInterval: 10 * MINUTE, // clear stale docs ever 10 min
    })
    .on('insert', (doc) => {
      // eslint-disable-next-line no-param-reassign
      doc.id = doc.$loki;
    });
}

const loki = global.loki;

export { loki };
