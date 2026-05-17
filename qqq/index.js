// Переключение секций
function showSection(num) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.add('hidden');
    });
    document.getElementById(`sec${num}`).classList.remove('hidden');
}

// ==================== 1. COUNTER ====================
let count = 0;
const counterEl = document.getElementById('counter');

document.getElementById('increase').addEventListener('click', () => {
    count++;
    counterEl.textContent = count;
});

document.getElementById('decrease').addEventListener('click', () => {
    count--;
    counterEl.textContent = count;
});

document.getElementById('reset').addEventListener('click', () => {
    count = 0;
    counterEl.textContent = count;
});

// ==================== 2. STUDENT CARD GENERATOR ====================
function generateCard() {
    const name = document.getElementById('studentName').value.trim();
    const group = document.getElementById('studentGroup').value.trim();

    if (!name || !group) {
        alert("Заполните имя и группу!");
        return;
    }

    const cardHTML = `
        <div class="card">
            <h3>🎓 Студент</h3>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Группа:</strong> ${group}</p>
            <p><strong>Дата:</strong> ${new Date().toLocaleDateString('ru-RU')}</p>
        </div>
    `;

    document.getElementById('cardsContainer').innerHTML += cardHTML;

    // Очистка полей
    document.getElementById('studentName').value = '';
    document.getElementById('studentGroup').value = '';
}

// ==================== 3. CONTACT CARDS ====================
function addContact() {
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();

    if (!name || !phone) {
        alert("Заполните имя и телефон!");
        return;
    }

    const cardHTML = `
        <div class="card">
            <h3>👤 ${name}</h3>
            <p><strong>Телефон:</strong> ${phone}</p>
        </div>
    `;

    document.getElementById('contactsContainer').innerHTML += cardHTML;

    document.getElementById('contactName').value = '';
    document.getElementById('contactPhone').value = '';
}

// ==================== 4. STUDENT MANAGER ====================
let students = JSON.parse(localStorage.getItem('students')) || [];

const studentForm = document.getElementById('studentForm');
const tbody = document.querySelector('#studentsTable tbody');

function renderStudents(filteredStudents = students) {
    tbody.innerHTML = '';
    filteredStudents.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.fullName}</td>
            <td>${student.group}</td>
            <td>${student.grade}</td>
            <td><button class="delete-btn" onclick="deleteStudent(${index})">Удалить</button></td>
        `;
        tbody.appendChild(row);
    });
}

studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const group = document.getElementById('group').value.trim();
    const grade = parseFloat(document.getElementById('grade').value);

    if (!fullName || !group || isNaN(grade)) {
        alert("Заполните все поля правильно!");
        return;
    }

    students.push({ fullName, group, grade });
    localStorage.setItem('students', JSON.stringify(students));

    renderStudents();
    studentForm.reset();
});

window.deleteStudent = function(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
};

function filterStudents() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filtered = students.filter(s => 
        s.fullName.toLowerCase().includes(searchTerm)
    );
    renderStudents(filtered);
}

// Initial render
renderStudents();

// ==================== 5. WORD KNOWLEDGE TRACKER ====================
function addWord() {
    const word = document.getElementById('word').value.trim();
    const translation = document.getElementById('translation').value.trim();

    if (!word || !translation) {
        alert("Заполните слово и перевод!");
        return;
    }

    const cardHTML = `
        <div class="card">
            <h3>📝 ${word}</h3>
            <p><strong>Перевод:</strong> ${translation}</p>
            <small>Добавлено: ${new Date().toLocaleDateString('ru-RU')}</small>
        </div>
    `;

    document.getElementById('wordsContainer').innerHTML += cardHTML;

    document.getElementById('word').value = '';
    document.getElementById('translation').value = '';
}

function clearAllWords() {
    if (confirm("Очистить все слова?")) {
        document.getElementById('wordsContainer').innerHTML = '';
    }
}

// Запуск первого раздела
showSection(1);