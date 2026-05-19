// ============================================
// CHATBOT AI - GROQ API
// Ganti API_KEY dengan key baru dari console.groq.com
// ============================================

const GROQ_API_KEY = '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';
const GROQ_MODEL = 'llama-3.1-8b-instant';

let dynamicData = { program: [], ekskul: [], berita: [], fasilitas: [] };

async function loadDynamicData() {
    try {
        if (!window.supabaseClient) return;
        const [program, ekskul, berita, fasilitas] = await Promise.all([
            window.supabaseClient.from('program').select('judul, deskripsi').eq('aktif', true).order('urutan'),
            window.supabaseClient.from('ekskul').select('nama, deskripsi').eq('aktif', true).order('urutan'),
            window.supabaseClient.from('berita').select('judul, tanggal').order('tanggal', { ascending: false }).limit(5),
            window.supabaseClient.from('fasilitas').select('nama, deskripsi').eq('aktif', true).order('urutan')
        ]);
        if (program.data) dynamicData.program = program.data;
        if (ekskul.data) dynamicData.ekskul = ekskul.data;
        if (berita.data) dynamicData.berita = berita.data;
        if (fasilitas.data) dynamicData.fasilitas = fasilitas.data;
    } catch (e) { console.log('Dynamic data error:', e); }
}

function buildSystemPrompt() {
    const programList = dynamicData.program.length > 0
        ? dynamicData.program.map(p => `- ${p.judul}${p.deskripsi ? ': ' + p.deskripsi : ''}`).join('\n')
        : '- (belum ada data program)';

    const ekskulList = dynamicData.ekskul.length > 0
        ? dynamicData.ekskul.map(e => `- ${e.nama}${e.deskripsi ? ': ' + e.deskripsi : ''}`).join('\n')
        : '- Karate, Tilawah, Kaligrafi, Pencak Silat, Robotik & IT, Renang, Kriya, Pramuka';

    const fasilitasList = dynamicData.fasilitas.length > 0
        ? dynamicData.fasilitas.map(f => `- ${f.nama}${f.deskripsi ? ': ' + f.deskripsi : ''}`).join('\n')
        : '- Ruang Kelas, Lab, Perpustakaan, Lapangan, Masjid, Aula';

    const beritaList = dynamicData.berita.length > 0
        ? dynamicData.berita.map(b => `- ${b.judul} (${new Date(b.tanggal).toLocaleDateString('id-ID')})`).join('\n')
        : '- (belum ada berita)';

    return `Kamu adalah asisten virtual resmi SDIT Al-Madinah Kebumen. Jawab berdasarkan data berikut saja. Gunakan bahasa Indonesia yang ramah dan sopan. Jawab singkat dan jelas. Jika tidak ada datanya, arahkan ke WhatsApp 085113253248.

=== PROFIL SEKOLAH ===
Nama: SDIT Al-Madinah Kebumen
Yayasan: Pendidikan Integral Hidayatullah
Alamat: Jl. Tentara Pelajar No.48, Kutosari, Kec. Kebumen, Kab. Kebumen, Jawa Tengah 54317
WhatsApp: 085113253248
Email: info@sdit-almadinah.sch.id
Instagram: @sditalmadinahkebumen
YouTube: @sditalmadinahkebumen
Facebook: fb.sditalmadinahkebumen
Jam Operasional: Senin-Jumat 08.00-17.00 WIB

=== VISI & MISI ===
Visi: Menciptakan generasi Qur'ani yang unggul, berakhlak mulia, dan berprestasi.
Misi:
1. Mengintegrasikan Kurikulum: Menggabungkan kurikulum nasional dengan nilai-nilai Islam (kurikulum terpadu) untuk menghadapi tantangan global.
2. Membentuk Akhlak Mulia: Menanamkan pendidikan agama yang intensif guna membentuk karakter yang berakhlaqul karimah.
3. Menciptakan Lingkungan Belajar: Membangun suasana belajar yang dialogis, harmonis, kekeluargaan, dan kreatif.
4. Mengembangkan Potensi: Meningkatkan mutu akademik dan non-akademik melalui berbagai ekstrakurikuler serta program bakat minat.
5. Pendidikan Berbasis Lingkungan: Menggunakan lingkungan sekolah yang hijau dan asri sebagai sarana belajar yang nyaman.

=== PROGRAM UNGGULAN ===
${programList}

=== EKSTRAKURIKULER ===
${ekskulList}

=== FASILITAS SEKOLAH ===
${fasilitasList}

=== BERITA TERBARU ===
${beritaList}

=== PPDB 2025/2026 ===
Pendaftaran: 1 Juni - 30 Juni 2025
Pengumuman: 5 Juli 2025
Daftar Ulang: 10-15 Juli 2025
Biaya Pendaftaran: Rp 500.000
Dokumen: KK, Akta Kelahiran, Ijazah SD/MI, Pas Foto 3x4
Langkah: Isi formulir online → Verifikasi admin → Upload dokumen → Bayar → Tunggu pengumuman → Daftar ulang

=== PORTAL SISWA ===
Login: NISN sebagai username + password dari pendaftaran
Fitur: Data profil, Upload dokumen (KK, Akta, Ijazah, Foto), Pembayaran biaya pendaftaran`;
}

let chatHistory = [];
let isChatOpen = false;

function createChatbotUI() {
    const html = `
        <div id="chatbot-container" style="position:fixed;bottom:95px;right:25px;z-index:9998;font-family:'Segoe UI',Arial,sans-serif;">
            <div id="chat-window" style="display:none;width:340px;height:480px;background:white;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.2);flex-direction:column;overflow:hidden;margin-bottom:10px;">
                <div style="background:linear-gradient(135deg,#ff6b6b,#ff8c8c);padding:15px 18px;display:flex;align-items:center;justify-content:space-between;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="width:36px;height:36px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;">🤖</div>
                        <div>
                            <div style="color:white;font-weight:700;font-size:14px;">Asisten SDIT Al-Madinah</div>
                            <div style="color:rgba(255,255,255,0.85);font-size:11px;">Powered by Groq AI</div>
                        </div>
                    </div>
                    <button onclick="toggleChat()" style="background:rgba(255,255,255,0.2);border:none;color:white;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:14px;">✕</button>
                </div>
                <div id="chat-messages" style="flex:1;overflow-y:auto;padding:15px;display:flex;flex-direction:column;gap:10px;background:#f8f9fa;"></div>
                <div id="quick-btns" style="padding:8px 12px;background:#f8f9fa;display:flex;flex-wrap:wrap;gap:6px;border-top:1px solid #eee;">
                    <button onclick="quickAsk('PPDB')" style="background:white;border:1px solid #ff6b6b;color:#ff6b6b;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;">📋 PPDB</button>
                    <button onclick="quickAsk('ekskul')" style="background:white;border:1px solid #ff6b6b;color:#ff6b6b;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;">🏃 Ekskul</button>
                    <button onclick="quickAsk('fasilitas')" style="background:white;border:1px solid #ff6b6b;color:#ff6b6b;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;">🏫 Fasilitas</button>
                    <button onclick="quickAsk('lokasi sekolah')" style="background:white;border:1px solid #ff6b6b;color:#ff6b6b;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;">📍 Lokasi</button>
                    <button onclick="quickAsk('kontak')" style="background:white;border:1px solid #ff6b6b;color:#ff6b6b;padding:5px 10px;border-radius:15px;font-size:11px;cursor:pointer;">� Kontak</button>
                </div>
                <div style="padding:10px 12px;background:white;border-top:1px solid #eee;display:flex;gap:8px;">
                    <input id="chat-input" type="text" placeholder="Ketik pertanyaan..."
                        style="flex:1;padding:9px 14px;border:1px solid #e0e0e0;border-radius:25px;font-size:13px;outline:none;"
                        onkeypress="if(event.key==='Enter')sendMessage()"
                        onfocus="this.style.borderColor='#ff6b6b'" onblur="this.style.borderColor='#e0e0e0'">
                    <button onclick="sendMessage()" id="send-btn" style="background:linear-gradient(135deg,#ff6b6b,#ff8c8c);border:none;color:white;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:15px;flex-shrink:0;">➤</button>
                </div>
            </div>
            <button onclick="toggleChat()" style="background:linear-gradient(135deg,#ff6b6b,#ff8c8c);border:none;color:white;width:52px;height:52px;border-radius:50%;cursor:pointer;font-size:24px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 15px rgba(255,107,107,0.5);float:right;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">🤖</button>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', html);
    addMessage(`Assalamu'alaikum! 👋 Saya asisten virtual SDIT Al-Madinah Kebumen.\n\nAda yang bisa saya bantu?`, false);
}

function toggleChat() {
    const win = document.getElementById('chat-window');
    isChatOpen = !isChatOpen;
    win.style.display = isChatOpen ? 'flex' : 'none';
    if (isChatOpen) document.getElementById('chat-input').focus();
}

function addMessage(text, isUser = false) {
    const messages = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.style.cssText = `padding:10px 14px;border-radius:${isUser ? '12px 12px 4px 12px' : '12px 12px 12px 4px'};font-size:13px;color:${isUser ? 'white' : '#333'};max-width:88%;box-shadow:0 1px 3px rgba(0,0,0,0.08);line-height:1.6;align-self:${isUser ? 'flex-end' : 'flex-start'};background:${isUser ? 'linear-gradient(135deg,#ff6b6b,#ff8c8c)' : 'white'};white-space:pre-wrap;word-break:break-word;`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function quickAsk(topic) {
    document.getElementById('chat-input').value = topic;
    sendMessage();
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    addMessage(text, true);
    chatHistory.push({ role: 'user', content: text });

    const sendBtn = document.getElementById('send-btn');
    sendBtn.disabled = true;

    const messages = document.getElementById('chat-messages');
    const typing = document.createElement('div');
    typing.id = 'typing';
    typing.style.cssText = 'padding:10px 14px;border-radius:12px 12px 12px 4px;font-size:13px;color:#999;background:white;max-width:85%;box-shadow:0 1px 3px rgba(0,0,0,0.08);';
    typing.textContent = '⏳ Sedang mengetik...';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: [{ role: 'system', content: buildSystemPrompt() }, ...chatHistory],
                max_tokens: 500,
                temperature: 0.7
            })
        });

        document.getElementById('typing')?.remove();

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || 'API error ' + response.status);
        }

        const data = await response.json();
        const reply = data.choices[0].message.content;
        addMessage(reply, false);
        chatHistory.push({ role: 'assistant', content: reply });
        if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

    } catch (error) {
        document.getElementById('typing')?.remove();
        console.error('Chatbot error:', error);

        // Fallback ke rule-based jika API error
        const lower = text.toLowerCase();
        let fallback = '';
        if (lower.includes('ppdb') || lower.includes('daftar')) {
            fallback = 'Pendaftaran PPDB 2025/2026:\n• 1 Juni - 30 Juni 2025\n• Biaya: Rp 500.000\n• Dokumen: KK, Akta, Ijazah, Foto 3x4\n\nInfo: 085113253248';
        } else if (lower.includes('ekskul')) {
            fallback = 'Ekstrakurikuler: Karate, Tilawah, Kaligrafi, Pencak Silat, Robotik & IT, Renang, Kriya, Pramuka\n\nInfo: 085113253248';
        } else if (lower.includes('fasilitas')) {
            fallback = 'Fasilitas: Ruang Kelas AC, Lab IPA/Komputer, Perpustakaan, Lapangan, Masjid, Aula\n\nInfo: 085113253248';
        } else if (lower.includes('lokasi') || lower.includes('alamat')) {
            fallback = 'Alamat: Jl. Tentara Pelajar No.48, Kutosari, Kebumen, Jawa Tengah 54317\n\nWhatsApp: 085113253248';
        } else if (lower.includes('kontak') || lower.includes('hubungi')) {
            fallback = 'Kontak:\n📞 WA: 085113253248\n📧 info@sdit-almadinah.sch.id\n📸 @sditalmadinahkebumen\n⏰ Senin-Jumat 08.00-17.00';
        } else {
            fallback = 'Maaf, saya sedang mengalami gangguan. Silakan hubungi kami:\n📞 WhatsApp: 085113253248\n⏰ Senin-Jumat, 08.00-17.00 WIB';
        }
        addMessage(fallback, false);
    } finally {
        sendBtn.disabled = false;
        input.focus();
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadDynamicData();
    createChatbotUI();
});
