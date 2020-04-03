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
import BotBase from "./TelegramBot/BotBase";

const fs = require('fs');
const readline = require('readline');

export default class CronJob {

  bot?: BotBase;

  setBot(bot?: BotBase) {
    this.bot = bot;
  }

  async execute() {
    // @nhancv 10/16/19: Config cron
    // Seconds: 0-59
    // Minutes: 0-59
    // Hours: 0-23
    // Day of Month: 1-31
    // Months: 0-11 (Jan-Dec)
    // Day of Week: 0-6 (Sun-Sat)
    // '* * * * * *' => run every second
    // '* * * * *' => run every minute
    const CronJob = require('cron').CronJob;
    const job = new CronJob({
      // cronTime: '00 00 00 * * *',
      cronTime: '* * * * *',
      onTick: async () => {
        /*
         * Runs every minute.
         */
        try {
          //@nhancv 11/29/19
          //TODO: Do something here
          //...
          console.log('CronJob checking');
        } catch (e) {
          console.error(e);
        }
      },
      start: false,
      timeZone: 'Asia/Ho_Chi_Minh'
    });
    job.start();
  }
}

