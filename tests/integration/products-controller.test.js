import supertest from 'supertest';
import mongoose from 'mongoose';

import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';

import app from '../../src/app/app';
import Database from '../../src/config/database/database';
import Category from '../../src/app/models/category.model';
import { HttpStatus } from '../../src/app/constants/http-constants';
import Product from '../../src/app/models/product.model';

describe('product controller', () => {
  let productMock;
  const ownerId = new mongoose.Types.ObjectId();

  beforeAll(async () => {
    await Database.connect();
    await Product.deleteMany({});

    productMock = {
      title: 'Pasta de dente',
      description: 'Pasta de dente',
      price: 12.99,
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
    const newCategory = Category({
      title: 'teste',
      description: 'teste',
      ownerId,
    });
    const savedCategory = await newCategory.save();

    await supertest(app)
      .post('/products')
      .send({ ...productMock, category: savedCategory._id })
      .expect(HttpStatus.CREATED)
      .then((res) => {
        const { _id, title, description, price, category, ownerId } = res.body;

        expect(_id).toBeDefined();
        expect(title).toBe('Pasta de dente');
        expect(description).toBe('Pasta de dente');
        expect(price).toBe(12.99);
        expect(category).toBe(savedCategory._id.toString());
        expect(ownerId).toBe(ownerId);
      });
  });

  it('should return status code 200 and the category when update', async () => {
    const NewCategory = Category({
      title: 'teste',
      description: 'teste',
      ownerId,
    });
    const savedCategory = await NewCategory.save();

    const newProduct = Product({ ...productMock, category: savedCategory._id });
    const savedProduct = await newProduct.save();

    await supertest(app)
      .put(`/products/${savedProduct._id}`)
      .send({ title: 'sabonete', description: 'sabonete' })
      .expect(HttpStatus.OK)
      .then((res) => {
        const { _id, title, description, price, category, ownerId } = res.body;

        expect(_id).toBeDefined();
        expect(title).toBe('sabonete');
        expect(description).toBe('sabonete');
        expect(price).toBe(12.99);
        expect(category).toBe(savedCategory._id.toString());
        expect(ownerId).toBe(ownerId);
      });
  });

  it('should return not found when product not found', async () => {
    const newOwnerId = new mongoose.Types.ObjectId();

    await supertest(app)
      .put(`/products/${newOwnerId._id}`)
      .send({ ownerId: newOwnerId })
      .expect(HttpStatus.NOT_FOUND);
  });

  it('should return status code 200 and the category when delete', async () => {
    const newProduct = Product({ ...productMock });
    const savedProduct = await newProduct.save();

    await supertest(app)
      .delete(`/products/${savedProduct._id}`)
      .expect(HttpStatus.OK)
      .then((res) => {
        const { _id, title, description, price, ownerId } = res.body;

        expect(_id).toBeDefined();
        expect(title).toBe('Pasta de dente');
        expect(description).toBe('Pasta de dente');
        expect(price).toBe(12.99);
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
