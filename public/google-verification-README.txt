GOOGLE SEARCH CONSOLE HTML FILE VERIFICATION
==============================================

If you choose the "HTML file" verification method in Google Search Console:

1. Download the genuine verification file provided by Google Search Console
   (for example: google1234567890abcdef.html).
2. Place that exact file directly inside this `public/` directory.
3. Deploy to Vercel. It will be served publicly at:
   https://YOUR-DOMAIN/google1234567890abcdef.html
4. Never fabricate or guess a verification file — only use the file downloaded
   from your own Google Search Console property.

Recommended alternative: Use DNS TXT verification (see GOOGLE_VERIFICATION.md)
or set the GOOGLE_SITE_VERIFICATION environment variable in Vercel.
