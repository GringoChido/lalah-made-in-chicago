# MailerLite setup — September 24, 2026

## Status

Account access works through Josh's signed-in Chrome session. The website is configured for this account with **signups deliberately paused** (`newsletter.enabled: false` in `lib/newsletter.ts`). The review site can publish this gated integration now. Enable signups only after domain authentication succeeds and the native form POST and confirmation-email flow are tested with an authorized test address.

- Account: Lalah Hathaway, account ID `2658792`.
- Form: Lalah Hathaway — Website signup, ID `199524202727868094`.
- Form overview: https://dashboard.mailerlite.com/forms/199524202727868094/overview
- Group: Lalah Hathaway — Website signups (created empty; no list import).
- Double opt-in is enabled. The default confirmation sender is `Lalah Hathaway (josh@secondsonproductions.com)`; confirm this sender with Josh before activation.
- User-consent checkbox is enabled in MailerLite and required in the site integration when enabled.
- No API keys created, campaigns sent, subscribers imported, or DNS records changed.
- The gated signup displays “Coming soon,” disables the email, consent and submit controls, and omits the form action. It does not submit visitors’ addresses while authentication is blocked.
- Local validation: `npm run build:netlify` passed (9 static pages); `git diff --check` passed. No actual subscription or confirmation-delivery test has been performed while authentication is blocked.

## Activation blocker

MailerLite reports: “Sender email domain must be authenticated and verified before you can enable this form.” Rechecking records did not clear the blocker.

The sending domain is `secondsonproductions.com`. Public nameservers are `ns1.justhost.com` and `ns2.justhost.com`.

MailerLite domain setup: https://dashboard.mailerlite.com/configuration/domains

Records requested by the account UI:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `litesrv._domainkey` | `litesrv._domainkey.mlsend.com` |
| TXT | `@` | `mailerlite-domain-verification=652dd99a889cfb0750dd3b4ced3a63e089ed4553` |

SPF also needs reconciliation. Public DNS currently returns **two** SPF TXT records:

```
v=spf1 include:_spf.google.com ~all
v=spf1 include:mail1.wpengine.com include:relay.mailchannels.net ~all
```

The MailerLite UI suggests `v=spf1 include:_spf.mlsend.com include:_spf.google.com ~all`, which omits the existing WP Engine and MailChannels senders. The DNS administrator should confirm which senders remain in use, merge the authorized senders into a single SPF policy including MailerLite, and check its expanded DNS lookup count. Do not blindly replace existing records with the UI suggestion or delete unrelated TXT records. Obtain authorization for the exact DNS change before applying it.

## Prepared website connection

`lib/newsletter.ts` stores the public form action and activation switch. `components/preview-forms.tsx` keeps the existing signup styling and consent UI, uses the native POST action and hidden fields copied from this account's generated HTML, and opens MailerLite's result in a new tab. No API token is needed. It does not claim subscription success on submission. Contact form behavior is unchanged.

- Public form action: `https://assets.mailerlite.com/jsonp/2658792/forms/199524202727868094/subscribe`
- Email field: `fields[email]`
- Hidden fields: `ml-submit=1`, `anticsrf=true`
- Official exported form uses `method=post`, `target=_blank`.
- Public share link: https://preview.mailerlite.io/forms/2658792/199524202727868094/share
- Embed identifier: `UZomXx`
- Official HTML customization guidance: https://www.mailerlite.com/help/how-to-create-an-embedded-form

## Finish after authentication

1. Confirm the sender address; complete domain verification/authentication through the authorized domain administrator.
2. Verify the form is enabled and double opt-in remains on.
3. Test native POST response and actual confirmation delivery with a user-approved test address. Verify group membership and activation only after confirmation. Adjust to the official scripted embed if the native response does not provide a usable confirmation page.
4. Set `newsletter.enabled` to true only after the test succeeds. Check desktop/mobile styling and client validation, commit to `client-feedback-sept-13`, deploy the existing Netlify review site, and verify the live signup.
5. Keep the Bandzoogle/list-import task separate until Steph supplies exports and subscription/opt-out status.
