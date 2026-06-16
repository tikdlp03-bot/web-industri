/* ==========================================================================
   1. KALKULATOR ESTIMASI BIAYA OTOMATIS (B2B SIMULATION)
   ========================================================================== */

// Daftar harga standar per unit komponen (dalam USD atau Rupiah)
const HARGA_KOMPONEN = {
    gear: 150000,    /* Heavy Duty Spur Gear */
    shaft: 250000,   /* Hydraulic Piston Shaft */
    bracket: 75000,  /* Custom Mounting Bracket */
    custom: 300000   /* Kustomisasi Komponen */
};

function hitungEstimasi() {
    // Ambil nilai dari input produk dan jumlah
    const produkTerpilih = document.getElementById('jenis_produk').value;
    const jumlahInput = document.getElementById('jumlah').value;
    
    // Validasi: pastikan jumlah adalah angka dan lebih dari 0
    const jumlah = parseInt(jumlahInput) || 0;

    if (jumlah > 0) {
        // Hitung total harga
        const hargaPerUnit = HARGA_KOMPONEN[produkTerpilih];
        const totalEstimasi = hargaPerUnit * jumlah;

        // Format angka ke mata uang Rupiah (IDR)
        const formatRupiah = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(totalEstimasi);

        // Tampilkan hasil ke layar
        document.getElementById('info-estimasi').innerHTML = 
            `<strong>Estimasi Awal Biaya:</strong> ${formatRupiah} <br>` +
            `<small>*Harga final resmi akan dikirimkan via email setelah verifikasi tim Procurement.</small>`;
    } else {
        document.getElementById('info-estimasi').innerHTML = '';
    }
}

// Pasang fungsi hitungEstimasi agar berjalan otomatis setiap kali user mengubah input
document.getElementById('jenis_produk').addEventListener('change', hitungEstimasi);
document.getElementById('jumlah').addEventListener('input', hitungEstimasi);


/* ==========================================================================
   2. VALIDASI & NOTIFIKASI FORMULIR RFQ
   ========================================================================== */

const formPenawaran = document.querySelector('#penawaran form');

formPenawaran.addEventListener('submit', function(event) {
    // Menghentikan reload halaman bawaan browser agar proses simulasi terlihat
    event.preventDefault(); 

    // Ambil data dari input untuk diproses/ditampilkan
    const namaPerusahaan = document.getElementById('nama_perusahaan').value;
    const emailBisnis = document.getElementById('email_proyek').value;

    // Tampilkan notifikasi sukses yang profesional kepada user
    alert(`Terima kasih, ${namaPerusahaan}!\n\nPermintaan penawaran harga (RFQ) telah kami terima. Proposal resmi akan dikirimkan ke email: ${emailBisnis} dalam waktu maksimal 1x24 jam.`);

    // Kosongkan kembali formulir setelah berhasil dikirim
    formPenawaran.reset();
    document.getElementById('info-estimasi').innerHTML = ''; 
});