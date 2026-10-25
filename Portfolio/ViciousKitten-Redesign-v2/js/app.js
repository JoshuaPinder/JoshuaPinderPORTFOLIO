(() => {
  'use strict';
  const content = window.VK_CONTENT;
  if (!content) return;
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
  const photo = key => content.photos[key] || '';
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  // The supplied band photographs live locally under assets/ for reliable previews.
  const heroImage = $('#heroImage');
  heroImage.src = photo('bandLive');
  $('#aboutImage').src = photo('bandLive');
  $('#aboutImageSmall').src = photo('bandCrowd');
  // Capture errors for BOTH initial images and cards inserted by JavaScript.
  document.addEventListener('error', event => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement)) return;
    img.classList.add('image-unavailable');
    img.closest('.image-surface, .member-photo, .gallery-item, .video-card, .hero-visual')?.classList.add('image-failed');
  }, true);

  // Navigation: works on desktop, mobile and keyboard.
  const header = $('#header'), menuToggle = $('#menuToggle'), mobileNav = $('#mobileNav');
  const closeMenu = () => {menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation');mobileNav.hidden = true;document.body.classList.remove('menu-open');};
  menuToggle.addEventListener('click', () => {
    const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(opening));
    menuToggle.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
    mobileNav.hidden = !opening;
    document.body.classList.toggle('menu-open', opening);
  });
  $$('a', mobileNav).forEach(link => link.addEventListener('click',closeMenu));
  window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 45), {passive:true});
  document.addEventListener('keydown', e => {if (e.key === 'Escape') closeMenu();});

  // Recordings: the user hears the band's actual live demo MP3s.
  const tracks = $('#trackList'), audio = $('#demoAudio'), audioStatus = $('#audioStatus');
  let currentTrack = -1;
  content.demos.forEach((track, i) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'track'; button.dataset.track = String(i);
    button.setAttribute('aria-label', `Play ${track.title}`);
    button.innerHTML = `<span class="track-index">${String(i+1).padStart(2,'0')}</span><span class="track-title"><strong>${escapeHtml(track.title)}</strong><small>${escapeHtml(track.artist)}</small></span><span class="track-duration">${escapeHtml(track.duration)}</span><span class="track-play" aria-hidden="true">▶</span>`;
    button.addEventListener('click', async () => {
      try {
        if (currentTrack === i) {
          if (audio.paused) await audio.play(); else audio.pause();
        } else {
          currentTrack = i; audio.src = track.src; await audio.play();
        }
      } catch (err) {
        audioStatus.innerHTML = `Couldn't stream that file. <a href="${escapeHtml(track.src)}" target="_blank" rel="noopener noreferrer">Try the original audio link ↗</a>`;
      }
      updateTracks();
    });
    tracks.append(button);
  });
  function updateTracks() {
    $$('.track',tracks).forEach((button,i) => {
      const playing = i === currentTrack && !audio.paused;
      button.classList.toggle('playing', playing);
      button.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} ${content.demos[i].title}`);
      $('.track-play', button).textContent = playing ? 'Ⅱ' : '▶';
    });
    if (currentTrack >= 0 && !audio.error) audioStatus.textContent = `${audio.paused ? 'Paused' : 'Now playing'}: ${content.demos[currentTrack].title}`;
  }
  audio.addEventListener('play',updateTracks); audio.addEventListener('pause',updateTracks);
  audio.addEventListener('ended', () => { const next = currentTrack + 1; if (next < content.demos.length) $(`[data-track="${next}"]`).click(); else {currentTrack=-1;updateTracks();audioStatus.textContent='End of demo playlist.';}});
  audio.addEventListener('error', () => {
    if (currentTrack >= 0) audioStatus.innerHTML = `Stream unavailable. <a href="${escapeHtml(content.demos[currentTrack].src)}" target="_blank" rel="noopener noreferrer">Open original recording ↗</a>`;
  });

  // Song category selector.
  const songTabs = $('#songTabs'), songList = $('#songList');
  const categories = Object.keys(content.songs);
  function showSongs(category) {
    $$('.song-tab', songTabs).forEach(b => {const active = b.dataset.category === category;b.classList.toggle('selected', active);b.setAttribute('aria-selected', String(active));b.tabIndex=active?0:-1;});
    songList.innerHTML = (content.songs[category] || []).map((song,i) => `<li><span>${String(i+1).padStart(2,'0')}</span><strong>${escapeHtml(song)}</strong><span aria-hidden="true">↗</span></li>`).join('');
  }
  categories.forEach((category,i) => {
    const button = document.createElement('button'); button.type='button'; button.className='song-tab'; button.role='tab'; button.dataset.category=category;button.textContent=category;button.setAttribute('aria-selected',i===0?'true':'false');
    button.addEventListener('click',()=>showSongs(category));
    button.addEventListener('keydown', e => {const index=categories.indexOf(category);let next = e.key==='ArrowRight'?index+1:e.key==='ArrowLeft'?index-1:-1;if(next!==-1){e.preventDefault();next=(next+categories.length)%categories.length;showSongs(categories[next]);$$('.song-tab',songTabs)[next].focus();}});
    songTabs.append(button);
  });
  showSongs(categories[0]);

  // Public gigs: empty by design until verified gigs are added to content.js.
  const gigList = $('#gigList');
  const today = new Date(); today.setHours(0,0,0,0);
  const shows = (content.gigs || []).map(gig => ({...gig, parsed:new Date(`${gig.date}T12:00:00`)})).filter(gig => !Number.isNaN(gig.parsed.valueOf()) && gig.parsed >= today).sort((a,b) => a.parsed - b.parsed);
  if (shows.length) {
    gigList.innerHTML = shows.map(gig => `<div class="gig-row"><div class="gig-date"><strong>${escapeHtml(gig.parsed.toLocaleDateString('en-GB',{day:'2-digit'}))}</strong><span>${escapeHtml(gig.parsed.toLocaleDateString('en-GB',{month:'short'}).toUpperCase())}</span></div><div class="gig-location"><strong>${escapeHtml(gig.venue)}</strong><span>${escapeHtml(gig.town)}${gig.time ? ' / ' + escapeHtml(gig.time) : ''}</span></div>${gig.url ? `<a href="${escapeHtml(gig.url)}" target="_blank" rel="noopener noreferrer" class="gig-button">EVENT DETAILS ↗</a>` : '<span class="gig-button gig-nolink">SEE YOU THERE ✳</span>'}</div>`).join('');
  } else {
    gigList.innerHTML = `<div class="gigs-empty"><span class="empty-star" aria-hidden="true">✳</span><div><span class="little-label">NEXT UP / STAY TUNED</span><h3>MORE BIG NIGHTS<br><em>ARE COMING.</em></h3><p>New public shows will appear here as dates are confirmed. In the meantime, catch our latest announcements on social media.</p></div><a href="${escapeHtml(content.socials.facebook)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">CHECK THE LATEST ↗</a></div>`;
  }

  // Band member cards.
  const membersGrid = $('#membersGrid');
  content.members.forEach(member => {
    const article = document.createElement('article');article.className='member-card reveal';
    article.innerHTML = `<div class="member-photo image-surface"><img loading="lazy" src="${escapeHtml(photo(member.photo))}" alt="${escapeHtml(member.name)} performing with Vicious Kitten"><span class="member-number">${escapeHtml(member.index)}</span></div><div class="member-info"><h3>${escapeHtml(member.name)}</h3><span>${escapeHtml(member.role)}</span></div>`;
    membersGrid.append(article);
  });

  // Gallery: clickable lightbox with arrow-key navigation.
  const galleryGrid = $('#galleryGrid'), lightbox = $('#lightbox'), lightboxImage = $('#lightboxImage'), lightboxCaption = $('#lightboxCaption');
  let galleryIndex = 0, lastFocus = null;
  const gallery = content.gallery || [];
  gallery.forEach((item,i) => {
    const button = document.createElement('button');button.type='button';button.className=`gallery-item gallery-item-${i+1} image-surface reveal`;button.setAttribute('aria-label', `Open photo: ${item.caption}`);
    button.innerHTML = `<img src="${escapeHtml(photo(item.photo))}" alt="${escapeHtml(item.caption)}" loading="lazy"><span class="gallery-label"><span>${escapeHtml(item.caption)}</span><b aria-hidden="true">↗</b></span>`;
    button.addEventListener('click',()=>openGallery(i));galleryGrid.append(button);
  });
  function showGallery() {const item=gallery[galleryIndex];lightboxImage.src=photo(item.photo);lightboxImage.alt=item.caption;lightboxCaption.textContent=`${item.caption} · ${galleryIndex+1} / ${gallery.length}`;}
  function openGallery(i) {galleryIndex=i;lastFocus=document.activeElement;showGallery();lightbox.hidden=false;document.body.classList.add('lightbox-open');$('#lightboxClose').focus();}
  function closeGallery() {lightbox.hidden=true;document.body.classList.remove('lightbox-open');lastFocus?.focus();}
  function shiftGallery(direction) {galleryIndex=(galleryIndex+direction+gallery.length)%gallery.length;showGallery();}
  $('#lightboxClose').addEventListener('click',closeGallery);
  $('#lightboxPrev').addEventListener('click',()=>shiftGallery(-1));
  $('#lightboxNext').addEventListener('click',()=>shiftGallery(1));
  lightbox.addEventListener('click',e=>{if(e.target===lightbox) closeGallery();});
  document.addEventListener('keydown',e=>{if(lightbox.hidden)return;if(e.key==='Escape')closeGallery();else if(e.key==='ArrowLeft')shiftGallery(-1);else if(e.key==='ArrowRight')shiftGallery(1);else if(e.key==='Tab'){const focusable=[$('#lightboxClose'),$('#lightboxPrev'),$('#lightboxNext')];const ix=focusable.indexOf(document.activeElement);if(e.shiftKey&&ix===0){e.preventDefault();focusable.at(-1).focus();}else if(!e.shiftKey&&ix===focusable.length-1){e.preventDefault();focusable[0].focus();}}});

  // Video area: open genuine published video links in a new tab.
  const videoGrid = $('#videoGrid');
  if (content.videos?.length) {
    videoGrid.innerHTML=content.videos.map(video=>`<a href="${escapeHtml(video.url)}" target="_blank" rel="noopener noreferrer" class="video-card image-surface reveal"><img loading="lazy" alt="" src="${escapeHtml(photo(video.photo))}"><span class="video-icon" aria-hidden="true">▶</span><span class="video-text"><small>${escapeHtml(video.tag)}</small><strong>${escapeHtml(video.title)}</strong></span><span class="video-external" aria-hidden="true">↗</span></a>`).join('');
  } else videoGrid.innerHTML='<p class="empty-video">Gig videos will appear here once you add links to <code>js/content.js</code>.</p>';

  // Social links — all come from the config so they are easy to replace.
  $('#instagramFeature').href = content.socials.instagram;
  $('#facebookFeature').href = content.socials.facebook;
  $('#tiktokFeature').href = content.socials.tiktok;
  $('#instaLink').href=content.socials.instagram;
  $('#facebookLink').href=content.socials.facebook;
  $('#tiktokLink').href=content.socials.tiktok;
  $('#merchLink').href=content.socials.merch;
  $('#pauseLink').href=content.socials.thePause;
  $('#bookLink').href=content.socials.enquiry;
  $('#gigFollowLink').href=content.socials.facebook;
  $('#year').textContent=new Date().getFullYear();

  // Reduced-motion aware scroll reveals.
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window && !reducedMotion) {
    const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});},{threshold:.1,rootMargin:'0px 0px -28px 0px'});
    $$('.reveal').forEach(el=>observer.observe(el));
  } else $$('.reveal').forEach(el=>el.classList.add('visible'));
})();
