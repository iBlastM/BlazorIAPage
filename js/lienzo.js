export function drawBitArrayOnCanvas(canvasElement, bitsBase64, width, height, targetCanvasWidth) {
    if (!canvasElement) {
        console.error("El elemento canvas no se encontró.");
        return;
    }
    const ctx = canvasElement.getContext('2d');
    if (!ctx) {
        console.error("No se pudo obtener el contexto 2D.");
        return;
    }


    // Decodificar Base64 a un string binario
    const binaryString = atob(bitsBase64);

    // Convertir el string binario a un array de bytes (Uint8Array)
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    const blockSize = Math.max(1, Math.floor(targetCanvasWidth / width));
    canvasElement.width = width * blockSize;
    canvasElement.height = height * blockSize;
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    for (let i = 0; i < height; i++) { // Fila (y)
        for (let j = 0; j < width; j++) { // Columna (x)

            const idx = i * width + j; // Índice global del bit
            if (idx >= (width * height)) break;


            // Encontrar en qué byte está este bit
            const byteIndex = Math.floor(idx / 8);

            // Encontrar la posición del bit dentro de ese byte (0-7)
            const bitIndex = idx % 8;

            // Usar un 'AND' bitwise para ver si el bit es 1
            // (1 << bitIndex) crea una máscara (ej: 00000001, 00000010, etc.)
            const bitIsSet = (bytes[byteIndex] & (1 << bitIndex)) !== 0;


            ctx.fillStyle = bitIsSet ? '#000000' : '#FFFFFF';
            ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
        }
    }
}