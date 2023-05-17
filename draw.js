function draw(csvFile) {
    // Leer el archivo CSV
    d3.csv(csvFile)
        .then(data => {
            // Aquí es donde necesitarías implementar el código para dibujar los datos
            // y proporcionar la funcionalidad de arrastrar y soltar.
        })
        .catch(err => console.error(`Error loading or parsing data. Error: ${err}`));
}
