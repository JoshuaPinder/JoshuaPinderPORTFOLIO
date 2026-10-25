/*
 * VICIOUS KITTEN — EDITABLE CONTENT
 * Edit text, gig dates, photos, demo links, and socials in this file.
 * All supplied photos are included in assets/ (fully local).
 * Only audio demos and some external links rely on the old site.
 */
window.VK_CONTENT = {
  bandName: 'Vicious Kitten',
  socials: {
    instagram: 'https://www.instagram.com/viciouskittenband/',
    facebook: 'https://www.facebook.com/viciouskittenband',
    tiktok: 'https://www.tiktok.com/@vicious.kitten',
    merch: 'https://personalised.clothing/viciouskitten',
    enquiry: 'https://www.viciouskitten.band/contact',
    thePause: 'https://www.thepause.co.uk/'
  },
  // All five key photos are YOUR uploaded files, bundled with the site.
  // To change a photo, replace its file in assets/ or edit its path below.
  photos: {
    bandLive: './assets/band-group.webp',
    bandCrowd: './assets/band-group.webp',
    charlieWide: './assets/charlie.webp',
    hannah: './assets/hannah.webp',
    charlie: './assets/charlie.webp',
    dan: './assets/dan.webp',
    josh: './assets/josh.webp',
    vocalist: './assets/hannah.webp',
    crowd: './assets/band-group.webp',
    drums: './assets/dan.webp',
    stage: './assets/band-group.webp',
    joshCrowd: './assets/josh.webp'
  },
  members: [
    { name: 'Hannah', role: 'Lead vocals', photo: 'hannah', index: '01' },
    { name: 'Charlie', role: 'Guitar & vocals', photo: 'charlie', index: '02' },
    { name: 'Josh', role: 'Bass & vocals', photo: 'josh', index: '03' },
    { name: 'Dan', role: 'Drums', photo: 'dan', index: '04' }
  ],
  demos: [
    { title: 'The Pretender', artist: 'Foo Fighters cover', duration: '4:55', src: 'https://static1.squarespace.com/static/55d4c6b3e4b07a483c714b27/55d4ccede4b0ec881d78d05c/55d4ce51e4b0154787fae4ad/1558120231808/PRETENDER%2BMP3.mp3' },
    { title: 'Highway to Hell', artist: 'AC/DC cover', duration: '3:45', src: 'https://static1.squarespace.com/static/55d4c6b3e4b07a483c714b27/55d4ccede4b0ec881d78d05c/55d4cd9ce4b097487a19eb4d/1558120240253/HIGHWAY%2BTO%2BHELL%2BMP3.mp3' },
    { title: 'Whiskey in the Jar', artist: 'Thin Lizzy / Metallica cover', duration: '5:26', src: 'https://static1.squarespace.com/static/55d4c6b3e4b07a483c714b27/55d4ccede4b0ec881d78d05c/55d4cfa8e4b03492c76cdcd4/1558120249639/WHISKEY%2BIN%2BTHE%2BJAR%2BMASTERED%2BNO%2BPISS.mp3' },
    { title: 'Rolling in the Deep', artist: 'Adele cover', duration: '4:01', src: 'https://static1.squarespace.com/static/55d4c6b3e4b07a483c714b27/55d4ccede4b0ec881d78d05c/55d4cf23e4b03492c76cd90a/1558120259201/ROLLING%2BIN%2BTHE%2BDEEP%2BMP3.mp3' }
  ],
  /* Only add VERIFIED public shows; empty intentionally, never fabricate dates.
     Example: { date:'2026-11-21', venue:'The Example Inn', town:'Plymouth', time:'9:00 PM', url:'https://...' } */
  gigs: [],
  // Gallery is also self-contained: no old site's photo hosting required.
  gallery: [
    { photo: 'bandLive', caption: 'The four of us — Vicious Kitten' },
    { photo: 'hannah', caption: 'Hannah / lead vocals' },
    { photo: 'josh', caption: 'Josh / bass' },
    { photo: 'charlie', caption: 'Charlie / guitar and vocals' },
    { photo: 'dan', caption: 'Dan / drums' }
  ],
  /* Paste public GoPro cloud links here (opens in new tab). YouTube works too.
     Example: { title:'Live at The Maritime', tag:'GOPRO / LIVE', url:'https://gopro.com/v/....', photo:'stage' } */
  videos: [
    { title: 'A little moment from the crowd', tag: 'LIVE / SHORT', url: 'https://www.youtube.com/shorts/F9knxK8bbRk', photo: 'bandLive' }
  ],
  songs: {
    'Crowd favourites': ['Mr. Brightside', 'Sweet Child O’ Mine', 'Teenage Dirtbag', 'Sex on Fire', 'Livin’ on a Prayer', 'Walking on Sunshine', 'Proud Mary', 'Shut Up and Dance'],
    'Rock anthems': ['Smells Like Teen Spirit', 'Highway to Hell', 'Misery Business', 'Zombie', 'Buck Rogers', 'Eye of the Tiger', 'Whiskey in the Jar', 'Summer of ’69'],
    'Pop & party': ['Mamma Mia', 'Simply the Best', 'Sweet Dreams', '9 to 5', 'Africa', 'Call Me', 'I’m Still Standing', 'Locked Out of Heaven']
  }
};
