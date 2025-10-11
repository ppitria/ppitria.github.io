const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

document.querySelectorAll(".sidebar a").forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
});

const previewContainer = document.getElementById("project-preview");

if (previewContainer) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const rows = data.values;
      if (!rows || rows.length <= 1) return;

      const headers = rows[0];
      const projects = rows.slice(1);

      // TAMPILKAN HANYA 4 PROJECT TERATAS
      projects.slice(0, 4).forEach((row) => {
        const obj = Object.fromEntries(headers.map((h, i) => [h, row[i]]));
        const card = document.createElement("a");
        card.className = "card";
        card.href = obj.detail_url;

        card.innerHTML = `
    <img src="${obj.image_url}" alt="${obj.title}" />
    <div class="card-text">
      <h3>${obj.title}</h3>
      <p>${obj.description}</p>
    </div>
  `;

        previewContainer.appendChild(card);
      });

      // Tampilkan tombol "View All" HANYA jika project lebih dari 4
      if (projects.length > 4) {
        const btnWrapper = document.createElement("div");
        btnWrapper.className = "btn-wrapper";

        const viewAllBtn = document.createElement("a");
        viewAllBtn.href = "projects.html";
        viewAllBtn.className = "view-all-btn";
        viewAllBtn.textContent = "View All Projects";

        btnWrapper.appendChild(viewAllBtn);
        previewContainer.parentElement.appendChild(btnWrapper);
      }
    })
    .catch((error) => console.error("Failed to load projects:", error));
}
