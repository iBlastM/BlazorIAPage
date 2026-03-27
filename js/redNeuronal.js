export function dibujarRed(capas, containerId, dotNetHelper) {
    const width = 600;
    const height = 400;
    const svgNS = "http://www.w3.org/2000/svg";
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    container.appendChild(svg);

    // --- CORRECCIÓN CLAVE ---
    const topMargin = 50; // Espacio reservado arriba para los títulos
    const layerSpacing = width / (capas.length + 1);

    let selectedCircle = null;

    capas.forEach((neuronas, i) => {
        // Calculamos el espacio vertical disponible restando el margen
        const availableHeight = height - topMargin;
        const verticalSpacing = availableHeight / (neuronas + 1);

        const cx = layerSpacing * (i + 1);

        // --- DIBUJAR TEXTO (Ahora tiene su propio espacio seguro) ---
        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", cx);
        text.setAttribute("y", 30); // El texto se queda fijo arriba
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-family", "Arial, sans-serif");
        text.setAttribute("font-size", "14px"); // Un poco más grande
        text.setAttribute("font-weight", "bold");
        text.setAttribute("fill", "#333");

        let etiqueta = "";
        if (i === 0) etiqueta = "Entrada";
        else if (i === capas.length - 1) etiqueta = "Salida";
        else etiqueta = `Oculta ${i - 1}`;

        text.textContent = etiqueta;
        svg.appendChild(text);

        // --- DIBUJAR NEURONAS ---
        for (let j = 0; j < neuronas; j++) {
            // AQUI ESTA EL CAMBIO PRINCIPAL: Sumamos topMargin a la posición Y
            const cy = topMargin + (verticalSpacing * (j + 1));

            const circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("cx", cx);
            circle.setAttribute("cy", cy);
            circle.setAttribute("r", 15);

            circle.setAttribute("fill", "#4A90E2");
            circle.setAttribute("stroke", "#fff");
            circle.setAttribute("stroke-width", "2");
            circle.style.cursor = "pointer";

            if (i > 0) {
                circle.onclick = () => {
                    if (selectedCircle) selectedCircle.setAttribute("fill", "#4A90E2");
                    circle.setAttribute("fill", "#FF8C00");
                    selectedCircle = circle;
                    dotNetHelper.invokeMethodAsync('SeleccionarNeurona', i - 1, j);
                };
            } else {
                circle.setAttribute("fill", "#AAB7B8");
                circle.style.cursor = "default";
            }

            svg.appendChild(circle);

            // --- DIBUJAR LÍNEAS ---
            if (i > 0) {
                const prevNeurons = capas[i - 1];
                // También ajustamos el cálculo de la capa anterior para que coincida
                const prevVerticalSpacing = availableHeight / (prevNeurons + 1);

                for (let k = 0; k < prevNeurons; k++) {
                    const line = document.createElementNS(svgNS, "line");
                    line.setAttribute("x1", layerSpacing * i);

                    // Ajuste de margen también aquí para que las líneas nazcan del lugar correcto
                    const y1 = topMargin + (prevVerticalSpacing * (k + 1));

                    line.setAttribute("y1", y1);
                    line.setAttribute("x2", cx);
                    line.setAttribute("y2", cy);
                    line.setAttribute("stroke", "#CCC"); // Color un poco más suave para las líneas

                    svg.insertBefore(line, svg.firstChild);
                }
            }
        }
    });
}