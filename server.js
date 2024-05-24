const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Paneles Solares</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f0f0f0;
            }
            #app {
                text-align: center;
            }
            #visualization {
                margin-top: 20px;
            }
            .input-group {
                margin: 10px 0;
            }
        </style>
    </head>
    <body>
        <div id="app">
            <div class="input-group">
                <label for="x">Ancho del techo</label><br>
                <input type="number" id="x" placeholder="Ancho del techo" />
            </div>
            <div class="input-group">
                <label for="y">Alto del techo</label><br>
                <input type="number" id="y" placeholder="Alto del techo" />
            </div>
            <div class="input-group">
                <label for="a">Ancho del panel</label><br>
                <input type="number" id="a" placeholder="Ancho del panel" />
            </div>
            <div class="input-group">
                <label for="b">Alto del panel</label><br>
                <input type="number" id="b" placeholder="Alto del panel" />
            </div>
            <button onclick="calcularDibujar()">Calcular y Dibujar</button>
            <div id="result"></div>
            <div id="visualization"></div>
        </div>
        <script src="https://d3js.org/d3.v7.min.js"></script>
        <script>
            function calcularDibujar() {
                const x = parseInt(document.getElementById('x').value);
                const y = parseInt(document.getElementById('y').value);
                const a = parseInt(document.getElementById('a').value);
                const b = parseInt(document.getElementById('b').value);

                if (isNaN(x) || isNaN(y) || isNaN(a) || isNaN(b)) {
                    alert("Por favor, ingrese valores válidos.");
                    return;
                }

                const { count, max_x, max_y, panel_width, panel_height } = maximoPaneles(x, y, a, b);
                dibujarPaneles(x, y, panel_width, panel_height, max_x, max_y);

                document.getElementById('result').innerText = \`Máximo número de paneles: \${count}\`;
            }

            function maximoPaneles(x, y, a, b) {
                const max_x1 = Math.floor(x / a);
                const max_y1 = Math.floor(y / b);
                const count1 = max_x1 * max_y1;

                const max_x2 = Math.floor(x / b);
                const max_y2 = Math.floor(y / a);
                const count2 = max_x2 * max_y2;

                if (count1 >= count2) {
                    return { count: count1, max_x: max_x1, max_y: max_y1, panel_width: a, panel_height: b };
                } else {
                    return { count: count2, max_x: max_x2, max_y: max_y2, panel_width: b, panel_height: a };
                }
            }

            function dibujarPaneles(x, y, a, b, max_x, max_y) {
                const escala = 20
                const svg = d3.select("#visualization").html("")
                    .append("svg")
                    .attr("width", x * escala)
                    .attr("height", y * escala);

                svg.append("rect")
                    .attr("width", x * escala)
                    .attr("height", y * escala)
                    .attr("fill", "none")
                    .attr("stroke", "black");

                for (let i = 0; i < max_x; i++) {
                    for (let j = 0; j < max_y; j++) {
                        svg.append("rect")
                            .attr("x", i * a * escala)
                            .attr("y", j * b * escala)
                            .attr("width", a * escala)
                            .attr("height", b * escala)
                            .attr("fill", "lightblue")
                            .attr("stroke", "blue");
                    }
                }
            }
        </script>
    </body>
    </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
