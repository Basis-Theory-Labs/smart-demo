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

class LokiAdapter<T extends object, Q = any> implements IAdapter<T, Q> {
    models: string[] = ['users'];

    constructor(private readonly db: loki) {
    }

    create(resourceName: string, data: any, query?: Q): Promise<T> {
        return Promise.resolve(this.db.getCollection(resourceName).insert(data) as T);
    }

    delete(resourceName: string, resourceId: string | number, query?: Q): Promise<T> {
        const document = this.db.getCollection(resourceName).get(Number(resourceId));
        this.db.getCollection(resourceName).remove(document);
        return Promise.resolve(document);
    }

    getAll(resourceName: string, query?: Q): Promise<T[]> {
        return Promise.resolve(this.db.getCollection(resourceName).find());
    }

    getModels(): string[] {
        return this.models;
    }

    getOne(resourceName: string, resourceId: string | number, query?: Q): Promise<T> {
        return Promise.resolve(this.db.getCollection(resourceName).get(Number(resourceId)));
    }

    getPaginationData(resourceName: string, query: Q): Promise<TPaginationData> {
        return Promise.resolve({
            page: 0,
            total: 0,
            pageCount: 0
        });
    }

    parseQuery(resourceName: string, query?: IParsedQueryParams): Q {
        return {} as Q;
    }

    update(resourceName: string, resourceId: string | number, data: any, query?: Q): Promise<T> {
        const doc = this.db.getCollection(resourceName).get(Number(resourceId));

        return Promise.resolve(this.db.getCollection(resourceName).update({
            ...doc,
            ...data,
        }));
    }
}

const dbAdapter = new LokiAdapter(db);

export { dbAdapter };