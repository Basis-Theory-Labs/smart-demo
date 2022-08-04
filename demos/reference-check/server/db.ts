import loki from 'lokijs';

declare global {
  var loki: loki;
}

if (!global.loki) {
  global.loki = new loki('phone-collector.db', {
    persistenceMethod: 'fs',
  });
  const users = global.loki.addCollection('users', {
    disableMeta: true,
  });
  users.on('insert', (doc) => {
    doc.id = doc.$loki;
  });

  users.insert({
    name: 'Drewsue Webuino',
    phoneNumber: '555-123-5691',
  });
  console.log('seeding...');
}

const users = () => global.loki.getCollection('users');

const insertUser = (doc: any) => {
  return users().insert(doc);
};

const findUsers = () => {
  return users().find();
};

export { insertUser, findUsers };
