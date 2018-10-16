import { WebClient, WebAPICallResult } from '@slack/client';
import { config } from 'dotenv';
import { IOptions } from './options';
import { bar } from './bar';

config();

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

  constructor(token: string, channel: string, ts?: string, options?: IOptions) {
    this.channel = channel;
    this.options = { ...defaultOptions, ...options };
    this.ts = ts;
    this.web = new WebClient(token);
  }

  update = async (position: number) => {
    const percent = Math.round(position);
    try {
      const { ts } = (await this.post(percent)) as IMessageResult;
      return ts;
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
          text: ` ${percent}% ${bar(percent)}`
        }
      ]
    };

    return this.ts
      ? await chat.update({ ...args, ts: this.ts })
      : await chat.postMessage(args);
  };
}

const staticProgress = (
  token: string,
  channel: string,
  progess: number,
  ts: string
) => {};

export { Progress, bar };
