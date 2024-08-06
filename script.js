const botToken = '7239458839:AAHTXtF23O2Zfe7q1OSOTtpQvbCjXCflFAg';
const chatId = '5541151768';
const attendance = {};

// Predefined username and password
const validUsername = 'admin';
const validPassword = 'password';

const departmentNames = {
    'ct': 'Computer Engineering',
    'ce': 'Civil Engineering',
    'me': 'Mechanical Engineering',
    'eee': 'Electrical & Electronics Engineering',
    'ae': 'Architecture Engineering',
    'am': 'Automobile Engineering'
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validUsername && password === validPassword) {
        alert('Login successful!');
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('sidebar').style.display = 'block';
        document.getElementById('attendance-container').style.display = 'block';
    } else {
        alert('Invalid username or password.');
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

function generateStudentList() {
    const classStrength = document.getElementById('classStrength').value;
    const studentsContainer = document.getElementById('students');

    if (classStrength > 0) {
        studentsContainer.innerHTML = '';
        for (let i = 1; i <= classStrength; i++) {
            studentsContainer.innerHTML += `
                <div>
                    Student ${i}: 
                    <input type="radio" id="present_${i}" name="attendance_${i}" value="present">
                    <label for="present_${i}">Present</label>
                    <input type="radio" id="absent_${i}" name="attendance_${i}" value="absent">
                    <label for="absent_${i}">Absent</label>
                </div>
            `;
        }
        document.getElementById('studentList').style.display = 'block';
    } else {
        alert('Please enter a valid class strength.');
    }
}

function markAttendance() {
    const classStrength = document.getElementById('classStrength').value;
    const department = document.getElementById('department').value;
    const semester = document.getElementById('semester').value;
    const date = document.getElementById('date').value;

    if (!date) {
        alert('Please select a date.');
        return;
    }

    const attendanceData = {};
    for (let i = 1; i <= classStrength; i++) {
        const attendance = document.querySelector(`input[name="attendance_${i}"]:checked`);
        if (attendance) {
            attendanceData[`Student ${i}`] = attendance.value;
        } else {
            alert(`Please mark attendance for Student ${i}.`);
            return;
        }
    }

    attendance[date] = {
        department: departmentNames[department],
        semester: semester,
        data: attendanceData
    };

    alert('Attendance marked successfully!');
    console.log(attendance);
    showAttendance();
}

function showAttendance() {
    const output = document.getElementById('output');
    output.innerHTML = '';

    for (const date in attendance) {
        const attendanceData = attendance[date];
        let tableHTML = `
            <h2>Date: ${date}</h2>
            <p>Department: ${attendanceData.department}</p>
            <p>Semester: ${attendanceData.semester}</p>
            <table class="attendance-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (const student in attendanceData.data) {
            tableHTML += `
                <tr>
                    <td>${student}</td>
                    <td>${attendanceData.data[student]}</td>
                </tr>
            `;
        }

        tableHTML += `
                </tbody>
            </table>
        `;
        output.innerHTML += tableHTML;
    }
}

function markMinimalAttendance() {
    const classStrength = document.getElementById('classStrength').value;
    let presentCount = 0;
    let absentCount = 0;

    for (let i = 1; i <= classStrength; i++) {
        const attendance = document.querySelector(`input[name="attendance_${i}"]:checked`);
        if (attendance && attendance.value === 'present') {
            presentCount++;
        } else if (attendance && attendance.value === 'absent') {
            absentCount++;
        }
    }

    if (presentCount < classStrength) {
        for (let i = 1; i <= classStrength; i++) {
            const attendance = document.querySelector(`input[name="attendance_${i}"]:checked`);
            if (!attendance || attendance.value !== 'present') {
                document.getElementById(`absent_${i}`).checked = true;
            }
        }
    }

    alert('Minimal attendance marked successfully!');
}

function balanceAttendance() {
    const classStrength = document.getElementById('classStrength').value;
    let presentCount = 0;
    let absentCount = 0;

    // First, count how many students are marked absent
    for (let i = 1; i <= classStrength; i++) {
        const attendance = document.querySelector(`input[name="attendance_${i}"]:checked`);
        if (attendance && attendance.value === 'absent') {
            presentCount++;
        } else if (attendance && attendance.value === 'present') {
            presentCount++;
        }
    }

    if (absentCount < classStrength) {
        for (let i = 1; i <= classStrength; i++) {
            const attendance = document.querySelector(`input[name="attendance_${i}"]:checked`);
            if (!attendance || attendance.value !== 'absent') {
                document.getElementById(`present_${i}`).checked = true;
            }
        }
    }

    alert('balanceAttendance marked successfully!');
}

function showPresentStudents() {
    const output = document.getElementById('output');
    output.innerHTML = '';

    for (const date in attendance) {
        const attendanceData = attendance[date];
        let tableHTML = `
            <h2>Date: ${date}</h2>
            <p>Department: ${attendanceData.department}</p>
            <p>Semester: ${attendanceData.semester}</p>
            <table class="attendance-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (const student in attendanceData.data) {
            if (attendanceData.data[student] === 'present') {
                tableHTML += `
                    <tr>
                        <td>${student}</td>
                        <td>${attendanceData.data[student]}</td>
                    </tr>
                `;
            }
        }

        tableHTML += `
                </tbody>
            </table>
        `;
        output.innerHTML += tableHTML;
    }
}

function showAbsentStudents() {
    const output = document.getElementById('output');
    output.innerHTML = '';

    for (const date in attendance) {
        const attendanceData = attendance[date];
        let tableHTML = `
            <h2>Date: ${date}</h2>
            <p>Department: ${attendanceData.department}</p>
            <p>Semester: ${attendanceData.semester}</p>
            <table class="attendance-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (const student in attendanceData.data) {
            if (attendanceData.data[student] === 'absent') {
                tableHTML += `
                    <tr>
                        <td>${student}</td>
                        <td>${attendanceData.data[student]}</td>
                    </tr>
                `;
            }
        }

        tableHTML += `
                </tbody>
            </table>
        `;
        output.innerHTML += tableHTML;
    }
}

function sendSummary() {
    for (const date in attendance) {
        const attendanceData = attendance[date];
        let summary = `
            Date: ${date}\n
            Department: ${attendanceData.department}\n
            Semester: ${attendanceData.semester}\n
            Attendance:\n
        `;

        for (const student in attendanceData.data) {
            summary += `${student}: ${attendanceData.data[student]}\n`;
        }

        // Send summary via Telegram
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: summary
            })
        }).then(response => {
            if (response.ok) {
                alert('Summary sent successfully!');
            } else {
                alert('Failed to send summary.');
            }
        }).catch(error => {
            console.error('Error sending summary:', error);
            alert('An error occurred while sending the summary.');
        });
    }
}

function deleteData() {
    const confirmed = confirm('Are you sure you want to delete all data? This action cannot be undone.');
    if (confirmed) {
        for (const date in attendance) {
            delete attendance[date];
        }
        alert('All data deleted successfully.');
        document.getElementById('output').innerHTML = '';
    }
}

function exitProgram() {
    const confirmed = confirm('Are you sure you want to exit?');
    if (confirmed) {
        window.close();
    }
}

function resetAttendance() {
    const classStrength = document.getElementById('classStrength').value;

    for (let i = 1; i <= classStrength; i++) {
        const attendance = document.querySelector(`input[name="attendance_${i}"]:checked`);
        if (attendance) {
            attendance.checked = false;
        }
    }

    alert('Attendance reset successfully.');
}

function exportAttendance() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let yPosition = 10;

    for (const date in attendance) {
        const attendanceData = attendance[date];
        let text = `
            Date: ${date}\n
            Department: ${attendanceData.department}\n
            Semester: ${attendanceData.semester}\n
            Attendance:\n
        `;

        for (const student in attendanceData.data) {
            text += `${student}: ${attendanceData.data[student]}\n`;
        }

        doc.text(text, 10, yPosition);
        yPosition += 10 + (attendanceData.data.length * 10);
    }

    doc.save('attendance.pdf');
}
