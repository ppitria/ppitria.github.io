/* ==========================================================================
   SIDEBAR & NAVBAR
   ========================================================================== */
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// Buka/Tutup Sidebar saat hamburger diklik
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Tutup Sidebar saat area gelap (overlay) diklik
overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// Tutup Sidebar otomatis saat salah satu menu diklik
document.querySelectorAll(".sidebar a").forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
});

/* ==========================================================================
   FUNGSI BANTUAN UNTUK MENGAMBIL DATA JSON LOKAL
   ========================================================================== */
async function fetchLocalData() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal mengambil data JSON:", error);
    return null;
  }
}

/* ==========================================================================
   PENGATURAN HALAMAN (ROUTER)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Halaman Beranda (index)
  if (document.getElementById("project-list")) {
    renderProjects();
  }

  // Halaman Detail Project (detail_project)
  if (document.getElementById("project-detail-content")) {
    renderProjectDetail();
  }

  // Halaman About bagian List Course (about)
  if (document.getElementById("list-course")) {
    renderListCourse();
  }

  // Halaman About bagian Tentang Saya (about)
  if (document.getElementById("aboutme")) {
    renderAboutMe();
  }
});

/* ==========================================================================
   HALAMAN BERANDA (HOME)
   ========================================================================== */
async function renderProjects() {
  const data = await fetchLocalData();
  if (!data || !data.project) return;

  // Urutkan ID dari yang terbesar ke terkecil (terbaru di atas)
  const projects = data.project.sort((a, b) => b.id - a.id);

  const container = document.getElementById("project-list");
  container.innerHTML = ""; // Hapus ikon loading

  projects.forEach((proj) => {
    const projectItem = `
      <div class="project-item">
          <img src="${proj.img_url}" alt="${proj.title}" />
          <div class="project-text">
              <h3 class="header-3">${proj.title}</h3>
              <p>${proj.short_desc}</p>
              <span>Dibuat: ${proj.created_date}</span>
              <div class="btn-left-container">
                  <a href="detail_project.html?id=${proj.id}" class="btn-left">View Detail</a>
              </div>
          </div>
      </div>
    `;
    container.innerHTML += projectItem;
  });
}

/* ==========================================================================
   HALAMAN DETAIL PROJECT
   ========================================================================== */
async function renderProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = parseInt(urlParams.get("id"));

  if (!projectId) return;

  const data = await fetchLocalData();
  if (!data || !data.project) return;

  // Cari project berdasarkan ID
  const proj = data.project.find((p) => p.id === projectId);

  // Loading
  const spinner = document.querySelector(
    "#project-detail-content .loading-spinner",
  );
  if (spinner) {
    spinner.remove();
  }

  if (!proj) {
    document.getElementById("proj-title").innerText = "Proyek tidak ditemukan";
    return;
  }

  // Tampilkan Detail Umum
  document.title = `${proj.title} | Portfolio`;
  document.getElementById("proj-title").innerText = proj.title;
  document.getElementById("proj-short-desc").innerText = proj.short_desc || "";

  // Bagian Deskripsi (Langsung merender string JSON beserta tag HTML-nya)
  document.getElementById("proj-desc").innerHTML = `
      <p>${proj.desc}</p> <br>
      <strong>Tools: ${proj.tools}</strong>
  `;

  // Bagian Media (PDF)
  document.getElementById("proj-media-container").innerHTML = `
      <iframe src="${proj.pdf_url}" width="100%" height="500px"></iframe>
      <br>
  `;

  // List Learned (Mengubah Array dari JSON menjadi tag <li>)
  if (proj.list_learned && Array.isArray(proj.list_learned)) {
    const listHtml = proj.list_learned
      .map((point) => `<li>${point}</li>`)
      .join("");

    document.getElementById("proj-list-learned").innerHTML = `
      <br>
      <ul>
        <strong>Dari proyek ini saya belajar:</strong>
        ${listHtml}
      </ul>
    `;
  }
}

/* ==========================================================================
   HALAMAN ABOUT
   ========================================================================== */
// Bagian Tentang Saya
async function renderAboutMe() {
  const data = await fetchLocalData();
  if (!data || !data.about) return;

  const abouts = data.about.sort((a, b) => b.id - a.id);
  const containerAbout = document.getElementById("aboutme");
  containerAbout.innerHTML = "";

  abouts.forEach((ab) => {
    containerAbout.innerHTML += `<p>${ab.bio_text}</p>`;
  });
}

// Bagian List Course
async function renderListCourse() {
  const data = await fetchLocalData();
  if (!data || !data.course) return;

  const courses = data.course.sort((a, b) => b.id - a.id);
  const containerCourse = document.getElementById("list-course");
  containerCourse.innerHTML = "";

  courses.forEach((cors) => {
    const courseItem = `
      <div class="card-course">
        <div class="img-course">
          <img src="${cors.certificate}" alt="${cors.course_name}" />
        </div>
        <div class="detail-course">
          <p class="name-course">${cors.course_name}</p>
          <p class="provider-course">${cors.provider}</p>
          <p class="year-course">${cors.year}</p>
        </div>
      </div>
    `;
    containerCourse.innerHTML += courseItem;
  });
}
