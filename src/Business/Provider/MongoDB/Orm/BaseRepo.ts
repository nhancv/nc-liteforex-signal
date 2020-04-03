/*
 * MIT License
 *
 * Copyright (c) 2018 Nhan Cao
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import * as mongoose from "mongodb";
import {FilterQuery} from "mongodb";
import {MongoProvider} from "../MongoProvider";

const logger = console;

export interface IWrite<T> {
  create(item: T): Promise<boolean>;

  update(query: object, item: T | object): Promise<boolean>;

  replace(query: object, item: T | object): Promise<boolean>;

  delete(query: object): Promise<boolean>;
}

export interface IRead<T> {
  find(item: object): Promise<T[]>;

  findOne(query: FilterQuery<any>): Promise<T | null>;

  findByManyId(ids: string[]): Promise<T[]>;
}

export abstract class BaseRepo<T> implements IWrite<T>, IRead<T> {

  protected readonly collection: mongoose.Collection;

  protected constructor(collectionName: string) {
    this.collection = MongoProvider.instance.store.collection(collectionName);
  }

  async create(item: T): Promise<boolean> {
    try {
      const result: mongoose.InsertOneWriteOpResult<T> = await this.collection.insertOne(item);
      return !!result.result.ok && !!result.result.n;
    } catch (e) {
      logger.error(e.message);
      return false;
    }
  }

  async insertMany(item: T[]): Promise<boolean> {
    try {
      const result: mongoose.InsertWriteOpResult<T> = await this.collection.insertMany(item);
      return !!result.result.ok && !!result.result.n;
    } catch (e) {
      logger.error(e.message);
      return false;
    }
  }

  async update(query: object, item: T | object): Promise<boolean> {
    try {
      const result: mongoose.UpdateWriteOpResult = await this.collection.updateOne(query, {$set: item});
      return !!result.result.ok && !!result.result.n;
    } catch (e) {
      logger.error(e.message);
      return false;
    }
  }

  async replace(query: object, doc: object): Promise<boolean> {
    try {
      const result: mongoose.UpdateWriteOpResult = await this.collection.replaceOne(query, doc);
      return !!result.result.ok && !!result.result.n;
    } catch (e) {
      logger.error(e.message);
      return false;
    }
  }

  async delete(query: object): Promise<boolean> {
    try {
      const result: mongoose.DeleteWriteOpResultObject = await this.collection.deleteOne(query);
      return !!result.result.ok && !!result.result.n;
    } catch (e) {
      logger.error(e.message);
      return false;
    }
  }

  async deleteMany(query: object): Promise<boolean> {
    try {
      const result: mongoose.DeleteWriteOpResultObject = await this.collection.deleteMany(query);
      return !!result.result.ok && !!result.result.n;
    } catch (e) {
      logger.error(e.message);
      return false;
    }
  }

  async find(item: object): Promise<T[]> {
    try {
      return await this.collection.find(item).toArray();
    } catch (e) {
      logger.error(e.message);
      return [];
    }
  }

  async findOne(query: FilterQuery<any>): Promise<T | null> {
    try {
      return await this.collection.findOne(query);
    } catch (e) {
      logger.error(e.message);
      return null;
    }
  }

  async getAll(): Promise<T[]> {
    try {
      return await this.collection.find({}).toArray();
    } catch (e) {
      logger.error(e.message);
      return [];
    }
  }

  async findByManyId(ids: string[]): Promise<any[]> {
    try {
      return await this.collection.find({_id: {$in: ids}}).toArray();
    } catch (e) {
      logger.error(e.message);
      return [];
    }
  }
}
