const stationInput = document.getElementById('stationInput');
const targetStationInput = document.getElementById('targetStationInput');
const tableBody = document.getElementById('tableBody');
const statusMessage = document.getElementById('statusMessage');

document.getElementById('fetchBtn').addEventListener('click', fetchDepartures);
const searchOnEnter = event => {
    if (event.key === 'Enter') fetchDepartures();
};
stationInput.addEventListener('keydown', searchOnEnter);
targetStationInput.addEventListener('keydown', searchOnEnter);

function formatTime(value) {
    if (!value) return 'N/A';
    return value.includes('T') ? value.slice(11, 16) : value.slice(0, 5);
}

function getDepartureTime(departure) {
    if (departure.departure) return departure.departure;
    if (typeof departure.stop === 'string') {
        return departure.stop.match(/departure=([^;]+)/)?.[1];
    }
    return departure.stop?.departure;
}

function normalizeStationName(name) {
    return typeof name === 'string'
        ? name.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, ' ').toLocaleLowerCase('de-CH')
        : '';
}

function getStopName(stop) {
    return typeof stop === 'string' ? stop : stop?.station?.name || stop?.name;
}

function findMatchingStop(departure, stationName) {
    const target = normalizeStationName(stationName);
    if (!target) return undefined;

    return (Array.isArray(departure.passList) ? departure.passList : [])
        .find(stop => {
            const name = normalizeStationName(getStopName(stop));
            return name === target || name.includes(target);
        });
}

function createRow(departure, targetStation) {
    const row = document.createElement('tr');
    const time = formatTime(getDepartureTime(departure));
    const line = departure.number
        ? `${departure.category === 'S' ? 'S' : ''}${departure.number}`
        : departure.category || 'N/A';
    const targetStop = targetStation ? findMatchingStop(departure, targetStation) : undefined;
    const destination = (targetStop && getStopName(targetStop)) || departure.to || 'N/A';
    const terminal = departure.to;
    const destinationLabel = targetStation && terminal && terminal !== destination
        ? `${destination} <small style="color: #888;">(Zugziel: ${terminal})</small>`
        : destination;
    const platform = departure.stop?.platform || departure.passList?.[0]?.platform || '-';
    const delay = departure.delay ?? departure.stop?.delay;
    const destinationStop = targetStop || departure.passList?.find(stop => stop.station?.name === departure.to)
        || departure.passList?.[departure.passList.length - 1];
    const arrival = formatTime(
        destinationStop?.prognosis?.arrival || destinationStop?.arrival
    );
    const capacity = departure.prognosis?.capacity1st != null
        ? `1st: ${departure.prognosis.capacity1st}, 2nd: ${departure.prognosis.capacity2nd}`
        : '';

    row.innerHTML = `
        <td style="color: #fff;">${time}${delay > 0 ? ` <small style="color: #ff4444;">(${delay} min)</small>` : ''}</td>
        <td><span class="line-badge">${line}</span></td>
        <td style="color: #fff;">${departure.operator || '-'}</td>
        <td style="color: #fff;">${destinationLabel} <small style="color: #888;">(Ank: ${arrival})</small></td>
        <td style="color: #fff;">${platform} <small style="color: #888;">${capacity}</small></td>
    `;
    return row;
}

function stopsAtStation(departure, stationName) {
    const target = normalizeStationName(stationName);
    if (!target) return false;

    const destination = normalizeStationName(departure.to);
    return Boolean(findMatchingStop(departure, stationName))
        || destination === target
        || destination.includes(target);
}

async function fetchDepartures() {
    const station = stationInput.value.trim();
    const targetStation = targetStationInput.value.trim();

    if (!station) {
        statusMessage.textContent = 'Bitte gib einen Ort ein.';
        return;
    }

    tableBody.innerHTML = '';
    statusMessage.textContent = 'Lade Daten...';
    statusMessage.style.color = '#ffcc00';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
        const url = `http://transport.opendata.ch/v1/stationboard?station=${encodeURIComponent(station)}&limit=100`;
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) throw new Error('Station nicht gefunden oder API-Fehler.');

        const data = await response.json();
        const allDepartures = data.stationboard || [];

        if (allDepartures.length === 0) {
            statusMessage.textContent = 'Keine Abfahrten gefunden.';
            return;
        }

        const departures = targetStation
            ? allDepartures.filter(departure => stopsAtStation(departure, targetStation))
            : allDepartures;

        if (departures.length === 0) {
            statusMessage.textContent = `Keine Züge von ${station} halten in ${targetStation}.`;
            return;
        }

        statusMessage.textContent = targetStation
            ? `Anzeige für: ${station} – Halt in: ${targetStation}`
            : `Anzeige für: ${station}`;
        departures.forEach(departure => tableBody.appendChild(createRow(departure, targetStation)));
    } catch (error) {
        statusMessage.textContent = error.name === 'AbortError'
            ? 'Zeitüberschreitung: Die Anfrage hat zu lange gedauert.'
            : `Fehler: ${error.message}`;
        statusMessage.style.color = '#ff4444';
        if (error.name !== 'AbortError') console.error(error);
    } finally {
        clearTimeout(timeoutId);
    }
}
