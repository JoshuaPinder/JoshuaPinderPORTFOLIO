# VICIOUS KITTEN — Redesign V2

**This is the updated, local, single-page website concept.** All five supplied band photos and your official white cat/logo artwork are included in the ZIP. There is no build step, package manager, or framework — it is editable HTML, CSS and JavaScript.

## How to preview

1. Extract the entire ZIP. **Do not move `index.html` away from the `css`, `js`, and `assets` folders.**
2. Open `index.html` in Chrome, Edge or Firefox. The main layout, photos, socials, gig list, gallery and navigation can be previewed without hosting. Internet access is needed for Google Fonts and the original-site streaming demo MP3s.
3. To get a private hosted preview, upload the **contents** of this folder to a private static-hosting project such as Cloudflare Pages or Netlify. When hosted, `index.html` needs to be at the root of the published site.

**Privacy:** `robots.txt` and the `noindex, nofollow` meta tag discourage indexing, but **do not password-protect the preview**. Use real password/access controls if only band members should be able to see it. Remove `noindex` and update robots rules if you replace your public website with this version.

## CHANGE COLOURS — this is the easy bit

Open `css/styles.css`. Every rule is **on separate lines**, and there are clear numbered headings for each area of the page. Edit the variables at the **very top**:

```css
:root {
  --black: #111014;         /* page background */
  --blackest: #0B0A0F;      /* deepest background */
  --panel: #1C1920;         /* cards and surfaces */
  --cream: #FAF9FA;         /* primary text */
  --paper: #F5F3F5;         /* light panel / setlist */
  --accent: #D71938;       /* MAIN RED — buttons, headlines and details */
  --accent-deep: #A80D2B;  /* dark red / hover */
  --purple: #422149;       /* deep purple used sparingly */
  --muted: #B9B4BE;        /* secondary text */
}
```

Those are the key colours (other variables for fonts and layout width are in the same block). Use Ctrl+F in `styles.css` to find individual areas such as `.hero`, `.social-section`, `.member-photo`, `.booking-section` or `.site-header`. Some specialised backgrounds/shadows have additional colours in their own rules.

### Change sizes and spacing

Change `font-size`, `padding`, `gap` or `height` in the appropriate rule of `css/styles.css`. Search the selector name using Ctrl+F. For example:

- `.hero h1` — big opening headline size
- `.member-photo` — height of individual band-photo cards
- `.brand-logo` — header logo size
- `.social-card` — Facebook / Instagram / TikTok button sizes
- `.footer-brand-logo` — footer logo size

Responsive adjustments for tablets and phones are under the `@media` rules toward the bottom of the stylesheet. **Check the mobile rules when changing desktop dimensions.**

## Change member photos, gallery or group image

The five files are here:

```
assets/band-group.webp  ← opening group photo, about section, gallery
assets/hannah.webp      ← Hannah member photo + gallery
assets/charlie.webp     ← Charlie member photo + gallery
assets/josh.webp        ← Josh member photo + gallery
assets/dan.webp         ← Dan member photo + gallery
```

These are optimised copies of the actual pictures you supplied. The logo is `assets/vicious-kitten-logo.webp`, and the favicon is `assets/favicon.png`, made from that logo.

To replace a photo, either **overwrite** the matching `.webp` with your new WebP image of the same name or edit its path in `js/content.js`. The `photos` object controls where images appear, and the `gallery` array controls which of those images also appear in the lightbox.

## Update social media

Open `js/content.js`, and edit the `socials` object. The current links are:

- Facebook — https://www.facebook.com/viciouskittenband
- Instagram — https://www.instagram.com/viciouskittenband/
- TikTok — https://www.tiktok.com/@vicious.kitten

These links are used in a featured **Follow the band** section and the footer. The live-date section uses Facebook as its fallback for announcements. Social cards are ordinary outgoing links; no platform feed widgets/tracking or permissions are required.

## Add confirmed future gig dates

In `js/content.js`, change the empty `gigs: []` list to real entries. Example data (fictional — do not publish it as a real show):

```js
gigs: [
  {
    date: '2027-02-20',
    venue: 'Example Venue',
    town: 'Plymouth',
    time: '9:00 PM',
    url: 'https://example.com/events/vicious-kitten'
  }
],
```

Dates are sorted automatically, and old dates are hidden.

## Add a GoPro gig video

Share a **public/viewable** GoPro link, then in the `videos` array of `js/content.js`, add:

```js
{
  title: 'Live at [venue]',
  tag: 'GOPRO / LIVE',
  url: 'https://gopro.com/v/your-real-share-link',
  photo: 'bandLive'
}
```

The video card opens the GoPro share page in a new tab. Inline GoPro playback is NOT claimed: embedding varies by the GoPro sharing service. If you upload a hosted MP4 or YouTube video in a later revision, we can add inline playback instead.

## Notes before switching the public domain

- **Audio demos:** these still stream from the existing Squarespace website. If that website goes away, replace the demo `src` URLs in `js/content.js` with audio you host yourself.
- **Bookings:** the enquiry button deliberately links to the existing `https://www.viciouskitten.band/contact` form. **Do not replace that public site until you've replaced this booking link with a working contact form or email solution.**
- **Gigs:** left empty because no future dates were supplied.
- **External extras:** existing merch, blog, and The Pause links are left as in V1; check those destinations before launch.
- **Fonts:** Google Fonts loads Barlow Condensed and DM Sans; browsers use fallback fonts when offline.
- **Metadata:** the site is set to `noindex` for a preview. Add a proper absolute social-sharing image URL and remove `noindex` for production.

## Files at a glance

```
index.html                       Webpage / sections / metadata
css/styles.css                   FORMATTED and COMMENTED styles + theme variables
js/content.js                    Photos, band members, socials, gig dates, demos, videos
js/app.js                        Interactive player, navigation, gallery, gig list, etc.
assets/band-group.webp           Your London Inn full-band photo
assets/hannah.webp               New individual photo
assets/charlie.webp              New individual photo
assets/josh.webp                 New individual photo
assets/dan.webp                  New individual photo
assets/vicious-kitten-logo.webp  Official VK artwork (transparent background)
assets/favicon.png               Browser icon derived from official VK artwork
robots.txt                       Anti-indexing guidance for private concept
SOURCES.md                       Asset and link provenance
```

This is a working **design preview**, not a live-site migration or replacement CMS.
