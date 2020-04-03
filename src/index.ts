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
import RilNode from "./Base/RilNode";
import Business from "./Business";
import Gateway from "./Gateway";

class App extends RilNode {

  async init(): Promise<any> {
    // Init dotenv
    const result = require('dotenv').config({path: '.env'});
    if (result.error) console.error(result.error.message);
    // @nhancv 2019-09-06: Catch all unhandled Promise rejections
    process.on('unhandledRejection', function (err) {
      console.error(err);
    });
  }

  async startBusiness(): Promise<any> {
    await new Business().start();
  }

  async startGateway(): Promise<any> {
    await new Gateway().start();
  }
}

////////////////////////////////////////////////////////
/////RUN APP////////////////////////////////////////////
////////////////////////////////////////////////////////
(async () => {
  try {
    const app = new App();
    await app.init();
    await app.startBusiness();
    // await app.startGateway();
  } catch (e) {
    console.error(e.message);
  }
})();
