/* eslint-disable @typescript-eslint/no-unused-expressions */
import { MongoClient, ObjectId } from 'mongodb';
import db from 'api/db';
import Sinon = require('cypress/types/sinon');

const uri = 'example_uri';
const collectionName = 'example_collection';
const id = '012345678901234567890123';
const findResults: unknown[] = [];
let mockedDb: { collection: Sinon.SinonStub };
let mockedCollection: {
  collectionName: string;
  find: Sinon.SinonStub;
  insertOne: Sinon.SinonStub;
  deleteOne: Cypress.Agent<Sinon.SinonStub>;
};

describe('Db utils', () => {
  before(() => {
    mockedCollection = {
      collectionName,
      find: cy.stub().returns({ toArray: cy.stub().resolves(findResults) }),
      insertOne: cy.stub().returns({ insertedId: new ObjectId(id) }),
      deleteOne: cy.stub(),
    };
    mockedDb = {
      collection: cy.stub().withArgs(collectionName).returns(mockedCollection),
    };
  });

  beforeEach(() => {
    const originalEnv = process.env;
    process.env = { ...originalEnv, MONGODB_URI: uri };

    const mockedClient = { db: cy.stub().returns(mockedDb) };
    cy.stub(MongoClient, 'connect').resolves(mockedClient as never);
  });

  it('throws an error in db.getDbUri() without env var', () => {
    delete process.env.MONGODB_URI;

    cy.wrap(db.getDbUri).should('throw');
  });

  it('returns the uri without throwing error in db.getDbUri() with env var', () => {
    expect(db.getDbUri()).to.eq(uri);
  });

  it('calls mongodb connect in db.connectToDb()', async () => {
    const database = await db.connectToDb();

    expect(MongoClient.connect).to.have.been.calledOnce;
    expect(database).to.eq(mockedDb);
  });

  it('calls db method collection() in db.connectToCollection()', async () => {
    const collection = await db.connectToCollection(collectionName);

    expect(mockedDb.collection).to.have.been.calledOnce;
    expect(collection.collectionName).to.eq(collectionName);
  });

  it('calls collection method find() in db.find()', async () => {
    const result = await db.find(collectionName);

    expect(mockedCollection.find).to.have.been.calledOnce;
    expect(result).to.eq(findResults);
  });

  it('calls collection method insertOne() in db.insert()', async () => {
    const document = { username: 'example_username' };

    const result = await db.insert(collectionName, document);

    expect(mockedCollection.insertOne).to.have.been.calledOnce;
    expect(mockedCollection.insertOne).to.be.calledWith(document);
    expect(result).to.eq(id);
  });

  it('calls collection method deleteOne() in db.remove()', async () => {
    await db.remove(collectionName, id);

    expect(mockedCollection.deleteOne).to.have.been.calledOnce;
    expect(mockedCollection.deleteOne).to.be.calledWith({ _id: new ObjectId(id) });
  });
});
