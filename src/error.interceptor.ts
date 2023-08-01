import { ArgumentsHost, Catch } from '@nestjs/common';

@Catch()
export class ExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToRpc();
    const data = ctx.getData();
    console.error(data, exception);
    this.sendToDiscord({data, exception})
  }

    private sendToDiscord({data, exception}: {data: any, exception: any}) {
        const payload = {
            content: null,
            embeds: [
              {
                title: 'An Error occured that was not catched',
                description: 'See in docker logs for more details',
                color: 16726329,
                fields: [
                  {
                    name: 'ArgumentHost Data',
                    value: `\`\`\`\n${data}\n\`\`\``,
                  },
                  {
                    name: 'Exception',
                    value: `\`\`\`\n${exception}\n\`\`\``,
                  },
                ],
                author: {
                  name: 'Exception Filter @ Mailer',
                },
                timestamp: new Date().toUTCString(),
              },
            ],
            attachments: [],
          };

        fetch(process.env.DISCORD_WEBHOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then(() => console.log("Reported to Discord"))
        .catch(() => console.log("Failed to report to Discord"));
        
    }
}
