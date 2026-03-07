export const generateSubscriptionHTML = (email: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>You're subscribed!</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                line-height: 1.6;
            }
            .wrapper {
                width: 100%;
                background-color: #f4f4f4;
                padding: 40px 0;
            }
            .container {
                max-width: 560px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 1px 4px rgba(0,0,0,0.06);
            }
            .header {
                background-color: #18181b;
                padding: 32px 40px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 40px;
            }
            .header-name {
                font-size: 16px;
                font-weight: 700;
                color: #ffffff;
                letter-spacing: 0.3px;
            }
            .header-tag {
                font-size: 11px;
                color: #a1a1aa;
                background-color: #27272a;
                border: 1px solid #3f3f46;
                border-radius: 999px;
                padding: 3px 10px;
                letter-spacing: 0.5px;
                text-transform: uppercase;
            }
            .content {
                padding: 44px 40px 36px;
            }
            .badge {
                display: inline-block;
                background-color: #eef2ff;
                color: #6366f1;
                font-size: 11px;
                font-weight: 600;
                letter-spacing: 0.5px;
                text-transform: uppercase;
                padding: 4px 12px;
                border-radius: 999px;
                margin-bottom: 20px;
            }
            .content h2 {
                font-size: 22px;
                font-weight: 700;
                color: #18181b;
                margin: 0 0 10px 0;
                letter-spacing: -0.3px;
            }
            .content p {
                font-size: 14px;
                color: #6b7280;
                margin: 0 0 28px 0;
                line-height: 1.7;
            }
            .divider {
                border: none;
                border-top: 1px solid #f0f0f0;
                margin: 0 0 24px 0;
            }
            .what-next {
                font-size: 12px;
                font-weight: 600;
                color: #9ca3af;
                text-transform: uppercase;
                letter-spacing: 0.6px;
                margin-bottom: 12px;
            }
            .checklist {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .checklist li {
                font-size: 13px;
                color: #374151;
                padding: 5px 0;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .check {
                color: #6366f1;
                font-size: 14px;
            }
            .footer {
                background-color: #fafafa;
                border-top: 1px solid #f0f0f0;
                padding: 20px 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 40px;
            }
            .footer-left {
                font-size: 11px;
                color: #9ca3af;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="container">

                <div class="header">
                    <span class="header-name">Harry's Articles</span>
                </div>

                <div class="content">
                    <div class="badge">✦ Subscribed</div>
                    <h2>You're on the list.</h2>
                    <p>Thank you for your subscription. I'll send you a heads-up whenever I publish something new.</p>

                    <hr class="divider" />

                    <p class="what-next">What to expect</p>
                    <ul class="checklist">
                        <li><span class="check">✦</span> Travel stories and places I've been</li>
                        <li><span class="check">✦</span> Food finds and recommendations</li>
                        <li><span class="check">✦</span> Life updates and personal reflections</li>
                        <li><span class="check">✦</span> Dev writeups and things I've built</li>
                    </ul>
                </div>

                <div class="footer">
                    <span class="footer-left">You're getting this email from thihaswanhtet.com. If this wasn't you, please ignore this email.</span>
                </div>

            </div>
        </div>
    </body>
    </html>
  `;
};
