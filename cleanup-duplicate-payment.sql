-- ============================================
-- CLEANUP DUPLICATE PAYMENT RECORDS
-- Jalankan di Supabase SQL Editor
-- ============================================

-- Hapus record duplikat, keep yang paling baru saja
DELETE FROM siswa_pembayaran
WHERE id NOT IN (
    SELECT MAX(id)
    FROM siswa_pembayaran
    GROUP BY ppdb_id, jenis_pembayaran
);

-- Cek hasil
SELECT ppdb_id, jenis_pembayaran, status, COUNT(*) as jumlah
FROM siswa_pembayaran
GROUP BY ppdb_id, jenis_pembayaran, status
ORDER BY ppdb_id, jenis_pembayaran;

-- ============================================
-- SELESAI!
-- Sekarang setiap siswa hanya punya 1 record per jenis pembayaran
-- ============================================
