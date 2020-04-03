import moment from "moment";

export default class Util {
  static TIME_ZONE = "+0700";

  /**
   * Get current time
   */
  static currentTime() {
    return moment.utc().utcOffset(Util.TIME_ZONE);
  }

  /**
   * Generate payment code with only uppercase and number
   */
  static genId(): string {
    const generate = require('nanoid/generate');
    return generate('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 9).toUpperCase();
  }

  // @nhancv 10/13/19: Check null and undefined
  static isNull = (input: any): boolean => {
    return input === null || input === undefined
  };

  // @nhancv 10/13/19: Check string empty
  static isEmpty = (input: any): boolean => {
    return Util.isNull(input) || input.length === 0;
  };

  // @nhancv 10/13/19: Check boolean type
  static isBoolean = (input: any) => {
    return input === false || input === true;
  };

  static isString = (input: any) => {
    return Object.prototype.toString.call(input) === "[object String]"
  };
}
