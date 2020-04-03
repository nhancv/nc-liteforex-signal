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

import Base from "./Base";
import {MongoProvider} from "../MongoProvider";
import * as mongoose from "mongodb";

const log = console.log;
const loge = console.error;

/**
 * This class helper generate data
 */
export class Octopus {
  private readonly db: mongoose.Db;

  constructor() {
    this.db = MongoProvider.instance.store;
  }

  dropCollection(collectionArray: string[]): Promise<any> {
    let fn = async (collectionName: string) => {
      try {
        mongoose.ObjectID.generate();
        await this.db.collection(collectionName).drop();
        log("Collection %s deleted", collectionName);
      } catch (e) {
        loge(`Drop ${collectionName} e.message`)
      }
      try {
        await this.db.createCollection(collectionName);
        log("Collection %s created!", collectionName);
      } catch (e) {
        loge(e.message)
      }
    };
    return Promise.all(collectionArray.map(fn));
  }

  initData(base: Base): Promise<any> {
    if (!base.getTableData() || base.getTableData().length === 0) {
      return this.db.createCollection(base.getTableName());
    } else {
      let fn = async (item: any) => {
        try {
          await this.db.collection(base.getTableName()).insertOne(item);
        } catch (e) {
          loge(e.message);
        }
      };
      return Promise.all(base.getTableData().map(fn));
    }
  }

  finish() {
    if (this.db) MongoProvider.instance.connection.close(() => {
      log("Connection closed!");
    });
  }
}
