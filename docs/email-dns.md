# Production email DNS (Phase 4)

Configure these DNS records on your sending domain before going live.

## SPF

Add a TXT record authorizing your SMTP server to send mail for the domain.

## DKIM

Configure DKIM signing with your mail provider and publish the public key as a TXT record.

## DMARC

Add a DMARC policy record (start with `p=none` for monitoring, then tighten to `quarantine` or `reject`).

## Verification

After DNS propagates, send test messages to [mail-tester.com](https://www.mail-tester.com) and confirm SPF, DKIM, and DMARC pass.
