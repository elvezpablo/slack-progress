import { WebClient, WebAPICallResult } from '@slack/client';

import { IOptions } from './options';
import { bar } from './bar';

const defaultOptions = {
  message: 'Progress Happens'
};

interface IMessageResult extends WebAPICallResult {
  ts: string;
}

class Progress {
  private channel: string;
  private web: WebClient;
  private options: IOptions;
  private ts?: string;

  constructor(token: string, channel: string, options?: IOptions) {
    this.channel = channel;
    this.options = { ...defaultOptions, ...options };
    this.web = new WebClient(token);
  }

  update = async (position: number, ts?: string, message?: string) => {
    const percent = Math.round(position);
    if (ts) {
      this.ts = ts;
    }
    try {
      const result = (await this.post(percent)) as IMessageResult;
      this.ts = result.ts;
      return this.ts;
    } catch (err) {
      console.log('err!: ', err);
    }
  };

  post = async (percent: number) => {
    const { message } = this.options;
    const { chat } = this.web;
    const args = {
      channel: this.channel,
      text: message,
      attachments: [
        {
          text: ` ${percent}0% ${bar(percent)}`
        }
      ]
    };

    return this.ts
      ? await chat.update({ ...args, ts: this.ts })
      : await chat.postMessage(args);
  };
}

const progress = async (
  token: string,
  channel: string,
  status: number,
  ts?: string
) => {
  return await new Progress(token, channel).update(status, ts);
};

export { Progress, bar, progress };
