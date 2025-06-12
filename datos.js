// Datos simulados
const students = [
  {
    nombre: "Ana García",
    curso: "5° A",
    notas: { Matemáticas: 8.5, Español: 9.0, Ciencias: 7.8 },
    asistencia: { asistencias: 90, inasistencias: 3, llegadasTarde: 1 },
  },
  {
    nombre: "Juan Pérez",
    curso: "5° B",
    notas: { Matemáticas: 6.0, Español: 7.2, Ciencias: 6.5 },
    asistencia: { asistencias: 75, inasistencias: 10, llegadasTarde: 5 },
  },
  {
    nombre: "Lucía Martínez",
    curso: "5° A",
    notas: { Matemáticas: 9.2, Español: 8.7, Ciencias: 9.0 },
    asistencia: { asistencias: 95, inasistencias: 1, llegadasTarde: 0 },
  },
  {
    nombre: "Carlos Rodríguez",
    curso: "5° C",
    notas: { Matemáticas: 5.5, Español: 6.0, Ciencias: 5.0 },
    asistencia: { asistencias: 60, inasistencias: 15, llegadasTarde: 7 },
  },
];

// Referencias DOM
const welcomeScreen = document.getElementById("welcome-screen");
const menuScreen = document.getElementById("menu-screen");
const contentScreen = document.getElementById("content-screen");

const startBtn = document.getElementById("start-btn");
const backBtn = document.getElementById("back-btn");
const menuButtons = document.querySelectorAll(".menu-btn");

const contenidoDiv = document.getElementById("content");
const searchInput = document.getElementById("search-input");

let currentSection = null;

// Mostrar una pantalla y ocultar las otras
function showScreen(screen) {
  [welcomeScreen, menuScreen, contentScreen].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

// ** Eliminado showModalAlumno, closeModal y attachRowListeners que abrían el modal **

// Renderizar la tabla según sección y filtro
function renderSection(section, filter = "") {
  switch(section) {
    case "datos":
      renderDatos(filter);
      break;
    case "notas":
      renderNotas(filter);
      break;
    case "asistencia":
      renderAsistencia(filter);
      break;
    default:
      contenidoDiv.innerHTML = "<p>Error: sección desconocida.</p>";
  }
}

// Renderizar datos básicos
function renderDatos(filter) {
  const filtered = students.filter(s => s.nombre.toLowerCase().includes(filter.toLowerCase()));

  if (filtered.length === 0) {
    contenidoDiv.innerHTML = "<p>No se encontraron alumnos.</p>";
    return;
  }

  let html = `<table>
    <thead>
      <tr><th>Nombre</th><th>Curso</th></tr>
    </thead>
    <tbody>`;

  filtered.forEach(s => {
    html += `<tr><td>${s.nombre}</td><td>${s.curso}</td></tr>`;
  });

  html += "</tbody></table>";
  contenidoDiv.innerHTML = html;

  // No se adjuntan listeners para abrir modal ya que fue eliminado
}

// Renderizar notas
function renderNotas(filter) {
  const filtered = students.filter(s => s.nombre.toLowerCase().includes(filter.toLowerCase()));

  if (filtered.length === 0) {
    contenidoDiv.innerHTML = "<p>No se encontraron alumnos.</p>";
    return;
  }

  let html = `<table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Matemáticas</th>
        <th>Español</th>
        <th>Ciencias</th>
      </tr>
    </thead>
    <tbody>`;

  filtered.forEach(s => {
    html += `<tr>
      <td>${s.nombre}</td>
      <td>${s.notas.Matemáticas.toFixed(1)}</td>
      <td>${s.notas.Español.toFixed(1)}</td>
      <td>${s.notas.Ciencias.toFixed(1)}</td>
    </tr>`;
  });

  html += "</tbody></table>";
  contenidoDiv.innerHTML = html;
  // Sin listeners
}

// Renderizar asistencia
function renderAsistencia(filter) {
  const filtered = students.filter(s => s.nombre.toLowerCase().includes(filter.toLowerCase()));

  if (filtered.length === 0) {
    contenidoDiv.innerHTML = "<p>No se encontraron alumnos.</p>";
    return;
  }

  let html = `<table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Asistencias</th>
        <th>Inasistencias</th>
        <th>Llegadas Tarde</th>
      </tr>
    </thead>
    <tbody>`;

  filtered.forEach(s => {
    html += `<tr>
      <td>${s.nombre}</td>
      <td class="${s.asistencia.asistencias >= 80 ? "attendance-good" : "attendance-bad"}">${s.asistencia.asistencias}</td>
      <td class="${s.asistencia.inasistencias > 5 ? "attendance-bad" : "attendance-good"}">${s.asistencia.inasistencias}</td>
      <td class="${s.asistencia.llegadasTarde > 3 ? "attendance-bad" : "attendance-good"}">${s.asistencia.llegadasTarde}</td>
    </tr>`;
  });

  html += "</tbody></table>";
  contenidoDiv.innerHTML = html;
  // Sin listeners
}

// EVENTOS

startBtn.addEventListener("click", () => {
  showScreen(menuScreen);
  searchInput.value = "";
});

menuButtons.forEach(button => {
  button.addEventListener("click", e => {
    currentSection = e.target.getAttribute("data-section");
    searchInput.value = "";
    renderSection(currentSection);
    showScreen(contentScreen);
  });
});

backBtn.addEventListener("click", () => {
  searchInput.value = "";
  showScreen(menuScreen);
});

searchInput.addEventListener("input", e => {
  const filtro = e.target.value.trim();
  renderSection(currentSection, filtro);
});

// Inicio en pantalla bienvenida
showScreen(welcomeScreen);
