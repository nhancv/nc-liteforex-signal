/*
 * Developed by Nhan Cao on 11/22/19, 2:49 PM.
 * Last modified 11/22/19, 2:49 PM.
 * Copyright (c) 2019 Rilthot. All rights reserved.
 */

export interface Node {
  init(): Promise<any>;

  startGateway(): Promise<any>;

  startBusiness(): Promise<any>;
}

export default abstract class RilNode implements Node {

  async startGateway(): Promise<any> {
    return undefined;
  }

  abstract startBusiness(): Promise<any>;

  abstract init(): Promise<any>;

}
