# PayPal Sandbox setup

Complete this once before testing invoice payments (Phase 6).

## 1. Developer account

1. Go to [developer.paypal.com](https://developer.paypal.com)
2. Sign in or create a developer account

## 2. Sandbox REST app

1. Open **Apps & Credentials**
2. Under **Sandbox**, click **Create App**
3. Copy **Client ID** and **Secret** into `.env`:

```env
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_secret
```

## 3. Test accounts

PayPal creates default sandbox business and personal accounts. Use them to:

- Send invoices as the business account
- Pay invoices as the personal buyer account

## 4. Webhooks (production + sandbox testing)

1. In the app settings, add a webhook URL: `https://your-domain.com/api/webhooks/paypal`
2. Copy the **Webhook ID** to `PAYPAL_WEBHOOK_ID` in `.env`

## 5. Live mode

When ready for production:

1. Create a **Live** REST app
2. Set `PAYPAL_MODE=live`
3. Use live credentials and webhook URL
