export const setMapboxAccessToken = (token: string) => {
  if ((window as any).mapboxgl) {
    (window as any).mapboxgl.accessToken = token;
  } else {
    console.error('Mapbox GL JS is not defined. Make sure it is properly loaded.');
  }
};