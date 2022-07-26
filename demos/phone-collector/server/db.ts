import loki from 'lokijs'
import {IAdapter, IParsedQueryParams, TPaginationData} from "@premieroctet/next-crud";

const db = new loki('phone-collector.db');
const users = db.addCollection('users', {
    disableMeta: true
});

users.on('insert', doc => {
    doc.id = doc.$loki
});

users.insert({
    name: 'Drewsue Webuino'
});

export { users };