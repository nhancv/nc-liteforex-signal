import RilModule from "../../Base/RilModule";
import BotBase from "./TelegramBot/BotBase";


const REVERSE_LOGIC_CMD = "NLITEFOREX_REVERSE_TRIGGER";
const CHICKEND_LOGIC_CMD = "NLITEFOREX_CHICKEN_TRIGGER";

export default class NLiteForexSignal extends RilModule {
  // "AUDCAD", "AUDCHF", "AUDJPY", "AUDNZD", "AUDUSD", "CADCHF", "CADJPY", "CHFJPY", "EURAUD", "EURCAD",
  // "EURCHF", "EURGBP", "EURHKD", "EURJPY", "EURNZD", "EURSGD", "EURUSD", "GBPAUD", "GBPCAD", "GBPCHF",
  // "GBPJPY", "GBPNZD", "GBPSGD", "GBPUSD", "NZDCAD", "NZDCHF", "NZDJPY", "NZDUSD", "USDCAD", "USDCHF",
  // "USDJPY", "USDSGD", "XAUUSD"

  bot?: BotBase;

  setBot(bot?: BotBase) {
    this.bot = bot;
  }

  async start() {

    try {
      const mt4zmqBridge = require('nmt4-zmq-bridge');
      const host = process.env.ZMQ_HOST || '127.0.0.1';
      const REQ_URL = `tcp://${host}:5555`;
      const PULL_URL = `tcp://${host}:5556`;

      let zmqBridge = mt4zmqBridge.connect(REQ_URL, PULL_URL);
      zmqBridge.onPullMessage = ((command, err, body) => {
        try {
          if (command == REVERSE_LOGIC_CMD) {
            console.log(command, body.toString());
            // body:  [ 'GBPUSD', '1', '1575310560', '0.000080', '-0.000070', '0.000060' ]
            const symbol = body[0];
            const timeFrame = this.getTimeFrame(parseInt(body[1]));
            const time = body[2];
            const body1 = parseFloat(body[3]);
            const body2 = parseFloat(body[4]) >= 0 ? '🍏' : '🍎';
            const body3 = parseFloat(body[5]) >= 0 ? '🍏' : '🍎';
            if (this.bot) {
              this.bot.sendMessageToAdmin(
                `Symbol: ${symbol},${timeFrame}`
                + `\n${body1 >= 0 ? 'Đảo chiều tăng' : 'Đảo chiều giảm'}: ${body3}${body2}${body1 >= 0 ? '🍏' : '🍎'}`
                + `\nThời gian: ${time}`
              )
            }
          } else if (command == CHICKEND_LOGIC_CMD) {
            console.log(command, body.toString());
            // body:  [ 'GBPUSD', 'period', '1575310560', rsi, close price]
            const symbol = body[0];
            const period = body[1];
            const time = body[2];
            const rsi = body[3];
            const price = body[4];
            if (this.bot) {
              const msg = `Symbol: ${symbol} | ${period}`
                + `${rsi > 70 ? '\nTăng mạnh' : rsi < 30 ? '\nGiảm mạnh' : ''}`
                + `\nRSI: ${rsi} - Price: ${price}`
                + `\nThời gian: ${time}`;
              this.bot.sendMessageToAdmin(msg);
            }
          } else if (command == 'ACCOUNT') {
            // console.log('onPullMessage:', command, err, body);
          } else if (command == 'ORDERS') {
            // console.log('onPullMessage:', command, err, body);
          }
        } catch (e) {
          console.error(e);
        }
      });
      zmqBridge.reqSocket.on('connect', () => {
        console.log('reqSocket:', zmqBridge.reqConnected);
      });
      zmqBridge.pullSocket.on('connect', async () => {
        console.log('pullSocket:', zmqBridge.pullConnected);
        // zmqBridge.pullSocket.on('message', (msg) => {
        //   console.log(Buffer.from(msg).toString());
        // });
        if (zmqBridge.reqConnected && zmqBridge.pullConnected) {
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Get time frame: https://docs.mql4.com/constants/chartconstants/enum_timeframes
   * @param timeCode
   */
  getTimeFrame(timeCode: number): string {
    switch (timeCode) {
      case 1:
        return 'M1';
      case 5:
        return 'M5';
      case 10:
        return 'M10';
      case 15:
        return 'M15';
      case 30:
        return 'M30';
      case 60:
        return 'H1';
      case 240:
        return 'H4';
    }
    return '0';
  }

}
