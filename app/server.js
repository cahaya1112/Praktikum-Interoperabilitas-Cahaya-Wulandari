const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let mahasiswa = [
    {
        nim: "23001",
        nama: "Cahaya Wulandari",
        status: "Aktif"
    },
    {
        nim: "23002",
        nama: "fasaufa Fiaunila",
        status: "Aktif"
    },
    {
        nim: "23003",
        nama: "Risma Setio Mutafiroh",
        status: "Aktif"
    },
    {
        nim: "23004",
        nama: "Fahreza Huditama",
        status: "Tidak Aktif"
    }
];

// Data Buku
let buku = [
    {
        id: "B001",
        judul: "Pemrograman Dasar",
        penulis: "Andi",
        tahun: 2022
    },
    {
        id: "B002",
        judul: "Pemrograman Web",
        penulis: "Budi",
        tahun: 2023
    },
    {
        id: "B003",
        judul: "Basis Data",
        penulis: "Citra",
        tahun: 2024
    },
    {
        id: "B004",
        judul: "Sistem Operasi",
        penulis: "Dedi",
        tahun: 2021
    },
    {
        id: "B005",
        judul: "Jaringan Komputer",
        penulis: "Eka",
        tahun: 2023
    }
];

app.get("/", (req, res) => {
    res.json({
        message: "HTTP API Praktikum Interoperabilitas"
    });
});


// ==================== MAHASISWA ====================

// GET semua mahasiswa
app.get("/mahasiswa", (req, res) => {
    res.json(mahasiswa);
});

// GET mahasiswa berdasarkan NIM
app.get("/mahasiswa/:nim", (req, res) => {
    const data = mahasiswa.find(m => m.nim === req.params.nim);

    if (!data) {
        return res.status(404).json({
            message: "Mahasiswa tidak ditemukan"
        });
    }

    res.json(data);
});

// POST mahasiswa
app.post("/mahasiswa", (req, res) => {
    const dataBaru = req.body;

    mahasiswa.push(dataBaru);

    res.status(201).json({
        message: "Data mahasiswa berhasil ditambahkan",
        data: dataBaru
    });
});

// PATCH mahasiswa
app.patch("/mahasiswa/:nim", (req, res) => {
    const index = mahasiswa.findIndex(m => m && m.nim === req.params.nim);

    if (index === -1) {
        return res.status(404).json({
            message: "Mahasiswa tidak ditemukan"
        });
    }

    mahasiswa[index] = {
        ...mahasiswa[index],
        ...req.body
    };

    res.json({
        message: "Data mahasiswa berhasil diubah",
        data: mahasiswa[index]
    });
});

// DELETE mahasiswa
app.delete("/mahasiswa/:nim", (req, res) => {
    const index = mahasiswa.findIndex(m => m && m.nim === req.params.nim);

    if (index === -1) {
        return res.status(404).json({
            message: "Mahasiswa tidak ditemukan"
        });
    }

    const dataHapus = mahasiswa.splice(index, 1);

    res.json({
        message: "Data mahasiswa berhasil dihapus",
        data: dataHapus[0]
    });
});


// ==================== BUKU ====================

// GET semua buku
app.get("/buku", (req, res) => {
    res.json(buku);
});

// GET buku berdasarkan ID
app.get("/buku/:id", (req, res) => {
    const data = buku.find(b => b.id === req.params.id);

    if (!data) {
        return res.status(404).json({
            message: "Data buku tidak ditemukan"
        });
    }

    res.json(data);
});

// POST buku
app.post("/buku", (req, res) => {
    const dataBaru = req.body;

    buku.push(dataBaru);

    res.status(201).json({
        message: "Data buku berhasil ditambahkan",
        data: dataBaru
    });
});

// PATCH buku
app.patch("/buku/:id", (req, res) => {
    const index = buku.findIndex(b => b && b.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({
            message: "Data buku tidak ditemukan"
        });
    }

    buku[index] = {
        ...buku[index],
        ...req.body
    };

    res.json({
        message: "Data buku berhasil diubah",
        data: buku[index]
    });
});

// DELETE buku
app.delete("/buku/:id", (req, res) => {
    const index = buku.findIndex(b => b && b.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({
            message: "Data buku tidak ditemukan"
        });
    }

    const dataHapus = buku.splice(index, 1);

    res.json({
        message: "Data buku berhasil dihapus",
        data: dataHapus[0]
    });
});


// ==================== MENJALANKAN SERVER ====================

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});