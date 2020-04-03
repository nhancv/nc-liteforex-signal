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

import {Octopus} from "./InitData/Octopus";
import {SystemRepo} from "./Orm/SystemRepo";
import {System} from "../../Model/System";
import {InitSystem} from "./InitData/InitSystem";

const logger = console;

// Run on main index.ts
export class MongoMigrate {
  async migrate() {
    try {
      // @nhancv 9/17/19: Populate data
      const octopus = new Octopus();
      let systemConfigs = await new SystemRepo().getAll();
      let config: System = systemConfigs[0];
      if (config == undefined) {
        // @nhancv 9/22/19: Re-init system config
        await octopus.initData(new InitSystem());
        systemConfigs = await new SystemRepo().getAll();
        config = systemConfigs[0];
      }
      let dbVersion: number = config ? config.hasOwnProperty("dbVersion") ? config.dbVersion : 0 : 0;
      logger.info(`Current database version: ${dbVersion}`);
      if (dbVersion == 0) {
        logger.info(`Migrating from version ${dbVersion}`);
        //@nhancv 11/29/19
        //TODO: Do something here for first version like initial tables
        //...

        // Increase dbVersion to 1
        config.dbVersion = 1;
        dbVersion = config.dbVersion;
        // Update new config object
        await new SystemRepo().update({_id: config._id}, config);
        logger.info(`Migrate to version ${dbVersion} completely`);
      }

    } catch
      (e) {
      logger.error(e);
    }
  }
}
