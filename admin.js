// ===== Admin Portal JavaScript =====

// Data Storage
let students = [
    {
        id: 1,
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91-9876543210',
        program: 'C-Suite League',
        enrollmentDate: '2024-01-15',
        status: 'Active',
        goals: 'Reach C-suite position in tech company'
    },
    {
        id: 2,
        name: 'Anjali Patel',
        email: 'anjali.patel@email.com',
        phone: '+91-9876543211',
        program: 'Leadership Essentials',
        enrollmentDate: '2024-01-14',
        status: 'Pending',
        goals: 'Develop leadership skills for team management'
    }
];

let programs = [
    {
        id: 1,
        name: 'C-Suite League',
        duration: '6 Months',
        price: 75000,
        studentsEnrolled: 234,
        status: 'Active',
        description: 'Master Business Warfare Tactics and reach the C-suite',
        features: ['Weekly Q&A Sessions', '1-on-1 Mentorship', 'Global Network Access', 'Board Placement Support']
    },
    {
        id: 2,
        name: '100 Board Members',
        duration: '4 Months',
        price: 45000,
        studentsEnrolled: 156,
        status: 'Active',
        description: 'Break through career barriers and secure board positions',
        features: ['Board Readiness Assessment', 'Networking Masterclasses', 'Personal Branding']
    },
    {
        id: 3,
        name: 'Leadership Essentials',
        duration: '4 Weeks',
        price: 15000,
        studentsEnrolled: 456,
        status: 'Active',
        description: 'Build unapologetic leadership mindset',
        features: ['Core Leadership Skills', 'Office Politics Mastery', 'Confidence Building']
    }
];

let enrollments = [
    {
        id: 1,
        studentName: 'Priya Sharma',
        program: 'C-Suite League',
        enrollmentDate: '2024-01-15',
        status: 'Active'
    },
    {
        id: 2,
        studentName: 'Anjali Patel',
        program: 'Leadership Essentials',
        enrollmentDate: '2024-01-14',
        status: 'Pending'
    }
];

// ===== Navigation =====
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all items and sections
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Show corresponding section
        const sectionId = this.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block';
        }
    });
});

// ===== Modal Functions =====
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function openStudentModal() {
    openModal('studentModal');
}

function openProgramModal() {
    openModal('programModal');
}

function openEnrollmentModal() {
    populateStudentDropdown();
    openModal('enrollmentModal');
}

// ===== Populate Dropdowns =====
function populateStudentDropdown() {
    const dropdown = document.getElementById('enrollmentStudent');
    dropdown.innerHTML = '<option value="">Choose Student</option>';
    
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.name;
        option.textContent = student.name;
        dropdown.appendChild(option);
    });
}

// ===== Form Submissions =====
document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newStudent = {
        id: students.length + 1,
        name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
        program: document.getElementById('studentProgram').value,
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        goals: document.getElementById('studentGoals').value
    };
    
    students.push(newStudent);
    renderStudentsTable();
    closeModal('studentModal');
    this.reset();
    showNotification('Student added successfully!', 'success');
});

document.getElementById('programForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const features = document.getElementById('programFeatures').value.split(',').map(f => f.trim());
    
    const newProgram = {
        id: programs.length + 1,
        name: document.getElementById('programName').value,
        duration: document.getElementById('programDuration').value,
        price: parseInt(document.getElementById('programPrice').value),
        studentsEnrolled: 0,
        status: 'Active',
        description: document.getElementById('programDescription').value,
        features: features
    };
    
    programs.push(newProgram);
    renderProgramsTable();
    closeModal('programModal');
    this.reset();
    showNotification('Program added successfully!', 'success');
});

document.getElementById('enrollmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newEnrollment = {
        id: enrollments.length + 1,
        studentName: document.getElementById('enrollmentStudent').value,
        program: document.getElementById('enrollmentProgram').value,
        enrollmentDate: document.getElementById('enrollmentDate').value,
        status: document.getElementById('enrollmentStatus').value
    };
    
    enrollments.push(newEnrollment);
    renderEnrollmentsTable();
    closeModal('enrollmentModal');
    this.reset();
    showNotification('Enrollment created successfully!', 'success');
});

// ===== Table Rendering =====
function renderStudentsTable() {
    const tbody = document.getElementById('studentsTable');
    tbody.innerHTML = '';
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.program}</td>
            <td>${student.enrollmentDate}</td>
            <td><span class="status-badge status-${student.status.toLowerCase()}">${student.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-view" onclick="viewStudent(${student.id})"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon btn-edit" onclick="editStudent(${student.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon btn-delete" onclick="deleteStudent(${student.id})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderProgramsTable() {
    const tbody = document.getElementById('programsTable');
    tbody.innerHTML = '';
    
    programs.forEach(program => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${program.name}</td>
            <td>${program.duration}</td>
            <td>₹${program.price.toLocaleString()}</td>
            <td>${program.studentsEnrolled}</td>
            <td><span class="status-badge status-${program.status.toLowerCase()}">${program.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-view" onclick="viewProgram(${program.id})"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon btn-edit" onclick="editProgram(${program.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon btn-delete" onclick="deleteProgram(${program.id})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderEnrollmentsTable() {
    const tbody = document.getElementById('enrollmentsTable');
    tbody.innerHTML = '';
    
    enrollments.forEach(enrollment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${enrollment.studentName}</td>
            <td>${enrollment.program}</td>
            <td>${enrollment.enrollmentDate}</td>
            <td><span class="status-badge status-${enrollment.status.toLowerCase()}">${enrollment.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-view" onclick="viewEnrollment(${enrollment.id})"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon btn-edit" onclick="editEnrollment(${enrollment.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon btn-delete" onclick="deleteEnrollment(${enrollment.id})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ===== CRUD Operations =====
function viewStudent(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        alert(`Student Details:\n\nName: ${student.name}\nEmail: ${student.email}\nPhone: ${student.phone}\nProgram: ${student.program}\nGoals: ${student.goals}`);
    }
}

function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentEmail').value = student.email;
        document.getElementById('studentPhone').value = student.phone;
        document.getElementById('studentProgram').value = student.program;
        document.getElementById('studentGoals').value = student.goals;
        
        openModal('studentModal');
        
        // Change form submission to update instead of create
        document.getElementById('studentForm').onsubmit = function(e) {
            e.preventDefault();
            student.name = document.getElementById('studentName').value;
            student.email = document.getElementById('studentEmail').value;
            student.phone = document.getElementById('studentPhone').value;
            student.program = document.getElementById('studentProgram').value;
            student.goals = document.getElementById('studentGoals').value;
            
            renderStudentsTable();
            closeModal('studentModal');
            this.reset();
            showNotification('Student updated successfully!', 'success');
            
            // Reset back to create mode
            document.getElementById('studentForm').onsubmit = arguments.callee.caller;
        };
    }
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== id);
        renderStudentsTable();
        showNotification('Student deleted successfully!', 'success');
    }
}

function viewProgram(id) {
    const program = programs.find(p => p.id === id);
    if (program) {
        alert(`Program Details:\n\nName: ${program.name}\nDuration: ${program.duration}\nPrice: ₹${program.price}\nStudents Enrolled: ${program.studentsEnrolled}\nDescription: ${program.description}\nFeatures: ${program.features.join(', ')}`);
    }
}

function editProgram(id) {
    const program = programs.find(p => p.id === id);
    if (program) {
        document.getElementById('programName').value = program.name;
        document.getElementById('programDuration').value = program.duration;
        document.getElementById('programPrice').value = program.price;
        document.getElementById('programDescription').value = program.description;
        document.getElementById('programFeatures').value = program.features.join(', ');
        
        openModal('programModal');
        
        document.getElementById('programForm').onsubmit = function(e) {
            e.preventDefault();
            program.name = document.getElementById('programName').value;
            program.duration = document.getElementById('programDuration').value;
            program.price = parseInt(document.getElementById('programPrice').value);
            program.description = document.getElementById('programDescription').value;
            program.features = document.getElementById('programFeatures').value.split(',').map(f => f.trim());
            
            renderProgramsTable();
            closeModal('programModal');
            this.reset();
            showNotification('Program updated successfully!', 'success');
            
            document.getElementById('programForm').onsubmit = arguments.callee.caller;
        };
    }
}

function deleteProgram(id) {
    if (confirm('Are you sure you want to delete this program?')) {
        programs = programs.filter(p => p.id !== id);
        renderProgramsTable();
        showNotification('Program deleted successfully!', 'success');
    }
}

function viewEnrollment(id) {
    const enrollment = enrollments.find(e => e.id === id);
    if (enrollment) {
        alert(`Enrollment Details:\n\nStudent: ${enrollment.studentName}\nProgram: ${enrollment.program}\nDate: ${enrollment.enrollmentDate}\nStatus: ${enrollment.status}`);
    }
}

function editEnrollment(id) {
    const enrollment = enrollments.find(e => e.id === id);
    if (enrollment) {
        document.getElementById('enrollmentStudent').value = enrollment.studentName;
        document.getElementById('enrollmentProgram').value = enrollment.program;
        document.getElementById('enrollmentDate').value = enrollment.enrollmentDate;
        document.getElementById('enrollmentStatus').value = enrollment.status;
        
        openModal('enrollmentModal');
        
        document.getElementById('enrollmentForm').onsubmit = function(e) {
            e.preventDefault();
            enrollment.studentName = document.getElementById('enrollmentStudent').value;
            enrollment.program = document.getElementById('enrollmentProgram').value;
            enrollment.enrollmentDate = document.getElementById('enrollmentDate').value;
            enrollment.status = document.getElementById('enrollmentStatus').value;
            
            renderEnrollmentsTable();
            closeModal('enrollmentModal');
            this.reset();
            showNotification('Enrollment updated successfully!', 'success');
            
            document.getElementById('enrollmentForm').onsubmit = arguments.callee.caller;
        };
    }
}

function deleteEnrollment(id) {
    if (confirm('Are you sure you want to delete this enrollment?')) {
        enrollments = enrollments.filter(e => e.id !== id);
        renderEnrollmentsTable();
        showNotification('Enrollment deleted successfully!', 'success');
    }
}

// ===== Search and Filter =====
document.getElementById('studentSearch')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#studentsTable tr');
    
    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const email = row.cells[1].textContent.toLowerCase();
        
        if (name.includes(searchTerm) || email.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// ===== Notifications =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            </div>
            <div class="notification-message">${message}</div>
        </div>
    `;
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 10px;
            padding: 1rem 1.5rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 3000;
            min-width: 300px;
            animation: slideInRight 0.3s ease;
            border-left: 4px solid ${type === 'success' ? '#10B981' : '#EF4444'};
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .notification-icon {
            color: ${type === 'success' ? '#10B981' : '#EF4444'};
            font-size: 1.25rem;
        }
        .notification-message {
            color: #1F2937;
            font-weight: 500;
        }
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
            document.head.removeChild(styleSheet);
        }
    }, 3000);
}

// ===== Export Report =====
document.querySelector('.admin-actions button')?.addEventListener('click', function() {
    const reportData = {
        students: students.length,
        programs: programs.length,
        enrollments: enrollments.length,
        revenue: programs.reduce((total, program) => total + (program.price * program.studentsEnrolled), 0),
        generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `iron-lady-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('Report exported successfully!', 'success');
});

// ===== Initialize Tables on Load =====
document.addEventListener('DOMContentLoaded', function() {
    renderStudentsTable();
    renderProgramsTable();
    renderEnrollmentsTable();
});

// ===== Mobile Menu Toggle =====
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Add mobile menu button if needed
if (window.innerWidth <= 768) {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.onclick = toggleMobileMenu;
    
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(mobileMenuBtn, mainContent.firstChild);
    
    // Add mobile menu styles
    const mobileStyles = `
        .mobile-menu-btn {
            display: block;
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1001;
            background: var(--admin-primary);
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 8px;
            cursor: pointer;
            margin-bottom: 1rem;
        }
    `;
    
    const mobileStyleSheet = document.createElement('style');
    mobileStyleSheet.textContent = mobileStyles;
    document.head.appendChild(mobileStyleSheet);
}
