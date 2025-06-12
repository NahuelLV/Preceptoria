// Datos simulados con responsables
const students = [
  {
    nombre: "Ana García",
    curso: "5° A",
    responsables: { responsable1: "Juan García", responsable2: "María López" },
    notas: { Matemáticas: 8.5, Español: 9.0, Ciencias: 7.8 },
    asistencia: { asistencias: 90, inasistencias: 3, llegadasTarde: 1 },
  },
  {
    nombre: "Juan Pérez",
    curso: "5° B",
    responsables: { responsable1: "Carlos Pérez", responsable2: "Laura Fernández" },
    notas: { Matemáticas: 6.0, Español: 7.2, Ciencias: 6.5 },
    asistencia: { asistencias: 75, inasistencias: 10, llegadasTarde: 5 },
  },
  {
    nombre: "Lucía Martínez",
    curso: "5° A",
    responsables: { responsable1: "José Martínez", responsable2: "Ana Rodríguez" },
    notas: { Matemáticas: 9.2, Español: 8.7, Ciencias: 9.0 },
    asistencia: { asistencias: 95, inasistencias: 1, llegadasTarde: 0 },
  },
  {
    nombre: "Carlos Rodríguez",
    curso: "5° C",
    responsables: { responsable1: "Ricardo Rodríguez", responsable2: "Elena Ruiz" },
    notas: { Matemáticas: 5.5, Español: 6.0, Ciencias: 5.0 },
    asistencia: { asistencias: 60, inasistencias: 15, llegadasTarde: 7 },
  },
];

const contenidoDiv = document.getElementById("content");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modal-close");
const modalNombre = document.getElementById("modal-nombre");
const modalCurso = document.getElementById("modal-curso");
const modalResponsables = document.getElementById("modal-responsables");
const modalNotas = document.getElementById("modal-notas");
const modalAsistencia = document.getElementById("modal-asistencia");
const backBtn = document.getElementById("back-btn");
const startBtn = document.getElementById("start-btn");
const menuScreen = document.getElementById("menu-screen");
const contentScreen = document.getElementById("content-screen");
const welcomeScreen = document.getElementById("welcome-screen");
const menuButtons = document.querySelectorAll(".menu-btn");
const searchInput = document.getElementById("search-input");

let currentSection = '';

// Función para mostrar los datos de los alumnos
function mostrarDatosAlumnos() {
  contenidoDiv.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Alumno</th>
          <th>Curso</th>
          <th>Responsables</th>
        </tr>
      </thead>
      <tbody>
        ${students
          .map(
            (alumno, index) => `
          <tr onclick="showModalAlumno(${index})">
            <td>${alumno.nombre}</td>
            <td>${alumno.curso}</td>
            <td>${alumno.responsables.responsable1} / ${alumno.responsables.responsable2}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;
}

// Función para mostrar el modal con los detalles del alumno
function showModalAlumno(index) {
  const alumno = students[index];
  modalNombre.textContent = alumno.nombre;
  modalCurso.textContent = alumno.curso;
  
  // Mostrar los responsables
  modalResponsables.innerHTML = `
    <p><strong>Responsable 1:</strong> ${alumno.responsables.responsable1}</p>
    <p><strong>Responsable 2:</strong> ${alumno.responsables.responsable2}</p>
  `;

  modalNotas.innerHTML = "";
  modalAsistencia.innerHTML = "";

  // Mostrar las notas
  for (const [materia, nota] of Object.entries(alumno.notas)) {
    const li = document.createElement("li");
    li.textContent = `${materia}: ${nota.toFixed(1)}`;
    modalNotas.appendChild(li);
  }

  // Mostrar la asistencia
  for (const [tipo, cantidad] of Object.entries(alumno.asistencia)) {
    const li = document.createElement("li");
    li.textContent = `${tipo.charAt(0).toUpperCase() + tipo.slice(1)}: ${cantidad}`;
    modalAsistencia.appendChild(li);
  }

  modal.style.display = "flex";
}

// Cerrar el modal
modalClose.onclick = function () {
  modal.style.display = "none";
};

// Regresar al menú
backBtn.onclick = function () {
  contentScreen.classList.remove("active");
  menuScreen.classList.add("active");
};

// Comenzar (Eliminar botón de ingreso y mensaje)
startBtn.onclick = function () {
  welcomeScreen.classList.remove("active");
  menuScreen.classList.add("active");
};

// Manejo de las opciones del menú
menuButtons.forEach((btn) => {
  btn.onclick = function () {
    currentSection = btn.dataset.section;
    menuScreen.classList.remove("active");
    contentScreen.classList.add("active");
    renderSection(currentSection);
  };
});

// Función para renderizar cada sección (alumnos, notas, asistencia)
function renderSection(section) {
  switch (section) {
    case "datos":
      mostrarDatosAlumnos();
      break;
    case "notas":
      mostrarNotas();
      break;
    case "asistencia":
      mostrarAsistencia();
      break;
    default:
      contenidoDiv.innerHTML = "<h3>Funcionalidad en desarrollo...</h3>";
  }
}

// Mostrar las notas de los estudiantes
function mostrarNotas() {
  contenidoDiv.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Alumno</th>
          <th>Matemáticas</th>
          <th>Español</th>
          <th>Ciencias</th>
        </tr>
      </thead>
      <tbody>
        ${students
          .map(
            (alumno) => `
          <tr onclick="showModalAlumno(${students.indexOf(alumno)})">
            <td>${alumno.nombre}</td>
            <td>${alumno.notas.Matemáticas.toFixed(1)}</td>
            <td>${alumno.notas.Español.toFixed(1)}</td>
            <td>${alumno.notas.Ciencias.toFixed(1)}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;
}

// Mostrar la asistencia de los estudiantes
function mostrarAsistencia() {
  contenidoDiv.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Alumno</th>
          <th>Asistencias</th>
          <th>Inasistencias</th>
          <th>Llegadas Tarde</th>
        </tr>
      </thead>
      <tbody>
        ${students
          .map(
            (alumno) => `
          <tr onclick="showModalAlumno(${students.indexOf(alumno)})">
            <td>${alumno.nombre}</td>
            <td class="${alumno.asistencia.asistencias >= 80 ? "attendance-good" : "attendance-bad"}">${alumno.asistencia.asistencias}</td>
            <td class="${alumno.asistencia.inasistencias > 5 ? "attendance-bad" : "attendance-good"}">${alumno.asistencia.inasistencias}</td>
            <td class="${alumno.asistencia.llegadasTarde > 3 ? "attendance-bad" : "attendance-good"}">${alumno.asistencia.llegadasTarde}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;
}

// Función de búsqueda
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredStudents = students.filter((alumno) =>
    alumno.nombre.toLowerCase().includes(searchTerm)
  );
  mostrarDatosAlumnos(filteredStudents);
});
