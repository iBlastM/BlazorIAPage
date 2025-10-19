export function dibujarRed(capas, containerId = "svgContainer") {
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

    const layerSpacing = width / (capas.length + 1);

    capas.forEach((neuronas, i) => {
        const verticalSpacing = height / (neuronas + 1);
        for (let j = 0; j < neuronas; j++) {
            const cx = layerSpacing * (i + 1);
            const cy = verticalSpacing * (j + 1);

            const circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("cx", cx);
            circle.setAttribute("cy", cy);
            circle.setAttribute("r", 15);
            circle.setAttribute("fill", "#4A90E2");
            svg.appendChild(circle);

            if (i > 0) {
                const prevNeurons = capas[i - 1];
                const prevSpacing = height / (prevNeurons + 1);
                for (let k = 0; k < prevNeurons; k++) {
                    const x1 = layerSpacing * i;
                    const y1 = prevSpacing * (k + 1);
                    const x2 = cx;
                    const y2 = cy;

                    const line = document.createElementNS(svgNS, "line");
                    line.setAttribute("x1", x1);
                    line.setAttribute("y1", y1);
                    line.setAttribute("x2", x2);
                    line.setAttribute("y2", y2);
                    line.setAttribute("stroke", "#999");
                    svg.appendChild(line);
                }
            }
        }
    });
}
