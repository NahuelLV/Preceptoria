// datos.js

const students = [
  {
    nombre: "Ana",
    apellido: "García",
    dni: "12345678",
    curso: "5° 2da", // Se mantiene así para buscar fácil, se divide al renderizar
    turno: "Mañana",
    especialidad: "COMP", // Dato de ejemplo para 5°
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
    curso: "5° 1ra",
    turno: "Tarde",
    especialidad: "AUT", // Dato de ejemplo para 5°
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
    curso: "2° 2da",
    turno: "Mañana",
    especialidad: "CB", // Dato de ejemplo para 2°
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
    curso: "6° 2da",
    turno: "Tarde",
    especialidad: "COMP", // Dato de ejemplo para 6°
    responsables: [
      { nombre: "Mariana", apellido: "López", parentesco: "Madre", telefono: "1155443322", dni: "37689012", email: "mariana.lopez@example.com" },
      { nombre: "Jorge", apellido: "Torres", parentesco: "Padre", telefono: "1166778899", dni: "37689123", email: "jorge.torres@example.com" }
    ],
    notas: { Matemáticas: 4.5, Español: 5.5, Ciencias: 6.0, Historia: 7.5 },
  },
  {
    nombre: "Javier",
    apellido: "Molina",
    dni: "44556677",
    curso: "3° 9na",
    turno: "Mañana",
    especialidad: "AUT", // Dato de ejemplo para 3°
    responsables: [
      { nombre: "Silvia", apellido: "Molina", parentesco: "Madre", telefono: "1112345678", dni: "30123456", email: "silvia.molina@example.com" }
    ],
    notas: { Matemáticas: 7.0, Español: 7.5, Ciencias: 8.0, Historia: 8.5 },
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

    // --- NUEVAS FUNCIONES AUXILIARES ---

    function getCursoDivision(cursoCompleto) {
        // Ejemplo: "5° A" -> { curso: "5°", division: "A" }
        const parts = cursoCompleto ? cursoCompleto.split(' ') : ["", ""];
        return {
            curso: parts[0] || "",
            division: parts[1] || ""
        };
    }

    function getEspecialidad(cursoCompleto, especialidadAlumno) {
        const cursoNumeroMatch = cursoCompleto.match(/(\d+)/);
        if (!cursoNumeroMatch) return "";
        const cursoNum = parseInt(cursoNumeroMatch[1]);

        if (cursoNum <= 2) {
            return "CB"; // 1ro y 2do ciclo básico
        }
        if (cursoNum >= 3 && cursoNum <= 6) {
            // Usa el dato provisto en el objeto si está en el ciclo superior
            return especialidadAlumno || "N/A"; 
        }
        return "N/A";
    }

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

    // --- Filtrado (se mantiene igual, busca en el campo 'curso' completo) ---
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
        const cursoFilter = searchCurso.value.trim().toLowerCase(); // Busca en el campo curso completo

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

    // --- Render Datos (MODIFICADO) ---
    function renderDatosTable(data) {
        clearContent();
        if (!data || data.length === 0) {
            contentDiv.innerHTML = `<p>No se encontraron alumnos con esos criterios.</p>`;
            return;
        }

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        // Se agregaron las nuevas columnas: Curso, División, Especialidad
        ["Apellido", "Nombre", "DNI", "Curso", "División", "Especialidad", "Turno", "Responsable 1", "Responsable 2"].forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        data.forEach(alumno => {
            const { curso, division } = getCursoDivision(alumno.curso);
            const especialidad = getEspecialidad(alumno.curso, alumno.especialidad);

            const responsable1 = alumno.responsables && alumno.responsables[0] ? `${alumno.responsables[0].apellido} ${alumno.responsables[0].nombre}` : "N/A";
            const responsable2 = alumno.responsables && alumno.responsables[1] ? `${alumno.responsables[1].apellido} ${alumno.responsables[1].nombre}` : "N/A";

            const tr = document.createElement("tr");
            tr.tabIndex = 0;
            tr.innerHTML = `
                <td>${alumno.apellido}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.dni}</td>
                <td>${curso}</td>
                <td>${division}</td>
                <td>${especialidad}</td>
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

    // --- Render Notas (MODIFICADO) ---
    function renderNotasTable(data) {
        clearContent();
        if (!data || data.length === 0) {
            contentDiv.innerHTML = `<p>No se encontraron alumnos con esos criterios.</p>`;
            return;
        }

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        // Se agregaron las nuevas columnas: Curso, División, Especialidad
        ["Apellido", "Nombre", "DNI", "Curso", "División", "Especialidad", "Matemáticas", "Español", "Ciencias", "Historia"].forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        data.forEach(alumno => {
            const { curso, division } = getCursoDivision(alumno.curso);
            const especialidad = getEspecialidad(alumno.curso, alumno.especialidad);
            const notas = alumno.notas || {};
            const tr = document.createElement("tr");
            tr.tabIndex = 0;
            
            // Creamos las celdas de datos
            const celdaDatos = `
                <td>${alumno.apellido}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.dni}</td>
                <td>${curso}</td>
                <td>${division}</td>
                <td>${especialidad}</td>
            `;
            tr.innerHTML = celdaDatos;

            const materias = ["Matemáticas", "Español", "Ciencias", "Historia"];
            materias.forEach(materia => {
                const celdaNota = document.createElement('td');
                const nota = notas[materia] ?? "-";
                celdaNota.textContent = nota;
                // Aplicamos la clase si la nota es menor a 6
                if (nota !== "-" && parseFloat(nota) < 6) {
                    celdaNota.classList.add('desaprobado');
                }
                tr.appendChild(celdaNota);
            });

            tr.addEventListener("click", () => showAlumnoDetalle(alumno));
            tr.addEventListener("keypress", e => { if (e.key === "Enter") showAlumnoDetalle(alumno); });
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        contentDiv.appendChild(table);
    }

    // --- Mostrar detalle / Modal (MODIFICADO para mostrar Especialidad) ---
    function showAlumnoDetalle(alumno) {
        const { curso, division } = getCursoDivision(alumno.curso);
        const especialidad = getEspecialidad(alumno.curso, alumno.especialidad);

        modalNombre.textContent = `${alumno.apellido} ${alumno.nombre}`;
        modalDetalles.innerHTML = `
            <p><strong>DNI:</strong> ${alumno.dni}</p>
            <p><strong>Curso:</strong> ${curso}</p>
            <p><strong>División:</strong> ${division}</p>
            <p><strong>Especialidad:</strong> ${especialidad}</p>
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
            // Se usa Object.keys(notas) si hay notas, sino se usan las materias por defecto
            const materias = Object.keys(notas).length ? Object.keys(notas) : ["Matemáticas", "Español", "Ciencias", "Historia"];

            // Agregamos inputs para Curso, División y Especialidad
            const cursoDivWrapper = document.createElement("div");
            cursoDivWrapper.style.marginBottom = "8px";
            cursoDivWrapper.innerHTML = `
                <p>
                    <label style="font-weight:700;">Curso/División (ej: 5° A):</label> 
                    <input type="text" id="admin-input-curso" value="${alumno.curso}" style="width: 120px; padding: 4px;"/>
                </p>
                <p>
                    <label style="font-weight:700;">Especialidad (CB/COMP/AUT):</label> 
                    <input type="text" id="admin-input-especialidad" value="${alumno.especialidad || ''}" style="width: 120px; padding: 4px;"/>
                </p>
            `;
            modalNotas.appendChild(cursoDivWrapper);


            for (const materia of materias) {
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
            saveBtn.textContent = "Guardar Notas y Datos Extra";
            saveBtn.addEventListener("click", () => {
                // Actualizar objeto notas del alumno
                const inputs = form.querySelectorAll("input");
                if (!alumno.notas) alumno.notas = {};
                inputs.forEach(inp => {
                    const m = inp.dataset.materia;
                    const v = inp.value.trim();
                    alumno.notas[m] = v === "" ? null : parseFloat(v);
                });

                // Actualizar Curso y Especialidad
                alumno.curso = document.getElementById("admin-input-curso").value.trim();
                alumno.especialidad = document.getElementById("admin-input-especialidad").value.trim().toUpperCase();
                
                // Actualizar la visualización de los detalles del modal
                showAlumnoDetalle(alumno); 

                alert("Datos y Notas guardadas.");
                modal.classList.remove("show");
                // refrescar tablas
                safeRerender();
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "admin-btn";
            deleteBtn.textContent = "Eliminar Alumno";
            deleteBtn.style.marginLeft = "8px";
            deleteBtn.addEventListener("click", () => {
                const ok = confirm(`¿Eliminar definitivamente a ${alumno.apellido} ${alumno.nombre}?`);
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
            if (!hasRecover) modalNotas.innerHTML = "<li>No tiene materias adeudadas o sin acreditar</li>";
        }

        // Responsables (siempre mostrar)
        modalResponsables.innerHTML = "<h4>Responsables</h4>";
        (alumno.responsables || []).forEach(res => {
            const div = document.createElement("div");
            div.className = "responsable-item";
            div.innerHTML = `
                <p><strong>${res.parentesco}:</strong> ${res.apellido} ${res.nombre}</p>
                <p><strong>DNI:</strong> ${res.dni}</p>
                <p><strong>Teléfono:</strong> ${res.telefono}</p>
                <p><strong>Email:</strong> <a href="mailto:${res.email}">${res.email}</a></p>
            `;
            modalResponsables.appendChild(div);
        });

        modal.classList.add("show");
    }

    // --- Render Admin Table (MODIFICADO) ---
    function renderAdminTable(data) {
        adminContent.innerHTML = "";
        if (!data || data.length === 0) {
            adminContent.innerHTML = `<p>No hay alumnos</p>`;
            return;
        }

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        // Se agregaron las nuevas columnas: Curso, División, Especialidad
        ["Apellido", "Nombre", "DNI", "Curso", "División", "Especialidad", "Turno", "Acciones"].forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        data.forEach(alumno => {
            const { curso, division } = getCursoDivision(alumno.curso);
            const especialidad = getEspecialidad(alumno.curso, alumno.especialidad);

            const tr = document.createElement("tr");
            tr.dataset.dniOriginal = alumno.dni;

            tr.innerHTML = `
                <td contenteditable="true">${alumno.apellido}</td>
                <td contenteditable="true">${alumno.nombre}</td>
                <td contenteditable="true">${alumno.dni}</td>
                <td contenteditable="true" data-field="curso">${curso}</td>
                <td contenteditable="true" data-field="division">${division}</td>
                <td contenteditable="true" data-field="especialidad">${alumno.especialidad || especialidad}</td>
                <td contenteditable="true">${alumno.turno}</td>
                <td>
                    <button class="admin-btn edit">Guardar</button>
                    <button class="admin-btn notes">Editar Notas/Datos</button>
                    <button class="admin-btn delete">Borrar</button>
                </td>
            `;

            // Guardar cambios de fila
            tr.querySelector(".edit").addEventListener("click", () => {
                const tds = tr.querySelectorAll("td");
                // Los índices cambiaron: Apellido(0), Nombre(1), DNI(2), Curso(3), División(4), Especialidad(5), Turno(6)
                const originalDni = tr.dataset.dniOriginal;
                const idx = students.findIndex(s => s.dni === originalDni);
                if (idx === -1) {
                    alert("No se encontró el alumno en la lista.");
                    renderAdminTable(students);
                    return;
                }
                
                // Concatenamos Curso y División para guardar en el campo 'curso' del objeto
                const nuevoCursoCompleto = `${tds[3].textContent.trim()} ${tds[4].textContent.trim()}`.trim();

                // Asignamos valores (sanitizamos con trim)
                students[idx].apellido = tds[0].textContent.trim();
                students[idx].nombre = tds[1].textContent.trim();
                students[idx].dni = tds[2].textContent.trim();
                students[idx].curso = nuevoCursoCompleto; // El campo original guarda Curso + División
                students[idx].especialidad = tds[5].textContent.trim().toUpperCase();
                students[idx].turno = tds[6].textContent.trim();
                
                // Actualizar dataset para futuros guardados
                tr.dataset.dniOriginal = students[idx].dni;

                alert("Alumno actualizado.");
                safeRerender();
            });

            // Editar notas abre modal en modo admin
            tr.querySelector(".notes").addEventListener("click", () => {
                const originalDni = tr.dataset.dniOriginal;
                const idx = students.findIndex(s => s.dni === originalDni);
                if (idx === -1) {
                    alert("Alumno no encontrado.");
                    return;
                }
                showAlumnoDetalle(students[idx]); // modal en modo admin permitirá editar notas, curso y especialidad
            });

            // Borrar alumno
            tr.querySelector(".delete").addEventListener("click", () => {
                const originalDni = tr.dataset.dniOriginal;
                const idx = students.findIndex(s => s.dni === originalDni);
                if (idx === -1) {
                    alert("Alumno no encontrado.");
                    return;
                }
                const ok = confirm(`¿Eliminar definitivamente a ${students[idx].apellido} ${students[idx].nombre}?`);
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
        const hasFilter = searchName.value || searchDni.value || searchCurso.value;
        if (contentScreen.classList.contains("active")) {
            if (hasFilter) applyFilters();
            else renderTable(students);
        }
        if (adminScreen.classList.contains("active")) {
            renderAdminTable(students);
        }
    }

    // --- Inicial ---
});
