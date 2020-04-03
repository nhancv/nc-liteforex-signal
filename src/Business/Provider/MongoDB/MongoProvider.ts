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
import {IConnection, IStore} from "./index";
import {MongoConnect, MongoUri} from "./MongoConnect";

export class MongoProvider implements IConnection<mongoose.MongoClient>, IStore<mongoose.Db> {

  private conn: mongoose.MongoClient | undefined;
  private db: mongoose.Db | undefined;

  private static _instance;

  private constructor() {
  }

  public static get instance(): MongoProvider {
    return this._instance || (this._instance = new this());
  }

  async connect(config?: MongoUri): Promise<mongoose.MongoClient> {
    if (!config) {
      config = new MongoConnect();
    }
    let url = `${config.protocol}://${config.username}:${config.password}@${config.host}/${config.dbname}`;
    this.conn = (await mongoose.MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}));
    this.db = this.conn.db(config.dbname);
    console.log('Database connected');
    return this.conn;
  }

  get store(): mongoose.Db {
    if (!this.db) {
      throw new Error("Db is not initialized yet.");
    }
    return this.db;
  }

  get connection(): mongoose.MongoClient {
    if (!this.conn) {
      throw new Error("MongoClient is not initialized yet.");
    }
    return this.conn;
  };

}
