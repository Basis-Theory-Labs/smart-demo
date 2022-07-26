import loki from 'lokijs'

const db = new loki('phone-collector.db');
const users = db.addCollection('users', {
    disableMeta: true
});

users.on('insert', doc => {
    doc.id = doc.$loki
});

users.insert({
    name: 'Drewsue Webuino',
    phoneNumber: '555-123-5691'
});

export { users };