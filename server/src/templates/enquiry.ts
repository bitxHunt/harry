import { enquiry } from "@/generated/client";

export const generateEnquiryHTML = (enquiryData: enquiry): string => {
  const { name, email, message } = enquiryData;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Enquiry</title>
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
            }
            .header-name {
                font-size: 16px;
                font-weight: 700;
                color: #ffffff;
                letter-spacing: 0.3px;
            }
            .content {
                padding: 40px 40px 32px;
            }
            .content h2 {
                font-size: 22px;
                font-weight: 700;
                color: #18181b;
                margin: 0 0 8px 0;
                letter-spacing: -0.3px;
            }
            .content > p {
                font-size: 14px;
                color: #6b7280;
                margin: 0 0 32px 0;
                line-height: 1.7;
            }
            .field {
                margin-bottom: 20px;
            }
            .field-label {
                font-size: 11px;
                font-weight: 600;
                color: #9ca3af;
                text-transform: uppercase;
                letter-spacing: 0.6px;
                margin-bottom: 4px;
            }
            .field-value {
                font-size: 14px;
                color: #18181b;
                font-weight: 500;
            }
            .divider {
                border: none;
                border-top: 1px solid #f0f0f0;
                margin: 24px 0;
            }
            .message-body {
                font-size: 14px;
                color: #374151;
                white-space: pre-line;
                background-color: #f9fafb;
                padding: 14px 16px;
                border-radius: 6px;
                line-height: 1.7;
            }
            .footer {
                background-color: #fafafa;
                border-top: 1px solid #f0f0f0;
                padding: 20px 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
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
                    <span class="header-name">Harry's Enquiry</span>
                </div>

                <div class="content">
                    <h2>Someone reached out.</h2>
                    <p>You received a new enquiry through your portfolio contact form.</p>

                    <div class="field">
                        <div class="field-label">Name</div>
                        <div class="field-value">${name}</div>
                    </div>

                    <div class="field">
                        <div class="field-label">Email</div>
                        <div class="field-value">${email}</div>
                    </div>

                    <hr class="divider" />

                    <div class="field">
                        <div class="field-label">Message</div>
                        <div class="message-body">${message}</div>
                    </div>
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
