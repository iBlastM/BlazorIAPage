export function descargarArchivo(nombreArchivo, contenidoBase64) {
    if (!contenidoBase64 || !nombreArchivo) return;

    const enlace = document.createElement("a");
    enlace.download = nombreArchivo;
    enlace.href = "data:text/plain;base64," + contenidoBase64;
    enlace.click();
}
