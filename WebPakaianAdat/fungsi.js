// fungsi.js

// Fungsi untuk inisialisasi slider dan navigasi
function initSlider() {
    // Mendapatkan semua elemen yang diperlukan
    const menuBtn = document.querySelector(".menu-btn");
    const navigation = document.querySelector(".navigation");
    const navItems = document.querySelectorAll(".navigation-items a");
    const slides = document.querySelectorAll('.slide');
    const navBtns = document.querySelectorAll('.nav-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    const detailContainers = document.querySelectorAll('.detail-container');
    const closeDetailBtns = document.querySelectorAll('.close-detail');
    let currentSlide = 0;
    let slideInterval;

    // Fungsi untuk mengubah slide
    function changeSlide(index) {
        // Menghapus class active dari semua slide
        slides.forEach(slide => slide.classList.remove('active'));
        // Menambahkan class active ke slide yang dipilih
        slides[index].classList.add('active');
        
        // Menghapus class active dari semua tombol navigasi
        navBtns.forEach(btn => btn.classList.remove('active'));
        // Menambahkan class active ke tombol navigasi yang dipilih
        navBtns[index].classList.add('active');
        
        // Menyembunyikan semua section
        sections.forEach(section => section.style.display = 'none');
        // Menampilkan section yang dipilih
        sections[index].style.display = 'flex';
        
        // Memperbarui slide aktif saat ini
        currentSlide = index;
    }

    // Fungsi untuk slide otomatis
    function startSlideShow() {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            changeSlide(currentSlide);
        }, 5000); // Ganti slide setiap 5 detik
    }

    // Fungsi untuk menghentikan slide otomatis
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Fungsi untuk menampilkan detail konten
    function showDetail(detailId) {
        // Sembunyikan semua detail container
        detailContainers.forEach(container => {
            container.style.display = 'none';
        });
        
        // Tampilkan detail container yang dipilih
        const selectedDetail = document.getElementById(detailId);
        if (selectedDetail) {
            selectedDetail.style.display = 'flex';
            stopSlideShow(); // Hentikan slideshow saat detail ditampilkan
            // Scroll ke atas detail content
            selectedDetail.querySelector('.detail-content').scrollTop = 0;
        }
    }

    // Fungsi untuk menyembunyikan detail konten
    function hideDetails() {
        detailContainers.forEach(container => {
            container.style.display = 'none';
        });
        startSlideShow(); // Mulai kembali slideshow saat detail ditutup
    }

    // Inisialisasi event listeners
    function initEventListeners() {
        // Menambahkan event listener untuk setiap tombol navigasi
        navBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                stopSlideShow();
                changeSlide(index);
                startSlideShow();
            });
        });

        // Menambahkan event listener untuk setiap link menu
        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                stopSlideShow();
                changeSlide(index);
                startSlideShow();
            });
        });

        // Menambahkan event listener untuk tombol menu mobile
        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("active");
            navigation.classList.toggle("active");
        });

        // Menambahkan event listener untuk setiap item menu
        navItems.forEach(item => {
            item.addEventListener("click", () => {
                menuBtn.classList.remove("active");
                navigation.classList.remove("active");
            });
        });

        // Menutup menu saat scrolling
        window.addEventListener("scroll", () => {
            if (navigation.classList.contains("active")) {
                menuBtn.classList.remove("active");
                navigation.classList.remove("active");
            }
        });

        // Menambahkan event listener untuk tombol Read More
        readMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const target = btn.getAttribute('href');
                showDetail(target.substring(1)); // Hapus karakter '#' dari href
            });
        });

        // Menambahkan event listener untuk tombol Tutup
        closeDetailBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                hideDetails();
            });
        });

        // Menutup detail saat mengklik di luar konten
        detailContainers.forEach(container => {
            container.addEventListener('click', (e) => {
                if (e.target === container) {
                    hideDetails();
                }
            });
        });

        // Menambahkan hover effect untuk tombol "Read More"
        const readMoreButtons = document.querySelectorAll('.content a');
        readMoreButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.05)';
                button.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            });
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
                button.style.boxShadow = 'none';
            });
        });

        // Menambahkan smooth scroll untuk anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Fungsi untuk inisialisasi
    function initialize() {
        changeSlide(0); // Tampilkan slide pertama
        startSlideShow(); // Mulai slideshow otomatis
        initEventListeners(); // Pasang event listeners
    }

    // Panggil fungsi inisialisasi
    initialize();
}

// Panggil fungsi initSlider ketika dokumen selesai dimuat
document.addEventListener('DOMContentLoaded', initSlider);

// Fungsi untuk menampilkan pesan selamat datang di console
function tampilkanPesan() {
    console.log("Selamat datang di Web Pakaian Adat Indonesia!");
}

// Panggil fungsi tampilkanPesan
tampilkanPesan();