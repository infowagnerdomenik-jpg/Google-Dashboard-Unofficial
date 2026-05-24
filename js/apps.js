const apps = [
    { id: 'search', url: 'https://www.google.com', icon: 'google_search.svg', en: 'Search', de: 'Suche' },
    { id: 'calendar', url: 'https://calendar.google.com', icon: 'google_calendar.svg', en: 'Calendar', de: 'Kalender' },
    { id: 'chat', url: 'https://chat.google.com', icon: 'google_chat.svg', en: 'Chat', de: 'Chat' },
    { id: 'contacts', url: 'https://contacts.google.com', icon: 'google_contacts.svg', en: 'Contacts', de: 'Kontakte' },
    { 
        id: 'docs', 
        url: 'https://docs.google.com', 
        intent: 'intent://#Intent;component=com.google.android.apps.docs.editors.docs/com.google.android.apps.docs.app.NewMainProxyActivity;action=android.intent.action.MAIN;launchFlags=0x10000000;end',
        icon: 'google_docs.svg', en: 'Docs', de: 'Docs' 
    },
    { id: 'drive', url: 'https://drive.google.com', icon: 'google_drive.svg', en: 'Drive', de: 'Drive' },
    { id: 'forms', url: 'https://docs.google.com/forms', icon: 'google_forms.svg', en: 'Forms', de: 'Forms' },
    { id: 'gemini', url: 'https://gemini.google.com', icon: 'google_gemini.svg', en: 'Gemini', de: 'Gemini' },
    { id: 'gmail', url: 'https://mail.google.com', icon: 'google_gmail.svg', en: 'Gmail', de: 'Gmail' },
    { id: 'keep', url: 'https://keep.google.com', icon: 'google_keep.svg', en: 'Keep', de: 'Notizen' },
    { id: 'maps', url: 'https://maps.google.com', icon: 'google_maps.svg', en: 'Maps', de: 'Maps' },
    { id: 'meet', url: 'https://meet.google.com', icon: 'google_meet.svg', en: 'Meet', de: 'Meet' },
    { id: 'messages', url: 'https://messages.google.com/web', icon: 'google_messages.svg', en: 'Messages', de: 'Messages' },
    { id: 'news', url: 'https://news.google.com', icon: 'google_news.svg', en: 'News', de: 'News' },
    { id: 'notebooklm', url: 'https://notebooklm.google.com', icon: 'google_notebooklm.svg', en: 'NotebookLM', de: 'NotebookLM', class: 'icon-bg-white' },
    { id: 'one', url: 'https://one.google.com', icon: 'google_one.svg', en: 'One', de: 'One' },
    { 
        id: 'password_manager', 
        url: 'https://passwords.google.com', 
        icon: 'google_password_manager.svg', 
        en: 'Password Manager', 
        de: 'Passwort-Manager' 
    },
    { 
        id: 'photos', 
        url: 'https://photos.google.com', 
        intent: 'intent://#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;package=com.google.android.apps.photos;launchFlags=0x10000000;end',
        icon: 'google_photos.svg', en: 'Photos', de: 'Fotos' 
    },
    { id: 'playbooks', url: 'https://play.google.com/books', icon: 'google_play_books.svg', en: 'Play Books', de: 'Play Books' },
    { 
        id: 'sheets', 
        url: 'https://sheets.google.com', 
        intent: 'intent://#Intent;component=com.google.android.apps.docs.editors.sheets/com.google.android.apps.docs.app.NewMainProxyActivity;action=android.intent.action.MAIN;launchFlags=0x10000000;end',
        icon: 'google_sheets.svg', en: 'Sheets', de: 'Tabellen' 
    },
    { 
        id: 'slides', 
        url: 'https://slides.google.com', 
        intent: 'intent://#Intent;component=com.google.android.apps.docs.editors.slides/com.google.android.apps.docs.app.NewMainProxyActivity;action=android.intent.action.MAIN;launchFlags=0x10000000;end',
        icon: 'google_slides.svg', en: 'Slides', de: 'Slides' 
    },
    { id: 'tasks', url: 'https://tasks.google.com', icon: 'google_tasks.svg', en: 'Tasks', de: 'Tasks' },
    { id: 'translate', url: 'https://translate.google.com', icon: 'google_translate.svg', en: 'Translate', de: 'Übersetzer' },
    { id: 'youtube', url: 'https://youtube.com', icon: 'youtube.svg', en: 'YouTube', de: 'YouTube' },
    { id: 'ytmusic', url: 'https://music.youtube.com', icon: 'youtube_music.svg', en: 'YT Music', de: 'YT Music' }
];

// Funktion zum Starten der Apps
function launchApp(url, intent) {
    const isAndroid = /Android/i.test(navigator.userAgent);
    if (isAndroid && intent) {
        // Versuch, Intent zu starten
        window.location.href = intent;
        // Fallback: Wenn App nicht reagiert, nach 1,5s Web-URL öffnen
        setTimeout(() => {
            window.location.href = url;
        }, 1500);
    } else {
        window.open(url, '_blank');
    }
}

function renderApps() {
    const lang = navigator.language.startsWith('de') ? 'de' : 'en';
    const grid = document.getElementById('app-grid');
    
    // Suche (Prio 1) extrahieren
    const searchApp = apps.find(a => a.id === 'search');
    const others = apps.filter(a => a.id !== 'search');

    // Rest alphabetisch sortieren nach aktiver Sprache
    others.sort((a, b) => a[lang].localeCompare(b[lang]));

    const sortedApps = [searchApp, ...others];

    grid.innerHTML = sortedApps.map(app => {
        // Wir nutzen nun onclick statt href für bessere Kompatibilität mit Android-Intents
        return `
            <div class="app-item" onclick="launchApp('${app.url}', '${app.intent || ''}')" style="cursor: pointer;">
                <div class="icon-wrapper ${app.class || ''}">
                    <img src="icons/${app.icon}" alt="${app[lang]}">
                </div>
                <div class="app-name">${app[lang]}</div>
            </div>
        `;
    }).join('');
}

window.addEventListener('DOMContentLoaded', renderApps);
