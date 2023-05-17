function draw(csvFile) {
    // Leer el archivo CSV
    d3.csv(csvFile)
        .then(data => {
            // Procesar los datos
            let users = {};
            data.forEach(row => {
                // Aumentar el recuento para este usuario
                let user = row["Users"];
                if (user) {
                    if (users[user]) {
                        users[user]++;
                    } else {
                        users[user] = 1;
                    }
                }
            });
            
            // Crear el gráfico de barras
            let margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
                
            let x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
            let y = d3.scaleLinear()
                .range([height, 0]);
                
            let svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");
                      
            // Escalar el rango de los datos
            x.domain(Object.keys(users));
            y.domain([0, d3.max(Object.values(users))]);
            
            // Añadir las barras
            svg.selectAll(".bar")
                .data(Object.entries(users))
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", d => x(d[0]))
                .attr("width", x.bandwidth())
                .attr("y", d => y(d[1]))
                .attr("height", d => height - y(d[1]));
                
            // Añadir el eje X
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));
                
            // Añadir el eje Y
            svg.append("g")
                .call(d3.axisLeft(y));
        })
        .catch(err => console.error(`Error loading or parsing data. Error: ${err}`));
}
