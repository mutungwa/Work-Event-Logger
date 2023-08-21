// Get form elements
const eventForm = document.getElementById('eventForm');
const logList = document.getElementById('logList');

// Get input elements
const nameInput = document.getElementById('name');
const idNumberInput = document.getElementById('idNumber');
const departmentInput = document.getElementById('department');

// Get button elements
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

// Add event listeners to buttons
signInBtn.addEventListener('click', () => logEvent('Signed In'));
signOutBtn.addEventListener('click', () => logEvent('Signed Out'));

// Add a button for downloading data
const downloadBtn = document.createElement('button');
downloadBtn.textContent = 'Download Log';
downloadBtn.addEventListener('click', downloadLog);

// Insert the download button between the sign-in and sign-out buttons
const buttonContainer = document.querySelector('.button-container');
buttonContainer.insertBefore(downloadBtn, signOutBtn);

function logEvent(action) {
    const name = nameInput.value;
    const idNumber = idNumberInput.value;
    const department = departmentInput.value;

    if (name && idNumber && department) {
        const logEntry = document.createElement('li');
        logEntry.textContent = `${name} (ID: ${idNumber}) - ${action} from ${department} department at ${new Date().toLocaleTimeString()}`;
        logList.appendChild(logEntry);

        // Clear input fields
        nameInput.value = '';
        idNumberInput.value = '';
        departmentInput.value = '';
    } else {
        alert('Please fill in all fields.');
    }
}

function downloadLog() {
    const logData = [];
    const logEntries = logList.querySelectorAll('li');
    
    logEntries.forEach(entry => {
        logData.push(entry.textContent);
    });

    const blob = new Blob([logData.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'event_log.txt';
    a.click();

    URL.revokeObjectURL(url);
}
