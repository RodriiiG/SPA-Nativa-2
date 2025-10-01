const baseURL = "http://localhost:4000";

export async function apiService(endpoint, options = {}) {
  try {
    const response = await fetch(`${baseURL}${endpoint}`, options);

    if (!response.ok) {
      handleError(response.status);
      
      throw new Error(`HTTP ${response.status}`);
    }

    
    if (response.status === 204 || response.status === 205) return null;

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    alert("Error de conexión con el servidor.");
    throw error;
  }
}

function handleError(status) {
  switch (status) {
    case 400:
      alert("Solicitud incorrecta 400.");
      break;
    case 401:
      alert("No autorizado 401. Debes iniciar sesión.");
      break;
    case 403:
      alert("No tiene permiso para hacer eso 403.");
      break;
    case 404:
      alert("No encontrado 404.");
      break;
    default:
      alert(`Error HTTP ${status}`);
  }
}
