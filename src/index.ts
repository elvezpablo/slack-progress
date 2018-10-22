import { Progress, progress } from './progress';
import { config } from 'dotenv';

config();

const { env } = process;

const token = env.ACCESS_TOKEN;
const channel = env.CHANNEL;

const progressInstance = new Progress(token, channel);

let count = 1;
let ts;

const timer = setInterval(async () => {
  progressInstance.update(count);
  console.log('ts: ', ts);
  // ts = await progress(token, channel, count, ts);
  count += 1;
  if (count > 10) {
    clearInterval(timer);
  }
  // console.log(ts);
}, 700);

export { Progress };
