// API से डेटा लोड करना
fetch('https://outfit-fix.onrender.com/api/endpoint')  // अपनी API का सही endpoint डालें
    .then(response => response.json())
    .then(data => {
        const apiDataDiv = document.getElementById('apiData');
        apiDataDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    })
    .catch(error => {
        console.error('डेटा लोड करते समय समस्या:', error);
    });

// फाइल अपलोड का हैंडलर
document.getElementById('fileUploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();
    const metaFile = document.getElementById('metaFile').files[0];
    formData.append('metaFile', metaFile);

    fetch('https://outfit-fix.onrender.com/upload', {  // अपनी फाइल अपलोड API का endpoint डालें
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('फाइल सफलतापूर्वक अपलोड हो गई!');
        console.log(data);
    })
    .catch(error => {
        alert('फाइल अपलोड करते समय समस्या');
        console.error('त्रुटि:', error);
    });
});
