/*
 * SIP - Sistem Informasi Pesantren ELKAROM
 * File JS Eksternal - Versi 7.7.0
 *
 * Catatan v7.7.0 (hasil audit): kode dibungkus IIFE (tidak mencemari global);
 * hanya fungsi yang dipakai atribut inline (onclick dll.) yang diekspor ke window.
 * Debug log: localStorage.setItem('elkarom_debug','1') lalu muat ulang.
 */
(function () {
var KONFIG = {
  URL_API_GAS: 'https://script.google.com/macros/s/AKfycby2rGM3Hw7WejiSZxCk43g553fy1Z7ShbuCvkorwlNDtlUui2bu9lOeq7zdXsEXBTI/exec',
  URL_BLOG: 'https://elkarom.blogspot.com',
  LABEL_ARTIKEL: 'Pena Pesantren',
  NAMA_APP: 'ELKAROM',
  SLOGAN: 'Mulia dengan Ilmu',
  VERSI: '7.7.0',
  DEBUG: false,
  TIMEOUT_API_MS: 45000,
  STORAGE_TOKEN: 'elkarom_token',
  STORAGE_PENGGUNA: 'elkarom_pengguna',
  STORAGE_TEMA: 'elkarom_tema',
  STORAGE_SIDEBAR: 'elkarom_sidebar_tertutup',
  STORAGE_GRUP_TERBUKA: 'elkarom_grup_terbuka',
  STORAGE_PENGATURAN: 'elkarom_pengaturan_cache'
};

var SVG_ICONS = {
  menu: '<svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>',
  home: '<svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  user: '<svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  users: '<svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  userPlus: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" x2="20" y1="8" y2="14"/><line x1="23" x2="17" y1="11" y2="11"/></svg>',
  userCheck: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>',
  book: '<svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  bookOpen: '<svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  bookClosed: '<svg fill="none" height="26" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="26" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  file: '<svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  phone: '<svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  login: '<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>',
  logout: '<svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>',
  info: '<svg fill="none" height="64" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="64" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>',
  infoCircle: '<svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>',
  warning: '<svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>',
  check: '<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg>',
  checkCircle: '<svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  alertCircle: '<svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
  chevronDown: '<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"/></svg>',
  chevronUp: '<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="18 15 12 9 6 15"/></svg>',
  arrowLeft: '<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><line x1="19" x2="5" y1="12" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  graduation: '<svg fill="none" height="26" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="26" xmlns="http://www.w3.org/2000/svg"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  mic: '<svg fill="none" height="26" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="26" xmlns="http://www.w3.org/2000/svg"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="23"/><line x1="8" x2="16" y1="23" y2="23"/></svg>',
  bookStack: '<svg fill="none" height="30" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  mosque: '<svg fill="none" height="26" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="26" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c-2 3-6 5-6 9v9h12v-9c0-4-4-6-6-9z"/><path d="M12 2v2"/><path d="M3 20v-8"/><path d="M21 20v-8"/><path d="M9 20v-5h6v5"/></svg>',
  eye: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  eyeOff: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" x2="23" y1="1" y2="23"/></svg>',
  mail: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  lock: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><rect height="11" rx="2" ry="2" width="18" x="3" y="11"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  grid: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><rect height="7" rx="1" width="7" x="3" y="3"/><rect height="7" rx="1" width="7" x="14" y="3"/><rect height="7" rx="1" width="7" x="14" y="14"/><rect height="7" rx="1" width="7" x="3" y="14"/></svg>',
  search: '<svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>',
  moon: '<svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  sun: '<svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5"/><line x1="12" x2="12" y1="1" y2="3"/><line x1="12" x2="12" y1="21" y2="23"/><line x1="4.22" x2="5.64" y1="4.22" y2="5.64"/><line x1="18.36" x2="19.78" y1="18.36" y2="19.78"/><line x1="1" x2="3" y1="12" y2="12"/><line x1="21" x2="23" y1="12" y2="12"/><line x1="4.22" x2="5.64" y1="19.78" y2="18.36"/><line x1="18.36" x2="19.78" y1="5.64" y2="4.22"/></svg>',
  bell: '<svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  calendar: '<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><rect height="18" rx="2" ry="2" width="18" x="3" y="4"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
  settings: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  activity: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  clipboard: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect height="4" rx="1" ry="1" width="8" x="8" y="2"/></svg>',
  award: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
  megaphone: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
  printer: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect height="8" width="12" x="6" y="14"/></svg>',
  plus: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>',
  download: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
  edit: '<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  trash: '<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  camera: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  image: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><rect height="18" rx="2" ry="2" width="18" x="3" y="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
  dollar: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="1" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  trendingUp: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  messageCircle: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
  heart: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  star: '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  moreVertical: '<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>',
  filter: '<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
  refresh: '<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
  rotate: '<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>'
};

/**
 * Route dashboard default per role.
 * Dipakai untuk redirect setelah login / saat role tidak berhak.
 */
var ROUTE_DASHBOARD_BY_ROLE = {
  'admin': '#/admin',
  'guru':  '#/guru',
  'wali':  '#/wali'
};

var STATE = {
  token: null,
  pengguna: null,
  halamanAktif: null,
  daftarSantri: [],
  filter: 'semua',
  search: '',
  sortKolom: 'nama_lengkap',
  sortAsc: true,
  terpilih: {},
  cropImage: null,
  cropX: 0,
  cropY: 0,
  cropSkala: 1,
  cropDragging: false,
  cropDragStartX: 0,
  cropDragStartY: 0,
  cropStartCropX: 0,
  cropStartCropY: 0,
  daftarPapanInfo: [],
  filterPapanInfo: 'semua',
  searchPapanInfo: '',
  pengaturan: null,
  pengaturanPublik: null,
  grupPengaturanAktif: 'identitas',
  judulHalaman: '',
  loginGagal: 0,
  loginTerkunciSampai: 0
};

var DATA_STATIS = {
  kerangkaKurikulum: [
    { icon: 'bookOpen', judul: 'Kurikulum Diniyah', deskripsi: 'Mengikuti kurikulum PKPPS (Pendidikan Kesetaraan Pondok Pesantren Salafi) yang berfokus pada kitab-kitab kuning khas pesantren.' },
    { icon: 'graduation', judul: 'Kurikulum Nasional', deskripsi: 'Mengikuti kurikulum Kemendikbud dengan standar mutu yang dijaga ketat.' },
    { icon: 'bookClosed', judul: 'Kitab Kuning', deskripsi: 'Membiasakan pola pendidikan praktek membaca kitab-kitab gundul.' },
    { icon: 'mic', judul: 'Tahsin', deskripsi: 'Mengedepankan santri agar mampu membaca Al-Quran dengan baik dan benar sesuai keilmuan.' }
  ],
  programUnggulan: [
    { icon: 'bookStack', judul: 'Pemahaman Kitab Kuning', deskripsi: 'Program intensif untuk membekali santri kemampuan membaca, memahami, dan mengamalkan isi kitab-kitab klasik para ulama.', poin: ['Metode sorogan dan bandongan', 'Kajian nahwu dan sharaf', 'Pendampingan ustadz berpengalaman'] },
    { icon: 'mosque', judul: 'Tahsin dan Tahfidz', deskripsi: 'Program pembinaan bacaan Al-Quran dan hafalan dengan bimbingan bertahap sesuai kemampuan santri.', poin: ['Perbaikan makhraj dan tajwid', 'Setoran hafalan harian', 'Sertifikasi tahsin berjenjang'] }
  ],
  guruStaf: [
    { nama: 'KH. Abdul Karim', jabatan: 'Pengasuh', kategori: 'pimpinan', alumni: 'Alumni Pesantren', foto: '' },
    { nama: 'Ust. Ahmad Fauzi', jabatan: 'Mudir', kategori: 'pimpinan', alumni: 'Alumni Pesantren', foto: '' },
    { nama: 'Ust. Muhammad Yusuf', jabatan: 'Kepala Madrasah', kategori: 'pimpinan', alumni: 'Alumni Pesantren', foto: '' },
    { nama: 'Ust. Abdullah Hakim', jabatan: 'Wakil Kepala', kategori: 'pimpinan', alumni: 'Alumni Pesantren', foto: '' },
    { nama: 'Ust. Ibrahim', jabatan: 'Guru Nahwu', kategori: 'guru', alumni: 'Alumni Pesantren', foto: '' },
    { nama: 'Ust. Ali Mustofa', jabatan: 'Guru Fiqh', kategori: 'guru', alumni: 'Alumni Pesantren', foto: '' },
    { nama: 'Ustzh. Aisyah', jabatan: 'Guru Tahsin', kategori: 'guru', alumni: 'Alumni Pesantren', foto: '' },
    { nama: 'Ust. Hasan', jabatan: 'Sekretaris', kategori: 'staf', alumni: 'Alumni Pesantren', foto: '' }
  ]
};

var MENU_ADMIN = [
  { grup: 'Menu Utama', tetap_terbuka: true, item: [{ label: 'Dashboard', route: '#/admin', icon: 'home' }] },
  { grup: 'Manajemen Pesantren', item: [
    { label: 'Profil Pesantren', route: '#/admin/profil-pesantren', icon: 'mosque' },
    { label: 'Kelas', route: '#/admin/kelas', icon: 'grid' },
    { label: 'Mata Pelajaran', route: '#/admin/mapel', icon: 'book' },
    { label: 'Kalender Pendidikan', route: '#/admin/kaldik', icon: 'calendar' },
    { label: 'Papan Info', route: '#/admin/pengumuman', icon: 'megaphone' },
    { label: 'Berkas', route: '#/admin/berkas', icon: 'file' },
    { label: 'Ekstrakurikuler', route: '#/admin/ekskul', icon: 'star' },
    { label: 'Fasilitas', route: '#/admin/fasilitas', icon: 'grid' }
  ]},
  { grup: 'Manajemen Santri', item: [
    { label: 'Data Santri', route: '#/admin/santri', icon: 'users' },
    { label: 'Profil Santri', route: '#/admin/profil-santri', icon: 'user' },
    { label: 'Laporan', route: '#/admin/santri-laporan', icon: 'clipboard' },
    { label: 'Prestasi', route: '#/admin/prestasi', icon: 'award' },
    { label: 'Data PPDB', route: '#/admin/ppdb', icon: 'userPlus' },
    { label: 'Pelanggaran', route: '#/admin/pelanggaran', icon: 'warning' },
    { label: 'Kesehatan', route: '#/admin/kesehatan', icon: 'heart' }
  ]},
  { grup: 'Manajemen Pengajar', item: [
    { label: 'Data Guru dan Staf', route: '#/admin/guru', icon: 'userCheck' },
    { label: 'Jadwal Guru', route: '#/admin/guru-jadwal', icon: 'calendar' },
    { label: 'Absensi Guru', route: '#/admin/guru-absensi', icon: 'clipboard' }
  ]},
  { grup: 'Manajemen Wali', item: [{ label: 'Data Wali Santri', route: '#/admin/wali', icon: 'users' }] },
  { grup: 'Manajemen Akademik', item: [
    { label: 'Absensi', route: '#/admin/akademik-absensi', icon: 'clipboard' },
    { label: 'Jadwal Pelajaran', route: '#/admin/akademik-jadwal', icon: 'calendar' },
    { label: 'Nilai', route: '#/admin/akademik-nilai', icon: 'trendingUp' },
    { label: 'Ranking', route: '#/admin/akademik-ranking', icon: 'award' },
    { label: 'Raport', route: '#/admin/akademik-raport', icon: 'book' },
    { label: 'Sertifikat', route: '#/admin/akademik-sertifikat', icon: 'award' },
    { label: 'Laporan Nilai', route: '#/admin/akademik-laporan-nilai', icon: 'file' }
  ]},
  { grup: 'Manajemen Keuangan', item: [
    { label: 'Biaya', route: '#/admin/keuangan-biaya', icon: 'dollar' },
    { label: 'Penagihan', route: '#/admin/keuangan-penagihan', icon: 'file' },
    { label: 'Riwayat', route: '#/admin/keuangan-riwayat', icon: 'clipboard' },
    { label: 'Tabungan', route: '#/admin/keuangan-tabungan', icon: 'dollar' }
  ]},
  { grup: 'Manajemen Komunikasi', item: [
    { label: 'Pesan', route: '#/admin/komunikasi-pesan', icon: 'messageCircle' },
    { label: 'Notifikasi', route: '#/admin/komunikasi-notifikasi', icon: 'bell' },
    { label: 'Saran', route: '#/admin/komunikasi-saran', icon: 'messageCircle' }
  ]},
  { grup: 'Manajemen Publikasi', item: [
    { label: 'Artikel', route: '#/admin/publikasi-artikel', icon: 'file' },
    { label: 'Galeri', route: '#/admin/publikasi-galeri', icon: 'image' },
    { label: 'Karya', route: '#/admin/publikasi-karya', icon: 'heart' }
  ]},
  { grup: 'Manajemen Pengguna', item: [
    { label: 'Data User', route: '#/admin/user', icon: 'user' },
    { label: 'Aktivitas', route: '#/admin/aktivitas', icon: 'activity' }
  ]},
  { grup: 'Sistem', item: [{ label: 'Pengaturan', route: '#/admin/pengaturan', icon: 'settings' }] }
];

/**
 * Menu sidebar untuk role guru.
 * Lebih ringkas dari admin — hanya menu yang relevan.
 */
var MENU_GURU = [
  { grup: 'Menu Utama', tetap_terbuka: true, item: [
    { label: 'Dashboard', route: '#/guru', icon: 'home' }
  ]},
  { grup: 'Akademik', item: [
    { label: 'Absensi', route: '#/guru/absensi', icon: 'clipboard' },
    { label: 'Jadwal Pelajaran', route: '#/guru/jadwal', icon: 'calendar' },
    { label: 'Nilai', route: '#/guru/nilai', icon: 'trendingUp' }
  ]},
  { grup: 'Informasi', item: [
    { label: 'Data Santri', route: '#/guru/santri', icon: 'users' },
    { label: 'Papan Info', route: '#/guru/papan-info', icon: 'megaphone' }
  ]}
];

/**
 * Menu sidebar untuk role wali.
 * Paling ringkas — hanya info.
 */
var MENU_WALI = [
  { grup: 'Menu Utama', tetap_terbuka: true, item: [
    { label: 'Dashboard', route: '#/wali', icon: 'home' }
  ]},
  { grup: 'Informasi', item: [
    { label: 'Papan Info', route: '#/wali/papan-info', icon: 'megaphone' }
  ]}
];

var TAHUN_AJARAN_LIST = ['2026/2027', '2025/2026', '2024/2025', '2023/2024'];
var TAHUN_AJARAN_AKTIF = '2026/2027';

function escapeHtml(teks) { if (teks === null || teks === undefined) return ''; return String(teks).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function logDebug() {
  var aktif = KONFIG.DEBUG;
  try { if (!aktif && localStorage.getItem('elkarom_debug') === '1') aktif = true; } catch (e) {}
  if (aktif && window.console && console.log) console.log.apply(console, arguments);
}
/** Hanya izinkan URL http(s). Mencegah javascript: / data: masuk ke href. */
function urlAman(url) {
  if (!url) return '';
  var u = String(url).trim();
  return /^https?:\/\//i.test(u) ? u : '';
}
function ambilInisial(nama) {
  if (!nama) return '?';
  var bersih = String(nama).replace(/^(KH\.|Ust\.|Ustzh\.|H\.|Hj\.)\s*/i, '').trim();
  var bagian = bersih.split(/\s+/);
  if (bagian.length === 1) return bagian[0].substring(0, 2).toUpperCase();
  return (bagian[0].charAt(0) + bagian[1].charAt(0)).toUpperCase();
}
function ambilTanggalHariIni() {
  var hariNama = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  var bulanNama = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  var d = new Date();
  return hariNama[d.getDay()] + ', ' + d.getDate() + ' ' + bulanNama[d.getMonth()] + ' ' + d.getFullYear();
}
function ambilSalamWaktu() {
  var jam = new Date().getHours();
  if (jam < 11) return 'Selamat pagi';
  if (jam < 15) return 'Selamat siang';
  if (jam < 18) return 'Selamat sore';
  return 'Selamat malam';
}
function formatTanggalIndo(isoStr) {
  if (!isoStr) return '';
  try {
    var bulanNama = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var pisah = String(isoStr).split('-');
    if (pisah.length === 3) {
      var thn = pisah[0], bln = parseInt(pisah[1], 10), hri = parseInt(pisah[2], 10);
      return hri + ' ' + bulanNama[bln - 1] + ' ' + thn;
    }
    var d = new Date(isoStr);
    return d.getDate() + ' ' + bulanNama[d.getMonth()] + ' ' + d.getFullYear();
  } catch (e) { return ''; }
}
function labelJenisKelamin(kode) {
  if (kode === 'L') return 'Putra';
  if (kode === 'P') return 'Putri';
  return '';
}

/**
 * Ambil role pengguna saat ini (dari STATE).
 * @return {string} 'admin' | 'guru' | 'wali' | ''
 */
function ambilRoleSaatIni() {
  if (!STATE.pengguna) return '';
  return STATE.pengguna.role || '';
}

/**
 * Cek apakah route ini hanya untuk admin.
 * FIX: hindari false-positive '#/administrator'.
 */
function routeKhususAdmin(hash) {
  if (hash === '#/guru' || hash.indexOf('#/guru/') === 0) return false;
  if (hash === '#/wali' || hash.indexOf('#/wali/') === 0) return false;
  return hash === '#/admin' || hash.indexOf('#/admin/') === 0;
}

/**
 * Cek apakah route ini untuk guru.
 */
function routeKhususGuru(hash) {
  return hash === '#/guru' || hash.indexOf('#/guru/') === 0;
}

/**
 * Cek apakah route ini untuk wali.
 */
function routeKhususWali(hash) {
  return hash === '#/wali' || hash.indexOf('#/wali/') === 0;
}

/** Rute yang butuh login: tepat '#/admin', '#/guru', '#/wali' atau turunannya (bukan '#/administrator'). */
function adalahRuteTerlindungi(hash) {
  hash = hash || '';
  return hash === '#/admin' || hash.indexOf('#/admin/') === 0 || routeKhususGuru(hash) || routeKhususWali(hash);
}

/** Cocokkan rute menu: dashboard root hanya cocok persis, lainnya persis atau turunan (pakai '/'). */
function rutecocok(hash, r) {
  if (!r) return false;
  if (r === '#/' || r === '#/admin' || r === '#/guru' || r === '#/wali') return hash === r;
  return hash === r || hash.indexOf(r + '/') === 0;
}

/**
 * Redirect ke dashboard sesuai role saat ini.
 */
function redirectKeDashboard() {
  var role = ambilRoleSaatIni();
  var route = ROUTE_DASHBOARD_BY_ROLE[role] || '#/login';
  window.location.hash = route;
}

/**
 * Update menu sidebar sesuai role.
 * - Admin: MENU_ADMIN lengkap
 * - Guru: MENU_GURU
 * - Wali: MENU_WALI
 */
function ambilMenuSesuaiRole() {
  var role = ambilRoleSaatIni();
  if (role === 'guru' && typeof MENU_GURU !== 'undefined') return MENU_GURU;
  if (role === 'wali' && typeof MENU_WALI !== 'undefined') return MENU_WALI;
  return MENU_ADMIN;
}


/**
 * Deteksi respons "sesi ditolak" dari server (token tidak valid / kedaluwarsa).
 * Mengandalkan kode 401 atau pola pesan; sesuaikan dengan pesan LayananAuth.gs bila perlu.
 */
function sesiDitolakServer(action, hasil) {
  if (!STATE.token) return false;
  if (action === 'login' || action === 'logout' || action === 'verifikasiToken') return false;
  if (!hasil || hasil.sukses) return false;
  if (hasil.kode === 401) return true;
  return /token (tidak valid|tidak ditemukan|kedaluwarsa|expired|invalid)|sesi (anda )?(telah |sudah )?(berakhir|habis|kedaluwarsa)/i.test(String(hasil.pesan || ''));
}
function tanganiSesiBerakhir() {
  if (!STATE.token) return;
  hapusSesi();
  renderMenuSidebar();
  tampilkanToast('Sesi Anda telah berakhir. Silakan login kembali.', 'peringatan', 'Sesi Berakhir');
  if (adalahRuteTerlindungi(ambilHashSaatIni())) window.location.hash = '#/login';
  else aturModeLayout();
}

function panggilApi(action, data, method) {
  var muatan = data || {};
  muatan.action = action;
  if (STATE.token && !muatan.token) muatan.token = STATE.token;
  method = method || 'POST';
  var opsi;
  var url = KONFIG.URL_API_GAS;
  if (method === 'GET') {
    // Token tidak pernah dikirim lewat URL (tercatat di log/riwayat).
    var params = [];
    for (var k in muatan) {
      if (!muatan.hasOwnProperty(k) || k === 'token') continue;
      var nilai = (muatan[k] !== null && typeof muatan[k] === 'object') ? JSON.stringify(muatan[k]) : muatan[k];
      params.push(encodeURIComponent(k) + '=' + encodeURIComponent(nilai));
    }
    url = url + '?' + params.join('&');
    opsi = { method: 'GET', redirect: 'follow' };
  } else {
    opsi = { method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(muatan) };
  }
  var pengendali = (typeof AbortController !== 'undefined') ? new AbortController() : null;
  var timer = null;
  if (pengendali) {
    opsi.signal = pengendali.signal;
    timer = setTimeout(function () { pengendali.abort(); }, KONFIG.TIMEOUT_API_MS);
  }
  return fetch(url, opsi).then(function (respon) { return respon.json(); }).then(function (hasil) {
    if (timer) clearTimeout(timer);
    try { if (sesiDitolakServer(action, hasil)) tanganiSesiBerakhir(); } catch (e) { logDebug('Gagal tangani sesi:', e); }
    return hasil;
  }).catch(function (err) {
    if (timer) clearTimeout(timer);
    logDebug('API error:', err);
    return { sukses: false, pesan: 'Tidak dapat terhubung ke server. Periksa koneksi Anda.', kode: 0, jaringan: true };
  });
}

function ambilArtikelBlogger(jumlah) {
  jumlah = jumlah || 6;
  var url = KONFIG.URL_BLOG + '/feeds/posts/default?alt=json&max-results=' + jumlah + '&category=' + encodeURIComponent(KONFIG.LABEL_ARTIKEL);
  return fetch(url).then(function (respon) { if (!respon.ok) throw new Error('Feed error'); return respon.json(); })
  .then(function (data) {
    var entries = (data && data.feed && data.feed.entry) ? data.feed.entry : [];
    var hasil = [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i]; var linkArtikel = '';
      for (var j = 0; j < e.link.length; j++) { if (e.link[j].rel === 'alternate') { linkArtikel = e.link[j].href; break; } }
      var thumbnail = e.media$thumbnail ? e.media$thumbnail.url.replace(/\/s72-c\//, '/s400-c/') : '';
      var kategori = (e.category && e.category.length > 0) ? e.category[0].term : '';
      var ringkas = e.summary ? String(e.summary.$t).substring(0, 160) + '...' : '';
      hasil.push({ judul: e.title.$t, link: urlAman(linkArtikel), thumbnail: urlAman(thumbnail), kategori: kategori, ringkas: ringkas, tanggal: e.published.$t, penulis: (e.author && e.author[0]) ? e.author[0].name.$t : 'Redaksi' });
    }
    return hasil;
  }).catch(function (err) { logDebug('Gagal ambil artikel:', err); return []; });
}

function tampilkanToast(pesan, tipe, judul) {
  tipe = tipe || 'info';
  judul = judul || (tipe === 'sukses' ? 'Berhasil' : (tipe === 'gagal' ? 'Gagal' : 'Informasi'));
  var ikon;
  if (tipe === 'sukses') ikon = SVG_ICONS.checkCircle;
  else if (tipe === 'gagal') ikon = SVG_ICONS.alertCircle;
  else if (tipe === 'peringatan') ikon = SVG_ICONS.warning;
  else ikon = SVG_ICONS.infoCircle;
  var wadah = document.getElementById('toast-container');
  if (!wadah) return;
  var toast = document.createElement('div');
  toast.className = 'toast ' + tipe;
  toast.setAttribute('role', tipe === 'gagal' ? 'alert' : 'status');
  toast.innerHTML = '<div class="toast-ikon">' + ikon + '</div><div class="toast-isi"><div class="toast-judul">' + escapeHtml(judul) + '</div><div class="toast-pesan">' + escapeHtml(pesan) + '</div></div>';
  wadah.appendChild(toast);
  setTimeout(function () { toast.classList.add('keluar'); setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300); }, (tipe === 'gagal' || tipe === 'peringatan') ? 6500 : 3500);
}

var _fokusSebelumModal = null;
function bukaModal(judul, isiHtml, footerHtml, lebar) {
  var overlay = document.getElementById('modal-overlay');
  var judulEl = document.getElementById('modal-judul');
  var bodyEl = document.getElementById('modal-body');
  var footerEl = document.getElementById('modal-footer');
  var boxEl = document.getElementById('modal-box');
  if (!overlay || !judulEl || !bodyEl) return;
  if (!overlay.classList.contains('tampil')) _fokusSebelumModal = document.activeElement;
  judulEl.textContent = judul;
  bodyEl.innerHTML = isiHtml;
  if (footerHtml) { footerEl.innerHTML = footerHtml; footerEl.style.display = 'flex'; }
  else { footerEl.innerHTML = ''; footerEl.style.display = 'none'; }
  if (lebar === 'lg') boxEl.classList.add('modal-lg'); else boxEl.classList.remove('modal-lg');
  boxEl.setAttribute('role', 'dialog');
  boxEl.setAttribute('aria-modal', 'true');
  boxEl.setAttribute('aria-labelledby', 'modal-judul');
  overlay.classList.add('tampil');
  setTimeout(function () {
    var fokus = boxEl.querySelector('.modal-body input:not([type="hidden"]), .modal-body select, .modal-body textarea') || boxEl.querySelector('.modal-footer button') || document.getElementById('modal-tutup');
    if (fokus && fokus.focus) fokus.focus();
  }, 50);
}
function tutupModal() {
  var overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('tampil');
  STATE.cropImage = null;
  if (_fokusSebelumModal && _fokusSebelumModal.focus) { try { _fokusSebelumModal.focus(); } catch (e) {} }
  _fokusSebelumModal = null;
}

function simpanSesi(token, pengguna) {
  STATE.token = token; STATE.pengguna = pengguna;
  try { localStorage.setItem(KONFIG.STORAGE_TOKEN, token); localStorage.setItem(KONFIG.STORAGE_PENGGUNA, JSON.stringify(pengguna)); } catch (e) {}
  perbaruiNavbar();
  renderMenuSidebar();
}

function hapusSesi() {
  STATE.token = null; STATE.pengguna = null;
  try { localStorage.removeItem(KONFIG.STORAGE_TOKEN); localStorage.removeItem(KONFIG.STORAGE_PENGGUNA); } catch (e) {}
  perbaruiNavbar();
}
function ambilSesiTersimpan() {
  try {
    var t = localStorage.getItem(KONFIG.STORAGE_TOKEN); var p = localStorage.getItem(KONFIG.STORAGE_PENGGUNA);
    if (t && p) { var pg = JSON.parse(p); if (!pg || typeof pg !== 'object' || !ROUTE_DASHBOARD_BY_ROLE[pg.role]) { hapusSesi(); return false; } STATE.token = t; STATE.pengguna = pg; return true; }
  } catch (e) {}
  return false;
}
function terapkanTema(tema, tanpaSimpan) {
  if (tema === 'gelap') document.documentElement.setAttribute('data-tema', 'gelap');
  else document.documentElement.removeAttribute('data-tema');
  if (!tanpaSimpan) { try { localStorage.setItem(KONFIG.STORAGE_TEMA, tema); } catch (e) {} }
  var ikonEl = document.getElementById('topbar-tema-ikon');
  if (ikonEl) ikonEl.innerHTML = tema === 'gelap' ? SVG_ICONS.sun : SVG_ICONS.moon;
  terapkanWarnaPengaturan();
}
function toggleTema() { var sekarang = document.documentElement.getAttribute('data-tema') === 'gelap' ? 'gelap' : 'terang'; terapkanTema(sekarang === 'gelap' ? 'terang' : 'gelap'); }
function muatTemaTersimpan() {
  var tersimpan = null;
  try { tersimpan = localStorage.getItem(KONFIG.STORAGE_TEMA); } catch (e) {}
  if (tersimpan === 'gelap' || tersimpan === 'terang') { terapkanTema(tersimpan); return; }
  var osGelap = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  terapkanTema(osGelap ? 'gelap' : 'terang', true);
}
function muatStateSidebar() { try { if (localStorage.getItem(KONFIG.STORAGE_SIDEBAR) === 'ya') document.body.classList.add('sidebar-tertutup'); else document.body.classList.remove('sidebar-tertutup'); } catch (e) {} }
function simpanStateSidebar(tertutup) { try { localStorage.setItem(KONFIG.STORAGE_SIDEBAR, tertutup ? 'ya' : 'tidak'); } catch (e) {} }

/**
 * FIX: grup terbuka disimpan per-role untuk hindari collision antar role.
 * Baca dari key per-role, fallback ke key lama (backward compat).
 */
function muatGrupTerbuka() {
  var role = ambilRoleSaatIni() || 'guest';
  try {
    var sPerRole = localStorage.getItem(KONFIG.STORAGE_GRUP_TERBUKA + '_' + role);
    if (sPerRole) return JSON.parse(sPerRole);
    var sLama = localStorage.getItem(KONFIG.STORAGE_GRUP_TERBUKA);
    if (sLama) return JSON.parse(sLama);
  } catch (e) {}
  return ['Menu Utama'];
}
function simpanGrupTerbuka(daftar) {
  var role = ambilRoleSaatIni() || 'guest';
  try { localStorage.setItem(KONFIG.STORAGE_GRUP_TERBUKA + '_' + role, JSON.stringify(daftar)); } catch (e) {}
}

function perbaruiNavbar() {
  var tombolLogin = document.getElementById('tombol-login');
  var navbarUser = document.getElementById('navbar-user');
  if (tombolLogin && navbarUser) {
    if (STATE.token && STATE.pengguna) {
      tombolLogin.style.display = 'none';
      navbarUser.classList.add('tampil');
      var namaLengkap = STATE.pengguna.nama_lengkap || STATE.pengguna.email || 'User';
      var namaDepan = String(namaLengkap).split(/\s+/)[0];
      var inisial = ambilInisial(namaLengkap);
      var elNama = document.getElementById('navbar-user-nama');
      var elAvatar = document.getElementById('navbar-avatar');
      var elDNama = document.getElementById('dropdown-nama');
      var elDEmail = document.getElementById('dropdown-email');
      if (elNama) elNama.textContent = namaDepan;
      if (elAvatar) elAvatar.textContent = inisial;
      if (elDNama) elDNama.textContent = namaLengkap;
      if (elDEmail) elDEmail.textContent = STATE.pengguna.email || '';
    } else {
      tombolLogin.style.display = '';
      navbarUser.classList.remove('tampil');
    }
  }
  perbaruiTopbarAdmin();
}
function perbaruiTopbarAdmin() {
  if (!STATE.pengguna) return;
  var namaLengkap = STATE.pengguna.nama_lengkap || STATE.pengguna.email || 'User';
  var inisial = ambilInisial(namaLengkap);
  var namaDepan = String(namaLengkap).split(/\s+/)[0];
  var elAvatar = document.getElementById('topbar-avatar');
  var elNama = document.getElementById('topbar-user-nama');
  var elDDNama = document.getElementById('topbar-dd-nama');
  var elDDEmail = document.getElementById('topbar-dd-email');
  if (elAvatar) elAvatar.textContent = inisial;
  if (elNama) elNama.textContent = namaDepan;
  if (elDDNama) elDDNama.textContent = namaLengkap;
  if (elDDEmail) elDDEmail.textContent = STATE.pengguna.email || '';
}

function aturModeLayout() {
  var hash = STATE.halamanAktif || '#/';
  var diAreaLogin = adalahRuteTerlindungi(hash);
  var diAreaLoginDanMasuk = diAreaLogin && STATE.token && STATE.pengguna;
  var body = document.body;
  if (diAreaLoginDanMasuk) {
    body.classList.add('mode-admin');
    body.classList.remove('sidebar-mobile-terbuka');
    perbaruiMenuSidebarAktif(hash);
    perbaruiBottomNavAktif(hash);
  } else {
    body.classList.remove('mode-admin');
    body.classList.remove('sidebar-tertutup');
    body.classList.remove('sidebar-mobile-terbuka');
  }
}

function perbaruiMenuSidebarAktif(hash) {
  var links = document.querySelectorAll('#sidebar-menu .sidebar-link');
  for (var i = 0; i < links.length; i++) {
    var r = links[i].getAttribute('data-route');
    if (rutecocok(hash, r)) { links[i].classList.add('aktif'); links[i].setAttribute('aria-current', 'page'); }
    else { links[i].classList.remove('aktif'); links[i].removeAttribute('aria-current'); }
  }
}
function perbaruiBottomNavAktif(hash) {
  var items = document.querySelectorAll('#bottom-nav-admin [data-route-admin]');
  for (var i = 0; i < items.length; i++) {
    var route = items[i].getAttribute('data-route-admin');
    if (rutecocok(hash, route)) { items[i].classList.add('aktif'); items[i].setAttribute('aria-current', 'page'); }
    else { items[i].classList.remove('aktif'); items[i].removeAttribute('aria-current'); }
  }
}
function renderMenuSidebar() {
  var wadah = document.getElementById('sidebar-menu');
  if (!wadah) return;
  var menuAktif = ambilMenuSesuaiRole();
  var grupTerbuka = muatGrupTerbuka();
  var role = ambilRoleSaatIni() || 'guest';
  var html = '';
  menuAktif.forEach(function (grup, idx) {
    var grupId = role + '-grup-' + idx;
    var tetapTerbuka = grup.tetap_terbuka === true;
    var terbuka = tetapTerbuka || grupTerbuka.indexOf(grupId) > -1;
    html += '<div class="sidebar-grup' + (terbuka ? ' terbuka' : '') + '" data-grup-id="' + grupId + '" data-tetap="' + (tetapTerbuka ? '1' : '0') + '">';
    html += '<div class="sidebar-grup-judul" role="button" tabindex="0" aria-expanded="' + (terbuka ? 'true' : 'false') + '" data-grup-toggle="' + grupId + '"><span>' + escapeHtml(grup.grup) + '</span>' + SVG_ICONS.chevronDown + '</div>';
    html += '<div class="sidebar-grup-item">';
    grup.item.forEach(function (item) {
      var ikon = SVG_ICONS[item.icon] || SVG_ICONS.infoCircle;
      html += '<a class="sidebar-link" data-route="' + item.route + '" href="' + item.route + '">' + ikon + '<span>' + escapeHtml(item.label) + '</span></a>';
    });
    html += '</div></div>';
  });
  wadah.innerHTML = html;
  if (STATE.halamanAktif) perbaruiMenuSidebarAktif(STATE.halamanAktif);
}
function toggleGrupSidebar(grupId) {
  var grup = document.querySelector('.sidebar-grup[data-grup-id="' + grupId + '"]');
  if (!grup) return;
  if (grup.getAttribute('data-tetap') === '1') return;
  var sedangTerbuka = grup.classList.contains('terbuka');
  var semuaGrup = document.querySelectorAll('#sidebar-menu .sidebar-grup');
  for (var i = 0; i < semuaGrup.length; i++) {
    if (semuaGrup[i].getAttribute('data-tetap') === '1') continue;
    semuaGrup[i].classList.remove('terbuka');
  }
  var daftarTerbuka = [];
  var grupTetap = document.querySelectorAll('#sidebar-menu .sidebar-grup[data-tetap="1"]');
  for (var k = 0; k < grupTetap.length; k++) daftarTerbuka.push(grupTetap[k].getAttribute('data-grup-id'));
  if (!sedangTerbuka) { grup.classList.add('terbuka'); daftarTerbuka.push(grupId); }
  simpanGrupTerbuka(daftarTerbuka);
  sinkronAriaGrup();
}
function sinkronAriaGrup() {
  var daftar = document.querySelectorAll('#sidebar-menu .sidebar-grup');
  for (var i = 0; i < daftar.length; i++) {
    var j = daftar[i].querySelector('.sidebar-grup-judul');
    if (j) j.setAttribute('aria-expanded', daftar[i].classList.contains('terbuka') ? 'true' : 'false');
  }
}
function toggleSidebar() {
  if (window.innerWidth < 1024) { document.body.classList.toggle('sidebar-mobile-terbuka'); }
  else {
    var tertutupSekarang = document.body.classList.contains('sidebar-tertutup');
    if (tertutupSekarang) { document.body.classList.remove('sidebar-tertutup'); simpanStateSidebar(false); }
    else { document.body.classList.add('sidebar-tertutup'); simpanStateSidebar(true); }
  }
}
function tutupSidebarMobile() { document.body.classList.remove('sidebar-mobile-terbuka'); }
function bukaSearch() {
  if (!STATE.token || !STATE.pengguna) return;
  var overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  if (!overlay.classList.contains('tampil')) _fokusSebelumSearch = document.activeElement;
  overlay.classList.add('tampil');
  var input = document.getElementById('search-input');
  if (input) { input.value = ''; cariGlobal(''); setTimeout(function () { input.focus(); }, 100); }
}
var _fokusSebelumSearch = null;
function tutupSearch() {
  var overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  var tadiTerbuka = overlay.classList.contains('tampil');
  overlay.classList.remove('tampil');
  if (tadiTerbuka && _fokusSebelumSearch && _fokusSebelumSearch.focus) { try { _fokusSebelumSearch.focus(); } catch (e) {} }
  _fokusSebelumSearch = null;
}
function ambilDaftarMenuDatar() {
  var hasil = [];
  ambilMenuSesuaiRole().forEach(function (g) {
    (g.item || []).forEach(function (it) { hasil.push({ label: it.label, grup: g.grup, route: it.route }); });
  });
  return hasil;
}
function cariGlobal(kata) {
  var wadah = document.getElementById('search-hasil');
  if (!wadah) return;
  var q = String(kata || '').trim().toLowerCase();
  if (!q) { wadah.innerHTML = '<div class="search-hasil-kosong">Ketik untuk mencari halaman atau santri...</div>'; return; }
  var html = '';
  var halaman = ambilDaftarMenuDatar().filter(function (m) {
    return String(m.label).toLowerCase().indexOf(q) > -1 || String(m.grup).toLowerCase().indexOf(q) > -1;
  }).slice(0, 6);
  if (halaman.length) {
    html += '<div class="search-hasil-label">Halaman</div>';
    halaman.forEach(function (m) {
      html += '<a class="search-hasil-item" href="' + escapeHtml(m.route) + '" style="display:block;padding:10px 12px"><span class="search-hasil-judul">' + escapeHtml(m.label) + '</span> <span class="search-hasil-sub">' + escapeHtml(m.grup) + '</span></a>';
    });
  }
  if (ambilRoleSaatIni() === 'admin' && STATE.daftarSantri && STATE.daftarSantri.length) {
    var santri = STATE.daftarSantri.filter(function (x) {
      return String(x.nama_lengkap || '').toLowerCase().indexOf(q) > -1 || String(x.nis || '').toLowerCase().indexOf(q) > -1 || String(x.nisn || '').toLowerCase().indexOf(q) > -1;
    }).slice(0, 8);
    if (santri.length) {
      html += '<div class="search-hasil-label">Santri</div>';
      santri.forEach(function (x) {
        html += '<a class="search-hasil-item" href="#/admin/profil-santri/' + encodeURIComponent(x.id) + '" style="display:block;padding:10px 12px"><span class="search-hasil-judul">' + escapeHtml(x.nama_lengkap) + '</span> <span class="search-hasil-sub">' + escapeHtml(x.nis || '') + '</span></a>';
      });
    }
  } else if (ambilRoleSaatIni() === 'admin') {
    html += '<div class="search-hasil-kosong">Buka halaman Data Santri terlebih dahulu agar santri bisa dicari.</div>';
  }
  if (!html) html = '<div class="search-hasil-kosong">Tidak ada hasil untuk "' + escapeHtml(kata) + '".</div>';
  wadah.innerHTML = html;
}
function pasangEventSearch() {
  var input = document.getElementById('search-input');
  var hasil = document.getElementById('search-hasil');
  var overlay = document.getElementById('search-overlay');
  var timer = null;
  if (overlay) { overlay.setAttribute('role', 'dialog'); overlay.setAttribute('aria-modal', 'true'); overlay.setAttribute('aria-label', 'Pencarian'); }
  if (input) {
    input.setAttribute('aria-label', 'Cari halaman atau santri');
    input.setAttribute('placeholder', 'Cari halaman atau santri...');
    input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(function () { cariGlobal(input.value); }, 120); });
    input.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      var a = hasil && hasil.querySelector('a');
      if (a) { e.preventDefault(); window.location.hash = a.getAttribute('href'); tutupSearch(); }
    });
  }
  if (hasil) hasil.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('a')) tutupSearch(); });
}
function pasangEventSidebarGrup() {
  var menu = document.getElementById('sidebar-menu');
  if (!menu) return;
  menu.addEventListener('click', function (e) {
    var j = e.target.closest && e.target.closest('[data-grup-toggle]');
    if (j) toggleGrupSidebar(j.getAttribute('data-grup-toggle'));
  });
  menu.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var j = e.target.closest && e.target.closest('[data-grup-toggle]');
    if (j) { e.preventDefault(); toggleGrupSidebar(j.getAttribute('data-grup-toggle')); }
  });
}
function perangkapFokus(e) {
  var modal = document.getElementById('modal-overlay');
  var search = document.getElementById('search-overlay');
  var wadah = null;
  if (modal && modal.classList.contains('tampil')) wadah = document.getElementById('modal-box');
  else if (search && search.classList.contains('tampil')) wadah = search.querySelector('.search-box');
  if (!wadah) return;
  var daftar = wadah.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
  var terlihat = [];
  for (var i = 0; i < daftar.length; i++) { if (daftar[i].offsetParent !== null || daftar[i] === document.activeElement) terlihat.push(daftar[i]); }
  if (!terlihat.length) return;
  var pertama = terlihat[0], terakhir = terlihat[terlihat.length - 1];
  if (e.shiftKey && (document.activeElement === pertama || !wadah.contains(document.activeElement))) { e.preventDefault(); terakhir.focus(); }
  else if (!e.shiftKey && (document.activeElement === terakhir || !wadah.contains(document.activeElement))) { e.preventDefault(); pertama.focus(); }
}
function tanganiKeyboardGlobal(e) {
  var tombol = e.key;
  if (tombol === 'Escape') {
    tutupSearch();
    tutupDrawer();
    var dd = document.querySelectorAll('.navbar-user-dropdown, .topbar-dropdown, .dropdown-filter-menu');
    for (var i = 0; i < dd.length; i++) dd[i].classList.remove('tampil');
    var modal = document.getElementById('modal-overlay');
    if (modal && modal.classList.contains('tampil')) { if (STATE.cropImage) tutupCrop(); else tutupModal(); }
    return;
  }
  if ((e.ctrlKey || e.metaKey) && tombol && String(tombol).toLowerCase() === 'k') {
    if (STATE.token && STATE.pengguna) { e.preventDefault(); bukaSearch(); }
    return;
  }
  if (tombol === 'Tab') perangkapFokus(e);
}

/* ============================================================
 * ROLE GUARD
 * ============================================================ */

/**
 * Pastikan login admin. Kalau tidak, redirect.
 */
function pastikanLoginAdmin() {
  if (!STATE.token || !STATE.pengguna) { window.location.hash = '#/login'; return false; }
  if (STATE.pengguna.role !== 'admin') {
    tampilkanToast('Hanya admin yang bisa mengakses halaman ini.', 'gagal', 'Akses Ditolak');
    redirectKeDashboard();
    return false;
  }
  return true;
}

/**
 * Pastikan login guru atau wali. Dipakai halaman read-only.
 */
function pastikanLoginGuruWali() {
  if (!STATE.token || !STATE.pengguna) { window.location.hash = '#/login'; return false; }
  var role = STATE.pengguna.role;
  if (role !== 'guru' && role !== 'wali') {
    tampilkanToast('Hanya guru/wali yang bisa mengakses halaman ini.', 'gagal', 'Akses Ditolak');
    redirectKeDashboard();
    return false;
  }
  return true;
}

/* ============================================================
 * MODUL DATA SANTRI
 * ============================================================ */

function buatHalamanHeader(judul, deskripsi, toolbarHtml, aksiHtml) {
  var html = '<div class="admin-halaman-header">';
  html += '<div class="admin-halaman-judul-wrap"><h1 class="admin-halaman-judul">' + escapeHtml(judul) + '</h1><p class="admin-halaman-deskripsi">' + escapeHtml(deskripsi) + '</p></div>';
  html += '<div class="admin-halaman-toolbar">' + (toolbarHtml || '') + '</div>';
  html += '</div>';
  if (aksiHtml) html = aksiHtml + html;
  return html;
}
function renderStatistikSantri(data) {
  var d = data || { total: 0, aktif: 0, alumni: 0, putra: 0, putri: 0 };
  return '<div class="stat-grid">' +
    '<div class="stat-card"><div class="stat-label">Total Santri</div><div class="stat-nilai">' + (d.total || 0) + '</div></div>' +
    '<div class="stat-card stat-card-aksen"><div class="stat-label">Santri Aktif</div><div class="stat-nilai">' + (d.aktif || 0) + '</div></div>' +
    '<div class="stat-card stat-card-info"><div class="stat-label">Alumni</div><div class="stat-nilai">' + (d.alumni || 0) + '</div></div>' +
    '<div class="stat-card stat-card-abu"><div class="stat-label">Santri Putra</div><div class="stat-nilai">' + (d.putra || 0) + '</div></div>' +
    '<div class="stat-card stat-card-merah"><div class="stat-label">Santri Putri</div><div class="stat-nilai">' + (d.putri || 0) + '</div></div>' +
  '</div>';
}
function renderToolbarSantri() {
  return '<div class="santri-toolbar">' +
    '<div class="santri-search">' + SVG_ICONS.search + '<input id="santri-search-input" placeholder="Cari nama, NIS, atau NISN..." type="text" value="' + escapeHtml(STATE.search) + '"></div>' +
    '<div class="santri-toolbar-aksi">' +
      '<div class="dropdown-filter">' +
        '<button class="dropdown-filter-tombol" onclick="toggleDropdownFilter(\'dropdown-filter-santri\')" type="button">' + SVG_ICONS.filter + '<span class="dropdown-filter-label">Filter:</span><span id="label-filter-santri">' + ambilLabelFilter(STATE.filter) + '</span>' + SVG_ICONS.chevronDown + '</button>' +
        '<div class="dropdown-filter-menu" id="dropdown-filter-santri">' +
          renderItemFilter('semua', 'Semua Santri') +
          renderItemFilter('aktif', 'Aktif') +
          renderItemFilter('alumni', 'Alumni') +
          renderItemFilter('putra', 'Putra') +
          renderItemFilter('putri', 'Putri') +
        '</div>' +
      '</div>' +
      '<div class="dropdown-filter">' +
        '<button class="dropdown-filter-tombol" onclick="toggleDropdownFilter(\'dropdown-export\')" type="button">' + SVG_ICONS.download + '<span>Export</span>' + SVG_ICONS.chevronDown + '</button>' +
        '<div class="dropdown-filter-menu" id="dropdown-export">' +
          '<button class="dropdown-filter-item" onclick="exportCSV();toggleDropdownFilter(\'dropdown-export\')" type="button"><span>Export CSV</span></button>' +
          '<button class="dropdown-filter-item" onclick="exportExcel();toggleDropdownFilter(\'dropdown-export\')" type="button"><span>Export Excel (XLS)</span></button>' +
          '<button class="dropdown-filter-item" onclick="exportPDF();toggleDropdownFilter(\'dropdown-export\')" type="button"><span>Export PDF / Cetak</span></button>' +
        '</div>' +
      '</div>' +
      '<button class="btn btn-outline" onclick="aksiCetakTerpilih()" type="button">' + SVG_ICONS.printer + '<span>Cetak Terpilih</span></button>' +
      '<a class="btn btn-utama" href="#/admin/santri/tambah">' + SVG_ICONS.plus + '<span>Tambah Santri</span></a>' +
    '</div>' +
  '</div>';
}
function ambilLabelFilter(f) {
  if (f === 'aktif') return 'Aktif';
  if (f === 'alumni') return 'Alumni';
  if (f === 'putra') return 'Putra';
  if (f === 'putri') return 'Putri';
  return 'Semua';
}
function renderItemFilter(nilai, label) {
  var aktif = STATE.filter === nilai ? ' aktif' : '';
  return '<button class="dropdown-filter-item' + aktif + '" onclick="setFilterSantri(\'' + nilai + '\')" type="button"><span>' + escapeHtml(label) + '</span>' + (STATE.filter === nilai ? SVG_ICONS.check : '') + '</button>';
}
function setFilterSantri(nilai) {
  STATE.filter = nilai;
  var lbl = document.getElementById('label-filter-santri');
  if (lbl) lbl.textContent = ambilLabelFilter(nilai);
  var menu = document.getElementById('dropdown-filter-santri');
  if (menu) menu.classList.remove('tampil');
  renderDaftarSantriKeWadah();
}
function filterSantri(daftar) {
  var hasil = daftar.slice();
  if (STATE.filter === 'aktif') hasil = hasil.filter(function (s) { return s.status === 'aktif'; });
  else if (STATE.filter === 'alumni') hasil = hasil.filter(function (s) { return s.status === 'alumni'; });
  else if (STATE.filter === 'putra') hasil = hasil.filter(function (s) { return s.jenis_kelamin === 'L'; });
  else if (STATE.filter === 'putri') hasil = hasil.filter(function (s) { return s.jenis_kelamin === 'P'; });
  if (STATE.search) {
    var kunci = STATE.search.toLowerCase().trim();
    hasil = hasil.filter(function (s) {
      return (String(s.nama_lengkap || '').toLowerCase().indexOf(kunci) > -1) ||
             (String(s.nis || '').toLowerCase().indexOf(kunci) > -1) ||
             (String(s.nisn || '').toLowerCase().indexOf(kunci) > -1);
    });
  }
  return hasil;
}
function sortSantri(daftar) {
  var kolom = STATE.sortKolom;
  var asc = STATE.sortAsc;
  return daftar.slice().sort(function (a, b) {
    var va = String(a[kolom] || '').toLowerCase();
    var vb = String(b[kolom] || '').toLowerCase();
    if (va < vb) return asc ? -1 : 1;
    if (va > vb) return asc ? 1 : -1;
    return 0;
  });
}
function setSortSantri(kolom) {
  if (STATE.sortKolom === kolom) STATE.sortAsc = !STATE.sortAsc;
  else { STATE.sortKolom = kolom; STATE.sortAsc = true; }
  renderDaftarSantriKeWadah();
}
function renderFotoMiniSantri(s) {
  if (s.foto_url) return '<div class="santri-foto-mini"><img alt="' + escapeHtml(s.nama_lengkap) + '" src="' + escapeHtml(s.foto_url) + '"></div>';
  return '<div class="santri-foto-mini">' + escapeHtml(ambilInisial(s.nama_lengkap)) + '</div>';
}
function renderDaftarSantriKeWadah() {
  var wrap = document.getElementById('santri-content');
  if (!wrap) return;
  if (!STATE.daftarSantri || STATE.daftarSantri.length === 0) {
    wrap.innerHTML = '<div class="santri-kosong">' + SVG_ICONS.users + '<h3>Belum ada data santri</h3><p>Mulai dengan menambahkan data santri pertama.</p><a class="btn btn-utama" href="#/admin/santri/tambah">' + SVG_ICONS.plus + '<span>Tambah Santri</span></a></div>';
    return;
  }
  var daftar = filterSantri(STATE.daftarSantri);
  daftar = sortSantri(daftar);
  if (daftar.length === 0) {
    wrap.innerHTML = '<div class="santri-kosong">' + SVG_ICONS.search + '<h3>Tidak ada hasil</h3><p>Tidak ada santri yang cocok dengan filter/pencarian.</p><button class="btn btn-outline" onclick="resetFilterSantri()" type="button">Reset Filter</button></div>';
    return;
  }
  var html = '<div class="santri-info-count">Menampilkan <strong>' + daftar.length + '</strong> dari <strong>' + STATE.daftarSantri.length + '</strong> santri</div>';
  html += renderTabelSantri(daftar);
  html += renderCardSantri(daftar);
  wrap.innerHTML = html;
  pasangEventSantriCheckbox();
}
function renderHeaderSort(kolom, label) {
  var aktif = STATE.sortKolom === kolom ? ' aktif-sort' : '';
  var ikon = STATE.sortKolom === kolom ? (STATE.sortAsc ? SVG_ICONS.chevronUp : SVG_ICONS.chevronDown) : SVG_ICONS.chevronDown;
  return '<th class="sortable' + aktif + '" onclick="setSortSantri(\'' + kolom + '\')">' + escapeHtml(label) + ikon + '</th>';
}
function renderTabelSantri(daftar) {
  var html = '<div class="santri-tabel-wrap"><div class="santri-tabel-scroll"><table class="santri-tabel"><thead><tr>';
  html += '<th class="santri-row-checkbox"><input id="check-semua" type="checkbox" onchange="toggleSemuaCheckbox(this)"></th>';
  html += '<th>Foto</th>';
  html += renderHeaderSort('nis', 'NIS');
  html += renderHeaderSort('nama_lengkap', 'Nama');
  html += renderHeaderSort('jenis_kelamin', 'JK');
  html += '<th>Kelas</th>';
  html += renderHeaderSort('status', 'Status');
  html += '<th style="text-align:right">Aksi</th>';
  html += '</tr></thead><tbody>';
  daftar.forEach(function (s) {
    var checked = STATE.terpilih[s.id] ? ' checked' : '';
    var badgeKelas = 'santri-badge ' + (s.status || 'aktif');
    var labelStatus = s.status === 'aktif' ? 'AKTIF' : (s.status === 'alumni' ? 'ALUMNI' : 'NONAKTIF');
    html += '<tr class="santri-row">';
    html += '<td class="santri-row-checkbox"><input class="check-santri" data-id="' + escapeHtml(s.id) + '" type="checkbox"' + checked + '></td>';
    html += '<td>' + renderFotoMiniSantri(s) + '</td>';
    html += '<td><span class="santri-nis">' + escapeHtml(s.nis || '-') + '</span></td>';
    html += '<td><div class="santri-nama">' + escapeHtml(s.nama_lengkap || '-') + '</div></td>';
    html += '<td>' + escapeHtml(labelJenisKelamin(s.jenis_kelamin) || '-') + '</td>';
    html += '<td>' + escapeHtml(s.kelas_id || '-') + '</td>';
    html += '<td><span class="' + badgeKelas + '">' + labelStatus + '</span></td>';
    html += '<td><div class="santri-aksi">';
    html += '<a class="santri-aksi-tombol" href="#/admin/profil-santri/' + escapeHtml(s.id) + '" title="Lihat Detail">' + SVG_ICONS.eye + '</a>';
    html += '<a class="santri-aksi-tombol" href="#/admin/santri/edit/' + escapeHtml(s.id) + '" title="Edit">' + SVG_ICONS.edit + '</a>';
    html += '<button class="santri-aksi-tombol" onclick="aksiCetakKTS(\'' + escapeHtml(s.id) + '\')" title="Cetak KTS" type="button">' + SVG_ICONS.printer + '</button>';
    html += '<button class="santri-aksi-tombol danger" onclick="konfirmasiHapusSantri(\'' + escapeHtml(s.id) + '\',\'' + escapeHtml(s.nama_lengkap) + '\')" title="Hapus" type="button">' + SVG_ICONS.trash + '</button>';
    html += '</div></td>';
    html += '</tr>';
  });
  html += '</tbody></table></div></div>';
  return html;
}
function renderCardSantri(daftar) {
  var html = '<div class="santri-card-list">';
  daftar.forEach(function (s) {
    var checked = STATE.terpilih[s.id] ? ' checked' : '';
    var badgeKelas = 'santri-badge ' + (s.status || 'aktif');
    var labelStatus = s.status === 'aktif' ? 'AKTIF' : (s.status === 'alumni' ? 'ALUMNI' : 'NONAKTIF');
    var fotoHtml = s.foto_url ? '<img alt="' + escapeHtml(s.nama_lengkap) + '" src="' + escapeHtml(s.foto_url) + '">' : escapeHtml(ambilInisial(s.nama_lengkap));
    html += '<div class="santri-card ' + (s.status || '') + '">';
    html += '<div class="santri-card-checkbox"><input class="check-santri" data-id="' + escapeHtml(s.id) + '" type="checkbox"' + checked + '></div>';
    html += '<div class="santri-card-foto">' + fotoHtml + '</div>';
    html += '<div class="santri-card-body">';
    html += '<div class="santri-card-nama">' + escapeHtml(s.nama_lengkap || '-') + '</div>';
    html += '<div class="santri-card-nis">NIS: ' + escapeHtml(s.nis || '-') + '</div>';
    html += '<div class="santri-card-meta"><span class="' + badgeKelas + '">' + labelStatus + '</span><span>' + escapeHtml(labelJenisKelamin(s.jenis_kelamin) || '-') + '</span><span>' + escapeHtml(s.kelas_id || 'Belum ada kelas') + '</span></div>';
    html += '<div class="santri-card-aksi">';
    html += '<a class="btn btn-outline btn-sm" href="#/admin/profil-santri/' + escapeHtml(s.id) + '">' + SVG_ICONS.eye + '<span>Detail</span></a>';
    html += '<a class="btn btn-outline btn-sm" href="#/admin/santri/edit/' + escapeHtml(s.id) + '">' + SVG_ICONS.edit + '<span>Edit</span></a>';
    html += '<button class="btn btn-outline btn-sm" onclick="konfirmasiHapusSantri(\'' + escapeHtml(s.id) + '\',\'' + escapeHtml(s.nama_lengkap) + '\')" type="button">' + SVG_ICONS.trash + '</button>';
    html += '</div></div></div>';
  });
  html += '</div>';
  return html;
}
function pasangEventSantriCheckbox() {
  var semuaCheck = document.querySelectorAll('.check-santri');
  for (var i = 0; i < semuaCheck.length; i++) {
    semuaCheck[i].addEventListener('change', function () {
      var id = this.getAttribute('data-id');
      if (this.checked) STATE.terpilih[id] = true; else delete STATE.terpilih[id];
    });
  }
}
function toggleSemuaCheckbox(el) {
  var semuaCheck = document.querySelectorAll('.check-santri');
  for (var i = 0; i < semuaCheck.length; i++) {
    semuaCheck[i].checked = el.checked;
    var id = semuaCheck[i].getAttribute('data-id');
    if (el.checked) STATE.terpilih[id] = true; else delete STATE.terpilih[id];
  }
}
function resetFilterSantri() {
  STATE.filter = 'semua';
  STATE.search = '';
  var inp = document.getElementById('santri-search-input');
  if (inp) inp.value = '';
  var lbl = document.getElementById('label-filter-santri');
  if (lbl) lbl.textContent = 'Semua';
  renderDaftarSantriKeWadah();
}
function aksiCetakKTS(id) {
  tampilkanToast('Fitur cetak KTS akan segera tersedia. ID: ' + id, 'info', 'Segera');
}
function aksiCetakTerpilih() {
  var terpilih = Object.keys(STATE.terpilih);
  if (terpilih.length === 0) { tampilkanToast('Pilih santri terlebih dahulu.', 'peringatan', 'Perhatian'); return; }
  tampilkanToast('Fitur cetak KTS untuk ' + terpilih.length + ' santri terpilih akan segera tersedia.', 'info', 'Segera');
}
/** Netralkan formula spreadsheet (=, +, -, @) pada sel teks bebas. */
function amankanSel(v) {
  var t = (v === null || v === undefined) ? '' : String(v);
  return /^[=+\-@\t\r]/.test(t) ? "'" + t : t;
}
/** Kolom identitas/nomor: dipertahankan sebagai teks agar angka nol di depan tidak hilang. */
function selTeksCsv(v) {
  var t = (v === null || v === undefined) ? '' : String(v);
  if (/^\+?[0-9][0-9\s\-]*$/.test(t)) return '="' + t + '"';
  return amankanSel(t);
}
function exportCSV() {
  if (!STATE.daftarSantri || STATE.daftarSantri.length === 0) { tampilkanToast('Tidak ada data untuk diexport.', 'peringatan', 'Perhatian'); return; }
  var daftar = sortSantri(filterSantri(STATE.daftarSantri));
  var header = ['NIS', 'NISN', 'Nama Lengkap', 'Jenis Kelamin', 'Tempat Lahir', 'Tanggal Lahir', 'Alamat', 'No HP', 'Nama Ayah', 'Nama Ibu', 'Kelas', 'Tahun Masuk', 'Status'];
  var baris = [header.join(';')];
  daftar.forEach(function (s) {
    var r = [
      selTeksCsv(s.nis), selTeksCsv(s.nisn), amankanSel(s.nama_lengkap), amankanSel(labelJenisKelamin(s.jenis_kelamin)),
      amankanSel(s.tempat_lahir), amankanSel(s.tanggal_lahir), amankanSel(s.alamat), selTeksCsv(s.no_hp),
      amankanSel(s.nama_ayah), amankanSel(s.nama_ibu), amankanSel(s.kelas_id), amankanSel(s.tahun_masuk), amankanSel(s.status)
    ];
    baris.push(r.map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(';'));
  });
  var csv = '\ufeff' + baris.join('\r\n');
  unduhFile(csv, 'data-santri-' + ambilTimestampFile() + '.csv', 'text/csv;charset=utf-8');
  tampilkanToast('Data berhasil diexport ke CSV.', 'sukses', 'Export Berhasil');
}
function selXls(v) { return escapeHtml(amankanSel(v)); }
function exportExcel() {
  if (!STATE.daftarSantri || STATE.daftarSantri.length === 0) { tampilkanToast('Tidak ada data untuk diexport.', 'peringatan', 'Perhatian'); return; }
  var daftar = sortSantri(filterSantri(STATE.daftarSantri));
  var html = '<html><head><meta charset="utf-8"></head><body><table border="1">';
  html += '<thead><tr><th>NIS</th><th>NISN</th><th>Nama Lengkap</th><th>JK</th><th>Tempat Lahir</th><th>Tanggal Lahir</th><th>Alamat</th><th>No HP</th><th>Nama Ayah</th><th>Nama Ibu</th><th>Kelas</th><th>Tahun Masuk</th><th>Status</th></tr></thead><tbody>';
  daftar.forEach(function (s) {
    html += '<tr><td style="mso-number-format:\'\\@\'">' + selXls(s.nis) + '</td><td style="mso-number-format:\'\\@\'">' + selXls(s.nisn) + '</td><td>' + selXls(s.nama_lengkap) + '</td><td>' + selXls(labelJenisKelamin(s.jenis_kelamin)) + '</td><td>' + selXls(s.tempat_lahir) + '</td><td>' + selXls(s.tanggal_lahir) + '</td><td>' + selXls(s.alamat) + '</td><td style="mso-number-format:\'\\@\'">' + selXls(s.no_hp) + '</td><td>' + selXls(s.nama_ayah) + '</td><td>' + selXls(s.nama_ibu) + '</td><td>' + selXls(s.kelas_id) + '</td><td>' + selXls(s.tahun_masuk) + '</td><td>' + selXls(s.status) + '</td></tr>';
  });
  html += '</tbody></table></body></html>';
  unduhFile(html, 'data-santri-' + ambilTimestampFile() + '.xls', 'application/vnd.ms-excel');
  tampilkanToast('Data berhasil diexport ke Excel.', 'sukses', 'Export Berhasil');
}
function exportPDF() { window.print(); }
function unduhFile(konten, namaFile, mime) {
  try {
    var blob = new Blob([konten], { type: mime });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = namaFile;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  } catch (e) { logDebug('Gagal unduh:', e); tampilkanToast('Gagal mengunduh file.', 'gagal'); }
}
function ambilTimestampFile() {
  var d = new Date();
  var pad = function (n) { return String(n).padStart(2, '0'); };
  return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + '-' + pad(d.getHours()) + pad(d.getMinutes());
}
function renderHalamanSantri(wadah) {
  if (!pastikanLoginAdmin()) return;
  STATE.terpilih = {};
  wadah.innerHTML = '' +
    buatHalamanHeader('Data Santri', 'Kelola data seluruh santri ELKAROM') +
    '<div id="santri-statistik">' + renderStatistikSantri() + '</div>' +
    renderToolbarSantri() +
    '<div id="santri-content"><div class="loading-box"><div class="spinner"></div><p class="teks-lembut">Memuat data santri...</p></div></div>';
  pasangEventToolbarSantri();
  muatSantri();
}
function pasangEventToolbarSantri() {
  var inp = document.getElementById('santri-search-input');
  if (inp) {
    var tmr = null;
    inp.addEventListener('input', function () {
      clearTimeout(tmr);
      var v = this.value;
      tmr = setTimeout(function () { STATE.search = v; renderDaftarSantriKeWadah(); }, 250);
    });
  }
}
function muatSantri() {
  panggilApi('statistikSiswa', {}, 'POST').then(function (res) {
    var el = document.getElementById('santri-statistik');
    if (el && res && res.sukses && res.data) el.innerHTML = renderStatistikSantri(res.data);
  });
  panggilApi('ambilSemuaSiswa', {}, 'POST').then(function (res) {
    if (res && res.sukses && res.data && Array.isArray(res.data)) { STATE.daftarSantri = res.data; renderDaftarSantriKeWadah(); }
    else {
      var wrap = document.getElementById('santri-content');
      if (wrap) wrap.innerHTML = '<div class="santri-kosong">' + SVG_ICONS.warning + '<h3>Gagal memuat data</h3><p>' + escapeHtml((res && res.pesan) || 'Terjadi kesalahan.') + '</p><button class="btn btn-outline" onclick="muatSantri()" type="button">' + SVG_ICONS.refresh + '<span>Coba Lagi</span></button></div>';
    }
  });
}
function konfirmasiHapusSantri(id, nama) {
  var html = '<p class="modal-konfirmasi-tanya">Yakin ingin menghapus santri <span class="modal-konfirmasi-nama">' + escapeHtml(nama) + '</span>?</p><p class="teks-lembut" style="font-size:13px">Santri akan diubah menjadi <strong>nonaktif</strong> (soft delete). Data tetap tersimpan dan dapat dipulihkan.</p>';
  var footer = '<button class="btn btn-ghost" onclick="tutupModal()" type="button">Batal</button><button class="btn btn-danger" onclick="hapusSantriProses(\'' + escapeHtml(id) + '\')" type="button">Hapus</button>';
  bukaModal('Konfirmasi Hapus', html, footer);
}
function hapusSantriProses(id) {
  tutupModal();
  panggilApi('hapusSiswa', { id: id }, 'POST').then(function (res) {
    if (res && res.sukses) { tampilkanToast('Santri berhasil dihapus.', 'sukses'); muatSantri(); }
    else tampilkanToast((res && res.pesan) || 'Gagal menghapus.', 'gagal');
  });
}
function renderHalamanTambahSantri(wadah) {
  if (!pastikanLoginAdmin()) return;
  renderFormSantri(wadah, null);
}
function renderHalamanEditSantri(wadah, id) {
  if (!pastikanLoginAdmin()) return;
  panggilApi('ambilSiswaBerdasarkanId', { id: id }, 'POST').then(function (res) {
    if (res && res.sukses && res.data) renderFormSantri(wadah, res.data);
    else { wadah.innerHTML = '<div class="admin-placeholder"><div class="admin-placeholder-ikon">' + SVG_ICONS.warning + '</div><h2>Data tidak ditemukan</h2><p>Santri dengan ID tersebut tidak ada.</p><a class="btn btn-utama mt-4" href="#/admin/santri">Kembali ke Data Santri</a></div>'; }
  });
}

/**
 * Halaman Data Santri versi GURU/WALI (read-only).
 * TIDAK pakai pastikanLoginAdmin. Pakai pastikanLoginGuruWali.
 * Tampilkan tombol kembali ke dashboard guru/wali.
 */
function renderHalamanSantriGuru(wadah) {
  if (!pastikanLoginGuruWali()) return;
  STATE.terpilih = {};

  // Tentukan route kembali sesuai role
  var role = ambilRoleSaatIni();
  var routeKembali = role === 'guru' ? '#/guru' : '#/wali';

  wadah.innerHTML = '' +
    '<div class="admin-halaman-header">' +
      '<div class="admin-halaman-judul-wrap">' +
        '<a class="btn btn-ghost btn-sm" href="' + routeKembali + '" style="margin-bottom:8px">' + SVG_ICONS.arrowLeft + '<span>Kembali</span></a>' +
        '<h1 class="admin-halaman-judul">Data Santri</h1>' +
        '<p class="admin-halaman-deskripsi">Daftar santri ELKAROM (mode lihat saja)</p>' +
      '</div>' +
    '</div>' +
    '<div id="santri-statistik">' + renderStatistikSantri() + '</div>' +
    '<div class="santri-toolbar">' +
      '<div class="santri-search">' + SVG_ICONS.search + '<input id="santri-search-input" placeholder="Cari nama, NIS, atau NISN..." type="text" value="' + escapeHtml(STATE.search) + '"></div>' +
    '</div>' +
    '<div id="santri-content"><div class="loading-box"><div class="spinner"></div><p class="teks-lembut">Memuat data santri...</p></div></div>';

  // Pasang event search (reuse)
  var inp = document.getElementById('santri-search-input');
  if (inp) {
    var tmr = null;
    inp.addEventListener('input', function () {
      clearTimeout(tmr);
      var v = this.value;
      tmr = setTimeout(function () { STATE.search = v; renderDaftarSantriKeWadah(); }, 250);
    });
  }

  // Muat data (reuse muatSantri)
  panggilApi('statistikSiswa', {}, 'POST').then(function (res) {
    var el = document.getElementById('santri-statistik');
    if (el && res && res.sukses && res.data) el.innerHTML = renderStatistikSantri(res.data);
  });
  panggilApi('ambilSemuaSiswa', {}, 'POST').then(function (res) {
    if (res && res.sukses && res.data && Array.isArray(res.data)) { STATE.daftarSantri = res.data; renderDaftarSantriKeWaliWadah(); }
    else {
      var wrap = document.getElementById('santri-content');
      if (wrap) wrap.innerHTML = '<div class="santri-kosong">' + SVG_ICONS.warning + '<h3>Gagal memuat data</h3><p>' + escapeHtml((res && res.pesan) || 'Terjadi kesalahan.') + '</p></div>';
    }
  });
}

/**
 * Versi read-only dari renderDaftarSantriKeWadah.
 * Tanpa checkbox, tanpa tombol aksi edit/hapus.
 */
function renderDaftarSantriKeWaliWadah() {
  var wrap = document.getElementById('santri-content');
  if (!wrap) return;
  if (!STATE.daftarSantri || STATE.daftarSantri.length === 0) {
    wrap.innerHTML = '<div class="santri-kosong">' + SVG_ICONS.users + '<h3>Belum ada data santri</h3></div>';
    return;
  }
  var daftar = filterSantri(STATE.daftarSantri);
  daftar = sortSantri(daftar);
  if (daftar.length === 0) {
    wrap.innerHTML = '<div class="santri-kosong">' + SVG_ICONS.search + '<h3>Tidak ada hasil</h3><p>Tidak ada santri yang cocok dengan pencarian.</p></div>';
    return;
  }
  var html = '<div class="santri-info-count">Menampilkan <strong>' + daftar.length + '</strong> dari <strong>' + STATE.daftarSantri.length + '</strong> santri</div>';
  // Card list (tampil di semua ukuran karena read-only, lebih ringkas)
  html += '<div class="santri-card-list" style="display:flex">';
  daftar.forEach(function (s) {
    var badgeKelas = 'santri-badge ' + (s.status || 'aktif');
    var labelStatus = s.status === 'aktif' ? 'AKTIF' : (s.status === 'alumni' ? 'ALUMNI' : 'NONAKTIF');
    var fotoHtml = s.foto_url ? '<img alt="' + escapeHtml(s.nama_lengkap) + '" src="' + escapeHtml(s.foto_url) + '">' : escapeHtml(ambilInisial(s.nama_lengkap));
    html += '<div class="santri-card ' + (s.status || '') + '">';
    html += '<div class="santri-card-foto">' + fotoHtml + '</div>';
    html += '<div class="santri-card-body">';
    html += '<div class="santri-card-nama">' + escapeHtml(s.nama_lengkap || '-') + '</div>';
    html += '<div class="santri-card-nis">NIS: ' + escapeHtml(s.nis || '-') + '</div>';
    html += '<div class="santri-card-meta"><span class="' + badgeKelas + '">' + labelStatus + '</span><span>' + escapeHtml(labelJenisKelamin(s.jenis_kelamin) || '-') + '</span><span>' + escapeHtml(s.kelas_id || 'Belum ada kelas') + '</span></div>';
    html += '</div></div>';
  });
  html += '</div>';
  wrap.innerHTML = html;
}


function renderFormSantri(wadah, dataEdit) {
  var s = dataEdit || {};
  var adalahEdit = !!dataEdit;
  var ortu = (s.orang_tua || {});
  var ayah = ortu.ayah || {};
  var ibu = ortu.ibu || {};
  var tahun = new Date().getFullYear();
  var tahunMasukDefault = s.tahun_masuk || String(tahun);
  var judul = adalahEdit ? 'Edit Santri' : 'Tambah Santri Baru';
  var deskripsi = adalahEdit ? 'Perbarui data santri ' + (s.nama_lengkap || '') : 'Lengkapi data santri baru';
  var html = '' +
    '<div class="admin-halaman-header">' +
      '<div class="admin-halaman-judul-wrap">' +
        '<a class="btn btn-ghost btn-sm" href="#/admin/santri" style="margin-bottom:8px">' + SVG_ICONS.arrowLeft + '<span>Kembali</span></a>' +
        '<h1 class="admin-halaman-judul">' + escapeHtml(judul) + '</h1>' +
        '<p class="admin-halaman-deskripsi">' + escapeHtml(deskripsi) + '</p>' +
      '</div>' +
    '</div>' +
    '<form id="form-santri" onsubmit="submitFormSantri(event)">' +
      '<input id="santri-id" type="hidden" value="' + escapeHtml(s.id || '') + '">' +
      '<div class="form-card">' +
        '<div class="form-card-judul">' + SVG_ICONS.user + '<span>Foto Santri</span></div>' +
        '<div class="foto-uploader">' +
          '<div class="foto-preview" id="foto-preview" onclick="pilihFileFoto()">' +
            (s.foto_url ? '<img id="foto-img" src="' + escapeHtml(s.foto_url) + '">' : '<div class="foto-preview-placeholder" id="foto-placeholder">' + SVG_ICONS.camera + '<span>Klik untuk pilih foto<br>(3:4)</span></div>') +
          '</div>' +
          '<input accept="image/jpeg,image/png,image/webp" id="input-foto" style="display:none" type="file">' +
          '<input id="foto-url" type="hidden" value="' + escapeHtml(s.foto_url || '') + '">' +
          '<div class="foto-aksi">' +
            '<button class="btn btn-outline btn-sm" onclick="pilihFileFoto()" type="button">' + SVG_ICONS.camera + '<span>Pilih Foto</span></button>' +
            '<button class="btn btn-ghost btn-sm" onclick="hapusFoto()" type="button">' + SVG_ICONS.trash + '<span>Hapus</span></button>' +
          '</div>' +
          '<div class="form-hint" style="text-align:center">Format JPG/PNG/WebP, maks 2 MB. Akan otomatis di-crop 3:4.</div>' +
        '</div>' +
      '</div>' +
      '<div class="form-card">' +
        '<div class="form-card-judul">' + SVG_ICONS.user + '<span>Biodata Santri</span></div>' +
        '<div class="form-grid form-grid-2">' +
          field('Nama Lengkap', 'nama_lengkap', s.nama_lengkap, true, 'text', 'Nama lengkap santri') +
          field('Nama Panggilan', 'nama_panggilan', s.nama_panggilan, false, 'text', 'Nama panggilan (opsional)') +
          fieldNis(s.nis, adalahEdit) +
          field('NISN', 'nisn', s.nisn, false, 'text', 'Nomor Induk Siswa Nasional (opsional)') +
          selectField('Jenis Kelamin', 'jenis_kelamin', s.jenis_kelamin, true, [{ v: 'L', t: 'Laki-laki (Putra)' }, { v: 'P', t: 'Perempuan (Putri)' }]) +
          field('Tempat Lahir', 'tempat_lahir', s.tempat_lahir, false, 'text', 'Kota/kabupaten lahir') +
          field('Tanggal Lahir', 'tanggal_lahir', s.tanggal_lahir, false, 'date', '') +
          field('No HP', 'no_hp', s.no_hp, false, 'tel', '08xx-xxxx-xxxx') +
        '</div>' +
        '<div style="margin-top:16px">' + textareaField('Alamat', 'alamat', s.alamat, false, 'Alamat lengkap') + '</div>' +
      '</div>' +
      '<div class="form-card">' +
        '<div class="form-card-judul">' + SVG_ICONS.userCheck + '<span>Data Ayah</span></div>' +
        '<div class="form-grid form-grid-2">' +
          field('Nama Ayah', 'ayah_nama', ayah.nama_lengkap || s.nama_ayah, true, 'text', 'Nama lengkap ayah') +
          field('NIK Ayah', 'ayah_nik', ayah.nik, false, 'text', 'NIK (opsional)') +
          field('Pekerjaan', 'ayah_pekerjaan', ayah.pekerjaan, false, 'text', 'Pekerjaan ayah') +
          field('No HP', 'ayah_no_hp', ayah.no_hp, false, 'tel', '08xx-xxxx-xxxx') +
          field('Tempat Lahir', 'ayah_tempat_lahir', ayah.tempat_lahir, false, 'text', '') +
          field('Tanggal Lahir', 'ayah_tanggal_lahir', ayah.tanggal_lahir, false, 'date', '') +
          selectField('Status', 'ayah_status_hidup', ayah.status_hidup || 'hidup', false, [{ v: 'hidup', t: 'Hidup' }, { v: 'meninggal', t: 'Meninggal' }]) +
          field('Email', 'ayah_email', ayah.email, false, 'email', 'email@contoh.com') +
        '</div>' +
      '</div>' +
      '<div class="form-card">' +
        '<div class="form-card-judul">' + SVG_ICONS.userCheck + '<span>Data Ibu</span></div>' +
        '<div class="form-grid form-grid-2">' +
          field('Nama Ibu', 'ibu_nama', ibu.nama_lengkap || s.nama_ibu, true, 'text', 'Nama lengkap ibu') +
          field('NIK Ibu', 'ibu_nik', ibu.nik, false, 'text', 'NIK (opsional)') +
          field('Pekerjaan', 'ibu_pekerjaan', ibu.pekerjaan, false, 'text', 'Pekerjaan ibu') +
          field('No HP', 'ibu_no_hp', ibu.no_hp, false, 'tel', '08xx-xxxx-xxxx') +
          field('Tempat Lahir', 'ibu_tempat_lahir', ibu.tempat_lahir, false, 'text', '') +
          field('Tanggal Lahir', 'ibu_tanggal_lahir', ibu.tanggal_lahir, false, 'date', '') +
          selectField('Status', 'ibu_status_hidup', ibu.status_hidup || 'hidup', false, [{ v: 'hidup', t: 'Hidup' }, { v: 'meninggal', t: 'Meninggal' }]) +
          field('Email', 'ibu_email', ibu.email, false, 'email', 'email@contoh.com') +
        '</div>' +
      '</div>' +
      '<div class="form-card">' +
        '<div class="form-card-judul">' + SVG_ICONS.graduation + '<span>Data Akademik</span></div>' +
        '<div class="form-grid form-grid-2">' +
          field('Kelas ID', 'kelas_id', s.kelas_id, false, 'text', 'Contoh: KLS-20260929-XXXXXX') +
          field('Tahun Masuk', 'tahun_masuk', tahunMasukDefault, true, 'text', 'Contoh: 2026') +
          field('Tahun Selesai', 'tahun_selesai', s.tahun_selesai, false, 'text', 'Isi jika alumni') +
          selectField('Status', 'status', s.status || 'aktif', true, [{ v: 'aktif', t: 'Aktif' }, { v: 'alumni', t: 'Alumni' }]) +
        '</div>' +
      '</div>' +
      '<div class="form-tombol" style="display:flex;gap:12px;justify-content:flex-end;margin-bottom:32px">' +
        '<a class="btn btn-ghost" href="#/admin/santri">Batal</a>' +
        '<button class="btn btn-utama" id="tombol-simpan-santri" type="submit">' + (adalahEdit ? 'Simpan Perubahan' : 'Simpan Santri') + '</button>' +
      '</div>' +
    '</form>';
  wadah.innerHTML = html;
  var inpFile = document.getElementById('input-foto');
  if (inpFile) inpFile.addEventListener('change', onFileFotoDipilih);
}
function field(label, id, nilai, wajib, tipe, placeholder) {
  var labelHtml = escapeHtml(label) + (wajib ? '<span class="form-label-wajib-tanda">*</span>' : '');
  return '<div class="form-grup"><label class="form-label" for="' + id + '">' + labelHtml + '</label><input class="form-input" id="' + id + '" placeholder="' + escapeHtml(placeholder || '') + '" type="' + tipe + '" value="' + escapeHtml(nilai || '') + '" style="padding-left:14px"></div>';
}
function textareaField(label, id, nilai, wajib, placeholder) {
  var labelHtml = escapeHtml(label) + (wajib ? '<span class="form-label-wajib-tanda">*</span>' : '');
  return '<div class="form-grup"><label class="form-label" for="' + id + '">' + labelHtml + '</label><textarea class="form-textarea" id="' + id + '" placeholder="' + escapeHtml(placeholder || '') + '">' + escapeHtml(nilai || '') + '</textarea></div>';
}
function selectField(label, id, nilai, wajib, opsi) {
  var labelHtml = escapeHtml(label) + (wajib ? '<span class="form-label-wajib-tanda">*</span>' : '');
  var opts = opsi.map(function (o) { return '<option value="' + escapeHtml(o.v) + '"' + (String(nilai) === String(o.v) ? ' selected' : '') + '>' + escapeHtml(o.t) + '</option>'; }).join('');
  return '<div class="form-grup"><label class="form-label" for="' + id + '">' + labelHtml + '</label><select class="form-select" id="' + id + '">' + opts + '</select></div>';
}
function fieldNis(nilai, adalahEdit) {
  return '<div class="form-grup"><label class="form-label" for="nis">NIS<span class="form-label-wajib-tanda">*</span></label><input class="form-input" id="nis" placeholder="Otomatis / isi manual" type="text" value="' + escapeHtml(nilai || '') + '" style="padding-left:14px"><div class="form-hint">Biarkan kosong untuk auto-generate, atau isi manual.</div></div>';
}
function pilihFileFoto() { var inp = document.getElementById('input-foto'); if (inp) inp.click(); }
function onFileFotoDipilih(e) {
  var file = e.target.files && e.target.files[0];
  if (!file) return;
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) { tampilkanToast('Format file harus JPG, PNG, atau WebP.', 'gagal'); e.target.value = ''; return; }
  if (file.size > 2 * 1024 * 1024) { tampilkanToast('Ukuran file maksimal 2 MB.', 'gagal'); e.target.value = ''; return; }
  var reader = new FileReader();
  reader.onload = function (ev) { bukaCropModal(ev.target.result); e.target.value = ''; };
  reader.onerror = function () { tampilkanToast('File tidak dapat dibaca.', 'gagal'); };
  reader.readAsDataURL(file);
}

function bukaCropModal(dataUrl) {
  var img = new Image();
  img.onload = function () {
    STATE.cropImage = img;
    STATE.cropX = 0;
    STATE.cropY = 0;
    STATE.cropSkala = hitungSkalaAwalCrop(img);

    var html = '' +
      '<div class="crop-area" id="crop-area"><canvas id="crop-canvas"></canvas><div class="crop-overlay"><div class="crop-frame"></div></div></div>' +
      '<div class="crop-info">Geser foto untuk atur posisi. Gunakan slider di bawah untuk memperbesar/memperkecil.</div>' +
      '<div class="crop-zoom-controls">' +
        '<button class="crop-zoom-tombol" onclick="zoomOutCrop()" type="button" title="Perkecil">-</button>' +
        '<input class="crop-zoom-slider" id="crop-zoom-slider" max="3" min="0.05" step="0.05" type="range" value="' + STATE.cropSkala + '" oninput="onZoomSliderChange(this.value)"/>' +
        '<button class="crop-zoom-tombol" onclick="zoomInCrop()" type="button" title="Perbesar">+</button>' +
        '<span class="crop-zoom-label" id="crop-zoom-label">' + Math.round(STATE.cropSkala * 100) + '%</span>' +
      '</div>' +
      '<div style="text-align:center;margin-top:12px"><button class="btn btn-ghost btn-sm" onclick="resetCrop()" type="button">' + SVG_ICONS.rotate + '<span>Reset</span></button></div>';
    var footer = '<button class="btn btn-ghost" onclick="tutupCrop()" type="button">Batal</button><button class="btn btn-utama" onclick="simpanCrop()" type="button">Terapkan</button>';
    bukaModal('Atur Posisi Foto', html, footer, 'lg');
    STATE.cropSkala = hitungSkalaAwalCrop(img);
    perbaruiSliderCrop();
    setTimeout(gambarCrop, 50);
    pasangEventCrop();
    pasangEventCropScroll();
  };
  img.onerror = function () { tampilkanToast('File gambar tidak dapat dibaca atau rusak.', 'gagal'); };
  img.src = dataUrl;
}

/** Skala awal agar seluruh gambar muat di area crop (ukuran aktual area, bukan angka tetap). */
function hitungSkalaAwalCrop(img) {
  var area = document.getElementById('crop-area');
  var lebar = (area && area.clientWidth) ? area.clientWidth : 360;
  var tinggi = (area && area.clientHeight) ? area.clientHeight : 480;
  var skala = Math.min(lebar / img.width, tinggi / img.height);
  return skala > 1 ? 1 : skala;
}

function pasangEventCropScroll() {
  var canvas = document.getElementById('crop-canvas');
  if (!canvas) return;
  canvas.addEventListener('wheel', function (e) {
    e.preventDefault();
    if (e.deltaY < 0) zoomInCrop();
    else zoomOutCrop();
  }, { passive: false });
}

function zoomInCrop() {
  STATE.cropSkala = Math.min(STATE.cropSkala * 1.1, 3);
  perbaruiSliderCrop();
  gambarCrop();
}

function zoomOutCrop() {
  STATE.cropSkala = Math.max(STATE.cropSkala / 1.1, 0.05);
  perbaruiSliderCrop();
  gambarCrop();
}

function onZoomSliderChange(nilai) {
  STATE.cropSkala = parseFloat(nilai);
  perbaruiLabelZoom();
  gambarCrop();
}

function perbaruiSliderCrop() {
  var slider = document.getElementById('crop-zoom-slider');
  if (slider) slider.value = STATE.cropSkala;
  perbaruiLabelZoom();
}

function perbaruiLabelZoom() {
  var label = document.getElementById('crop-zoom-label');
  if (label) label.textContent = Math.round(STATE.cropSkala * 100) + '%';
}

function tutupCrop() { tutupModal(); STATE.cropImage = null; }
function gambarCrop() {
  var canvas = document.getElementById('crop-canvas');
  var area = document.getElementById('crop-area');
  if (!canvas || !area || !STATE.cropImage) return;
  var w = area.clientWidth;
  var h = area.clientHeight;
  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  var img = STATE.cropImage;
  var skala = STATE.cropSkala;
  var iw = img.width * skala;
  var ih = img.height * skala;
  var x = w / 2 - iw / 2 + STATE.cropX;
  var y = h / 2 - ih / 2 + STATE.cropY;
  ctx.drawImage(img, x, y, iw, ih);
}
function pasangEventCrop() {
  var canvas = document.getElementById('crop-canvas');
  if (!canvas) return;
  canvas.addEventListener('mousedown', mulaiDragCrop);
  canvas.addEventListener('mousemove', gerakDragCrop);
  canvas.addEventListener('mouseup', selesaiDragCrop);
  canvas.addEventListener('mouseleave', selesaiDragCrop);
  canvas.addEventListener('touchstart', mulaiDragCropTouch, { passive: false });
  canvas.addEventListener('touchmove', gerakDragCropTouch, { passive: false });
  canvas.addEventListener('touchend', selesaiDragCrop);
}
function mulaiDragCrop(e) { STATE.cropDragging = true; STATE.cropDragStartX = e.clientX; STATE.cropDragStartY = e.clientY; STATE.cropStartCropX = STATE.cropX; STATE.cropStartCropY = STATE.cropY; }
function gerakDragCrop(e) { if (!STATE.cropDragging) return; STATE.cropX = STATE.cropStartCropX + (e.clientX - STATE.cropDragStartX); STATE.cropY = STATE.cropStartCropY + (e.clientY - STATE.cropDragStartY); gambarCrop(); }
function selesaiDragCrop() { STATE.cropDragging = false; }
function mulaiDragCropTouch(e) { if (e.touches.length !== 1) return; e.preventDefault(); STATE.cropDragging = true; STATE.cropDragStartX = e.touches[0].clientX; STATE.cropDragStartY = e.touches[0].clientY; STATE.cropStartCropX = STATE.cropX; STATE.cropStartCropY = STATE.cropY; }
function gerakDragCropTouch(e) { if (!STATE.cropDragging || e.touches.length !== 1) return; e.preventDefault(); STATE.cropX = STATE.cropStartCropX + (e.touches[0].clientX - STATE.cropDragStartX); STATE.cropY = STATE.cropStartCropY + (e.touches[0].clientY - STATE.cropDragStartY); gambarCrop(); }

function resetCrop() {
  STATE.cropX = 0;
  STATE.cropY = 0;
  if (STATE.cropImage) {
    STATE.cropSkala = hitungSkalaAwalCrop(STATE.cropImage);
  } else {
    STATE.cropSkala = 1;
  }
  perbaruiSliderCrop();
  gambarCrop();
}

function simpanCrop() {
  var area = document.getElementById('crop-area');
  if (!area || !STATE.cropImage) return;
  var w = area.clientWidth;
  var h = area.clientHeight;
  var rasioFrame = 3 / 4;
  var frameW = w * 0.75;
  var frameH = frameW / rasioFrame;
  if (frameH > h * 0.9) { frameH = h * 0.9; frameW = frameH * rasioFrame; }
  var OUTPUT_W = 300, OUTPUT_H = 400;
  var canvasOut = document.createElement('canvas');
  canvasOut.width = OUTPUT_W;
  canvasOut.height = OUTPUT_H;
  var ctx = canvasOut.getContext('2d');
  var img = STATE.cropImage;
  var skala = STATE.cropSkala * (OUTPUT_W / frameW);
  var iw = img.width * skala;
  var ih = img.height * skala;
  var x = OUTPUT_W / 2 - iw / 2 + STATE.cropX * (OUTPUT_W / frameW);
  var y = OUTPUT_H / 2 - ih / 2 + STATE.cropY * (OUTPUT_H / frameH);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, OUTPUT_W, OUTPUT_H);
  ctx.drawImage(img, x, y, iw, ih);
  var dataUrl = canvasOut.toDataURL('image/jpeg', 0.85);
  var preview = document.getElementById('foto-preview');
  if (preview) preview.innerHTML = '<img id="foto-img" src="' + dataUrl + '">';
  STATE.cropImage = null;
  tutupModal();
  tampilkanToast('Foto siap. Klik Simpan untuk mengunggah.', 'info', 'Foto Siap');
  var inputFoto = document.getElementById('input-foto');
  if (inputFoto) inputFoto.dataset.croppedData = dataUrl;
}
function hapusFoto() {
  var preview = document.getElementById('foto-preview');
  var url = document.getElementById('foto-url');
  if (preview) preview.innerHTML = '<div class="foto-preview-placeholder" id="foto-placeholder">' + SVG_ICONS.camera + '<span>Klik untuk pilih foto<br>(3:4)</span></div>';
  if (url) url.value = '';
  var inpFoto = document.getElementById('input-foto');
  if (inpFoto) inpFoto.dataset.croppedData = '';
  tampilkanToast('Foto dihapus.', 'info');
}
function submitFormSantri(e) {
  if (e) e.preventDefault();
  var idEdit = document.getElementById('santri-id').value;
  var adalahEdit = !!idEdit;
  var inpFoto = document.getElementById('input-foto');
  var croppedData = inpFoto ? inpFoto.dataset.croppedData : '';
  var fotoUrlLama = document.getElementById('foto-url').value;
  var tombol = document.getElementById('tombol-simpan-santri');
  if (tombol) { tombol.disabled = true; tombol.innerHTML = 'Menyimpan...'; }
  if (croppedData) {
    var namaFile = 'santri-' + (String(document.getElementById('nama_lengkap').value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').substring(0, 40) || 'baru');
    panggilApi('uploadFotoSantri', { base64Data: croppedData, namaFile: namaFile }, 'POST').then(function (resUpload) {
      if (resUpload && resUpload.sukses && resUpload.data && resUpload.data.url) {
        prosesSimpanSantri(idEdit, adalahEdit, resUpload.data.url, tombol);
      } else {
        if (tombol) { tombol.disabled = false; tombol.innerHTML = adalahEdit ? 'Simpan Perubahan' : 'Simpan Santri'; }
        tampilkanToast('Gagal upload foto: ' + ((resUpload && resUpload.pesan) || 'Unknown'), 'gagal');
      }
    });
  } else {
    prosesSimpanSantri(idEdit, adalahEdit, fotoUrlLama, tombol);
  }
}
/** Validasi ringan di klien; validasi final tetap di server. Mengembalikan teks galat atau ''. */
function validasiDataSantri(d) {
  var tahunIni = new Date().getFullYear();
  var emailOk = function (v) { return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };
  var hpOk = function (v) { return !v || /^[0-9+\-\s()]{8,20}$/.test(v); };
  var nikOk = function (v) { return !v || /^\d{16}$/.test(String(v).replace(/\s/g, '')); };
  if (d.nis && !/^[A-Za-z0-9\-\/.]{3,30}$/.test(d.nis)) return 'Format NIS tidak valid (huruf/angka, boleh tanda hubung).';
  if (!/^\d{4}$/.test(d.tahun_masuk) || +d.tahun_masuk < 2000 || +d.tahun_masuk > tahunIni + 1) return 'Tahun masuk harus 4 digit (2000 - ' + (tahunIni + 1) + ').';
  if (d.tahun_selesai && (!/^\d{4}$/.test(d.tahun_selesai) || +d.tahun_selesai < +d.tahun_masuk)) return 'Tahun selesai harus 4 digit dan tidak lebih awal dari tahun masuk.';
  if (d.tanggal_lahir && d.tanggal_lahir > new Date().toISOString().slice(0, 10)) return 'Tanggal lahir tidak boleh di masa depan.';
  if (d.nisn && !/^\d{10}$/.test(d.nisn)) return 'NISN harus 10 digit angka.';
  if (!hpOk(d.no_hp) || !hpOk(d.ayah.no_hp) || !hpOk(d.ibu.no_hp)) return 'Nomor HP tidak valid (8-20 karakter, angka/+/-).';
  if (!nikOk(d.ayah.nik) || !nikOk(d.ibu.nik)) return 'NIK harus 16 digit angka.';
  if (!emailOk(d.ayah.email) || !emailOk(d.ibu.email)) return 'Format email orang tua tidak valid.';
  return '';
}
function ambilNilai(id) { var el = document.getElementById(id); return el ? String(el.value || '').trim() : ''; }
function prosesSimpanSantri(idEdit, adalahEdit, fotoUrl, tombol) {
  var data = {
    nis: ambilNilai('nis'), nisn: ambilNilai('nisn'), nama_lengkap: ambilNilai('nama_lengkap'), nama_panggilan: ambilNilai('nama_panggilan'),
    jenis_kelamin: ambilNilai('jenis_kelamin'), tempat_lahir: ambilNilai('tempat_lahir'), tanggal_lahir: ambilNilai('tanggal_lahir'),
    alamat: ambilNilai('alamat'), no_hp: ambilNilai('no_hp'), nama_ayah: ambilNilai('ayah_nama'), nama_ibu: ambilNilai('ibu_nama'),
    kelas_id: ambilNilai('kelas_id'), tahun_masuk: ambilNilai('tahun_masuk'), tahun_selesai: ambilNilai('tahun_selesai'),
    status: ambilNilai('status'), foto_url: fotoUrl || '',
    ayah: { nama_lengkap: ambilNilai('ayah_nama'), nik: ambilNilai('ayah_nik'), pekerjaan: ambilNilai('ayah_pekerjaan'), no_hp: ambilNilai('ayah_no_hp'), tempat_lahir: ambilNilai('ayah_tempat_lahir'), tanggal_lahir: ambilNilai('ayah_tanggal_lahir'), status_hidup: ambilNilai('ayah_status_hidup'), email: ambilNilai('ayah_email') },
    ibu: { nama_lengkap: ambilNilai('ibu_nama'), nik: ambilNilai('ibu_nik'), pekerjaan: ambilNilai('ibu_pekerjaan'), no_hp: ambilNilai('ibu_no_hp'), tempat_lahir: ambilNilai('ibu_tempat_lahir'), tanggal_lahir: ambilNilai('ibu_tanggal_lahir'), status_hidup: ambilNilai('ibu_status_hidup'), email: ambilNilai('ibu_email') }
  };
  if (!data.nama_lengkap) { tampilkanToast('Nama lengkap wajib diisi.', 'gagal'); if (tombol) { tombol.disabled = false; tombol.innerHTML = adalahEdit ? 'Simpan Perubahan' : 'Simpan Santri'; } return; }
  if (!data.jenis_kelamin) { tampilkanToast('Jenis kelamin wajib diisi.', 'gagal'); if (tombol) { tombol.disabled = false; tombol.innerHTML = adalahEdit ? 'Simpan Perubahan' : 'Simpan Santri'; } return; }
  if (!data.nama_ayah) { tampilkanToast('Nama ayah wajib diisi.', 'gagal'); if (tombol) { tombol.disabled = false; tombol.innerHTML = adalahEdit ? 'Simpan Perubahan' : 'Simpan Santri'; } return; }
  if (!data.nama_ibu) { tampilkanToast('Nama ibu wajib diisi.', 'gagal'); if (tombol) { tombol.disabled = false; tombol.innerHTML = adalahEdit ? 'Simpan Perubahan' : 'Simpan Santri'; } return; }
  if (!data.tahun_masuk) { tampilkanToast('Tahun masuk wajib diisi.', 'gagal'); if (tombol) { tombol.disabled = false; tombol.innerHTML = adalahEdit ? 'Simpan Perubahan' : 'Simpan Santri'; } return; }
  // NIS kosong dikirim apa adanya: server (GAS) yang membuat nomor berurutan (tahun-urutan) di dalam lock.
  var galatValidasi = validasiDataSantri(data);
  if (galatValidasi) {
    if (tombol) { tombol.disabled = false; tombol.innerHTML = adalahEdit ? 'Simpan Perubahan' : 'Simpan Santri'; }
    tampilkanToast(galatValidasi, 'gagal', 'Data Belum Valid');
    return;
  }
  var aksi = adalahEdit ? 'perbaruiSiswa' : 'tambahSiswa';
  var muatan = adalahEdit ? { id: idEdit, data: data } : { data: data };
  panggilApi(aksi, muatan, 'POST').then(function (res) {
    if (tombol) { tombol.disabled = false; tombol.innerHTML = adalahEdit ? 'Simpan Perubahan' : 'Simpan Santri'; }
    if (res && res.sukses) { tampilkanToast(adalahEdit ? 'Data santri berhasil diperbarui.' : 'Santri baru berhasil ditambahkan.', 'sukses'); window.location.hash = '#/admin/santri'; }
    else { tampilkanToast((res && res.pesan) || 'Gagal menyimpan data.', 'gagal'); }
  }).catch(function (err) { if (tombol) { tombol.disabled = false; tombol.innerHTML = adalahEdit ? 'Simpan Perubahan' : 'Simpan Santri'; } logDebug('Gagal simpan:', err); tampilkanToast('Terjadi kesalahan saat menyimpan.', 'gagal'); });
}
function renderHalamanProfilSantri(wadah, id) {
  if (!pastikanLoginAdmin()) return;
  wadah.innerHTML = '<div class="loading-box"><div class="spinner"></div><p class="teks-lembut">Memuat profil santri...</p></div>';
  panggilApi('ambilSiswaBerdasarkanId', { id: id }, 'POST').then(function (res) {
    if (!res || !res.sukses || !res.data) { wadah.innerHTML = '<div class="admin-placeholder"><div class="admin-placeholder-ikon">' + SVG_ICONS.warning + '</div><h2>Data tidak ditemukan</h2><p>' + escapeHtml((res && res.pesan) || 'Santri tidak ditemukan.') + '</p><a class="btn btn-utama mt-4" href="#/admin/santri">Kembali ke Data Santri</a></div>'; return; }
    wadah.innerHTML = renderProfilSantriLengkap(res.data);
  });
}
function renderProfilSantriLengkap(s) {
  var ortu = s.orang_tua || {};
  var ayah = ortu.ayah || {};
  var ibu = ortu.ibu || {};
  var fotoHtml = s.foto_url ? '<img alt="' + escapeHtml(s.nama_lengkap) + '" src="' + escapeHtml(s.foto_url) + '">' : escapeHtml(ambilInisial(s.nama_lengkap));
  var badgeKelas = 'santri-badge ' + (s.status || 'aktif');
  var labelStatus = s.status === 'aktif' ? 'AKTIF' : (s.status === 'alumni' ? 'ALUMNI' : 'NONAKTIF');
  var html = '' +
    '<div class="admin-halaman-header"><div class="admin-halaman-judul-wrap"><a class="btn btn-ghost btn-sm" href="#/admin/santri" style="margin-bottom:8px">' + SVG_ICONS.arrowLeft + '<span>Kembali ke Data Santri</span></a></div></div>' +
    '<div class="profil-header"><div class="profil-foto-besar">' + fotoHtml + '</div><div class="profil-info"><h1 class="profil-nama">' + escapeHtml(s.nama_lengkap || '-') + '</h1><div class="profil-nis">NIS: ' + escapeHtml(s.nis || '-') + '  -  NISN: ' + escapeHtml(s.nisn || '-') + '</div><div class="profil-tag"><span class="profil-tag-item">' + labelStatus + '</span><span class="profil-tag-item">' + escapeHtml(labelJenisKelamin(s.jenis_kelamin) || '-') + '</span><span class="profil-tag-item">Kelas: ' + escapeHtml(s.kelas_id || '-') + '</span></div><div class="profil-aksi"><a class="btn btn-aksen" href="#/admin/santri/edit/' + escapeHtml(s.id) + '">' + SVG_ICONS.edit + '<span>Edit</span></a><button class="btn btn-outline-putih" onclick="aksiCetakKTS(\'' + escapeHtml(s.id) + '\')" type="button">' + SVG_ICONS.printer + '<span>Cetak KTS</span></button><button class="btn btn-outline-putih" onclick="konfirmasiHapusSantri(\'' + escapeHtml(s.id) + '\',\'' + escapeHtml(s.nama_lengkap) + '\')" type="button">' + SVG_ICONS.trash + '<span>Hapus</span></button></div></div></div>' +
    '<div class="profil-tab-bar"><div class="profil-tab aktif" onclick="gantiTabProfil(this,\'tab-biodata\')">Biodata</div><div class="profil-tab" onclick="gantiTabProfil(this,\'tab-ortu\')">Orang Tua</div><div class="profil-tab" onclick="gantiTabProfil(this,\'tab-akademik\')">Akademik</div></div>' +
    '<div class="form-card" id="tab-biodata"><div class="form-card-judul">' + SVG_ICONS.user + '<span>Biodata Santri</span></div>' +
      baris('Nama Lengkap', s.nama_lengkap) + baris('Nama Panggilan', s.nama_panggilan) + baris('NIS', s.nis) + baris('NISN', s.nisn) +
      baris('Jenis Kelamin', labelJenisKelamin(s.jenis_kelamin)) + baris('Tempat Lahir', s.tempat_lahir) + baris('Tanggal Lahir', formatTanggalIndo(s.tanggal_lahir)) +
      baris('Alamat', s.alamat) + baris('No HP', s.no_hp) +
    '</div>' +
    '<div class="form-card" id="tab-ortu" style="display:none"><div class="form-card-judul">' + SVG_ICONS.users + '<span>Data Orang Tua</span></div>' +
      '<div style="margin-bottom:16px"><strong style="font-size:14px;color:var(--warna-utama-tua)">Ayah</strong></div>' +
      baris('Nama', ayah.nama_lengkap || s.nama_ayah) + baris('NIK', ayah.nik) + baris('Pekerjaan', ayah.pekerjaan) + baris('No HP', ayah.no_hp) + baris('Tempat Lahir', ayah.tempat_lahir) + baris('Tanggal Lahir', formatTanggalIndo(ayah.tanggal_lahir)) + baris('Status', ayah.status_hidup === 'meninggal' ? 'Meninggal' : 'Hidup') + baris('Email', ayah.email) +
      '<div style="margin:24px 0 16px"><strong style="font-size:14px;color:var(--warna-utama-tua)">Ibu</strong></div>' +
      baris('Nama', ibu.nama_lengkap || s.nama_ibu) + baris('NIK', ibu.nik) + baris('Pekerjaan', ibu.pekerjaan) + baris('No HP', ibu.no_hp) + baris('Tempat Lahir', ibu.tempat_lahir) + baris('Tanggal Lahir', formatTanggalIndo(ibu.tanggal_lahir)) + baris('Status', ibu.status_hidup === 'meninggal' ? 'Meninggal' : 'Hidup') + baris('Email', ibu.email) +
    '</div>' +
    '<div class="form-card" id="tab-akademik" style="display:none"><div class="form-card-judul">' + SVG_ICONS.graduation + '<span>Data Akademik</span></div>' +
      baris('Kelas', s.kelas_id) + baris('Tahun Masuk', s.tahun_masuk) + baris('Tahun Selesai', s.tahun_selesai) + baris('Status', labelStatus) +
      '<div class="teks-lembut mt-4" style="font-size:13.5px;line-height:1.7">Data akademik lengkap (nilai, absensi, raport) akan tampil di sini setelah modul akademik dibangun.</div>' +
    '</div>';
  return html;
}
function baris(label, nilai) {
  var nilaiHtml;
  if (nilai === null || nilai === undefined || String(nilai).trim() === '') nilaiHtml = '<span class="info-baris-nilai kosong">- belum diisi -</span>';
  else nilaiHtml = '<span class="info-baris-nilai">' + escapeHtml(String(nilai)) + '</span>';
  return '<div class="info-baris"><div class="info-baris-label">' + escapeHtml(label) + '</div>' + nilaiHtml + '</div>';
}
function gantiTabProfil(el, idTab) {
  var tabs = document.querySelectorAll('.profil-tab');
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('aktif');
  el.classList.add('aktif');
  ['tab-biodata', 'tab-ortu', 'tab-akademik'].forEach(function (tid) {
    var t = document.getElementById(tid);
    if (t) t.style.display = (tid === idTab) ? 'block' : 'none';
  });
}

/* ============================================================
 * MODUL PENGATURAN — INTEGRASI UI
 * ============================================================ */

/**
 * Terapkan pengaturan ke UI.
 * - Warna → CSS variables
 * - Nama pesantren → navbar
 * - Logo → gambar navbar (dengan escape URL)
 * - Tahun ajaran aktif → STATE + update dropdown dashboard
 */
function terapkanPengaturanKeUI(pengaturan) {
  if (!pengaturan) return;

  // ----- Warna -----
  terapkanWarnaPengaturan();

  // ----- Identitas -----
  var identitas = pengaturan.identitas || {};
  if (identitas.nama_pesantren) {
    var semuaNavNama = document.querySelectorAll('.navbar-nama-utama');
    for (var i = 0; i < semuaNavNama.length; i++) {
      semuaNavNama[i].textContent = identitas.nama_pesantren;
    }
    perbaruiJudulHalaman();
  }
  if (identitas.logo_url && urlAman(identitas.logo_url)) {
    var semuaLogo = document.querySelectorAll('.navbar-logo, .login-panel-logo');
    for (var j = 0; j < semuaLogo.length; j++) {
      semuaLogo[j].innerHTML = '<img alt="Logo" src="' + escapeHtml(urlAman(identitas.logo_url)) + '" style="width:100%;height:100%;object-fit:contain;border-radius:8px">';
    }
  }

  // ----- Kontak footer (opsional, bila kuncinya tersedia) -----
  var kontakEl = document.getElementById('footer-kontak');
  if (kontakEl) {
    var wa = (pengaturan.whatsapp || {});
    var alamat = identitas.alamat || identitas.alamat_pesantren || '';
    var nomorWa = identitas.no_whatsapp || identitas.whatsapp || wa.nomor_admin || wa.nomor || '';
    var surel = identitas.email || identitas.email_pesantren || '';
    if (alamat || nomorWa || surel) {
      var baris = [];
      if (alamat) baris.push('Alamat: ' + escapeHtml(alamat));
      if (nomorWa) baris.push('WhatsApp: ' + escapeHtml(nomorWa));
      if (surel) baris.push('Email: ' + escapeHtml(surel));
      kontakEl.innerHTML = baris.join('<br>');
    }
  }

  // ----- Akademik -----
  var akademik = pengaturan.akademik || {};
  if (akademik.tahun_ajaran_aktif) {
    TAHUN_AJARAN_AKTIF = akademik.tahun_ajaran_aktif;
    // FIX P7: update label dropdown kalau sudah dirender
    var elLabelTahun = document.getElementById('label-tahun-ajaran');
    if (elLabelTahun) elLabelTahun.textContent = akademik.tahun_ajaran_aktif;
  }
}

/**
 * Ambil pengaturan publik dari server (tanpa token).
 */
function muatPengaturanPublik() {
  return panggilApi('ambilPengaturanPublik', {}, 'POST').then(function (res) {
    if (res && res.sukses && res.data) {
      // Disimpan terpisah: STATE.pengaturan dipakai halaman Pengaturan admin (struktur per-grup).
      STATE.pengaturanPublik = res.data;
      simpanCachePengaturan(res.data);
      terapkanPengaturanKeUI(res.data);
      return res.data;
    }
    logDebug('Gagal memuat pengaturan publik:', res);
    return null;
  }).catch(function (err) {
    logDebug('Error muat pengaturan:', err);
    return null;
  });
}

/* ============================================================
 * MODUL PENGATURAN — HALAMAN ADMIN
 * ============================================================ */

function labelGrupPengaturanUI(kode) {
  var peta = {
    'identitas':   'Identitas Pesantren',
    'tampilan':    'Tampilan',
    'akademik':    'Akademik',
    'spp':         'Biaya / SPP',
    'whatsapp':    'WhatsApp',
    'notifikasi':  'Notifikasi',
    'papan_info':  'Papan Info',
    'galeri':      'Galeri',
    'rahasia':     'Rahasia'
  };
  return peta[kode] || kode;
}

function ikonGrupPengaturanUI(kode) {
  var peta = {
    'identitas':   'mosque',
    'tampilan':    'settings',
    'akademik':    'graduation',
    'spp':         'dollar',
    'whatsapp':    'phone',
    'notifikasi':  'bell',
    'papan_info':  'megaphone',
    'galeri':      'image',
    'rahasia':     'lock'
  };
  return SVG_ICONS[peta[kode]] || SVG_ICONS.infoCircle;
}

function kelompokkanPengaturan(daftar) {
  var hasil = {};
  daftar.forEach(function (p) {
    if (!hasil[p.grup]) hasil[p.grup] = [];
    hasil[p.grup].push(p);
  });
  return hasil;
}

function renderFieldPengaturan(item) {
  var kunci = item.kunci;
  var nilai = item.nilai || '';
  var tipe = item.tipe_input || 'text';
  var label = escapeHtml(item.keterangan || kunci);
  var idField = 'pengaturan-' + kunci;

  var labelHtml = '<label class="pengaturan-label" for="' + idField + '">' + label + '</label>';
  var hintHtml = '<div class="pengaturan-kunci">' + escapeHtml(kunci) + '</div>';

  var inputHtml = '';

  if (tipe === 'textarea') {
    inputHtml = '<textarea class="form-textarea" id="' + idField + '" data-kunci="' + escapeHtml(kunci) + '" rows="3">' + escapeHtml(nilai) + '</textarea>';
  } else if (tipe === 'select') {
    var opsi = item.opsi || [];
    var optsHtml = '<option value="">-- Pilih --</option>';
    opsi.forEach(function (o) {
      optsHtml += '<option value="' + escapeHtml(o.v) + '"' + (String(nilai) === String(o.v) ? ' selected' : '') + '>' + escapeHtml(o.t) + '</option>';
    });
    inputHtml = '<select class="form-select" id="' + idField + '" data-kunci="' + escapeHtml(kunci) + '">' + optsHtml + '</select>';
  } else if (tipe === 'color') {
    var warnaHex = /^#[0-9a-fA-F]{6}$/.test(nilai) ? nilai : '#1e88e5';
    inputHtml = '<div class="pengaturan-color-wrap">' +
      '<input class="pengaturan-color-picker" id="' + idField + '" data-kunci="' + escapeHtml(kunci) + '" type="color" value="' + escapeHtml(warnaHex) + '">' +
      '<input class="form-input pengaturan-color-text" data-kunci-text="' + escapeHtml(kunci) + '" type="text" value="' + escapeHtml(nilai || warnaHex) + '" maxlength="7" pattern="^#[0-9a-fA-F]{6}$">' +
    '</div>';
  } else if (tipe === 'email') {
    inputHtml = '<input class="form-input" id="' + idField + '" data-kunci="' + escapeHtml(kunci) + '" type="email" value="' + escapeHtml(nilai) + '">';
  } else if (tipe === 'url') {
    inputHtml = '<input class="form-input" id="' + idField + '" data-kunci="' + escapeHtml(kunci) + '" type="url" value="' + escapeHtml(nilai) + '" placeholder="https://...">';
  } else if (tipe === 'tel') {
    inputHtml = '<input class="form-input" id="' + idField + '" data-kunci="' + escapeHtml(kunci) + '" type="tel" value="' + escapeHtml(nilai) + '" placeholder="08xx-xxxx-xxxx">';
  } else if (tipe === 'number') {
    inputHtml = '<input class="form-input" id="' + idField + '" data-kunci="' + escapeHtml(kunci) + '" type="number" value="' + escapeHtml(nilai) + '">';
  } else if (tipe === 'password') {
    inputHtml = '<input class="form-input" id="' + idField + '" data-kunci="' + escapeHtml(kunci) + '" type="password" value="" placeholder="' + (nilai ? 'Tersimpan - biarkan kosong jika tidak diubah' : 'Masukkan nilai rahasia') + '" autocomplete="new-password">';
  } else {
    inputHtml = '<input class="form-input" id="' + idField + '" data-kunci="' + escapeHtml(kunci) + '" type="text" value="' + escapeHtml(nilai) + '">';
  }

  return '<div class="pengaturan-item">' + labelHtml + inputHtml + hintHtml + '</div>';
}

function renderFormGrupPengaturan(grup, items) {
  var ikonHtml = ikonGrupPengaturanUI(grup);
  var label = labelGrupPengaturanUI(grup);

  var html = '<div class="pengaturan-form-wrap">';
  html += '<div class="form-card">';
  html += '<div class="form-card-judul">' + ikonHtml + '<span>' + escapeHtml(label) + '</span></div>';
  html += '<div class="pengaturan-list">';

  items.forEach(function (item) {
    html += renderFieldPengaturan(item);
  });

  html += '</div>';
  html += '<div class="pengaturan-aksi">';
  html += '<button class="btn btn-outline" onclick="aksiResetGrupPengaturan(\'' + escapeHtml(grup) + '\')" type="button">' + SVG_ICONS.refresh + '<span>Reset ke Default</span></button>';
  html += '<button class="btn btn-utama" onclick="submitFormGrupPengaturan(\'' + escapeHtml(grup) + '\')" id="tombol-simpan-pengaturan-' + escapeHtml(grup) + '" type="button">' + SVG_ICONS.check + '<span>Simpan</span></button>';
  html += '</div>';
  html += '</div>';
  html += '</div>';

  return html;
}

function renderHalamanPengaturan(wadah) {
  if (!pastikanLoginAdmin()) return;

  wadah.innerHTML = '' +
    buatHalamanHeader('Pengaturan', 'Kelola konfigurasi aplikasi SIP') +
    '<div id="pengaturan-content"><div class="loading-box"><div class="spinner"></div><p class="teks-lembut">Memuat pengaturan...</p></div></div>';

  muatPengaturanAdmin();
}

function muatPengaturanAdmin() {
  var wrap = document.getElementById('pengaturan-content');
  if (!wrap) return;

  panggilApi('ambilSemuaPengaturan', {}, 'POST').then(function (res) {
    if (!res || !res.sukses || !res.data || !Array.isArray(res.data)) {
      wrap.innerHTML = '<div class="santri-kosong">' + SVG_ICONS.warning + '<h3>Gagal memuat pengaturan</h3><p>' + escapeHtml((res && res.pesan) || 'Terjadi kesalahan.') + '</p><button class="btn btn-outline" onclick="muatPengaturanAdmin()" type="button">' + SVG_ICONS.refresh + '<span>Coba Lagi</span></button></div>';
      return;
    }

    var perGrup = kelompokkanPengaturan(res.data);
    var daftarGrup = Object.keys(perGrup);

    if (daftarGrup.length === 0) {
      wrap.innerHTML = '<div class="santri-kosong">' + SVG_ICONS.settings + '<h3>Belum ada pengaturan</h3><p>Jalankan siapkanDatabase() untuk seed pengaturan default.</p></div>';
      return;
    }

    if (daftarGrup.indexOf(STATE.grupPengaturanAktif) === -1) {
      STATE.grupPengaturanAktif = daftarGrup[0];
    }

    var tabHtml = '<div class="pengaturan-tabs">';
    daftarGrup.forEach(function (g) {
      var aktif = g === STATE.grupPengaturanAktif ? ' aktif' : '';
      tabHtml += '<button class="pengaturan-tab' + aktif + '" data-grup="' + escapeHtml(g) + '" onclick="gantiTabPengaturan(\'' + escapeHtml(g) + '\')" type="button">' + ikonGrupPengaturanUI(g) + '<span>' + escapeHtml(labelGrupPengaturanUI(g)) + '</span></button>';
    });
    tabHtml += '</div>';

    var formHtml = '<div id="pengaturan-form-container">' + renderFormGrupPengaturan(STATE.grupPengaturanAktif, perGrup[STATE.grupPengaturanAktif]) + '</div>';

    STATE.pengaturan = perGrup;

    wrap.innerHTML = tabHtml + formHtml;
    pasangEventColorPicker();
  });
}

function gantiTabPengaturan(grup) {
  if (!STATE.pengaturan || !STATE.pengaturan[grup]) return;

  STATE.grupPengaturanAktif = grup;

  var tabs = document.querySelectorAll('.pengaturan-tab');
  var tabAktifEl = null;
  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].getAttribute('data-grup') === grup) { tabs[i].classList.add('aktif'); tabAktifEl = tabs[i]; }
    else tabs[i].classList.remove('aktif');
  }

  // FIX P12: scroll tab aktif ke tengah (mobile)
  if (tabAktifEl && tabAktifEl.scrollIntoView) {
    try { tabAktifEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); } catch (e) {}
  }

  var container = document.getElementById('pengaturan-form-container');
  if (container) container.innerHTML = renderFormGrupPengaturan(grup, STATE.pengaturan[grup]);

  pasangEventColorPicker();
}

function pasangEventColorPicker() {
  var pickers = document.querySelectorAll('.pengaturan-color-picker');
  for (var i = 0; i < pickers.length; i++) {
    pickers[i].addEventListener('input', function () {
      var kunci = this.getAttribute('data-kunci');
      var textInput = document.querySelector('[data-kunci-text="' + kunci + '"]');
      if (textInput) textInput.value = this.value;
    });
  }
  var texts = document.querySelectorAll('.pengaturan-color-text');
  for (var j = 0; j < texts.length; j++) {
    texts[j].addEventListener('input', function () {
      var kunci = this.getAttribute('data-kunci-text');
      var nilai = this.value;
      if (/^#[0-9a-fA-F]{6}$/.test(nilai)) {
        var picker = document.querySelector('.pengaturan-color-picker[data-kunci="' + kunci + '"]');
        if (picker) picker.value = nilai;
      }
    });
  }
}

/**
 * FIX P13: validasi ringan di frontend sebelum kirim.
 */
function validasiNilaiPengaturanFrontend(kunci, nilai, tipe) {
  var wajibDiisi = ['nama_pesantren', 'warna_utama', 'warna_sekunder', 'warna_aksen', 'tahun_ajaran_aktif', 'semester_aktif'];
  if (wajibDiisi.indexOf(kunci) > -1 && !nilai) return 'Wajib diisi.';
  if (!nilai) return '';
  if (tipe === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nilai)) return 'Format email tidak valid.';
  if (tipe === 'url' && !/^https?:\/\/.+/.test(nilai)) return 'URL harus diawali http:// atau https://';
  if (tipe === 'color' && !/^#[0-9a-fA-F]{6}$/.test(nilai)) return 'Warna harus format hex (#rrggbb).';
  if (tipe === 'number' && isNaN(Number(nilai))) return 'Harus berupa angka.';
  return '';
}

function submitFormGrupPengaturan(grup) {
  var items = STATE.pengaturan && STATE.pengaturan[grup];
  if (!items) { tampilkanToast('Data grup tidak ditemukan.', 'gagal'); return; }

  var data = {};
  var errorMsg = '';
  items.forEach(function (item) {
    var kunci = item.kunci;
    var tipe = item.tipe_input || 'text';
    var el = document.getElementById('pengaturan-' + kunci);
    if (!el) return;
    if (tipe === 'color') {
      var textEl = document.querySelector('[data-kunci-text="' + kunci + '"]');
      data[kunci] = textEl ? textEl.value : el.value;
    } else {
      data[kunci] = el.value;
    }
    // Validasi frontend (P13)
    if (!errorMsg) {
      var v = validasiNilaiPengaturanFrontend(kunci, data[kunci], tipe);
      if (v) errorMsg = '[' + kunci + '] ' + v;
    }
  });

  if (errorMsg) { tampilkanToast(errorMsg, 'gagal', 'Validasi Gagal'); return; }

  var tombol = document.getElementById('tombol-simpan-pengaturan-' + grup);
  if (tombol) { tombol.disabled = true; tombol.innerHTML = 'Menyimpan...'; }

  panggilApi('simpanPengaturanGrup', { grup: grup, data: data }, 'POST').then(function (res) {
    if (tombol) { tombol.disabled = false; tombol.innerHTML = SVG_ICONS.check + '<span>Simpan</span>'; }

    if (res && res.sukses) {
      tampilkanToast((res.pesan) || 'Pengaturan berhasil disimpan.', 'sukses');
      items.forEach(function (item) {
        if (data.hasOwnProperty(item.kunci)) {
          if (item.tipe_input !== 'password') {
            item.nilai = data[item.kunci];
          }
        }
      });
      if (grup === 'tampilan' || grup === 'identitas' || grup === 'akademik') {
        muatPengaturanPublik();
      }
    } else {
      tampilkanToast((res && res.pesan) || 'Gagal menyimpan pengaturan.', 'gagal');
    }
  }).catch(function (err) {
    if (tombol) { tombol.disabled = false; tombol.innerHTML = SVG_ICONS.check + '<span>Simpan</span>'; }
    logDebug('Gagal simpan pengaturan:', err);
    tampilkanToast('Terjadi kesalahan saat menyimpan.', 'gagal');
  });
}

function aksiResetGrupPengaturan(grup) {
  var label = labelGrupPengaturanUI(grup);
  var html = '<p class="modal-konfirmasi-tanya">Reset grup <span class="modal-konfirmasi-nama">' + escapeHtml(label) + '</span> ke nilai default?</p><p class="teks-lembut" style="font-size:13px">Semua nilai di grup ini akan dikembalikan ke pengaturan awal. Tindakan ini tidak bisa dibatalkan.</p>';
  var footer = '<button class="btn btn-ghost" onclick="tutupModal()" type="button">Batal</button><button class="btn btn-danger" onclick="prosesResetGrupPengaturan(\'' + escapeHtml(grup) + '\')" type="button">Reset</button>';
  bukaModal('Reset ke Default', html, footer);
}

/**
 * FIX P14: loading state + cegah klik ganda.
 */
function prosesResetGrupPengaturan(grup) {
  var footerEl = document.getElementById('modal-footer');
  if (footerEl) {
    var tombolReset = footerEl.querySelector('.btn-danger');
    if (tombolReset) { tombolReset.disabled = true; tombolReset.textContent = 'Reset...'; }
  }
  tutupModal();
  panggilApi('resetPengaturanGrup', { grup: grup }, 'POST').then(function (res) {
    if (res && res.sukses) {
      tampilkanToast((res.pesan) || 'Pengaturan berhasil direset.', 'sukses');
      muatPengaturanAdmin();
      if (grup === 'tampilan' || grup === 'identitas' || grup === 'akademik') {
        muatPengaturanPublik();
      }
    } else {
      tampilkanToast((res && res.pesan) || 'Gagal reset pengaturan.', 'gagal');
    }
  });
}

/* ============================================================
 * MODUL PAPAN INFO (PENGUMUMAN)
 * ============================================================ */

function labelKategoriPapanInfo(kode) {
  var peta = { 'informasi': 'Informasi', 'akademik': 'Akademik', 'administrasi': 'Administrasi', 'prestasi': 'Prestasi', 'kegiatan': 'Kegiatan' };
  return peta[kode] || kode || '';
}
function labelTargetPapanInfo(kode) {
  var peta = { 'semua': 'Semua', 'santri': 'Santri', 'guru': 'Guru', 'wali': 'Wali' };
  return peta[kode] || kode || '';
}
function labelStatusPapanInfo(kode) {
  var peta = { 'draft': 'Draft', 'terbit': 'Terbit', 'arsip': 'Arsip' };
  return peta[kode] || kode || '';
}

function renderBadgeKategoriPapanInfo(kategori) {
  var label = labelKategoriPapanInfo(kategori);
  if (!label) return '';
  return '<span class="papan-info-badge papan-info-badge-kategori papan-info-badge-' + escapeHtml(kategori) + '">' + escapeHtml(label) + '</span>';
}
function renderBadgeTargetPapanInfo(target) {
  var label = labelTargetPapanInfo(target);
  if (!label) return '';
  return '<span class="papan-info-badge papan-info-badge-target">' + escapeHtml(label) + '</span>';
}
function renderBadgeStatusPapanInfo(status) {
  var label = labelStatusPapanInfo(status);
  if (!label) return '';
  return '<span class="papan-info-badge papan-info-badge-status papan-info-badge-status-' + escapeHtml(status) + '">' + escapeHtml(label) + '</span>';
}

function ambilLabelFilterPapanInfo(f) {
  if (f === 'terbit')  return 'Terbit';
  if (f === 'draft')   return 'Draft';
  if (f === 'arsip')   return 'Arsip';
  return 'Semua';
}
function setFilterPapanInfo(nilai) {
  STATE.filterPapanInfo = nilai;
  var lbl = document.getElementById('label-filter-papan-info');
  if (lbl) lbl.textContent = ambilLabelFilterPapanInfo(nilai);
  var menu = document.getElementById('dropdown-filter-papan-info');
  if (menu) menu.classList.remove('tampil');
  renderDaftarPapanInfoKeWadah();
}
function filterPapanInfo(daftar) {
  var hasil = daftar.slice();
  if (STATE.filterPapanInfo === 'terbit') hasil = hasil.filter(function (p) { return p.status === 'terbit'; });
  else if (STATE.filterPapanInfo === 'draft') hasil = hasil.filter(function (p) { return p.status === 'draft'; });
  else if (STATE.filterPapanInfo === 'arsip') hasil = hasil.filter(function (p) { return p.status === 'arsip'; });
  if (STATE.searchPapanInfo) {
    var kunci = STATE.searchPapanInfo.toLowerCase().trim();
    hasil = hasil.filter(function (p) {
      return (String(p.judul || '').toLowerCase().indexOf(kunci) > -1) ||
             (String(p.isi || '').toLowerCase().indexOf(kunci) > -1);
    });
  }
  return hasil;
}
function renderItemFilterPapanInfo(nilai, label) {
  var aktif = STATE.filterPapanInfo === nilai ? ' aktif' : '';
  return '<button class="dropdown-filter-item' + aktif + '" onclick="setFilterPapanInfo(\'' + nilai + '\')" type="button"><span>' + escapeHtml(label) + '</span>' + (STATE.filterPapanInfo === nilai ? SVG_ICONS.check : '') + '</button>';
}
function renderToolbarPapanInfo(isReadOnly) {
  var tombolTambah = isReadOnly ? '' : '<a class="btn btn-utama" href="#/admin/pengumuman/tambah">' + SVG_ICONS.plus + '<span>Tambah Papan Info</span></a>';
  return '<div class="santri-toolbar">' +
    '<div class="santri-search">' + SVG_ICONS.search + '<input id="papan-info-search-input" placeholder="Cari judul atau isi papan info..." type="text" value="' + escapeHtml(STATE.searchPapanInfo) + '"></div>' +
    '<div class="santri-toolbar-aksi">' +
      '<div class="dropdown-filter">' +
        '<button class="dropdown-filter-tombol" onclick="toggleDropdownFilter(\'dropdown-filter-papan-info\')" type="button">' + SVG_ICONS.filter + '<span class="dropdown-filter-label">Filter:</span><span id="label-filter-papan-info">' + ambilLabelFilterPapanInfo(STATE.filterPapanInfo) + '</span>' + SVG_ICONS.chevronDown + '</button>' +
        '<div class="dropdown-filter-menu" id="dropdown-filter-papan-info">' +
          renderItemFilterPapanInfo('semua', 'Semua') +
          renderItemFilterPapanInfo('terbit', 'Terbit') +
          renderItemFilterPapanInfo('draft', 'Draft') +
          renderItemFilterPapanInfo('arsip', 'Arsip') +
        '</div>' +
      '</div>' +
      tombolTambah +
    '</div>' +
  '</div>';
}

function renderKartuPapanInfo(pgm, isReadOnly) {
  var judul = escapeHtml(pgm.judul || '(tanpa judul)');
  var isiRingkas = String(pgm.isi || '');
  if (isiRingkas.length > 160) isiRingkas = isiRingkas.substring(0, 160) + '...';
  isiRingkas = escapeHtml(isiRingkas);
  var tanggalTampil = pgm.tanggal_terbit ? formatTanggalIndo(pgm.tanggal_terbit) : (pgm.dibuat_pada ? formatTanggalIndo(pgm.dibuat_pada) : '');
  var lampiranHtml = '';
  if (pgm.lampiran_url) lampiranHtml = '<span class="papan-info-lampiran" title="Ada lampiran">' + SVG_ICONS.file + '</span>';

  var html = '<div class="papan-info-card papan-info-card-' + escapeHtml(pgm.status || 'draft') + '">';
  html += '<div class="papan-info-card-header">';
  html += '<div class="papan-info-badges">' + renderBadgeKategoriPapanInfo(pgm.kategori) + renderBadgeStatusPapanInfo(pgm.status) + '</div>';
  html += lampiranHtml;
  html += '</div>';
  html += '<h3 class="papan-info-card-judul">' + judul + '</h3>';
  html += '<p class="papan-info-card-isi">' + isiRingkas + '</p>';
  html += '<div class="papan-info-card-meta">';
  html += '<span class="papan-info-card-tanggal">' + SVG_ICONS.calendar + '<span>' + escapeHtml(tanggalTampil) + '</span></span>';
  html += renderBadgeTargetPapanInfo(pgm.target);
  html += '</div>';
  html += '<div class="papan-info-card-aksi">';
  if (isReadOnly) {
    html += '<a class="santri-aksi-tombol" href="#/admin/pengumuman/lihat/' + escapeHtml(pgm.id) + '" title="Lihat" style="display:none"></a>';
  } else {
    html += '<a class="santri-aksi-tombol" href="#/admin/pengumuman/lihat/' + escapeHtml(pgm.id) + '" title="Lihat">' + SVG_ICONS.eye + '</a>';
    html += '<button class="santri-aksi-tombol" onclick="aksiUbahStatusPapanInfo(\'' + escapeHtml(pgm.id) + '\',\'' + escapeHtml(pgm.status || 'draft') + '\')" title="Ubah Status" type="button">' + SVG_ICONS.refresh + '</button>';
    html += '<a class="santri-aksi-tombol" href="#/admin/pengumuman/edit/' + escapeHtml(pgm.id) + '" title="Edit">' + SVG_ICONS.edit + '</a>';
    html += '<button class="santri-aksi-tombol danger" onclick="konfirmasiHapusPapanInfo(\'' + escapeHtml(pgm.id) + '\',\'' + escapeHtml(pgm.judul || '') + '\')" title="Hapus" type="button">' + SVG_ICONS.trash + '</button>';
  }
  html += '</div>';
  html += '</div>';
  return html;
}

function renderDaftarPapanInfoKeWadah(isReadOnly) {
  var wrap = document.getElementById('papan-info-content');
  if (!wrap) return;
  if (!STATE.daftarPapanInfo || STATE.daftarPapanInfo.length === 0) {
    wrap.innerHTML = '<div class="santri-kosong">' + SVG_ICONS.megaphone + '<h3>Belum ada papan info</h3></div>';
    return;
  }
  var daftar = filterPapanInfo(STATE.daftarPapanInfo);
  if (daftar.length === 0) {
    wrap.innerHTML = '<div class="santri-kosong">' + SVG_ICONS.search + '<h3>Tidak ada hasil</h3><p>Tidak ada papan info yang cocok.</p></div>';
    return;
  }
  var html = '<div class="santri-info-count">Menampilkan <strong>' + daftar.length + '</strong> dari <strong>' + STATE.daftarPapanInfo.length + '</strong> papan info</div>';
  html += '<div class="papan-info-grid">';
  daftar.forEach(function (p) { html += renderKartuPapanInfo(p, isReadOnly); });
  html += '</div>';
  wrap.innerHTML = html;
}

function resetFilterPapanInfo() {
  STATE.filterPapanInfo = 'semua';
  STATE.searchPapanInfo = '';
  var inp = document.getElementById('papan-info-search-input');
  if (inp) inp.value = '';
  var lbl = document.getElementById('label-filter-papan-info');
  if (lbl) lbl.textContent = 'Semua';
  renderDaftarPapanInfoKeWadah();
}

function renderHalamanPapanInfo(wadah) {
  if (!pastikanLoginAdmin()) return;
  wadah.innerHTML = '' +
    buatHalamanHeader('Papan Info', 'Kelola papan informasi pesantren') +
    renderToolbarPapanInfo(false) +
    '<div id="papan-info-content"><div class="loading-box"><div class="spinner"></div><p class="teks-lembut">Memuat papan info...</p></div></div>';
  pasangEventToolbarPapanInfo();
  muatPapanInfo(false);
}

/**
 * FIX: Halaman Papan Info versi GURU/WALI (read-only).
 * Tidak panggil pastikanLoginAdmin.
 */
function renderHalamanPapanInfoReadOnly(wadah) {
  if (!pastikanLoginGuruWali()) return;
  var role = ambilRoleSaatIni();
  var routeKembali = role === 'guru' ? '#/guru' : '#/wali';
  wadah.innerHTML = '' +
    '<div class="admin-halaman-header">' +
      '<div class="admin-halaman-judul-wrap">' +
        '<a class="btn btn-ghost btn-sm" href="' + routeKembali + '" style="margin-bottom:8px">' + SVG_ICONS.arrowLeft + '<span>Kembali</span></a>' +
        '<h1 class="admin-halaman-judul">Papan Info</h1>' +
        '<p class="admin-halaman-deskripsi">Papan informasi pesantren (mode lihat saja)</p>' +
      '</div>' +
    '</div>' +
    renderToolbarPapanInfo(true) +
    '<div id="papan-info-content"><div class="loading-box"><div class="spinner"></div><p class="teks-lembut">Memuat papan info...</p></div></div>';
  pasangEventToolbarPapanInfo();
  muatPapanInfo(true);
}

function pasangEventToolbarPapanInfo() {
  var inp = document.getElementById('papan-info-search-input');
  if (inp) {
    var tmr = null;
    inp.addEventListener('input', function () {
      clearTimeout(tmr);
      var v = this.value;
      tmr = setTimeout(function () { STATE.searchPapanInfo = v; renderDaftarPapanInfoKeWadah(); }, 250);
    });
  }
}

function muatPapanInfo(isReadOnly) {
  panggilApi('ambilSemuaPengumuman', {}, 'POST').then(function (res) {
    if (res && res.sukses && res.data && Array.isArray(res.data)) {
      STATE.daftarPapanInfo = res.data;
      renderDaftarPapanInfoKeWadah(isReadOnly);
    } else {
      var wrap = document.getElementById('papan-info-content');
      if (wrap) wrap.innerHTML = '<div class="santri-kosong">' + SVG_ICONS.warning + '<h3>Gagal memuat data</h3><p>' + escapeHtml((res && res.pesan) || 'Terjadi kesalahan.') + '</p><button class="btn btn-outline" onclick="muatPapanInfo()" type="button">' + SVG_ICONS.refresh + '<span>Coba Lagi</span></button></div>';
    }
  });
}

function renderPapanInfoDashboard() {
  return '<div class="pengumuman-box" id="dashboard-papan-info">' +
    '<div class="pengumuman-header">' + SVG_ICONS.megaphone + '<span>Papan Info</span><a class="pengumuman-link" href="#/admin/pengumuman">Lihat semua</a></div>' +
    '<div class="pengumuman-list" id="dashboard-papan-info-list"><div class="loading-box-sm"><div class="spinner"></div></div></div>' +
  '</div>';
}

function muatPapanInfoDashboard() {
  var wadah = document.getElementById('dashboard-papan-info-list');
  if (!wadah) return;
  panggilApi('ambilPengumumanPublik', { limit: 5 }, 'POST').then(function (res) {
    if (!res || !res.sukses || !res.data || res.data.length === 0) {
      wadah.innerHTML = '<div class="pengumuman-kosong">Tidak ada papan info terbaru</div>';
      return;
    }
    var html = '';
    res.data.forEach(function (p) {
      var tgl = p.tanggal_terbit ? formatTanggalIndo(p.tanggal_terbit) : (p.dibuat_pada ? formatTanggalIndo(p.dibuat_pada) : '');
      var isiRingkas = String(p.isi || '');
      if (isiRingkas.length > 100) isiRingkas = isiRingkas.substring(0, 100) + '...';
      html += '<a class="pengumuman-item" href="#/admin/pengumuman/lihat/' + escapeHtml(p.id) + '">';
      html += '<div class="pengumuman-item-header"><span class="pengumuman-item-kategori">' + escapeHtml(labelKategoriPapanInfo(p.kategori)) + '</span><span class="pengumuman-item-tanggal">' + escapeHtml(tgl) + '</span></div>';
      html += '<div class="pengumuman-item-judul">' + escapeHtml(p.judul || '') + '</div>';
      html += '<div class="pengumuman-item-isi">' + escapeHtml(isiRingkas) + '</div>';
      html += '<div class="pengumuman-item-selengkapnya">Lihat selengkapnya &rarr;</div>';
      html += '</a>';
    });
    wadah.innerHTML = html;
  });
}

/* ============================================================
 * PAPAN INFO - FORM & DETAIL
 * ============================================================ */

function papanInfoFieldKategori(nilai, wajib) {
  return selectField('Kategori', 'papan-info-kategori', nilai || 'informasi', wajib, [
    { v: 'informasi', t: 'Informasi' }, { v: 'akademik', t: 'Akademik' }, { v: 'administrasi', t: 'Administrasi' }, { v: 'prestasi', t: 'Prestasi' }, { v: 'kegiatan', t: 'Kegiatan' }
  ]);
}
function papanInfoFieldTarget(nilai, wajib) {
  return selectField('Target', 'papan-info-target', nilai || 'semua', wajib, [
    { v: 'semua', t: 'Semua' }, { v: 'santri', t: 'Santri' }, { v: 'guru', t: 'Guru' }, { v: 'wali', t: 'Wali' }
  ]);
}
function papanInfoFieldStatus(nilai, wajib) {
  return selectField('Status', 'papan-info-status', nilai || 'draft', wajib, [
    { v: 'draft', t: 'Draft (belum terbit)' }, { v: 'terbit', t: 'Terbit (tampil di papan info)' }, { v: 'arsip', t: 'Arsip (disembunyikan)' }
  ]);
}

function renderFormPapanInfo(wadah, dataEdit) {
  var p = dataEdit || {};
  var adalahEdit = !!dataEdit;
  var judul = adalahEdit ? 'Edit Papan Info' : 'Tambah Papan Info';
  var deskripsi = adalahEdit ? 'Perbarui papan info: ' + (p.judul || '') : 'Lengkapi data papan info baru';
  var html = '' +
    '<div class="admin-halaman-header"><div class="admin-halaman-judul-wrap"><a class="btn btn-ghost btn-sm" href="#/admin/pengumuman" style="margin-bottom:8px">' + SVG_ICONS.arrowLeft + '<span>Kembali</span></a><h1 class="admin-halaman-judul">' + escapeHtml(judul) + '</h1><p class="admin-halaman-deskripsi">' + escapeHtml(deskripsi) + '</p></div></div>' +
    '<form id="form-papan-info" onsubmit="submitFormPapanInfo(event)">' +
      '<input id="papan-info-id" type="hidden" value="' + escapeHtml(p.id || '') + '">' +
      '<div class="form-card">' +
        '<div class="form-card-judul">' + SVG_ICONS.megaphone + '<span>Konten Papan Info</span></div>' +
        '<div class="form-grid form-grid-2">' +
          '<div class="form-grup" style="grid-column:1/-1"><label class="form-label" for="papan-info-judul">Judul<span class="form-label-wajib-tanda">*</span></label><input class="form-input" id="papan-info-judul" maxlength="150" placeholder="Judul papan info" type="text" value="' + escapeHtml(p.judul || '') + '" style="padding-left:14px"></div>' +
        '</div>' +
        '<div class="form-grid form-grid-2" style="margin-top:16px">' + papanInfoFieldKategori(p.kategori, true) + papanInfoFieldTarget(p.target, true) + '</div>' +
        '<div style="margin-top:16px"><div class="form-grup"><label class="form-label" for="papan-info-isi">Isi Papan Info<span class="form-label-wajib-tanda">*</span></label><textarea class="form-textarea" id="papan-info-isi" maxlength="5000" placeholder="Tulis isi papan info di sini..." style="min-height:180px">' + escapeHtml(p.isi || '') + '</textarea><div class="form-hint">Maksimal 5000 karakter.</div></div></div>' +
      '</div>' +
      '<div class="form-card">' +
        '<div class="form-card-judul">' + SVG_ICONS.settings + '<span>Pengaturan</span></div>' +
        '<div class="form-grid form-grid-2">' + papanInfoFieldStatus(p.status, true) + field('Tanggal Kadaluarsa', 'papan-info-tanggal-kadaluarsa', p.tanggal_kadaluarsa, false, 'date', 'Opsional') + '</div>' +
        '<div style="margin-top:16px">' + field('URL Lampiran', 'papan-info-lampiran-url', p.lampiran_url, false, 'url', 'https://... (opsional)') + '<div class="form-hint">Tempel link Drive atau URL eksternal untuk lampiran (opsional).</div></div>' +
      '</div>' +
      '<div class="form-tombol" style="display:flex;gap:12px;justify-content:flex-end;margin-bottom:32px"><a class="btn btn-ghost" href="#/admin/pengumuman">Batal</a><button class="btn btn-utama" id="tombol-simpan-papan-info" type="submit">' + (adalahEdit ? 'Simpan Perubahan' : 'Simpan Papan Info') + '</button></div>' +
    '</form>';
  wadah.innerHTML = html;
}

function renderHalamanTambahPapanInfo(wadah) {
  if (!pastikanLoginAdmin()) return;
  renderFormPapanInfo(wadah, null);
}
function renderHalamanEditPapanInfo(wadah, id) {
  if (!pastikanLoginAdmin()) return;
  wadah.innerHTML = '<div class="loading-box"><div class="spinner"></div><p class="teks-lembut">Memuat papan info...</p></div>';
  panggilApi('ambilPengumumanBerdasarkanId', { id: id }, 'POST').then(function (res) {
    if (res && res.sukses && res.data) renderFormPapanInfo(wadah, res.data);
    else wadah.innerHTML = '<div class="admin-placeholder"><div class="admin-placeholder-ikon">' + SVG_ICONS.warning + '</div><h2>Data tidak ditemukan</h2></div>';
  });
}
function renderHalamanDetailPapanInfo(wadah, id) {
  if (!pastikanLoginAdmin()) return;
  wadah.innerHTML = '<div class="loading-box"><div class="spinner"></div><p class="teks-lembut">Memuat papan info...</p></div>';
  panggilApi('ambilPengumumanBerdasarkanId', { id: id }, 'POST').then(function (res) {
    if (!res || !res.sukses || !res.data) {
      wadah.innerHTML = '<div class="admin-placeholder"><div class="admin-placeholder-ikon">' + SVG_ICONS.warning + '</div><h2>Data tidak ditemukan</h2><p>' + escapeHtml((res && res.pesan) || '') + '</p><a class="btn btn-utama mt-4" href="#/admin/pengumuman">Kembali</a></div>';
      return;
    }
    wadah.innerHTML = renderDetailPapanInfoLengkap(res.data);
  });
}
function renderDetailPapanInfoLengkap(p) {
  var tgl = p.tanggal_terbit ? formatTanggalIndo(p.tanggal_terbit) : (p.dibuat_pada ? formatTanggalIndo(p.dibuat_pada) : '-');
  var tglKadaluarsa = p.tanggal_kadaluarsa ? formatTanggalIndo(p.tanggal_kadaluarsa) : '';
  var isiHtml = escapeHtml(p.isi || '').replace(/\n/g, '<br>');
  var lampiranHtml = '';
  if (p.lampiran_url) lampiranHtml = '<div class="papan-info-detail-lampiran"><a class="btn btn-outline btn-sm" href="' + escapeHtml(p.lampiran_url) + '" rel="noopener" target="_blank">' + SVG_ICONS.file + '<span>Buka Lampiran</span></a></div>';
  return '' +
    '<div class="admin-halaman-header"><div class="admin-halaman-judul-wrap"><a class="btn btn-ghost btn-sm" href="#/admin/pengumuman" style="margin-bottom:8px">' + SVG_ICONS.arrowLeft + '<span>Kembali ke Papan Info</span></a></div></div>' +
    '<div class="papan-info-detail">' +
      '<div class="papan-info-detail-header">' +
        '<div class="papan-info-badges">' + renderBadgeKategoriPapanInfo(p.kategori) + renderBadgeStatusPapanInfo(p.status) + renderBadgeTargetPapanInfo(p.target) + '</div>' +
        '<h1 class="papan-info-detail-judul">' + escapeHtml(p.judul || '(tanpa judul)') + '</h1>' +
        '<div class="papan-info-detail-meta"><span>' + SVG_ICONS.calendar + '<span>Terbit: ' + escapeHtml(tgl) + '</span></span>' + (tglKadaluarsa ? '<span>' + SVG_ICONS.calendar + '<span>Kadaluarsa: ' + escapeHtml(tglKadaluarsa) + '</span></span>' : '') + '</div>' +
      '</div>' +
      '<div class="papan-info-detail-isi">' + isiHtml + '</div>' +
      lampiranHtml +
      '<div class="papan-info-detail-aksi">' +
        '<a class="btn btn-utama" href="#/admin/pengumuman/edit/' + escapeHtml(p.id) + '">' + SVG_ICONS.edit + '<span>Edit</span></a>' +
        '<button class="btn btn-outline" onclick="aksiUbahStatusPapanInfo(\'' + escapeHtml(p.id) + '\',\'' + escapeHtml(p.status || 'draft') + '\')" type="button">' + SVG_ICONS.refresh + '<span>Ubah Status</span></button>' +
        '<button class="btn btn-outline" onclick="window.print()" type="button">' + SVG_ICONS.printer + '<span>Cetak</span></button>' +
        '<button class="btn btn-danger" onclick="konfirmasiHapusPapanInfo(\'' + escapeHtml(p.id) + '\',\'' + escapeHtml(p.judul || '') + '\')" type="button">' + SVG_ICONS.trash + '<span>Hapus</span></button>' +
      '</div>' +
    '</div>';
}
function submitFormPapanInfo(e) {
  if (e) e.preventDefault();
  var idEdit = document.getElementById('papan-info-id').value;
  var adalahEdit = !!idEdit;
  var tombol = document.getElementById('tombol-simpan-papan-info');
  var data = { judul: ambilNilai('papan-info-judul'), isi: ambilNilai('papan-info-isi'), kategori: ambilNilai('papan-info-kategori'), target: ambilNilai('papan-info-target'), status: ambilNilai('papan-info-status'), lampiran_url: ambilNilai('papan-info-lampiran-url'), tanggal_kadaluarsa: ambilNilai('papan-info-tanggal-kadaluarsa') };
  if (!data.judul) { tampilkanToast('Judul wajib diisi.', 'gagal'); return; }
  if (!data.isi)   { tampilkanToast('Isi papan info wajib diisi.', 'gagal'); return; }
  if (tombol) { tombol.disabled = true; tombol.innerHTML = 'Menyimpan...'; }
  var aksi = adalahEdit ? 'perbaruiPengumuman' : 'tambahPengumuman';
  var muatan = adalahEdit ? { id: idEdit, data: data } : { data: data };
  panggilApi(aksi, muatan, 'POST').then(function (res) {
    if (tombol) { tombol.disabled = false; tombol.innerHTML = adalahEdit ? 'Simpan Perubahan' : 'Simpan Papan Info'; }
    if (res && res.sukses) { tampilkanToast(adalahEdit ? 'Papan info berhasil diperbarui.' : 'Papan info baru berhasil ditambahkan.', 'sukses'); window.location.hash = '#/admin/pengumuman'; }
    else tampilkanToast((res && res.pesan) || 'Gagal menyimpan papan info.', 'gagal');
  }).catch(function (err) {
    if (tombol) { tombol.disabled = false; tombol.innerHTML = adalahEdit ? 'Simpan Perubahan' : 'Simpan Papan Info'; }
    logDebug('Gagal simpan papan info:', err);
    tampilkanToast('Terjadi kesalahan saat menyimpan.', 'gagal');
  });
}
function konfirmasiHapusPapanInfo(id, judul) {
  var html = '<p class="modal-konfirmasi-tanya">Yakin ingin menghapus papan info <span class="modal-konfirmasi-nama">' + escapeHtml(judul) + '</span>?</p><p class="teks-lembut" style="font-size:13px">Papan info akan <strong>dihapus permanen</strong>.</p>';
  var footer = '<button class="btn btn-ghost" onclick="tutupModal()" type="button">Batal</button><button class="btn btn-danger" onclick="hapusPapanInfoProses(\'' + escapeHtml(id) + '\')" type="button">Hapus</button>';
  bukaModal('Konfirmasi Hapus', html, footer);
}
function hapusPapanInfoProses(id) {
  tutupModal();
  panggilApi('hapusPengumuman', { id: id }, 'POST').then(function (res) {
    if (res && res.sukses) { tampilkanToast('Papan info berhasil dihapus.', 'sukses'); muatPapanInfo(); }
    else tampilkanToast((res && res.pesan) || 'Gagal menghapus.', 'gagal');
  });
}
function aksiUbahStatusPapanInfo(id, statusSekarang) {
  var urutan = ['draft', 'terbit', 'arsip'];
  var idx = urutan.indexOf(statusSekarang);
  if (idx === -1) idx = 0;
  var statusBaru = urutan[(idx + 1) % urutan.length];
  var label = labelStatusPapanInfo(statusBaru);
  var html = '<p class="modal-konfirmasi-tanya">Ubah status papan info menjadi <span class="modal-konfirmasi-nama">' + escapeHtml(label) + '</span>?</p>';
  var footer = '<button class="btn btn-ghost" onclick="tutupModal()" type="button">Batal</button><button class="btn btn-utama" onclick="prosesUbahStatusPapanInfo(\'' + escapeHtml(id) + '\',\'' + escapeHtml(statusBaru) + '\')" type="button">Ubah</button>';
  bukaModal('Ubah Status Papan Info', html, footer);
}
function prosesUbahStatusPapanInfo(id, status) {
  tutupModal();
  panggilApi('ubahStatusPengumuman', { id: id, status: status }, 'POST').then(function (res) {
    if (res && res.sukses) { tampilkanToast('Status berhasil diubah ke ' + labelStatusPapanInfo(status) + '.', 'sukses'); muatPapanInfo(); }
    else tampilkanToast((res && res.pesan) || 'Gagal mengubah status.', 'gagal');
  });
}

/* ============================================================
 * RENDER PUBLIK
 * ============================================================ */

function renderHero() { return '<section class="hero"><div class="container hero-inner"><span class="hero-badge">Pesantren ELKAROM</span><h1 class="hero-judul">Mulia dengan <span>Ilmu</span></h1><p class="hero-sub">Membangun generasi berilmu, berakhlak, dan berkarakter. Lembaga pendidikan Islam yang memadukan keilmuan diniyah, kecintaan pada Al-Quran, dan penguasaan kitab kuning.</p><div class="hero-aksi"><a class="btn btn-aksen" href="#/pendaftaran">Daftar Sekarang</a><a class="btn btn-outline-putih" href="#/profil">Pelajari Lebih Lanjut</a></div></div></section>'; }
function renderKerangkaKurikulum() { var item = DATA_STATIS.kerangkaKurikulum.map(function (k) { return '<div class="kurikulum-card"><div class="kurikulum-icon">' + (SVG_ICONS[k.icon] || '') + '</div><h3 class="kurikulum-judul">' + escapeHtml(k.judul) + '</h3><p class="kurikulum-teks">' + escapeHtml(k.deskripsi) + '</p></div>'; }).join(''); return '<section class="section section-alt"><div class="container"><div class="section-header"><span class="section-label">Kerangka Kurikulum</span><h2 class="section-judul">Fondasi Keilmuan Kami</h2><p class="section-deskripsi">Empat pilar kurikulum yang menjadi dasar pendidikan santri di ELKAROM.</p></div><div class="kurikulum-grid">' + item + '</div></div></section>'; }
function renderSambutan() { return '<section class="section"><div class="container"><div class="section-header"><span class="section-label">Sambutan</span><h2 class="section-judul">Dari Pimpinan Pesantren</h2></div><div class="sambutan-grid"><div class="sambutan-foto-wrap"><div class="sambutan-foto"><span class="sambutan-foto-placeholder">KH</span></div><div class="sambutan-nama"><div class="sambutan-nama-utama">KH. Abdul Karim</div><div class="sambutan-nama-jabatan">Pengasuh Pesantren ELKAROM</div></div></div><div class="sambutan-isi"><span class="sambutan-quote">"</span><p class="sambutan-arab">العِلْمُ نُورٌ وَالجَهْلُ ظَلَامٌ</p><p class="sambutan-teks">Alhamdulillah, segala puji bagi Allah yang telah memberi taufik dan hidayah-Nya. Kami menyambut baik kehadiran Anda di ELKAROM.</p><p class="sambutan-teks">Ilmu adalah cahaya, dan kegelapan akan sirna dengan ilmu. Melalui pendidikan yang berimbang antara ilmu diniyah dan ilmu umum, kami berharap santri ELKAROM tumbuh menjadi pribadi yang bermanfaat.</p><a class="btn btn-outline mt-2" href="#/profil">Baca Selengkapnya</a></div></div></div></section>'; }
function renderVisiMisi() { var misiList = ['Menanamkan aqidah yang lurus dan akhlak yang mulia.','Menyelenggarakan pendidikan diniyah dan umum secara terpadu.','Membiasakan santri membaca dan memahami kitab kuning.','Membina kemampuan membaca Al-Quran dengan baik dan benar.','Menumbuhkan jiwa kemandirian dan pengabdian kepada masyarakat.']; var misiHtml = misiList.map(function (m, i) { return '<div class="vm-list-item"><span class="vm-list-nomor">' + (i + 1) + '</span><span>' + escapeHtml(m) + '</span></div>'; }).join(''); return '<section class="section section-alt"><div class="container"><div class="section-header"><span class="section-label">Visi dan Misi</span><h2 class="section-judul">Arah dan Tujuan Kami</h2></div><div class="visi-misi-grid"><div class="vm-card vm-card-visi"><span class="vm-label">Visi</span><h3 class="vm-judul">Terwujudnya Generasi Muslim yang Berilmu dan Berakhlak</h3><p class="vm-teks">Menjadi lembaga pendidikan Islam yang unggul dalam membentuk pribadi muslim yang menguasai ilmu agama, cakap dalam ilmu umum, dan berakhlak mulia.</p></div><div class="vm-card vm-card-misi"><span class="vm-label">Misi</span><h3 class="vm-judul">Langkah Kami dalam Mencapai Visi</h3><div class="vm-list mt-3">' + misiHtml + '</div></div></div></div></section>'; }
function renderJenjang() { return '<section class="section"><div class="container"><div class="section-header"><span class="section-label">Jenjang Pendidikan</span><h2 class="section-judul">Tiga Jenjang, Satu Tujuan</h2><p class="section-deskripsi">Pendidikan berjenjang untuk membentuk santri secara bertahap dan menyeluruh.</p></div><div class="jenjang-grid"><div class="jenjang-card"><span class="jenjang-badge">Dasar</span><div><div class="jenjang-tingkat">1-6</div><div class="jenjang-judul">Ula</div><p class="jenjang-deskripsi">Jenjang pendidikan dasar dengan penekanan pada pembentukan karakter, dasar-dasar ilmu diniyah, dan kemampuan baca Al-Quran.</p></div></div><div class="jenjang-card jenjang-card-emas"><span class="jenjang-badge">Menengah</span><div><div class="jenjang-tingkat">7-9</div><div class="jenjang-judul">Wustho</div><p class="jenjang-deskripsi">Jenjang menengah dengan pendalaman ilmu diniyah, pengenalan kitab kuning, dan penguatan ilmu umum.</p></div></div><div class="jenjang-card"><span class="jenjang-badge">Atas</span><div><div class="jenjang-tingkat">10-12</div><div class="jenjang-judul">Ulya</div><p class="jenjang-deskripsi">Jenjang atas dengan fokus pendalaman kitab kuning, penguasaan ilmu alat, dan persiapan studi lanjut.</p></div></div></div></div></section>'; }
function renderProgramUnggulan() { var item = DATA_STATIS.programUnggulan.map(function (p) { var poinHtml = (p.poin || []).map(function (pt) { return '<div class="program-list-item">' + SVG_ICONS.check + '<span>' + escapeHtml(pt) + '</span></div>'; }).join(''); return '<div class="program-card"><div class="program-icon">' + (SVG_ICONS[p.icon] || '') + '</div><h3 class="program-judul">' + escapeHtml(p.judul) + '</h3><p class="program-deskripsi">' + escapeHtml(p.deskripsi) + '</p><div class="program-list">' + poinHtml + '</div></div>'; }).join(''); return '<section class="section section-alt"><div class="container"><div class="section-header"><span class="section-label">Program Unggulan</span><h2 class="section-judul">Keunggulan yang Kami Bangun</h2><p class="section-deskripsi">Dua program utama yang menjadi ciri khas pendidikan ELKAROM.</p></div><div class="program-grid">' + item + '</div></div></section>'; }
function renderKartuArtikel(a) { var thumbHtml = a.thumbnail ? '<img alt="' + escapeHtml(a.judul) + '" loading="lazy" src="' + escapeHtml(a.thumbnail) + '">' : SVG_ICONS.file; var kategoriHtml = a.kategori ? '<span class="artikel-kategori">' + escapeHtml(a.kategori) + '</span>' : ''; var tanggalIndo = formatTanggalIndo(a.tanggal); return '<a class="artikel-card" href="' + escapeHtml(a.link) + '" target="_blank" rel="noopener"><div class="artikel-thumb">' + kategoriHtml + thumbHtml + '</div><div class="artikel-isi"><h3 class="artikel-judul">' + escapeHtml(a.judul) + '</h3><p class="artikel-ringkas">' + escapeHtml(a.ringkas) + '</p><div class="artikel-meta"><span>' + escapeHtml(a.penulis) + '</span><span>.</span><span>' + escapeHtml(tanggalIndo) + '</span></div></div></a>'; }
function renderCta() { return '<section class="section"><div class="container"><div class="cta"><div class="cta-inner"><h2 class="cta-judul">Bergabunglah dengan <span>ELKAROM</span></h2><p class="cta-teks">Pendaftaran santri baru telah dibuka. Raih kesempatan menimba ilmu di lingkungan yang mendukung tumbuh kembang anak secara menyeluruh.</p><div class="cta-aksi"><a class="btn btn-aksen" href="#/pendaftaran">Daftar Sekarang</a><a class="btn btn-outline-putih" href="#/kontak">Hubungi Kami</a></div></div></div></div></section>'; }
function renderBeranda(wadah) {
  wadah.innerHTML = renderHero() + renderKerangkaKurikulum() + renderSambutan() + renderVisiMisi() + renderJenjang() + renderProgramUnggulan() +
    '<section class="section"><div class="container"><div class="section-header"><span class="section-label">Pena Pesantren</span><h2 class="section-judul">Catatan dan Inspirasi</h2><p class="section-deskripsi">Tulisan, kajian, dan kabar terbaru dari ELKAROM.</p></div><div id="pena-list" class="artikel-grid"><div class="loading-box" style="grid-column:1/-1"><div class="spinner"></div><p class="teks-lembut">Memuat artikel...</p></div></div></div></section>' + renderCta();
  var list = document.getElementById('pena-list');
  if (list) { ambilArtikelBlogger(3).then(function (artikel) { if (!artikel || artikel.length === 0) { list.innerHTML = '<div class="empty-artikel" style="grid-column:1/-1">' + SVG_ICONS.file + '<h3>Belum ada artikel</h3><p class="teks-lembut mt-2">Buat artikel di Blogger dengan label "' + escapeHtml(KONFIG.LABEL_ARTIKEL) + '".</p></div>'; return; } list.innerHTML = artikel.map(renderKartuArtikel).join(''); }); }
}
function renderHalamanArtikel(wadah) {
  wadah.innerHTML = '<section class="halaman-hero"><div class="container halaman-hero-inner"><span class="halaman-hero-badge">Pena Pesantren</span><h1 class="halaman-hero-judul">Catatan dan Inspirasi</h1><p class="halaman-hero-deskripsi">Kumpulan tulisan, kajian, dan kabar terbaru dari Pesantren ELKAROM.</p></div></section><section class="section"><div class="container"><div id="artikel-list" class="artikel-grid"><div class="loading-box" style="grid-column:1/-1"><div class="spinner"></div><p class="teks-lembut">Memuat artikel...</p></div></div></div></section>';
  var list = document.getElementById('artikel-list');
  if (!list) return;
  ambilArtikelBlogger(12).then(function (artikel) { if (!artikel || artikel.length === 0) { list.innerHTML = '<div class="empty-artikel" style="grid-column:1/-1">' + SVG_ICONS.file + '<h3>Belum ada artikel</h3><p class="teks-lembut mt-2">Belum ada artikel berlabel "' + escapeHtml(KONFIG.LABEL_ARTIKEL) + '".</p></div>'; return; } list.innerHTML = artikel.map(renderKartuArtikel).join(''); });
}
function renderKartuGuru(guru) { var badgeKelas = guru.kategori === 'pimpinan' ? 'guru-jabatan-badge pimpinan' : 'guru-jabatan-badge'; var fotoHtml = (guru.foto && guru.foto !== '') ? '<img alt="' + escapeHtml(guru.nama) + '" loading="lazy" src="' + escapeHtml(guru.foto) + '">' : '<span class="guru-inisial">' + escapeHtml(ambilInisial(guru.nama)) + '</span>'; var alumniHtml = guru.alumni ? '<span class="guru-alumni">' + escapeHtml(guru.alumni) + '</span>' : ''; return '<div class="guru-card"><div class="guru-foto">' + fotoHtml + '<span class="' + badgeKelas + '">' + escapeHtml(guru.kategori) + '</span></div><div class="guru-isi"><h3 class="guru-nama">' + escapeHtml(guru.nama) + '</h3><p class="guru-jabatan">' + escapeHtml(guru.jabatan) + '</p>' + alumniHtml + '</div></div>'; }
function renderGuruStaf(wadah) { var daftar = DATA_STATIS.guruStaf || []; var kartuHtml = daftar.map(renderKartuGuru).join(''); wadah.innerHTML = '<section class="halaman-hero"><div class="container halaman-hero-inner"><span class="halaman-hero-badge">Guru dan Staf</span><h1 class="halaman-hero-judul">Daftar Dewan Asatidz/ah Pesantren ELKAROM</h1><p class="halaman-hero-deskripsi">Para pengajar dan staf yang mendedikasikan diri untuk mendidik, membimbing, dan mengasuh santri ELKAROM.</p></div></section><section class="section"><div class="container"><div class="guru-counter">Menampilkan <strong>' + daftar.length + '</strong> dari <strong>' + daftar.length + '</strong> pengajar dan staf</div><div class="guru-grid">' + kartuHtml + '</div><div class="guru-catatan">Catatan: Data di atas masih berupa contoh.</div></div></section>'; }
function renderLogin(wadah) {
  wadah.innerHTML = '<div class="login-page"><div class="login-panel-kiri"><div class="login-panel-kiri-inner"><div class="login-panel-logo">EL</div><h1 class="login-panel-judul">Mulia dengan <span>Ilmu</span></h1><p class="login-panel-deskripsi">Selamat datang di portal resmi Pesantren ELKAROM. Silakan masuk untuk mengakses layanan administrasi, akademik, dan informasi santri.</p><p class="login-panel-arab">طَلَبُ العِلْمِ فَرِيْضَةٌ عَلَى كُلِّ مُسْلِمٍ</p></div></div><div class="login-panel-kanan"><div class="login-form-wrap"><div class="login-form-header"><div class="login-form-brand-mobile"><div class="navbar-logo">EL</div><div class="navbar-nama"><span class="navbar-nama-utama">ELKAROM</span><span class="navbar-nama-slogan">Mulia dengan Ilmu</span></div></div><h2 class="login-form-judul">Masuk ke Akun</h2><p class="login-form-sub">Gunakan email dan password yang terdaftar.</p></div><form class="login-form" id="form-login" novalidate="novalidate"><div class="form-grup"><label class="form-label" for="input-email">Email<span class="form-label-wajib">*</span></label><div class="form-input-wrap"><span class="form-input-ikon">' + SVG_ICONS.mail + '</span><input autocomplete="email" class="form-input" id="input-email" name="email" placeholder="nama@email.com" type="email"></div></div><div class="form-grup"><label class="form-label" for="input-password">Password<span class="form-label-wajib">*</span></label><div class="form-input-wrap"><span class="form-input-ikon">' + SVG_ICONS.lock + '</span><input autocomplete="current-password" class="form-input form-input-password" id="input-password" name="password" placeholder="Masukkan password" type="password"><button aria-label="Tampilkan password" class="form-input-toggle" id="toggle-password" type="button"><span id="ikon-mata">' + SVG_ICONS.eye + '</span></button></div></div><div class="form-info-tambahan"><span></span><a class="form-link" href="#/lupa-password">Lupa password?</a></div><div class="form-error" id="error-login" style="display:none">' + SVG_ICONS.alertCircle + '<span id="error-login-pesan">Terjadi kesalahan.</span></div><div class="form-tombol"><button class="btn btn-utama btn-blok" id="tombol-masuk" type="submit"><span id="tombol-masuk-teks">Masuk</span><span id="tombol-masuk-loading" style="display:none"><span class="spinner spinner-putih"></span></span></button></div></form><div class="login-form-kaki"><a href="#/">Kembali ke Beranda</a></div><div class="login-info-dev">Kredensial default admin: <strong>admin@sip.local</strong> / <strong>admin123</strong></div></div></div></div>';
  var formLogin = document.getElementById('form-login'); if (formLogin) formLogin.addEventListener('submit', prosesLogin);
  var tombolToggle = document.getElementById('toggle-password'); if (tombolToggle) tombolToggle.addEventListener('click', togglePassword);
}
function togglePassword() { var input = document.getElementById('input-password'); var ikonMata = document.getElementById('ikon-mata'); if (!input || !ikonMata) return; if (input.type === 'password') { input.type = 'text'; ikonMata.innerHTML = SVG_ICONS.eyeOff; } else { input.type = 'password'; ikonMata.innerHTML = SVG_ICONS.eye; } }
function tampilkanErrorLogin(pesan) { var kotakError = document.getElementById('error-login'); var pesanError = document.getElementById('error-login-pesan'); if (!kotakError || !pesanError) return; pesanError.textContent = pesan; kotakError.style.display = 'flex'; }
function sembunyikanErrorLogin() { var kotakError = document.getElementById('error-login'); if (kotakError) kotakError.style.display = 'none'; }
function aturLoadingTombol(loading) { var tombol = document.getElementById('tombol-masuk'); var teks = document.getElementById('tombol-masuk-teks'); var l = document.getElementById('tombol-masuk-loading'); if (!tombol || !teks || !l) return; if (loading) { tombol.disabled = true; teks.style.display = 'none'; l.style.display = 'inline-flex'; } else { tombol.disabled = false; teks.style.display = ''; l.style.display = 'none'; } }
function prosesLogin(e) {
  if (e) e.preventDefault(); sembunyikanErrorLogin();
  if (STATE.loginTerkunciSampai && Date.now() < STATE.loginTerkunciSampai) { tampilkanErrorLogin('Terlalu banyak percobaan. Coba lagi dalam ' + Math.ceil((STATE.loginTerkunciSampai - Date.now()) / 1000) + ' detik.'); return; }
  var inputEmail = document.getElementById('input-email'); var inputPassword = document.getElementById('input-password');
  if (!inputEmail || !inputPassword) return;
  var email = String(inputEmail.value || '').trim(); var password = String(inputPassword.value || '');
  if (!email) { tampilkanErrorLogin('Email wajib diisi.'); inputEmail.focus(); return; }
  if (!password) { tampilkanErrorLogin('Password wajib diisi.'); inputPassword.focus(); return; }
  aturLoadingTombol(true);
  panggilApi('login', { email: email, password: password }, 'POST').then(function (respon) {
    aturLoadingTombol(false);
    if (!respon || !respon.sukses) {
      if (!(respon && respon.jaringan)) { STATE.loginGagal++; if (STATE.loginGagal >= 5) { STATE.loginTerkunciSampai = Date.now() + 30000; STATE.loginGagal = 0; } }
      inputPassword.value = '';
      tampilkanErrorLogin((respon && respon.pesan) ? respon.pesan : 'Login gagal.');
      return;
    }
    STATE.loginGagal = 0;
    var dataLogin = respon.data || {};
    if (!dataLogin.token || !dataLogin.pengguna) { tampilkanErrorLogin('Respons server tidak lengkap.'); return; }
    simpanSesi(dataLogin.token, dataLogin.pengguna);
    tampilkanToast('Selamat datang, ' + (dataLogin.pengguna.nama_lengkap || dataLogin.pengguna.email), 'sukses', 'Login Berhasil');
    var roleUser = dataLogin.pengguna.role || 'admin';
    var routeTujuan = ROUTE_DASHBOARD_BY_ROLE[roleUser] || '#/admin';
    window.location.hash = routeTujuan;
  }).catch(function (err) { aturLoadingTombol(false); logDebug('Error login:', err); tampilkanErrorLogin('Tidak dapat terhubung ke server.'); });
}
function renderDropdownTahunAjaran() {
  var items = TAHUN_AJARAN_LIST.map(function (t) { var aktif = t === TAHUN_AJARAN_AKTIF ? ' aktif' : ''; return '<button class="dropdown-filter-item' + aktif + '" data-tahun="' + t + '" onclick="pilihTahunAjaran(\'' + t + '\')" type="button"><span>' + t + '</span>' + (aktif ? SVG_ICONS.check : '') + '</button>'; }).join('');
  return '<div class="dropdown-filter"><button class="dropdown-filter-tombol" onclick="toggleDropdownFilter(\'dropdown-tahun-menu\')" type="button">' + SVG_ICONS.calendar + '<span class="dropdown-filter-label">Tahun Ajaran:</span><span id="label-tahun-ajaran">' + TAHUN_AJARAN_AKTIF + '</span>' + SVG_ICONS.chevronDown + '</button><div class="dropdown-filter-menu" id="dropdown-tahun-menu">' + items + '</div></div>';
}
function toggleDropdownFilter(id) { var el = document.getElementById(id); if (!el) return; var semua = document.querySelectorAll('.dropdown-filter-menu'); for (var i = 0; i < semua.length; i++) if (semua[i].id !== id) semua[i].classList.remove('tampil'); el.classList.toggle('tampil'); }
function pilihTahunAjaran(tahun) { TAHUN_AJARAN_AKTIF = tahun; var elLabel = document.getElementById('label-tahun-ajaran'); if (elLabel) elLabel.textContent = tahun; var menu = document.getElementById('dropdown-tahun-menu'); if (menu) menu.classList.remove('tampil'); tampilkanToast('Tahun ajaran diubah ke ' + tahun + '.', 'info', 'Tahun Ajaran'); }
function renderModalTambah() {
  var opsi = [
    { label: 'Tambah Santri', route: '#/admin/santri/tambah', icon: 'userPlus' },
    { label: 'Tambah Guru', route: '#/admin/guru', icon: 'userCheck' },
    { label: 'Tambah Prestasi', route: '#/admin/prestasi', icon: 'award' },
    { label: 'Tambah Kelas', route: '#/admin/kelas', icon: 'grid' },
    { label: 'Tambah Papan Info', route: '#/admin/pengumuman/tambah', icon: 'megaphone' },
    { label: 'Tambah User', route: '#/admin/user', icon: 'user' }
  ];
  var html = '<div class="modal-grid">' + opsi.map(function (o) { return '<a class="modal-opsi" href="' + o.route + '" onclick="tutupModal()"><div class="modal-opsi-icon">' + (SVG_ICONS[o.icon] || SVG_ICONS.infoCircle) + '</div><div class="modal-opsi-label">' + escapeHtml(o.label) + '</div></a>'; }).join('') + '</div>';
  bukaModal('Pilih yang Akan Ditambahkan', html);
}

function renderDashboardAdmin(wadah) {
  var pengguna = STATE.pengguna || {};
  var namaLengkap = pengguna.nama_lengkap || pengguna.email || 'User';
  var salam = ambilSalamWaktu();
  var tanggal = ambilTanggalHariIni();
  wadah.innerHTML = '<div class="admin-halaman-header"><div class="admin-halaman-judul-wrap"><h1 class="admin-halaman-judul">Dashboard</h1><p class="admin-halaman-deskripsi">Ringkasan aktivitas Pesantren ELKAROM</p></div><div class="admin-halaman-toolbar">' + renderDropdownTahunAjaran() + '</div></div>' +
    '<div class="dash-salam" style="background:linear-gradient(135deg,var(--warna-utama) 0%,var(--warna-utama-tua) 100%);color:white;border-radius:16px;padding:32px;margin-bottom:24px;position:relative;overflow:hidden"><div style="position:relative;z-index:1"><h1 style="font-size:24px;font-weight:800;color:white;margin-bottom:8px">' + escapeHtml(salam) + ', <span style="color:var(--warna-aksen)">' + escapeHtml(namaLengkap) + '</span></h1><div style="font-size:14.5px;color:rgba(255,255,255,0.9);display:inline-flex;align-items:center;gap:8px">' + SVG_ICONS.calendar + '<span>' + escapeHtml(tanggal) + '</span></div></div></div>' +
    renderPapanInfoDashboard() +
    '<div style="margin-bottom:24px"><div style="margin-bottom:16px"><h3 style="font-size:17px;font-weight:700">Aksi Cepat</h3></div><div class="aksi-cepat-grid">' +
      '<a class="aksi-cepat-item" href="#" onclick="event.preventDefault();renderModalTambah();"><div class="aksi-cepat-icon">' + SVG_ICONS.plus + '</div><span>Tambah</span></a>' +
      '<a class="aksi-cepat-item" href="#/admin/santri"><div class="aksi-cepat-icon">' + SVG_ICONS.users + '</div><span>Lihat Santri</span></a>' +
      '<a class="aksi-cepat-item" href="#/admin/pengumuman"><div class="aksi-cepat-icon">' + SVG_ICONS.megaphone + '</div><span>Papan Info</span></a>' +
      '<a class="aksi-cepat-item" href="#/admin/santri"><div class="aksi-cepat-icon">' + SVG_ICONS.printer + '</div><span>Cetak KTS</span></a>' +
    '</div></div>' +
    '<div style="margin-bottom:24px"><div style="margin-bottom:16px"><h3 style="font-size:17px;font-weight:700">Statistik Santri</h3></div><div class="stat-grid" id="dash-stat-grid">' +
      '<div class="stat-card"><div class="stat-label">Total Santri</div><div class="stat-nilai" id="dash-stat-total"><span class="stat-loading"></span></div></div>' +
      '<div class="stat-card stat-card-aksen"><div class="stat-label">Santri Aktif</div><div class="stat-nilai" id="dash-stat-aktif"><span class="stat-loading"></span></div></div>' +
      '<div class="stat-card stat-card-info"><div class="stat-label">Alumni</div><div class="stat-nilai" id="dash-stat-alumni"><span class="stat-loading"></span></div></div>' +
      '<div class="stat-card stat-card-abu"><div class="stat-label">Santri Putra</div><div class="stat-nilai" id="dash-stat-putra"><span class="stat-loading"></span></div></div>' +
      '<div class="stat-card stat-card-merah"><div class="stat-label">Santri Putri</div><div class="stat-nilai" id="dash-stat-putri"><span class="stat-loading"></span></div></div>' +
    '</div></div>';
  panggilApi('statistikSiswa', {}, 'POST').then(function (respon) {
    if (!respon || !respon.sukses || !respon.data) { ['dash-stat-total','dash-stat-aktif','dash-stat-alumni','dash-stat-putra','dash-stat-putri'].forEach(function (id) { var el = document.getElementById(id); if (el) el.textContent = '-'; }); return; }
    var d = respon.data;
    var map = { 'dash-stat-total': d.total || 0, 'dash-stat-aktif': d.aktif || 0, 'dash-stat-alumni': d.alumni || 0, 'dash-stat-putra': d.putra || 0, 'dash-stat-putri': d.putri || 0 };
    for (var k in map) { if (map.hasOwnProperty(k)) { var el = document.getElementById(k); if (el) el.textContent = map[k]; } }
  });
  muatPapanInfoDashboard();
}

function renderDashboardGuru(wadah) {
  if (!STATE.token || !STATE.pengguna) { window.location.hash = '#/login'; return; }
  if (STATE.pengguna.role !== 'guru') { window.location.hash = ROUTE_DASHBOARD_BY_ROLE[STATE.pengguna.role] || '#/'; return; }
  var namaLengkap = STATE.pengguna.nama_lengkap || STATE.pengguna.email || 'Ustadz';
  var salam = ambilSalamWaktu();
  var tanggal = ambilTanggalHariIni();
  wadah.innerHTML = '' +
    '<div class="admin-halaman-header"><div class="admin-halaman-judul-wrap"><h1 class="admin-halaman-judul">Dashboard Guru</h1><p class="admin-halaman-deskripsi">Selamat datang di portal guru ELKAROM</p></div></div>' +
    '<div class="dash-salam" style="background:linear-gradient(135deg,var(--warna-utama) 0%,var(--warna-utama-tua) 100%);color:white;border-radius:16px;padding:32px;margin-bottom:24px;position:relative;overflow:hidden"><div style="position:relative;z-index:1"><h1 style="font-size:24px;font-weight:800;color:white;margin-bottom:8px">' + escapeHtml(salam) + ', <span style="color:var(--warna-aksen)">' + escapeHtml(namaLengkap) + '</span></h1><div style="font-size:14.5px;color:rgba(255,255,255,0.9);display:inline-flex;align-items:center;gap:8px">' + SVG_ICONS.calendar + '<span>' + escapeHtml(tanggal) + '</span></div><div style="margin-top:12px;font-size:13.5px;color:rgba(255,255,255,0.85)">' + SVG_ICONS.graduation + ' <span>Anda login sebagai <strong>Guru</strong></span></div></div></div>' +
    renderPapanInfoDashboard() +
    '<div style="margin-bottom:24px"><div style="margin-bottom:16px"><h3 style="font-size:17px;font-weight:700">Aksi Cepat</h3></div><div class="aksi-cepat-grid">' +
      '<a class="aksi-cepat-item" href="#/guru/santri"><div class="aksi-cepat-icon">' + SVG_ICONS.users + '</div><span>Data Santri</span></a>' +
      '<a class="aksi-cepat-item" href="#/guru/absensi"><div class="aksi-cepat-icon">' + SVG_ICONS.clipboard + '</div><span>Absensi</span></a>' +
      '<a class="aksi-cepat-item" href="#/guru/nilai"><div class="aksi-cepat-icon">' + SVG_ICONS.trendingUp + '</div><span>Nilai</span></a>' +
      '<a class="aksi-cepat-item" href="#/guru/jadwal"><div class="aksi-cepat-icon">' + SVG_ICONS.calendar + '</div><span>Jadwal</span></a>' +
    '</div></div>' +
    '<div style="margin-bottom:24px"><div style="margin-bottom:16px"><h3 style="font-size:17px;font-weight:700">Statistik Santri</h3></div><div class="stat-grid" id="guru-stat-grid">' +
      '<div class="stat-card"><div class="stat-label">Total Santri</div><div class="stat-nilai" id="guru-stat-total"><span class="stat-loading"></span></div></div>' +
      '<div class="stat-card stat-card-aksen"><div class="stat-label">Santri Aktif</div><div class="stat-nilai" id="guru-stat-aktif"><span class="stat-loading"></span></div></div>' +
      '<div class="stat-card stat-card-abu"><div class="stat-label">Santri Putra</div><div class="stat-nilai" id="guru-stat-putra"><span class="stat-loading"></span></div></div>' +
      '<div class="stat-card stat-card-merah"><div class="stat-label">Santri Putri</div><div class="stat-nilai" id="guru-stat-putri"><span class="stat-loading"></span></div></div>' +
    '</div></div>';
  muatPapanInfoDashboard();
  panggilApi('statistikSiswa', {}, 'POST').then(function (respon) {
    if (!respon || !respon.sukses || !respon.data) { ['guru-stat-total','guru-stat-aktif','guru-stat-putra','guru-stat-putri'].forEach(function (id) { var el = document.getElementById(id); if (el) el.textContent = '-'; }); return; }
    var d = respon.data;
    var map = { 'guru-stat-total': d.total || 0, 'guru-stat-aktif': d.aktif || 0, 'guru-stat-putra': d.putra || 0, 'guru-stat-putri': d.putri || 0 };
    for (var k in map) { if (map.hasOwnProperty(k)) { var el = document.getElementById(k); if (el) el.textContent = map[k]; } }
  });
}

function renderDashboardWali(wadah) {
  if (!STATE.token || !STATE.pengguna) { window.location.hash = '#/login'; return; }
  if (STATE.pengguna.role !== 'wali') { window.location.hash = ROUTE_DASHBOARD_BY_ROLE[STATE.pengguna.role] || '#/'; return; }
  var namaLengkap = STATE.pengguna.nama_lengkap || STATE.pengguna.email || 'Bapak/Ibu';
  var salam = ambilSalamWaktu();
  var tanggal = ambilTanggalHariIni();
  wadah.innerHTML = '' +
    '<div class="admin-halaman-header"><div class="admin-halaman-judul-wrap"><h1 class="admin-halaman-judul">Dashboard Wali</h1><p class="admin-halaman-deskripsi">Selamat datang di portal wali santri ELKAROM</p></div></div>' +
    '<div class="dash-salam" style="background:linear-gradient(135deg,var(--warna-utama) 0%,var(--warna-utama-tua) 100%);color:white;border-radius:16px;padding:32px;margin-bottom:24px;position:relative;overflow:hidden"><div style="position:relative;z-index:1"><h1 style="font-size:24px;font-weight:800;color:white;margin-bottom:8px">' + escapeHtml(salam) + ', <span style="color:var(--warna-aksen)">' + escapeHtml(namaLengkap) + '</span></h1><div style="font-size:14.5px;color:rgba(255,255,255,0.9);display:inline-flex;align-items:center;gap:8px">' + SVG_ICONS.calendar + '<span>' + escapeHtml(tanggal) + '</span></div><div style="margin-top:12px;font-size:13.5px;color:rgba(255,255,255,0.85)">' + SVG_ICONS.users + ' <span>Anda login sebagai <strong>Wali Santri</strong></span></div></div></div>' +
    renderPapanInfoDashboard() +
    '<div class="form-card"><div class="form-card-judul">' + SVG_ICONS.users + '<span>Info Anak</span></div><p class="teks-lembut" style="font-size:13.5px;line-height:1.7;margin:0">Fitur informasi detail santri (absensi, nilai, raport) akan tersedia setelah modul Data Wali dan Akademik dibangun. Untuk saat ini, Anda bisa melihat papan informasi terbaru dari pesantren di atas.</p></div>';
  muatPapanInfoDashboard();
}

function renderHalamanAdminPlaceholder(wadah, judul, deskripsi) { wadah.innerHTML = '<div class="admin-halaman-header"><div class="admin-halaman-judul-wrap"><h1 class="admin-halaman-judul">' + escapeHtml(judul) + '</h1><p class="admin-halaman-deskripsi">' + escapeHtml(deskripsi || 'Modul ini sedang dalam pengembangan.') + '</p></div></div><div class="admin-placeholder"><div class="admin-placeholder-ikon">' + SVG_ICONS.info + '</div><h2>' + escapeHtml(judul) + '</h2><p>Halaman ini sedang dalam pengembangan dan akan segera tersedia.</p><div class="admin-placeholder-badge">SEGERA HADIR</div></div>'; }
function renderPlaceholderGuruWali(wadah, judul) {
  var role = ambilRoleSaatIni();
  var routeKembali = role === 'guru' ? '#/guru' : '#/wali';
  wadah.innerHTML = '<div class="admin-halaman-header"><div class="admin-halaman-judul-wrap"><a class="btn btn-ghost btn-sm" href="' + routeKembali + '" style="margin-bottom:8px">' + SVG_ICONS.arrowLeft + '<span>Kembali</span></a><h1 class="admin-halaman-judul">' + escapeHtml(judul) + '</h1><p class="admin-halaman-deskripsi">Modul ini akan segera tersedia.</p></div></div><div class="admin-placeholder"><div class="admin-placeholder-ikon">' + SVG_ICONS.info + '</div><h2>' + escapeHtml(judul) + '</h2><p>Halaman ini sedang dalam pengembangan.</p><div class="admin-placeholder-badge">SEGERA HADIR</div></div>';
}
function prosesLogout() { var tokenSaatIni = STATE.token; hapusSesi(); if (tokenSaatIni) { panggilApi('logout', { token: tokenSaatIni }, 'POST').then(function () {}); } tampilkanToast('Anda telah keluar dari akun.', 'info', 'Logout'); window.location.hash = '#/'; }

var DAFTAR_HALAMAN = {
  '#/': { judul: 'Beranda', render: renderBeranda },
  '#/profil': { judul: 'Profil', render: null },
  '#/program': { judul: 'Program', render: null },
  '#/guru-staf': { judul: 'Guru dan Staf', render: renderGuruStaf },
  '#/artikel': { judul: 'Pena Pesantren', render: renderHalamanArtikel },
  '#/kontak': { judul: 'Kontak', render: null },
  '#/pendaftaran': { judul: 'Pendaftaran', render: null },
  '#/login': { judul: 'Login', render: renderLogin },
  '#/lupa-password': { judul: 'Lupa Password', render: null },
  '#/admin': { judul: 'Dashboard', render: renderDashboardAdmin },
  '#/admin/santri': { judul: 'Data Santri', render: renderHalamanSantri },
  '#/admin/profil-santri': { judul: 'Profil Santri', render: null },
  '#/admin/profil-pesantren': { judul: 'Profil Pesantren', render: null },
  '#/admin/kelas': { judul: 'Kelas', render: null },
  '#/admin/mapel': { judul: 'Mata Pelajaran', render: null },
  '#/admin/kaldik': { judul: 'Kalender Pendidikan', render: null },
  '#/admin/pengumuman': { judul: 'Papan Info', render: renderHalamanPapanInfo },
  '#/admin/berkas': { judul: 'Berkas', render: null },
  '#/admin/ekskul': { judul: 'Ekstrakurikuler', render: null },
  '#/admin/fasilitas': { judul: 'Fasilitas', render: null },
  '#/admin/santri-laporan': { judul: 'Laporan Santri', render: null },
  '#/admin/prestasi': { judul: 'Prestasi', render: null },
  '#/admin/ppdb': { judul: 'Data PPDB', render: null },
  '#/admin/pelanggaran': { judul: 'Pelanggaran', render: null },
  '#/admin/kesehatan': { judul: 'Kesehatan', render: null },
  '#/admin/guru': { judul: 'Data Guru dan Staf', render: null },
  '#/admin/guru-jadwal': { judul: 'Jadwal Guru', render: null },
  '#/admin/guru-absensi': { judul: 'Absensi Guru', render: null },
  '#/admin/wali': { judul: 'Data Wali Santri', render: null },
  '#/admin/akademik-absensi': { judul: 'Absensi', render: null },
  '#/admin/akademik-jadwal': { judul: 'Jadwal Pelajaran', render: null },
  '#/admin/akademik-nilai': { judul: 'Nilai', render: null },
  '#/admin/akademik-ranking': { judul: 'Ranking', render: null },
  '#/admin/akademik-raport': { judul: 'Raport', render: null },
  '#/admin/akademik-sertifikat': { judul: 'Sertifikat', render: null },
  '#/admin/akademik-laporan-nilai': { judul: 'Laporan Nilai', render: null },
  '#/admin/keuangan-biaya': { judul: 'Biaya', render: null },
  '#/admin/keuangan-penagihan': { judul: 'Penagihan', render: null },
  '#/admin/keuangan-riwayat': { judul: 'Riwayat Keuangan', render: null },
  '#/admin/keuangan-tabungan': { judul: 'Tabungan Santri', render: null },
  '#/admin/komunikasi-pesan': { judul: 'Pesan', render: null },
  '#/admin/komunikasi-notifikasi': { judul: 'Notifikasi', render: null },
  '#/admin/komunikasi-saran': { judul: 'Saran', render: null },
  '#/admin/publikasi-artikel': { judul: 'Artikel', render: null },
  '#/admin/publikasi-galeri': { judul: 'Galeri', render: null },
  '#/admin/publikasi-karya': { judul: 'Karya', render: null },
  '#/admin/user': { judul: 'Data User', render: null },
  '#/admin/aktivitas': { judul: 'Aktivitas', render: null },
  '#/admin/pengaturan': { judul: 'Pengaturan', render: renderHalamanPengaturan },

  // Route guru
  '#/guru': { judul: 'Dashboard Guru', render: renderDashboardGuru },
  '#/guru/santri': { judul: 'Data Santri', render: renderHalamanSantriGuru },
  '#/guru/absensi': { judul: 'Absensi', render: function (w) { renderPlaceholderGuruWali(w, 'Absensi'); } },
  '#/guru/jadwal': { judul: 'Jadwal Pelajaran', render: function (w) { renderPlaceholderGuruWali(w, 'Jadwal Pelajaran'); } },
  '#/guru/nilai': { judul: 'Nilai', render: function (w) { renderPlaceholderGuruWali(w, 'Nilai'); } },
  '#/guru/papan-info': { judul: 'Papan Info', render: renderHalamanPapanInfoReadOnly },

  // Route wali
  '#/wali': { judul: 'Dashboard Wali', render: renderDashboardWali },
  '#/wali/papan-info': { judul: 'Papan Info', render: renderHalamanPapanInfoReadOnly }
};

function ambilHashSaatIni() { return window.location.hash || '#/'; }
function renderPlaceholder(judul) { return '<div class="halaman-placeholder">' + SVG_ICONS.info + '<h2>' + escapeHtml(judul) + '</h2><p class="teks-lembut mt-2">Halaman ini sedang dalam pengembangan.</p></div>'; }

function tanganiRuteInti() {
  var hash = ambilHashSaatIni().split('?')[0];
  if (hash.length > 2 && hash.charAt(hash.length - 1) === '/') hash = hash.slice(0, -1);
  STATE.halamanAktif = hash;
  var wadah = document.getElementById('app');
  if (!wadah) return;
  var ruteDinamis = null;
  if (hash.indexOf('#/admin/santri/tambah') === 0) ruteDinamis = { render: function (w) { renderHalamanTambahSantri(w); }, judul: 'Tambah Santri' };
  else if (hash.indexOf('#/admin/santri/edit/') === 0) { var idEdit = hash.replace('#/admin/santri/edit/', ''); ruteDinamis = { render: function (w) { renderHalamanEditSantri(w, idEdit); }, judul: 'Edit Santri' }; }
  else if (hash.indexOf('#/admin/profil-santri/') === 0) { var idProfil = hash.replace('#/admin/profil-santri/', ''); ruteDinamis = { render: function (w) { renderHalamanProfilSantri(w, idProfil); }, judul: 'Profil Santri' }; }
  else if (hash.indexOf('#/admin/pengumuman/tambah') === 0) ruteDinamis = { render: function (w) { renderHalamanTambahPapanInfo(w); }, judul: 'Tambah Papan Info' };
  else if (hash.indexOf('#/admin/pengumuman/edit/') === 0) { var idEditPgm = hash.replace('#/admin/pengumuman/edit/', ''); ruteDinamis = { render: function (w) { renderHalamanEditPapanInfo(w, idEditPgm); }, judul: 'Edit Papan Info' }; }
  else if (hash.indexOf('#/admin/pengumuman/lihat/') === 0) { var idLihatPgm = hash.replace('#/admin/pengumuman/lihat/', ''); ruteDinamis = { render: function (w) { renderHalamanDetailPapanInfo(w, idLihatPgm); }, judul: 'Detail Papan Info' }; }

  var halaman = ruteDinamis || DAFTAR_HALAMAN[hash];
  STATE.judulHalaman = halaman ? halaman.judul : 'Halaman Tidak Ditemukan';
  perbaruiJudulHalaman();
  var semuaLink = document.querySelectorAll('[data-route]');
  for (var i = 0; i < semuaLink.length; i++) {
    var link = semuaLink[i];
    if (link.getAttribute('data-route') === hash) { link.classList.add('aktif'); link.setAttribute('aria-current', 'page'); }
    else { link.classList.remove('aktif'); link.removeAttribute('aria-current'); }
  }

  var butuhLogin = adalahRuteTerlindungi(hash);
  if (butuhLogin && (!STATE.token || !STATE.pengguna)) { window.location.hash = '#/login'; return; }

  var role = ambilRoleSaatIni();
  if (butuhLogin && role) {
    if (role !== 'admin' && routeKhususAdmin(hash)) { redirectKeDashboard(); return; }
    if (role === 'guru' && routeKhususWali(hash)) { redirectKeDashboard(); return; }
    if (role === 'wali' && routeKhususGuru(hash)) { redirectKeDashboard(); return; }
  }

  if (hash === '#/login' && STATE.token && STATE.pengguna) { redirectKeDashboard(); return; }
  aturModeLayout();
  if (hash === '#/login') { wadah.style.marginTop = ''; wadah.innerHTML = ''; renderLogin(wadah); }
  else if (butuhLogin) {
    wadah.innerHTML = '<div class="admin-wrapper"></div>';
    var wrapper = wadah.querySelector('.admin-wrapper');
    if (halaman && typeof halaman.render === 'function') halaman.render(wrapper);
    else renderHalamanAdminPlaceholder(wrapper, halaman ? halaman.judul : 'Halaman');
  }
  else if (halaman && typeof halaman.render === 'function') { wadah.style.marginTop = ''; wadah.innerHTML = '<div class="container"></div>'; halaman.render(wadah.querySelector('.container')); }
  else { wadah.style.marginTop = ''; var j = halaman ? halaman.judul : 'Halaman Tidak Ditemukan'; wadah.innerHTML = '<div class="container">' + renderPlaceholder(j) + '</div>'; }
  var kurangiGerak = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  window.scrollTo({ top: 0, behavior: kurangiGerak ? 'auto' : 'smooth' });
  try { wadah.focus({ preventScroll: true }); } catch (e) {}
}
function tanganiRute() {
  try { tanganiRuteInti(); }
  catch (err) {
    logDebug('Error rute:', err);
    var w = document.getElementById('app');
    if (w) w.innerHTML = '<div class="container"><div class="halaman-placeholder" role="alert"><h2>Terjadi kesalahan</h2><p class="teks-lembut mt-2">Halaman gagal ditampilkan. Silakan muat ulang.</p><button class="btn btn-utama mt-3" onclick="window.location.reload()" type="button">Muat Ulang</button></div></div>';
  }
}
function bukaDrawer() {
  var d = document.getElementById('drawer'); var o = document.getElementById('drawer-overlay'); var t = document.getElementById('tombol-drawer');
  if (d) { d.classList.add('terbuka'); d.setAttribute('aria-hidden', 'false'); }
  if (o) o.classList.add('terbuka');
  if (t) t.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function tutupDrawer() {
  var d = document.getElementById('drawer'); var o = document.getElementById('drawer-overlay'); var t = document.getElementById('tombol-drawer');
  if (d) { d.classList.remove('terbuka'); d.setAttribute('aria-hidden', 'true'); }
  if (o) o.classList.remove('terbuka');
  if (t) t.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
function pasangEventNavbar() {
  var tombolDrawer = document.getElementById('tombol-drawer');
  var tombolTutup = document.getElementById('tombol-tutup-drawer');
  var overlay = document.getElementById('drawer-overlay');
  if (tombolDrawer) tombolDrawer.addEventListener('click', bukaDrawer);
  if (tombolTutup) tombolTutup.addEventListener('click', tutupDrawer);
  if (overlay) overlay.addEventListener('click', tutupDrawer);
  var linkDrawer = document.querySelectorAll('#drawer [data-route]');
  for (var i = 0; i < linkDrawer.length; i++) linkDrawer[i].addEventListener('click', tutupDrawer);
  var tombolUser = document.getElementById('navbar-user-tombol');
  var dropdownUser = document.getElementById('navbar-user-dropdown');
  if (tombolUser && dropdownUser) { tombolUser.addEventListener('click', function (e) { e.stopPropagation(); dropdownUser.classList.toggle('tampil'); }); document.addEventListener('click', function () { dropdownUser.classList.remove('tampil'); }); }
  var menuDashboard = document.getElementById('menu-dashboard'); if (menuDashboard) menuDashboard.addEventListener('click', function () { window.location.hash = '#/admin'; if (dropdownUser) dropdownUser.classList.remove('tampil'); });
  var menuLogout = document.getElementById('menu-logout'); if (menuLogout) menuLogout.addEventListener('click', function () { if (dropdownUser) dropdownUser.classList.remove('tampil'); prosesLogout(); });
}
function pasangEventAdmin() {
  pasangEventSearch();
  pasangEventSidebarGrup();
  var toggle1 = document.getElementById('topbar-toggle-sidebar');
  var toggle2 = document.getElementById('topbar-toggle-sidebar-2');
  if (toggle1) toggle1.addEventListener('click', toggleSidebar);
  if (toggle2) toggle2.addEventListener('click', toggleSidebar);
  var overlay = document.getElementById('sidebar-overlay'); if (overlay) overlay.addEventListener('click', tutupSidebarMobile);
  var tombolTema = document.getElementById('topbar-tema'); if (tombolTema) tombolTema.addEventListener('click', toggleTema);
  var tombolCari = document.getElementById('topbar-cari'); if (tombolCari) tombolCari.addEventListener('click', bukaSearch);
  var searchTutup = document.getElementById('search-tutup'); if (searchTutup) searchTutup.addEventListener('click', tutupSearch);
  var searchOverlay = document.getElementById('search-overlay'); if (searchOverlay) searchOverlay.addEventListener('click', function (e) { if (e.target === searchOverlay) tutupSearch(); });
  document.addEventListener('keydown', tanganiKeyboardGlobal);
  document.addEventListener('click', function (e) { if (!e.target.closest || !e.target.closest('.dropdown-filter')) { var semua = document.querySelectorAll('.dropdown-filter-menu'); for (var i = 0; i < semua.length; i++) semua[i].classList.remove('tampil'); } });
  var topbarUser = document.getElementById('topbar-user');
  var topbarDropdown = document.getElementById('topbar-dropdown');
  if (topbarUser && topbarDropdown) { topbarUser.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('#topbar-dropdown')) return; e.stopPropagation(); topbarDropdown.classList.toggle('tampil'); }); document.addEventListener('click', function () { topbarDropdown.classList.remove('tampil'); }); }
  var topbarMenuProfil = document.getElementById('topbar-menu-profil'); if (topbarMenuProfil) topbarMenuProfil.addEventListener('click', function () { tampilkanToast('Halaman profil akan segera tersedia.', 'info', 'Segera'); if (topbarDropdown) topbarDropdown.classList.remove('tampil'); });
  var topbarMenuPengaturan = document.getElementById('topbar-menu-pengaturan'); if (topbarMenuPengaturan) topbarMenuPengaturan.addEventListener('click', function () { window.location.hash = '#/admin/pengaturan'; if (topbarDropdown) topbarDropdown.classList.remove('tampil'); });
  var topbarMenuLogout = document.getElementById('topbar-menu-logout'); if (topbarMenuLogout) topbarMenuLogout.addEventListener('click', function () { if (topbarDropdown) topbarDropdown.classList.remove('tampil'); prosesLogout(); });
  var sidebarLogout = document.getElementById('sidebar-logout'); if (sidebarLogout) sidebarLogout.addEventListener('click', prosesLogout);
  var notif = document.getElementById('topbar-notif'); if (notif) notif.addEventListener('click', function () { tampilkanToast('Belum ada notifikasi baru.', 'info', 'Notifikasi'); });
  var modalTutup = document.getElementById('modal-tutup'); if (modalTutup) modalTutup.addEventListener('click', tutupModal);
  var modalOverlay = document.getElementById('modal-overlay'); if (modalOverlay) modalOverlay.addEventListener('click', function (e) { if (e.target === modalOverlay) tutupModal(); });
  document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('#sidebar-menu .sidebar-link')) { if (window.innerWidth < 1024) tutupSidebarMobile(); } });
}
function pasangEventScrollNavbar() {
  var navbar = document.getElementById('navbar');
  var topbar = document.getElementById('topbar-admin');
  function cekScroll() { if (window.scrollY > 10) { if (navbar) navbar.classList.add('ter-scroll'); if (topbar) topbar.classList.add('ter-scroll'); } else { if (navbar) navbar.classList.remove('ter-scroll'); if (topbar) topbar.classList.remove('ter-scroll'); } }
  window.addEventListener('scroll', cekScroll, { passive: true });
  cekScroll();
}

/* ============================================================
 * PENGATURAN TAMPILAN, JUDUL, AKSESIBILITAS (v7.7)
 * ============================================================ */
var PETA_WARNA_PENGATURAN = { warna_utama: '--warna-utama', warna_sekunder: '--warna-sekunder', warna_aksen: '--warna-aksen' };

function warnaValid(v) { return typeof v === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v.trim()); }
function hexKeRgb(hex) {
  var h = hex.replace('#', '');
  if (h.length === 3) h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2);
  return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)];
}
function rgbKeHex(r, g, b) {
  var p = function (n) { n = Math.max(0, Math.min(255, Math.round(n))); return (n < 16 ? '0' : '') + n.toString(16); };
  return '#' + p(r) + p(g) + p(b);
}
function gelapkanWarna(hex, f) { var c = hexKeRgb(hex); return rgbKeHex(c[0] * (1 - f), c[1] * (1 - f), c[2] * (1 - f)); }
function campurPutih(hex, f) { var c = hexKeRgb(hex); return rgbKeHex(c[0] + (255 - c[0]) * f, c[1] + (255 - c[1]) * f, c[2] + (255 - c[2]) * f); }

/**
 * Warna kustom dari pengaturan hanya berlaku di tema terang; di tema gelap memakai palet gelap bawaan CSS
 * (inline style di html akan selalu menang atas [data-tema="gelap"], jadi harus dilepas).
 */
function terapkanWarnaPengaturan() {
  var root = document.documentElement;
  var gelap = root.getAttribute('data-tema') === 'gelap';
  var tampilan = (STATE.pengaturanPublik && STATE.pengaturanPublik.tampilan) || {};
  for (var kunci in PETA_WARNA_PENGATURAN) {
    if (!PETA_WARNA_PENGATURAN.hasOwnProperty(kunci)) continue;
    var prop = PETA_WARNA_PENGATURAN[kunci];
    if (!gelap && warnaValid(tampilan[kunci])) root.style.setProperty(prop, tampilan[kunci].trim());
    else root.style.removeProperty(prop);
  }
  if (!gelap && warnaValid(tampilan.warna_utama)) {
    var u = tampilan.warna_utama.trim();
    root.style.setProperty('--warna-utama-tua', gelapkanWarna(u, 0.3));
    root.style.setProperty('--warna-utama-lembut', campurPutih(u, 0.9));
  } else {
    root.style.removeProperty('--warna-utama-tua');
    root.style.removeProperty('--warna-utama-lembut');
  }
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', gelap ? '#1e1e1e' : ((warnaValid(tampilan.warna_utama) && tampilan.warna_utama.trim()) || '#2e7d32'));
}
function simpanCachePengaturan(data) { try { localStorage.setItem(KONFIG.STORAGE_PENGATURAN, JSON.stringify(data)); } catch (e) {} }
/** Terapkan pengaturan terakhir yang diketahui lebih awal agar tidak berkedip (nama/warna default). */
function muatCachePengaturan() {
  try {
    var teks = localStorage.getItem(KONFIG.STORAGE_PENGATURAN);
    if (!teks) return;
    var d = JSON.parse(teks);
    if (d && typeof d === 'object') { STATE.pengaturanPublik = d; terapkanPengaturanKeUI(d); }
  } catch (e) {}
}
function perbaruiJudulHalaman() {
  var ident = (STATE.pengaturanPublik && STATE.pengaturanPublik.identitas) || {};
  var nama = ident.nama_pesantren || KONFIG.NAMA_APP;
  var j = STATE.judulHalaman;
  document.title = (!j || j === 'Beranda') ? (nama + ' - ' + KONFIG.SLOGAN) : (j + ' | ' + nama);
}
function bersihkanBadgeNotifPalsu() {
  var b = document.querySelector('.topbar-notif-badge');
  if (b && b.parentNode) b.parentNode.removeChild(b);
}
function sinkronAriaDropdown() {
  var pasangan = [['navbar-user-tombol', 'navbar-user-dropdown'], ['topbar-user', 'topbar-dropdown']];
  for (var i = 0; i < pasangan.length; i++) {
    var el = document.getElementById(pasangan[i][0]); var dd = document.getElementById(pasangan[i][1]);
    if (el && dd) el.setAttribute('aria-expanded', dd.classList.contains('tampil') ? 'true' : 'false');
  }
}
function terapkanAksesibilitasDasar() {
  var toast = document.getElementById('toast-container');
  if (toast) { toast.setAttribute('aria-live', 'polite'); toast.setAttribute('aria-atomic', 'false'); }
  var label = { 'navbar-menu': 'Menu utama', 'sidebar-menu': 'Menu panel', 'bottom-nav-admin': 'Navigasi bawah' };
  for (var id in label) {
    if (!label.hasOwnProperty(id)) continue;
    var el = document.getElementById(id);
    if (el && !el.getAttribute('aria-label')) el.setAttribute('aria-label', label[id]);
  }
  var dm = document.querySelector('#drawer .drawer-menu'); if (dm) dm.setAttribute('aria-label', 'Menu seluler');
  var drawer = document.getElementById('drawer'); if (drawer) drawer.setAttribute('aria-hidden', 'true');
  var td = document.getElementById('tombol-drawer'); if (td) { td.setAttribute('aria-expanded', 'false'); td.setAttribute('aria-controls', 'drawer'); }
  var muat = document.querySelector('#app .loading-box'); if (muat) { muat.setAttribute('role', 'status'); muat.setAttribute('aria-live', 'polite'); }
  var app = document.getElementById('app'); if (app) { app.setAttribute('tabindex', '-1'); app.style.outline = 'none'; }
  var tu = document.getElementById('navbar-user-tombol'); if (tu) { tu.setAttribute('aria-haspopup', 'menu'); tu.setAttribute('aria-expanded', 'false'); }
  var tp = document.getElementById('topbar-user');
  if (tp) {
    tp.setAttribute('role', 'button'); tp.setAttribute('tabindex', '0'); tp.setAttribute('aria-haspopup', 'menu'); tp.setAttribute('aria-expanded', 'false');
    tp.setAttribute('aria-label', 'Menu pengguna');
    tp.addEventListener('keydown', function (e) { if (e.target === tp && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); tp.click(); } });
  }
  document.addEventListener('click', function () { setTimeout(sinkronAriaDropdown, 0); });
}

function inisialisasi() {
  logDebug('ELKAROM v' + KONFIG.VERSI + ' dimulai.');
  muatTemaTersimpan(); muatStateSidebar(); ambilSesiTersimpan(); perbaruiNavbar();
  muatCachePengaturan(); terapkanAksesibilitasDasar(); bersihkanBadgeNotifPalsu();
  pasangEventNavbar(); pasangEventAdmin(); pasangEventScrollNavbar();
  window.addEventListener('hashchange', tanganiRute);
  tanganiRute();
  renderMenuSidebar();
  muatPengaturanPublik();
  if (STATE.token) {
    panggilApi('verifikasiToken', { token: STATE.token }, 'POST').then(function (respon) {
      // Gangguan jaringan bukan alasan untuk logout: pertahankan sesi.
      if (respon && respon.jaringan) { logDebug('Verifikasi token ditunda (offline).'); return; }
      if (!respon || !respon.sukses) {
        hapusSesi(); renderMenuSidebar();
        if (adalahRuteTerlindungi(STATE.halamanAktif || '')) window.location.hash = '#/login'; else aturModeLayout();
        return;
      }
      if (respon.data && respon.data.pengguna) {
        var roleLama = ambilRoleSaatIni();
        STATE.pengguna = respon.data.pengguna;
        try { localStorage.setItem(KONFIG.STORAGE_PENGGUNA, JSON.stringify(STATE.pengguna)); } catch (e) {}
        perbaruiNavbar(); renderMenuSidebar();
        if (roleLama !== ambilRoleSaatIni() && adalahRuteTerlindungi(STATE.halamanAktif || '')) tanganiRute();
      }
    });
  } else { panggilApi('ping', {}, 'GET').then(function (respon) { logDebug('Ping GAS:', respon); }); }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inisialisasi);
else inisialisasi();

/* ---- Ekspor untuk handler inline (onclick/oninput/onsubmit) ---- */
window.aksiCetakKTS = aksiCetakKTS;
window.aksiCetakTerpilih = aksiCetakTerpilih;
window.aksiResetGrupPengaturan = aksiResetGrupPengaturan;
window.aksiUbahStatusPapanInfo = aksiUbahStatusPapanInfo;
window.exportCSV = exportCSV;
window.exportExcel = exportExcel;
window.exportPDF = exportPDF;
window.gantiTabPengaturan = gantiTabPengaturan;
window.gantiTabProfil = gantiTabProfil;
window.hapusFoto = hapusFoto;
window.hapusPapanInfoProses = hapusPapanInfoProses;
window.hapusSantriProses = hapusSantriProses;
window.konfirmasiHapusPapanInfo = konfirmasiHapusPapanInfo;
window.konfirmasiHapusSantri = konfirmasiHapusSantri;
window.muatPapanInfo = muatPapanInfo;
window.muatPengaturanAdmin = muatPengaturanAdmin;
window.muatSantri = muatSantri;
window.onZoomSliderChange = onZoomSliderChange;
window.pilihFileFoto = pilihFileFoto;
window.pilihTahunAjaran = pilihTahunAjaran;
window.prosesResetGrupPengaturan = prosesResetGrupPengaturan;
window.prosesUbahStatusPapanInfo = prosesUbahStatusPapanInfo;
window.renderModalTambah = renderModalTambah;
window.resetCrop = resetCrop;
window.resetFilterSantri = resetFilterSantri;
window.setFilterPapanInfo = setFilterPapanInfo;
window.setFilterSantri = setFilterSantri;
window.setSortSantri = setSortSantri;
window.simpanCrop = simpanCrop;
window.submitFormGrupPengaturan = submitFormGrupPengaturan;
window.submitFormPapanInfo = submitFormPapanInfo;
window.submitFormSantri = submitFormSantri;
window.toggleDropdownFilter = toggleDropdownFilter;
window.toggleSemuaCheckbox = toggleSemuaCheckbox;
window.tutupCrop = tutupCrop;
window.tutupModal = tutupModal;
window.zoomInCrop = zoomInCrop;
window.zoomOutCrop = zoomOutCrop;
window.SIP = { versi: KONFIG.VERSI };
})();
