# Slack Progress Bar

An async progress bar to animate long running processes.

## Update messages via chat

Uses WebClient `chat` methods `postMessage` and `update`

```json
{
  "text": "TeamCity Progress ",
  "attachments": [
    {
      "text": "50% ⬛⬛⬛⬛⬛⬜⬜⬜⬜⬜"
    }
  ]
}
```

## References and prior art

- https://api.slack.com/methods/chat.update
- https://api.slack.com/methods/chat.postMessage
- https://github.com/bcicen/slack-progress
- https://github.com/sfreiberg/progress/blob/master/progress.go
- https://api.slack.com/docs/messages/builder
