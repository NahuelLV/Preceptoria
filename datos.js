// datos.js (archivo completo y corregido)

const students = [
  {
    nombre: "Ana",
    apellido: "García",
    dni: "12345678",
    curso: "5° A",
    turno: "Mañana",
    responsables: [
      { nombre: "Juan", apellido: "García", parentesco: "Padre", telefono: "1122334455", dni: "20123456", email: "juan.garcia@example.com" },
      { nombre: "María", apellido: "López", parentesco: "Madre", telefono: "1199887766", dni: "25678901", email: "maria.lopez@example.com" }
    ],
    notas: { Matemáticas: 8.5, Español: 9.0, Ciencias: 7.8, Historia: 6.0 },
  },
  {
    nombre: "Carlos",
    apellido: "Fernández",
    dni: "87654321",
    curso: "5° B",
    turno: "Tarde",
    responsables: [
      { nombre: "Laura", apellido: "Fernández", parentesco: "Madre", telefono: "1144778899", dni: "27894512", email: "laura.fernandez@example.com" },
      { nombre: "Miguel", apellido: "Gómez", parentesco: "Padre", telefono: "1177553311", dni: "29874561", email: "miguel.gomez@example.com" }
    ],
    notas: { Matemáticas: 5.2, Español: 6.8, Ciencias: 5.5, Historia: 7.0 },
  },
  {
    nombre: "Sofía",
    apellido: "Ramírez",
    dni: "33445566",
    curso: "6° A",
    turno: "Mañana",
    responsables: [
      { nombre: "Elena", apellido: "Ramírez", parentesco: "Madre", telefono: "1133224455", dni: "27654321", email: "elena.ramirez@example.com" },
      { nombre: "Roberto", apellido: "Sánchez", parentesco: "Padre", telefono: "1188997766", dni: "25671234", email: "roberto.sanchez@example.com" }
    ],
    notas: { Matemáticas: 9.0, Español: 8.5, Ciencias: 9.2, Historia: 9.0 },
  },
  {
    nombre: "Pedro",
    apellido: "López",
    dni: "55667788",
    curso: "6° B",
    turno: "Tarde",
    responsables: [
      { nombre: "Mariana", apellido: "López", parentesco: "Madre", telefono: "1155443322", dni: "37689012", email: "mariana.lopez@example.com" },
      { nombre: "Jorge", apellido: "Torres", parentesco: "Padre", telefono: "1166778899", dni: "37689123", email: "jorge.torres@example.com" }
    ],
    notas: { Matemáticas: 4.5, Español: 5.5, Ciencias: 6.0, Historia: 7.5 },
  }
];

document.addEventListener("DOMContentLoaded", () => {
  // Elementos DOM
  const welcomeScreen = document.getElementById("welcome-screen");
  const menuScreen = document.getElementById("menu-screen");
  const contentScreen = document.getElementById("content-screen");
  const backBtn = document.getElementById("back-btn");
  const contentDiv = document.getElementById("content");
  const startBtn = document.getElementById("start-btn");

  const searchName = document.getElementById("search-name");
  const searchDni = document.getElementById("search-dni");
  const searchCurso = document.getElementById("search-curso");

  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modal-close");
  const modalNombre = document.getElementById("modal-nombre");
  const modalDetalles = document.getElementById("modal-detalles");
  const modalNotas = document.getElementById("modal-notas");
  const modalResponsables = document.getElementById("modal-responsables");

  const themeToggleBtn = document.getElementById("theme-toggle-btn");

  // Admin elements
  const adminBtn = document.getElementById("admin-btn");
  const adminScreen = document.getElementById("admin-screen");
  const backAdminBtn = document.getElementById("back-admin-btn");
  const adminContent = document.getElementById("admin-content");

  let currentSection = "";
  let filteredStudents = [];

  // --- Tema ---
  function setTheme(theme) {
    if (theme === "dark") {
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }
  }
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) setTheme(savedTheme); else setTheme("dark");

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("light-mode") ? "light" : "dark";
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });

  // --- Navegación ---
  startBtn.addEventListener("click", () => {
    welcomeScreen.classList.remove("active");
    menuScreen.classList.add("active");
  });

  document.querySelectorAll(".menu-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentSection = btn.dataset.section;
      menuScreen.classList.remove("active");
      contentScreen.classList.add("active");
      resetSearch();
      renderTable(students);
    });
  });

  backBtn.addEventListener("click", () => {
    contentScreen.classList.remove("active");
    menuScreen.classList.add("active");
    clearContent();
  });

  // --- Admin (simple password) ---
  adminBtn.addEventListener("click", () => {
    const pass = prompt("Ingrese la contraseña de administrador:");
    if (pass === "preceptoria2025") {
      menuScreen.classList.remove("active");
      adminScreen.classList.add("active");
      renderAdminTable(students);
    } else {
      alert("Contraseña incorrecta");
    }
  });

  backAdminBtn.addEventListener("click", () => {
    adminScreen.classList.remove("active");
    menuScreen.classList.add("active");
    adminContent.innerHTML = "";
  });

  // --- Filtrado ---
  [searchName, searchDni, searchCurso].forEach(input => {
    input.addEventListener("input", applyFilters);
  });

  // --- Modal ---
  modalClose.addEventListener("click", () => modal.classList.remove("show"));
  modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("show"); });

  function resetSearch() {
    searchName.value = "";
    searchDni.value = "";
    searchCurso.value = "";
  }

  function clearContent() {
    contentDiv.innerHTML = "";
  }

  function applyFilters() {
    const nameFilter = searchName.value.trim().toLowerCase();
    const dniFilter = searchDni.value.trim();
    const cursoFilter = searchCurso.value.trim().toLowerCase();

    filteredStudents = students.filter(s => {
      const fullName = (s.nombre + " " + s.apellido).toLowerCase();
      return (
        fullName.includes(nameFilter) &&
        s.dni.includes(dniFilter) &&
        s.curso.toLowerCase().includes(cursoFilter)
      );
    });

    renderTable(filteredStudents);
  }

  function renderTable(data) {
    if (currentSection === "datos") renderDatosTable(data);
    else if (currentSection === "notas") renderNotasTable(data);
  }

  // --- Render Datos ---
  function renderDatosTable(data) {
    clearContent();
    if (!data || data.length === 0) {
      contentDiv.innerHTML = `<p>No se encontraron alumnos con esos criterios.</p>`;
      return;
    }

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Nombre", "Apellido", "DNI", "Curso", "Turno", "Responsable 1", "Responsable 2"].forEach(text => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.forEach(alumno => {
      const responsable1 = alumno.responsables && alumno.responsables[0] ? `${alumno.responsables[0].nombre} ${alumno.responsables[0].apellido}` : "N/A";
      const responsable2 = alumno.responsables && alumno.responsables[1] ? `${alumno.responsables[1].nombre} ${alumno.responsables[1].apellido}` : "N/A";

      const tr = document.createElement("tr");
      tr.tabIndex = 0;
      tr.innerHTML = `
        <td>${alumno.nombre}</td>
        <td>${alumno.apellido}</td>
        <td>${alumno.dni}</td>
        <td>${alumno.curso}</td>
        <td>${alumno.turno}</td>
        <td>${responsable1}</td>
        <td>${responsable2}</td>
      `;
      tr.addEventListener("click", () => showAlumnoDetalle(alumno));
      tr.addEventListener("keypress", e => { if (e.key === "Enter") showAlumnoDetalle(alumno); });
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    contentDiv.appendChild(table);
  }

  // --- Render Notas ---
  function renderNotasTable(data) {
    clearContent();
    if (!data || data.length === 0) {
      contentDiv.innerHTML = `<p>No se encontraron alumnos con esos criterios.</p>`;
      return;
    }

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Nombre", "Apellido", "DNI", "Matemáticas", "Español", "Ciencias", "Historia"].forEach(text => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.forEach(alumno => {
      // Aseguramos existencia de notas
      const notas = alumno.notas || {};
      const tr = document.createElement("tr");
      tr.tabIndex = 0;
      tr.innerHTML = `
        <td>${alumno.nombre}</td>
        <td>${alumno.apellido}</td>
        <td>${alumno.dni}</td>
        <td>${notas["Matemáticas"] ?? "-"}</td>
        <td>${notas["Español"] ?? "-"}</td>
        <td>${notas["Ciencias"] ?? "-"}</td>
        <td>${notas["Historia"] ?? "-"}</td>
      `;
      tr.addEventListener("click", () => showAlumnoDetalle(alumno));
      tr.addEventListener("keypress", e => { if (e.key === "Enter") showAlumnoDetalle(alumno); });
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    contentDiv.appendChild(table);
  }

  // --- Mostrar detalle / Modal ---
  function showAlumnoDetalle(alumno) {
    modalNombre.textContent = `${alumno.nombre} ${alumno.apellido}`;
    modalDetalles.innerHTML = `
      <p><strong>DNI:</strong> ${alumno.dni}</p>
      <p><strong>Curso:</strong> ${alumno.curso}</p>
      <p><strong>Turno:</strong> ${alumno.turno}</p>
    `;

    // Si estamos en modo admin, mostrar inputs para editar notas y botones para guardar/borrar
    const isAdmin = adminScreen.classList.contains("active");

    modalNotas.innerHTML = "";
    if (isAdmin) {
      // Crear formulario de edición de notas
      const notas = alumno.notas || {};
      const form = document.createElement("div");
      form.className = "admin-notes-form";
      for (const materia of Object.keys(notas).length ? Object.keys(notas) : ["Matemáticas","Español","Ciencias","Historia"]) {
        const wrapper = document.createElement("div");
        wrapper.style.marginBottom = "8px";
        const label = document.createElement("label");
        label.textContent = materia + ": ";
        label.style.fontWeight = "700";
        const input = document.createElement("input");
        input.type = "number";
        input.step = "0.1";
        input.min = 0;
        input.max = 10;
        input.value = notas[materia] ?? "";
        input.dataset.materia = materia;
        input.style.width = "80px";
        wrapper.appendChild(label);
        wrapper.appendChild(input);
        form.appendChild(wrapper);
      }

      const saveBtn = document.createElement("button");
      saveBtn.className = "admin-btn edit";
      saveBtn.textContent = "Guardar Notas";
      saveBtn.addEventListener("click", () => {
        // Actualizar objeto notas del alumno
        const inputs = form.querySelectorAll("input");
        if (!alumno.notas) alumno.notas = {};
        inputs.forEach(inp => {
          const m = inp.dataset.materia;
          const v = inp.value.trim();
          alumno.notas[m] = v === "" ? null : parseFloat(v);
        });
        alert("Notas guardadas.");
        modal.classList.remove("show");
        // refrescar tablas
        safeRerender();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "admin-btn";
      deleteBtn.textContent = "Eliminar Alumno";
      deleteBtn.style.marginLeft = "8px";
      deleteBtn.addEventListener("click", () => {
        const ok = confirm(`¿Eliminar definitivamente a ${alumno.nombre} ${alumno.apellido}?`);
        if (!ok) return;
        // Buscar por referencia y eliminar
        const idx = students.indexOf(alumno);
        if (idx > -1) {
          students.splice(idx, 1);
          modal.classList.remove("show");
          alert("Alumno eliminado.");
          safeRerender();
        } else {
          alert("No se pudo eliminar (no encontrado).");
        }
      });

      modalNotas.appendChild(form);
      modalNotas.appendChild(saveBtn);
      modalNotas.appendChild(deleteBtn);
    } else {
      // Modo usuario: mostrar materias a recuperar (<5.9)
      const notas = alumno.notas || {};
      let hasRecover = false;
      for (const [materia, nota] of Object.entries(notas)) {
        if (nota !== null && nota < 5.9) {
          const li = document.createElement("li");
          li.textContent = `${materia}: ${nota}`;
          modalNotas.appendChild(li);
          hasRecover = true;
        }
      }
      if (!hasRecover) modalNotas.innerHTML = "<li>No hay materias para recuperar</li>";
    }

    // Responsables (siempre mostrar)
    modalResponsables.innerHTML = "<h4>Responsables</h4>";
    (alumno.responsables || []).forEach(res => {
      const div = document.createElement("div");
      div.className = "responsable-item";
      div.innerHTML = `
        <p><strong>${res.parentesco}:</strong> ${res.nombre} ${res.apellido}</p>
        <p><strong>DNI:</strong> ${res.dni}</p>
        <p><strong>Teléfono:</strong> ${res.telefono}</p>
        <p><strong>Email:</strong> <a href="mailto:${res.email}">${res.email}</a></p>
      `;
      modalResponsables.appendChild(div);
    });

    modal.classList.add("show");
  }

  // --- Render Admin Table (editar/borrar/editar notas) ---
  function renderAdminTable(data) {
    adminContent.innerHTML = "";
    if (!data || data.length === 0) {
      adminContent.innerHTML = `<p>No hay alumnos</p>`;
      return;
    }

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Nombre", "Apellido", "DNI", "Curso", "Turno", "Acciones"].forEach(text => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    data.forEach(alumno => {
      const tr = document.createElement("tr");
      // Guardamos el dni original en dataset para buscarlo si cambian los campos
      tr.dataset.dniOriginal = alumno.dni;

      tr.innerHTML = `
        <td contenteditable="true">${alumno.nombre}</td>
        <td contenteditable="true">${alumno.apellido}</td>
        <td contenteditable="true">${alumno.dni}</td>
        <td contenteditable="true">${alumno.curso}</td>
        <td contenteditable="true">${alumno.turno}</td>
        <td>
          <button class="admin-btn edit">Guardar</button>
          <button class="admin-btn notes">Editar Notas</button>
          <button class="admin-btn delete">Borrar</button>
        </td>
      `;

      // Guardar cambios de fila
      tr.querySelector(".edit").addEventListener("click", () => {
        const tds = tr.querySelectorAll("td");
        // tds[0..4] son los campos editables
        const originalDni = tr.dataset.dniOriginal;
        const idx = students.findIndex(s => s.dni === originalDni);
        if (idx === -1) {
          alert("No se encontró el alumno en la lista (probablemente fue eliminado).");
          renderAdminTable(students);
          return;
        }
        // Asignamos valores (sanitizamos con trim)
        students[idx].nombre = tds[0].textContent.trim();
        students[idx].apellido = tds[1].textContent.trim();
        students[idx].dni = tds[2].textContent.trim();
        students[idx].curso = tds[3].textContent.trim();
        students[idx].turno = tds[4].textContent.trim();

        // Actualizar dataset para futuros guardados
        tr.dataset.dniOriginal = students[idx].dni;

        alert("Alumno actualizado.");
        safeRerender();
      });

      // Editar notas abre modal en modo admin
      tr.querySelector(".notes").addEventListener("click", () => {
        // buscar alumno de students mediante dni original
        const originalDni = tr.dataset.dniOriginal;
        const idx = students.findIndex(s => s.dni === originalDni);
        if (idx === -1) {
          alert("Alumno no encontrado.");
          return;
        }
        showAlumnoDetalle(students[idx]); // modal en modo admin permitirá editar notas y eliminar
      });

      // Borrar alumno
      tr.querySelector(".delete").addEventListener("click", () => {
        const originalDni = tr.dataset.dniOriginal;
        const idx = students.findIndex(s => s.dni === originalDni);
        if (idx === -1) {
          alert("Alumno no encontrado.");
          return;
        }
        const ok = confirm(`¿Eliminar definitivamente a ${students[idx].nombre} ${students[idx].apellido}?`);
        if (!ok) return;
        students.splice(idx, 1);
        alert("Alumno eliminado.");
        renderAdminTable(students);
        safeRerender();
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    adminContent.appendChild(table);
  }

  // --- Util: re-render seguro para pantalla de contenido si está visible ---
  function safeRerender() {
    // Si estamos en contentScreen y hay un filtro activo, aplicamos filtro y re-render
    const hasFilter = searchName.value || searchDni.value || searchCurso.value;
    if (contentScreen.classList.contains("active")) {
      if (hasFilter) applyFilters();
      else renderTable(students);
    }
    // Si estamos en admin, re-renderizamos admin
    if (adminScreen.classList.contains("active")) {
      renderAdminTable(students);
    }
  }

  // --- Inicial ---
  // Nada más por ahora; la navegación y eventos manejan el resto.
});
