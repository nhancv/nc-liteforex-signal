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

import RilModule from "../Base/RilModule";
import NLiteForexSignal from "./Provider/NLiteForexSignal";
import NLiteForexSignalBot from "./Provider/TelegramBot/NLiteForexSignalBot";

export default class Business extends RilModule {
  async start(): Promise<any> {
    // @nhancv 9/16/19: Connect db
    // await MongoProvider.instance.connect();
    // @nhancv 9/16/19: Check migrate
    // await new MongoMigrate().migrate();
    // @nhancv 11/22/19: Start bot
    const bot = new NLiteForexSignalBot();
    await bot.create();
    await bot.start();
    // @nhancv 11/23/19: Start email listener
    // const emailNotifier = new EmailNotifier();
    // emailNotifier.setBot(bot);
    // await emailNotifier.start();
    // @nhancv 11/27/19: Run cron job
    // const cronJob = new CronJob();
    // cronJob.setBot(bot);
    // await cronJob.execute();
    // @nhancv 12/2/19: Start NLiteForexSignal
    const forexSignal = new NLiteForexSignal();
    forexSignal.setBot(bot);
    await forexSignal.start();
  }

}
