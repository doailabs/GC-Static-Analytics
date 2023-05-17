function downloadCSV(downloadId) {
    // Acceder a la API de Genesys Cloud
    const platformClient = require('platformClient');
    const downloadsApi = new platformClient.DownloadsApi();
    let opts = { 
      "issueRedirect": true, // Boolean | 
      "redirectToAuth": true // Boolean | 
    };
    
    downloadsApi.getDownload(downloadId, opts)
        .then(response => {
            // Convertir la respuesta a un archivo CSV
            let csvContent = 'data:text/csv;charset=utf-8,' + response;
            let encodedUri = encodeURI(csvContent);
            let link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "my_data.csv");
            document.body.appendChild(link); // Required for FF
            link.click(); // Descargar el archivo CSV
            
            // Llamar a la función draw y pasar el archivo CSV
            draw(encodedUri);
        })
        .catch((err) => {
            console.log(`There was a failure calling downloadCSV. Error: ${err}`);
        });
}
