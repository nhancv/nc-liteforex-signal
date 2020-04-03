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

import RilModule from "../../Base/RilModule";
import BotBase from "./TelegramBot/BotBase";

const notifier = require('mail-notifier');

export default class EmailNotifier extends RilModule {

  bot?: BotBase;

  setBot(bot?: BotBase) {
    this.bot = bot;
  }

  async start(): Promise<any> {

    const imap = {
      user: process.env.IMAP_USERNAME,
      password: process.env.IMAP_PASSWORD,
      host: process.env.IMAP_SERVER,
      port: process.env.IMAP_PORT,
      tls: true,
      tlsOptions: {rejectUnauthorized: false}
    };

    const n = notifier(imap);
    n.on('end', () => n.start()) // session closed
      .on('mail', mail => {
        console.log(mail.from[0].address, mail.subject);
        this.parser(mail);
      })
      .start();
  }

  /**
   * Email parser
   * @param mail
   */
  async parser(mail) {
    try {
      const subject = mail.subject;
      const from = mail.from[0].address;
      const to = mail.to[0].address;
      const body = mail.html;
      console.log(`Subject: ${subject}`
        + `\nFrom: ${from}`
        + `\nTo: ${to}`
        + `\nBody: ${body}`
      )
    } catch (e) {
      console.error(e);
    }
  }

}
