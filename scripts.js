// Fetch data from external API and display it
fetch('https://outfit-fix.onrender.com/api/endpoint')  // Replace with your actual API endpoint
    .then(response => response.json())
    .then(data => {
        const apiDataDiv = document.getElementById('apiData');
        apiDataDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

// Handle file upload form submission
document.getElementById('fileUploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();
    const metaFile = document.getElementById('metaFile').files[0];
    formData.append('metaFile', metaFile);

    fetch('https://your-backend-api-url/upload', {  // Replace with your actual backend API endpoint
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('File uploaded successfully!');
        console.log(data);
    })
    .catch(error => {
        alert('Error uploading file');
        console.error('Error:', error);
    });
});
