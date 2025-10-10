# Job App untuk Disabilitas & Lansia

Proyek ini adalah platform pencarian kerja yang dirancang khusus untuk penyandang disabilitas dan lansia, menghubungkan mereka dengan perusahaan yang menyediakan lingkungan kerja yang inklusif.

## Cara Menjalankan Aplikasi

### Prasyarat

Pastikan Anda telah menginstal perangkat lunak berikut di sistem Anda:
- [Node.js](https://nodejs.org/) (v18 atau lebih baru)
- [Docker](https://www.docker.com/get-started) dan Docker Compose
- [Git](https://git-scm.com/)

### 1. Clone Repository

```bash
git clone <URL_REPOSITORY_ANDA>
cd job-app-disabilitas
```

### 2. Setup Database

Aplikasi ini menggunakan MySQL yang dijalankan melalui Docker.

1.  Buka terminal di direktori root proyek.
2.  Jalankan perintah berikut untuk memulai kontainer database:

    ```bash
    docker-compose up -d
    ```
    Ini akan membuat database bernama `job_app_db` dengan kredensial yang ada di `docker-compose.yml`.

### 3. Setup Backend

1.  Buka terminal baru dan navigasi ke direktori `backend`.

    ```bash
    cd backend
    ```

2.  Install semua dependensi yang dibutuhkan.

    ```bash
    npm install
    ```

3.  Buat file `.env` di dalam direktori `backend` dan salin konten dari `.env.example` (jika ada) atau gunakan konfigurasi berikut. Pastikan `DATABASE_URL` sesuai dengan konfigurasi di `docker-compose.yml`.

    ```env
    DATABASE_URL="mysql://jobapp:password@localhost:3306/job_app_db"
    JWT_SECRET="GANTI_DENGAN_RAHASIA_ANDA"
    ```

4.  Jalankan migrasi database menggunakan Prisma untuk membuat skema tabel.

    ```bash
    npx prisma migrate dev
    ```

5.  Jalankan server backend.

    ```bash
    npm run dev
    ```
    Server akan berjalan di `http://localhost:5000` (atau port lain sesuai konfigurasi).

### 4. Setup Frontend

1.  Buka terminal baru dan navigasi ke direktori `frontend`.

    ```bash
    cd frontend
    ```

2.  Install semua dependensi yang dibutuhkan.

    ```bash
    npm install
    ```

3.  Jalankan server pengembangan frontend.

    ```bash
    npm run dev
    ```
    Aplikasi frontend akan dapat diakses di `http://localhost:3000`.

### 5. Selesai!

Sekarang Anda dapat membuka `http://localhost:3000` di browser Anda untuk melihat aplikasi berjalan. Backend akan berkomunikasi dengan database, dan frontend akan mengambil data dari backend.

