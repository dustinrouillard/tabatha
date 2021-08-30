export async function getUsersGeolocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => window.navigator.geolocation.getCurrentPosition((data) => {
    localStorage.setItem("tabatha_weather_coords", JSON.stringify({ lat: Number(data.coords.latitude.toFixed(6)), lon: Number(data.coords.longitude.toFixed(6)) }));
    resolve({ lat: Number(data.coords.latitude.toFixed(6)), lon: Number(data.coords.longitude.toFixed(6)) });
  }, (error) => {
    console.error(error, 'error');
    reject(error);
  }));
}