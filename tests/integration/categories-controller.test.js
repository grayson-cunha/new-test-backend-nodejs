import supertest from 'supertest';
import mongoose from 'mongoose';

import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';

import app from '../../src/app/app';
import Database from '../../src/config/database/database';
import Category from '../../src/app/models/category.model';
import { HttpStatus } from '../../src/app/constants/http-constants';

describe('category controller', () => {
  let categoryMock;
  const ownerId = new mongoose.Types.ObjectId();

  beforeAll(async () => {
    await Database.connect();
    await Category.deleteMany({});

    categoryMock = {
      title: 'Higiene',
      description: 'Items de higiene pessoal, pasta de dente, sabonete e etc',
      ownerId,
    };

    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('SQS', 'sendMessage', () => {
      return;
    });
  });

  afterAll(async () => {
    await Database.disconnect();
  });

  it('should return status code 201 and the category object', async () => {
    await supertest(app)
      .post('/categories')
      .send(categoryMock)
      .expect(HttpStatus.CREATED)
      .then((res) => {
        const { _id, title, description, ownerId } = res.body;

        expect(_id).toBeDefined();
        expect(title).toBe('Higiene');
        expect(description).toBe(
          'Items de higiene pessoal, pasta de dente, sabonete e etc'
        );
        expect(ownerId).toBe(ownerId);
      });
  });

  it('should return status code 200 and the category when update', async () => {
    const newCategory = Category(categoryMock);
    const category = await newCategory.save();
    const newOwnerId = new mongoose.Types.ObjectId();

    await supertest(app)
      .put(`/categories/${category._id}`)
      .send({ ownerId: newOwnerId })
      .expect(HttpStatus.OK)
      .then((res) => {
        const { _id, title, description, ownerId } = res.body;

        expect(_id).toBeDefined();
        expect(title).toBe('Higiene');
        expect(description).toBe(
          'Items de higiene pessoal, pasta de dente, sabonete e etc'
        );
        expect(ownerId).toBe(newOwnerId.toString());
      });
  });

  it('should return not found when category not found', async () => {
    const newOwnerId = new mongoose.Types.ObjectId();

    await supertest(app)
      .put(`/categories/${newOwnerId._id}`)
      .send({ ownerId: newOwnerId })
      .expect(HttpStatus.NOT_FOUND);
  });

  it('should return status code 200 and the category when delete', async () => {
    const newCategory = Category(categoryMock);
    const category = await newCategory.save();

    await supertest(app)
      .delete(`/categories/${category._id}`)
      .expect(HttpStatus.OK)
      .then((res) => {
        const { _id, title, description, ownerId } = res.body;

        expect(_id).toBeDefined();
        expect(title).toBe('Higiene');
        expect(description).toBe(
          'Items de higiene pessoal, pasta de dente, sabonete e etc'
        );
        expect(ownerId).toBe(ownerId);
      });
  });

  it('should return not found when category not found', async () => {
    const newOwnerId = new mongoose.Types.ObjectId();

    await supertest(app)
      .delete(`/categories/${newOwnerId._id}`)
      .expect(HttpStatus.NOT_FOUND);
  });
});
