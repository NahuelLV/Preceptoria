// Datos simulados (con DNI y Turno, y datos completos de responsables)
const students = [
  {
    nombre: "Ana",
    apellido: "García",
    dni: "12345678",
    curso: "5° A",
    turno: "Mañana",
    responsables: [ // Cambiado a un array para múltiples responsables
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
    notas: { Matemáticas: 8.5, Español: 9.0, Ciencias: 7.8 },
  },
  {
    nombre: "Juan",
    apellido: "Pérez",
    dni: "87654321",
    curso: "5° B",
    turno: "Tarde",
    responsables: [
      {
        nombre: "Carlos",
        apellido: "Pérez",
        parentesco: "Padre",
        telefono: "1155443322",
        dni: "22334455",
        email: "carlos.perez@example.com"
      },
      {
        nombre: "Laura",
        apellido: "Fernández",
        parentesco: "Madre",
        telefono: "1166778899",
        dni: "27890123",
        email: "laura.fernandez@example.com"
      }
    ],
    notas: { Matemáticas: 6.0, Español: 7.2, Ciencias: 6.5 },
  },
  {
    nombre: "Lucía",
    apellido: "Martínez",
    dni: "98765432",
    curso: "5° A",
    turno: "Mañana",
    responsables: [
      {
        nombre: "José",
        apellido: "Martínez",
        parentesco: "Tutor",
        telefono: "1111223344",
        dni: "28901234",
        email: "jose.martinez@example.com"
      }
    ], // Un solo responsable para este ejemplo
    notas: { Matemáticas: 9.2, Español: 8.7, Ciencias: 9.0 },
  },
  {
    nombre: "Carlos",
    apellido: "Rodríguez",
    dni: "23456789",
    curso: "5° C",
    turno: "Tarde",
    responsables: [
      {
        nombre: "Ricardo",
        apellido: "Rodríguez",
        parentesco: "Padre",
        telefono: "1144556677",
        dni: "29012345",
        email: "ricardo.rodriguez@example.com"
      },
      {
        nombre: "Elena",
        apellido: "Ruiz",
        parentesco: "Madre",
        telefono: "1177889900",
        dni: "30123456",
        email: "elena.ruiz@example.com"
      }
    ],
    notas: { Matemáticas: 5.5, Español: 6.0, Ciencias: 5.0 },
  },
   {
    nombre: "Sofía",
    apellido: "González",
    dni: "11223344",
    curso: "6° A",
    turno: "Mañana",
    responsables: [
      {
        nombre: "Pedro",
        apellido: "González",
        parentesco: "Padre",
        telefono: "1122334455",
        dni: "35467890",
        email: "pedro.gonzalez@example.com"
      },
      {
        nombre: "Elena",
        apellido: "Díaz",
        parentesco: "Madre",
        telefono: "1199887766",
        dni: "36578901",
        email: "elena.diaz@example.com"
      }
    ],
    notas: { Matemáticas: 7.0, Español: 8.0, Ciencias: 7.5 },
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
        dni: "38790123",
        email: "jorge.torres@example.com"
      }
    ],
    notas: { Matemáticas: 6.8, Español: 7.5, Ciencias: 6.2 },
  },
];

const contenidoDiv = document.getElementById("content");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modal-close");
const modalNombre = document.getElementById("modal-nombre");
const modalCurso = document.getElementById("modal-curso");
const modalResponsables = document.getElementById("modal-responsables");
const modalNotas = document.getElementById("modal-notas");
const backBtn = document.getElementById("back-btn");
const startBtn = document.getElementById("start-btn");
const menuScreen = document.getElementById("menu-screen");
const contentScreen = document.getElementById("content-screen");
const welcomeScreen = document.getElementById("welcome-screen");
const menuButtons = document.querySelectorAll(".menu-btn");
const searchInput = document.getElementById("search-input");

let currentSection = '';

// Función para normalizar strings (quitar tildes, convertir a minúsculas y reemplazar '°' por 'to')
function normalizeString(str) {
  if (typeof str !== 'string') return '';
  let normalized = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  // Reemplazar '°' por 'to' específicamente para la normalización del curso
  normalized = normalized.replace(/°/g, 'to');
  return normalized;
}

// Función para mostrar los datos de los alumnos con columnas separadas
function mostrarDatosAlumnos(alumnosAMostrar = students) {
  contenidoDiv.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>DNI</th>
          <th>Curso</th>
          <th>Turno</th>
          <th>Responsables</th>
        </tr>
      </thead>
      <tbody>
        ${alumnosAMostrar
          .map(
            (alumno) => `
          <tr onclick="showModalAlumno(${students.indexOf(alumno)})">
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.dni}</td>
            <td>${alumno.curso}</td>
            <td>${alumno.turno}</td>
            <td>${alumno.responsables.map(r => r.nombre + ' ' + r.apellido).join(' / ')}</td>
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
  modalNombre.textContent = `${alumno.nombre} ${alumno.apellido}`;
  
  // Mostrar Curso, DNI y Turno del alumno. El DNI solo se muestra aquí.
  modalCurso.innerHTML = `<strong>Curso:</strong> ${alumno.curso}<br><strong>DNI:</strong> ${alumno.dni}<br><strong>Turno:</strong> ${alumno.turno}`;

  modalResponsables.innerHTML = "<h4>Responsables</h4>"; // Título para la sección de responsables
  alumno.responsables.forEach((resp, i) => {
    if (i > 0) { // Añadir <hr> antes de cada responsable adicional
      modalResponsables.innerHTML += '<hr>';
    }
    modalResponsables.innerHTML += `
      <p><strong>Nombre:</strong> ${resp.nombre} ${resp.apellido}</p>
      <p><strong>Parentesco:</strong> ${resp.parentesco}</p>
      <p><strong>Teléfono:</strong> ${resp.telefono}</p>
      <p><strong>DNI:</strong> ${resp.dni}</p>
      <p><strong>Email:</strong> ${resp.email}</p>
    `;
  });
  
  modalNotas.innerHTML = ""; // Limpiar notas previas
  for (const [materia, nota] of Object.entries(alumno.notas)) {
    const li = document.createElement("li");
    li.textContent = `${materia}: ${nota.toFixed(1)}`;
    modalNotas.appendChild(li);
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

// Comenzar
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
    searchInput.value = ''; // Limpiar la búsqueda al cambiar de sección
  };
});

// Función para renderizar cada sección (alumnos, notas)
function renderSection(section, studentsToRender = students) {
  switch (section) {
    case "datos":
      mostrarDatosAlumnos(studentsToRender);
      break;
    case "notas":
      mostrarNotas(studentsToRender);
      break;
    default:
      contenidoDiv.innerHTML = "<h3>Funcionalidad en desarrollo...</h3>";
  }
}

// Mostrar las notas de los estudiantes con columnas separadas
function mostrarNotas(alumnosAMostrar = students) {
  contenidoDiv.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Curso</th>
          <th>Turno</th>
          <th>Matemáticas</th>
          <th>Español</th>
          <th>Ciencias</th>
        </tr>
      </thead>
      <tbody>
        ${alumnosAMostrar
          .map(
            (alumno) => `
          <tr onclick="showModalAlumno(${students.indexOf(alumno)})">
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.curso}</td>
            <td>${alumno.turno}</td>
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

// Función de búsqueda (SOLO busca por datos del alumno: DNI, curso+apellido, y turno)
searchInput.addEventListener("input", function () {
  const normalizedSearchTerm = normalizeString(searchInput.value.trim());
  
  const filteredStudents = students.filter((alumno) => {
    // Normalizar todos los campos de alumno relevantes para la búsqueda
    const normalizedNombreCompleto = normalizeString(`${alumno.nombre} ${alumno.apellido}`);
    const normalizedDni = normalizeString(alumno.dni);
    const normalizedTurno = normalizeString(alumno.turno);

    // Normalizamos el curso para la búsqueda "apellido + (parte de) curso"
    const normalizedCursoParaBusqueda = normalizeString(alumno.curso).replace(/[^0-9a-z]/gi, '');
    const normalizedApellidoCurso = normalizeString(`${alumno.apellido} ${alumno.curso}`);

    // Normalizar solo el número del curso para búsquedas como "5"
    const normalizedCursoSoloNumero = normalizeString(alumno.curso).replace(/[^0-9]/g, '');

    const searchParts = normalizedSearchTerm.split(' ').filter(part => part.length > 0);

    let matches = false;

    // 1. Coincidencia por nombre completo, DNI o turno (todo normalizado)
    if (normalizedNombreCompleto.includes(normalizedSearchTerm) ||
        normalizedDni.includes(normalizedSearchTerm) ||
        normalizedTurno.includes(normalizedSearchTerm)) {
        matches = true;
    }

    // 2. Coincidencia para "apellido + curso" (todo normalizado)
    if (!matches && searchParts.length >= 2) {
        const searchApellido = searchParts[0];
        const searchCurso = searchParts.slice(1).join(' '); 

        if (normalizeString(alumno.apellido).includes(searchApellido)) {
            if (normalizedCursoParaBusqueda.includes(normalizeString(searchCurso))) {
                matches = true;
            }
        }
    }
    
    // 3. Permite buscar solo por el número del curso (e.g., "5" o "6")
    if (!matches && normalizedCursoSoloNumero.includes(normalizedSearchTerm) && normalizedSearchTerm.length > 0) {
        matches = true;
    }

    // *** ELIMINADA LA SECCIÓN DE BÚSQUEDA DENTRO DE LOS RESPONSABLES ***

    return matches;
  });

  renderSection(currentSection, filteredStudents);
});