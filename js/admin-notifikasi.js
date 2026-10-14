// ===== ADMIN NOTIFIKASI =====
// Realtime + Polling fallback (tiap 15 detik)

const NOTIF_KEY   = 'admin_notif';
const LAST_PPDB   = 'notif_last_ppdb';
const LAST_KONTAK = 'notif_last_kontak';

let notifList = JSON.parse(localStorage.getItem(NOTIF_KEY) || '[]');

// ── Auto-inject bell ke content-header jika belum ada ──
(function injectBell() {
    if (document.getElementById('notif-btn')) return;
    const header = document.querySelector('.content-header');
    if (!header) return;

    // Cari elemen paling kanan di header (span admin-name atau yang ada)
    const rightEl = header.querySelector('#admin-name') || header.lastElementChild;

    const wrapper = document.createElement('div');
    wrapper.className = 'notif-wrapper';
    wrapper.innerHTML = `
        <button class="notif-btn" id="notif-btn" onclick="toggleNotif()">
            🔔
            <span class="notif-badge" id="notif-badge" style="display:none;">0</span>
        </button>
        <div class="notif-dropdown" id="notif-dropdown" style="display:none;">
            <div class="notif-header">
                <span>Notifikasi</span>
                <button onclick="clearNotif()" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:12px;font-weight:600;">Hapus Semua</button>
            </div>
            <div id="notif-list"></div>
        </div>`;

    if (rightEl) {
        header.insertBefore(wrapper, rightEl);
    } else {
        header.appendChild(wrapper);
    }

    // Wrap header children in flex if needed
    header.style.cssText += ';display:flex;align-items:center;justify-content:space-between;gap:12px;';
})();

// ── Storage helpers ──
function saveNotif() {
    if (notifList.length > 60) notifList = notifList.slice(0, 60);
    localStorage.setItem(NOTIF_KEY, JSON.stringify(notifList));
}

function isDuplicate(id, type) {
    return notifList.some(n => n.refId === id && n.type === type);
}

function addNotif(item) {
    if (isDuplicate(item.refId, item.type)) return; // skip duplikat
    notifList.unshift(item);
    saveNotif();
    renderNotif();
    showToast(item);
    playSound();
}

// ── Render bell & dropdown ──
function renderNotif() {
    const list  = document.getElementById('notif-list');
    const badge = document.getElementById('notif-badge');
    if (!list || !badge) return;

    const unread = notifList.filter(n => !n.read).length;
    badge.textContent = unread > 9 ? '9+' : unread;
    badge.style.display = unread > 0 ? 'flex' : 'none';

    if (notifList.length === 0) {
        list.innerHTML = '<div class="notif-empty">Belum ada notifikasi</div>';
        return;
    }

    list.innerHTML = notifList.slice(0, 25).map((n, i) => `
        <div class="notif-item ${n.read ? '' : 'unread'}"
             onclick="markRead(${i}); window.location.href='${n.url}'">
            <div class="notif-icon">${n.icon}</div>
            <div class="notif-content">
                <div class="notif-title">${n.title}</div>
                <div class="notif-desc">${n.desc}</div>
                <div class="notif-time">${timeAgo(n.time)}</div>
            </div>
        </div>`).join('');
}

function markRead(i) {
    if (notifList[i]) { notifList[i].read = true; saveNotif(); renderNotif(); }
}

function toggleNotif() {
    const dd = document.getElementById('notif-dropdown');
    const open = dd.style.display !== 'none';
    dd.style.display = open ? 'none' : 'block';
    if (!open) {
        notifList.forEach(n => n.read = true);
        saveNotif(); renderNotif();
    }
}

function clearNotif() {
    notifList = [];
    saveNotif(); renderNotif();
    const dd = document.getElementById('notif-dropdown');
    if (dd) dd.style.display = 'none';
}

document.addEventListener('click', e => {
    const w = document.querySelector('.notif-wrapper');
    if (w && !w.contains(e.target)) {
        const dd = document.getElementById('notif-dropdown');
        if (dd) dd.style.display = 'none';
    }
});

function timeAgo(iso) {
    const s = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (s < 60)    return 'Baru saja';
    if (s < 3600)  return Math.floor(s/60) + ' menit lalu';
    if (s < 86400) return Math.floor(s/3600) + ' jam lalu';
    return Math.floor(s/86400) + ' hari lalu';
}

// ── Toast (kotak kecil pojok kanan bawah, bukan popup browser) ──
function showToast(n) {
    const t = document.createElement('div');
    t.className = 'notif-toast';
    t.innerHTML = `
        <div style="font-size:22px;flex-shrink:0">${n.icon}</div>
        <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px;color:#1e293b">${n.title}</div>
            <div style="font-size:12px;color:#6b7280;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${n.desc}</div>
        </div>
        <button onclick="this.parentElement.remove()" style="background:none;border:none;color:#9ca3af;cursor:pointer;font-size:16px;padding:0 4px;">×</button>`;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 6000);
    t.addEventListener('click', e => {
        if (e.target.tagName !== 'BUTTON') { t.remove(); window.location.href = n.url; }
    });
}

function playSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = 880;
        g.gain.setValueAtTime(0.25, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        o.start(); o.stop(ctx.currentTime + 0.5);
    } catch(e) {}
}

// ── POLLING (tiap 15 detik) — tidak butuh Realtime aktif ──
async function pollNewData() {
    if (!window.supabaseClient) return;

    const lastPpdb   = localStorage.getItem(LAST_PPDB)   || new Date(Date.now() - 60000).toISOString();
    const lastKontak = localStorage.getItem(LAST_KONTAK)  || new Date(Date.now() - 60000).toISOString();

    try {
        // Cek PPDB baru
        const { data: ppdbNew } = await window.supabaseClient
            .from('ppdb')
            .select('id, nama, nisn, no_pendaftaran, created_at')
            .gt('created_at', lastPpdb)
            .order('created_at', { ascending: true });

        if (ppdbNew && ppdbNew.length > 0) {
            ppdbNew.forEach(d => {
                addNotif({
                    type:  'ppdb',
                    refId: String(d.id),
                    icon:  '📋',
                    title: 'Pendaftar PPDB Baru',
                    desc:  `${d.nama} (NISN: ${d.nisn || '-'}) baru saja mendaftar`,
                    url:   'ppdb.html',
                    time:  d.created_at || new Date().toISOString(),
                    read:  false
                });
            });
            localStorage.setItem(LAST_PPDB, ppdbNew[ppdbNew.length - 1].created_at);
        }

        // Cek Kontak baru
        const { data: kontakNew } = await window.supabaseClient
            .from('kontak')
            .select('id, nama, pesan, created_at')
            .gt('created_at', lastKontak)
            .order('created_at', { ascending: true });

        if (kontakNew && kontakNew.length > 0) {
            kontakNew.forEach(d => {
                addNotif({
                    type:  'kontak',
                    refId: String(d.id),
                    icon:  '✉️',
                    title: 'Pesan Kontak Baru',
                    desc:  `${d.nama || 'Seseorang'}: "${(d.pesan || '').substring(0, 55)}..."`,
                    url:   'kontak.html',
                    time:  d.created_at || new Date().toISOString(),
                    read:  false
                });
            });
            localStorage.setItem(LAST_KONTAK, kontakNew[kontakNew.length - 1].created_at);
        }

    } catch(e) {
        console.warn('Polling notif error:', e.message);
    }
}

// ── REALTIME (bonus — kalau Supabase Realtime aktif) ──
function initRealtime() {
    if (!window.supabaseClient) { setTimeout(initRealtime, 800); return; }

    window.supabaseClient
        .channel('admin-ppdb-rt')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'ppdb' }, p => {
            const d = p.new;
            addNotif({
                type: 'ppdb', refId: String(d.id), icon: '📋',
                title: 'Pendaftar PPDB Baru',
                desc: `${d.nama} (NISN: ${d.nisn || '-'}) baru saja mendaftar`,
                url: 'ppdb.html', time: new Date().toISOString(), read: false
            });
        })
        .subscribe(status => {
            if (status === 'SUBSCRIBED') console.log('✅ Realtime PPDB aktif');
        });

    window.supabaseClient
        .channel('admin-kontak-rt')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'kontak' }, p => {
            const d = p.new;
            addNotif({
                type: 'kontak', refId: String(d.id), icon: '✉️',
                title: 'Pesan Kontak Baru',
                desc: `${d.nama || 'Seseorang'}: "${(d.pesan || '').substring(0, 55)}..."`,
                url: 'kontak.html', time: new Date().toISOString(), read: false
            });
        })
        .subscribe(status => {
            if (status === 'SUBSCRIBED') console.log('✅ Realtime Kontak aktif');
        });
}

// ── INIT ──
function startNotif() {
    if (!window.supabaseClient) { setTimeout(startNotif, 500); return; }
    renderNotif();
    pollNewData();                        // cek langsung saat load
    setInterval(pollNewData, 15000);     // polling tiap 15 detik
    initRealtime();                       // plus realtime kalau aktif
}

startNotif();
