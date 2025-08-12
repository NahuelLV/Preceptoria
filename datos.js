const students = [
  {
    nombre: "Ana",
    apellido: "García",
    dni: "12345678",
    curso: "5° A",
    turno: "Mañana",
    responsables: [
      {
        nombre: "Juan",
        apellido: "García",
        parentesco: "Padre",
        telefono: "1122334455",
        dni: "20123456",
        email: "juan.garcia@example.com"
      },
      {
        nombre: "María",
        apellido: "López",
        parentesco: "Madre",
        telefono: "1199887766",
        dni: "25678901",
        email: "maria.lopez@example.com"
      }
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
      {
        nombre: "Laura",
        apellido: "Fernández",
        parentesco: "Madre",
        telefono: "1144778899",
        dni: "27894512",
        email: "laura.fernandez@example.com"
      },
      {
        nombre: "Miguel",
        apellido: "Gómez",
        parentesco: "Padre",
        telefono: "1177553311",
        dni: "29874561",
        email: "miguel.gomez@example.com"
      }
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
      {
        nombre: "Elena",
        apellido: "Ramírez",
        parentesco: "Madre",
        telefono: "1133224455",
        dni: "27654321",
        email: "elena.ramirez@example.com"
      },
      {
        nombre: "Roberto",
        apellido: "Sánchez",
        parentesco: "Padre",
        telefono: "1188997766",
        dni: "25671234",
        email: "roberto.sanchez@example.com"
      }
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
      {
        nombre: "Mariana",
        apellido: "López",
        parentesco: "Madre",
        telefono: "1155443322",
        dni: "37689012",
        email: "mariana.lopez@example.com"
      },
      {
        nombre: "Jorge",
        apellido: "Torres",
        parentesco: "Padre",
        telefono: "1166778899",
        dni: "37689123",
        email: "jorge.torres@example.com"
      }
    ],
    notas: { Matemáticas: 4.5, Español: 5.5, Ciencias: 6.0, Historia: 7.5 },
  }
];

document.addEventListener("DOMContentLoaded", () => {
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

  let currentSection = "";
  let filteredStudents = [];
  
  // Navegar de bienvenida a menú
  startBtn.addEventListener("click", () => {
    welcomeScreen.classList.remove("active");
    menuScreen.classList.add("active");
  });

  // Mostrar contenido según sección elegida
  document.querySelectorAll(".menu-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentSection = btn.dataset.section;
      menuScreen.classList.remove("active");
      contentScreen.classList.add("active");
      resetSearch();
      renderTable(students);
    });
  });

  // Botón volver al menú
  backBtn.addEventListener("click", () => {
    contentScreen.classList.remove("active");
    menuScreen.classList.add("active");
    clearContent();
  });

  // Filtrado en inputs de búsqueda
  [searchName, searchDni, searchCurso].forEach(input => {
    input.addEventListener("input", () => {
      applyFilters();
    });
  });

  // Cerrar modal
  modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // Cerrar modal si clic afuera del contenido
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("show");
  });

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
    if (currentSection === "datos") {
      renderDatosTable(data);
    } else if (currentSection === "notas") {
      renderNotasTable(data);
    }
  }

  function renderDatosTable(data) {
    clearContent();
    if (data.length === 0) {
      contentDiv.innerHTML = `<p>No se encontraron alumnos con esos criterios.</p>`;
      return;
    }

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Nombre", "Apellido", "DNI", "Curso", "Turno"].forEach(text => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.forEach(alumno => {
      const tr = document.createElement("tr");
      tr.tabIndex = 0; // para accesibilidad y foco
      tr.innerHTML = `
        <td>${alumno.nombre}</td>
        <td>${alumno.apellido}</td>
        <td>${alumno.dni}</td>
        <td>${alumno.curso}</td>
        <td>${alumno.turno}</td>
      `;
      tr.addEventListener("click", () => {
        showAlumnoDetalle(alumno);
      });
      tr.addEventListener("keypress", e => {
        if (e.key === "Enter") showAlumnoDetalle(alumno);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    contentDiv.appendChild(table);
  }

  function renderNotasTable(data) {
    clearContent();
    if (data.length === 0) {
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
      const tr = document.createElement("tr");
      tr.tabIndex = 0;
      tr.innerHTML = `
        <td>${alumno.nombre}</td>
        <td>${alumno.apellido}</td>
        <td>${alumno.dni}</td>
        <td>${alumno.notas.Matemáticas ?? "-"}</td>
        <td>${alumno.notas.Español ?? "-"}</td>
        <td>${alumno.notas.Ciencias ?? "-"}</td>
        <td>${alumno.notas.Historia ?? "-"}</td>
      `;
      tr.addEventListener("click", () => {
        showAlumnoDetalle(alumno);
      });
      tr.addEventListener("keypress", e => {
        if (e.key === "Enter") showAlumnoDetalle(alumno);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    contentDiv.appendChild(table);
  }

  // Mostrar modal con detalles del alumno
  function showAlumnoDetalle(alumno) {
    modalNombre.textContent = `${alumno.nombre} ${alumno.apellido}`;
    modalDetalles.innerHTML = `
      <p><strong>DNI:</strong> ${alumno.dni}</p>
      <p><strong>Curso:</strong> ${alumno.curso}</p>
      <p><strong>Turno:</strong> ${alumno.turno}</p>
    `;

    // Notas para recuperar (menos de 7)
    modalNotas.innerHTML = "";
    for (const [materia, nota] of Object.entries(alumno.notas)) {
      if (nota < 7) {
        const li = document.createElement("li");
        li.textContent = `${materia}: ${nota}`;
        modalNotas.appendChild(li);
      }
    }
    if (modalNotas.children.length === 0) {
      modalNotas.innerHTML = "<li>No hay materias para recuperar</li>";
    }

    // Responsables
    modalResponsables.innerHTML = "<h4>Responsables</h4>";
    alumno.responsables.forEach(res => {
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
});
