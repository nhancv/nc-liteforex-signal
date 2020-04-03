/*
 * Developed by Nhan Cao on 11/22/19, 2:49 PM.
 * Last modified 11/22/19, 2:49 PM.
 * Copyright (c) 2019 Rilthot. All rights reserved.
 */

export interface Module {
  create(): Promise<any>;

  start(): Promise<any>;

  stop(): Promise<any>;

  destroy(): Promise<any>;
}

export default abstract class RilModule implements Module {
  async create(): Promise<any> {
    return undefined;
  }

  async destroy(): Promise<any> {
    return undefined;
  }

  async stop(): Promise<any> {
    return undefined;
  }

  abstract start(): Promise<any>;

}
