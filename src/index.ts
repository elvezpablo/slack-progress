import { Progress } from './progress';

const token = process.env.ACCESS_TOKEN;
const channel = 'progress-bot-channel';

const doIt = async () => {
  const timestamp = '1539723885.000100';
  const progress = new Progress(token, channel);

  const ts = await progress.update(5);
  console.log(ts);
};

doIt();
