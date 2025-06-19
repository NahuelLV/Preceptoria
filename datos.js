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
        dni: "38790123",
        email: "jorge.torres@example.com"
      }
    ],
    notas: { Matemáticas: 6.8, Español: 7.5, Ciencias: 6.2, Arte: 5.9 }, 
  },
];

const contenidoDiv = document.getElementById("content");

const welcomeScreen = document.getElementById("welcome-screen");
const menuScreen = document.getElementById("menu-screen");
const contentScreen = document.getElementById("content-screen");

const startBtn = document.getElementById("start-btn");
const backBtn = document.getElementById("back-btn");

const searchName = document.getElementById("search-name");
const searchDni = document.getElementById("search-dni");
const searchCurso = document.getElementById("search-curso");

let currentSection = null;
let filteredStudents = [];

function showScreen(screen) {
  [welcomeScreen, menuScreen, contentScreen].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

function tdWithText(text) {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}

function renderDatos(data) {
  contenidoDiv.innerHTML = "";
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  const columns = [
    { header: "Nombre", key: "nombre" },
    { header: "Apellido", key: "apellido" },
    { header: "DNI", key: "dni" },
    { header: "Curso", key: "curso" },
    { header: "Turno", key: "turno" },
    { header: "Responsable 1", key: "responsable1" },
    { header: "Responsable 2", key: "responsable2" }
  ];

  columns.forEach(col => {
    const th = document.createElement("th");
    th.textContent = col.header;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  data.forEach(s => {
    const tr = document.createElement("tr");

    tr.appendChild(tdWithText(s.nombre));
    tr.appendChild(tdWithText(s.apellido));
    tr.appendChild(tdWithText(s.dni));
    tr.appendChild(tdWithText(s.curso));
    tr.appendChild(tdWithText(s.turno));

    const res1 = s.responsables[0] ? `${s.responsables[0].nombre} (${s.responsables[0].parentesco})` : "";
    const res2 = s.responsables[1] ? `${s.responsables[1].nombre} (${s.responsables[1].parentesco})` : "";
    tr.appendChild(tdWithText(res1));
    tr.appendChild(tdWithText(res2));

    tr.style.cursor = "pointer";
    tr.addEventListener("click", () => showAlumnoDetalle(s));

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  contenidoDiv.appendChild(table);
}

function renderNotas(data) {
  contenidoDiv.innerHTML = "";
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  const subjects = new Set();
  data.forEach(s => {
    Object.keys(s.notas).forEach(sub => subjects.add(sub));
  });
  const subjectList = Array.from(subjects).sort();

  const headers = ["Nombre", "Apellido", "Curso", "Turno", ...subjectList];
  headers.forEach(hdr => {
    const th = document.createElement("th");
    th.textContent = hdr;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  data.forEach(s => {
    const tr = document.createElement("tr");
    tr.appendChild(tdWithText(s.nombre));
    tr.appendChild(tdWithText(s.apellido));
    tr.appendChild(tdWithText(s.curso));
    tr.appendChild(tdWithText(s.turno));
    subjectList.forEach(sub => {
      const nota = s.notas[sub];
      const td = document.createElement("td");
      if(nota !== undefined){
        td.textContent = nota;
        if(nota < 6){
          td.style.color = "#D32F2F";
          td.style.fontWeight = "bold";
        }
      }
      tr.appendChild(td);
    });
    tr.style.cursor = "pointer";
    tr.addEventListener("click", () => showAlumnoDetalle(s));
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  contenidoDiv.appendChild(table);
}

function showAlumnoDetalle(alumno) {
  contenidoDiv.innerHTML = "";
  const datosDiv = document.createElement("div");
  datosDiv.style.color = "#eee";
  datosDiv.style.textAlign = "left";
  datosDiv.style.padding = "10px 0";

  const addItem = (label, value) => {
    const p = document.createElement("p");
    p.style.marginBottom = "12px";
    p.innerHTML = `<strong style="color:#D32F2F;">${label}:</strong> ${value}`;
    datosDiv.appendChild(p);
  };

  addItem("Nombre", alumno.nombre);
  addItem("Apellido", alumno.apellido);
  addItem("DNI", alumno.dni);
  addItem("Curso", alumno.curso);
  addItem("Turno", alumno.turno);

  alumno.responsables.forEach((r, i) => {
    addItem(`Responsable ${i + 1}`, `${r.nombre} ${r.apellido} (${r.parentesco})`);
    addItem(`Teléfono`, r.telefono);
    addItem(`DNI Responsable`, r.dni);
    addItem(`Email`, `<a href="mailto:${r.email}" style="color:#1976D2;">${r.email}</a>`);
  });

  const desaprobadas = Object.entries(alumno.notas).filter(([mat, nota]) => nota < 6);
  if (desaprobadas.length > 0) {
    const h4 = document.createElement("h4");
    h4.textContent = "Notas desaprobadas:";
    h4.style.color = "#D32F2F";
    h4.style.marginTop = "25px";
    datosDiv.appendChild(h4);

    desaprobadas.forEach(([mat, nota]) => {
      addItem(mat, nota);
    });
  } else {
    const p = document.createElement("p");
    p.textContent = "No tiene notas desaprobadas.";
    p.style.marginTop = "25px";
    datosDiv.appendChild(p);
  }

  contenidoDiv.appendChild(datosDiv);
}

function showDatos() {
  currentSection = "datos";
  clearSearchInputs();
  filteredStudents = [...students];
  renderDatos(filteredStudents);
  showScreen(contentScreen);
}

function showNotas() {
  currentSection = "notas";
  clearSearchInputs();
  filteredStudents = [...students];
  renderNotas(filteredStudents);
  showScreen(contentScreen);
}

function clearSearchInputs() {
  searchName.value = "";
  searchDni.value = "";
  searchCurso.value = "";
}

function filterStudents() {
  const nameQuery = searchName.value.trim().toLowerCase();
  const dniQuery = searchDni.value.trim();
  const cursoQueryRaw = searchCurso.value.trim().toLowerCase();

  let cursoQuery = "";
  let divisionQuery = "";
  if(cursoQueryRaw){
    const parts = cursoQueryRaw.split(" ");
    cursoQuery = parts[0];
    divisionQuery = parts[1] || "";
  }

  filteredStudents = students.filter(s => {
    const matchName = nameQuery === "" || 
      (`${s.nombre} ${s.apellido}`).toLowerCase().includes(nameQuery);

    const matchDni = dniQuery === "" || s.dni.includes(dniQuery);

    let matchCurso = true;
    if(cursoQuery){
      const cursoSplit = s.curso.toLowerCase().split(" ");
      const cursoPart = cursoSplit[0];
      const divisionPart = cursoSplit[1] || "";
      matchCurso = cursoPart.includes(cursoQuery);
      if(divisionQuery){
        matchCurso = matchCurso && divisionPart.includes(divisionQuery);
      }
    }

    return matchName && matchDni && matchCurso;
  });

  if (currentSection === "datos") {
    renderDatos(filteredStudents);
  } else if (currentSection === "notas") {
    renderNotas(filteredStudents);
  }
}

startBtn.addEventListener("click", () => {
  showScreen(menuScreen);
});

backBtn.addEventListener("click", () => {
  showScreen(menuScreen);
  contenidoDiv.innerHTML = "";
  clearSearchInputs();
});

document.querySelectorAll(".menu-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.getAttribute("data-section");
    if (section === "datos") {
      showDatos();
    } else if (section === "notas") {
      showNotas();
    }
  });
});

[searchName, searchDni, searchCurso].forEach(input => {
  input.addEventListener("input", () => {
    filterStudents();
  });
});

showScreen(welcomeScreen);
