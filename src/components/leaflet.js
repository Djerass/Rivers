export const mymap = L.map('mapid').setView([63.737396, 56.712618], 3);
export const mymarker = L.marker([63.737396, 56.712618]).addTo(mymap)

const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {
    attribution
});
tiles.addTo(mymap);