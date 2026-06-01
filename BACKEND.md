# Backend einrichten — Google Sheet als Speicher

Jede abgesendete Bewertung wird als **eine Zeile** in ein Google Sheet
geschrieben. Kein Server, kein Hosting, kostenlos. Einrichtung dauert ~5 Minuten.

## 1. Google Sheet anlegen

1. Auf <https://sheets.new> ein neues Sheet erstellen, z. B. „Amara Bewertungen".
2. (Optional) In Zeile 1 Überschriften eintragen – das Skript legt sie sonst
   automatisch an:
   `submitted_at | name | room | birthyear | lang | average | a_overall | a_room | a_service | a_food | a_beach | a_value | a_spa | a_location | feedback`

## 2. Apps Script einfügen

1. Im Sheet oben auf **Erweiterungen → Apps Script**.
2. Den vorhandenen Code löschen und den folgenden einfügen:

```javascript
// Amara Comfort Resort – nimmt Bewertungen entgegen und hängt sie ans Sheet an.
var HEADERS = [
  "submitted_at","name","room","birthyear","lang","average",
  "a_overall","a_room","a_service","a_food","a_beach","a_value","a_spa","a_location",
  "feedback"
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // verhindert, dass zwei gleichzeitige Sends kollidieren
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Überschriften anlegen, falls das Sheet noch leer ist
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    var p = e.parameter; // gesendete Formularfelder
    var row = HEADERS.map(function (key) {
      return p[key] !== undefined ? p[key] : "";
    });
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

3. Speichern (Disketten-Symbol).

## 3. Als Web-App bereitstellen

1. Oben rechts **Bereitstellen → Neue Bereitstellung**.
2. Bei „Typ auswählen" (Zahnrad) **Web-App** wählen.
3. Einstellungen:
   - **Ausführen als:** *Ich* (dein Google-Konto)
   - **Zugriff:** **Jeder** (damit die Hotel-Seite ohne Login senden darf)
4. **Bereitstellen** klicken, Berechtigungen bestätigen (Google warnt, weil es
   dein eigenes Skript ist – „Erweitert" → „… zulassen").
5. Du bekommst eine **Web-App-URL** der Form
   `https://script.google.com/macros/s/AKfyc.../exec`. Diese kopieren.

## 4. URL in die Seite eintragen

In [`assets/review.js`](assets/review.js) ganz oben die Konstante füllen:

```javascript
const ENDPOINT = "https://script.google.com/macros/s/AKfyc.../exec";
```

Fertig. Ab jetzt landet jede Bewertung als neue Zeile im Sheet.

## Testen

1. Seite lokal starten: `python -m http.server 8000`
2. `index.html` öffnen, Name/Zimmer eingeben → bewerten → absenden.
3. Im Google Sheet sollte sofort eine neue Zeile erscheinen.

## Gut zu wissen

- **Daten ändern:** Willst du später Felder hinzufügen/umbenennen, passe
  `HEADERS` im Skript **und** die Felder in `collectSubmission()` in
  `review.js` an – die Schlüssel müssen übereinstimmen.
- **Neue Version aktiv schalten:** Nach Skript-Änderungen unter
  **Bereitstellen → Bereitstellungen verwalten → Bearbeiten (Stift) → Neue Version**.
  Die URL bleibt dabei gleich.
- **Sichtbarkeit der URL:** Die URL steht öffentlich im JavaScript. Für
  Bewertungen unkritisch; bei Spam-Sorgen kann man ein geheimes Token ergänzen.
- **Datenschutz:** Name und Geburtsjahr sind personenbezogene Daten und liegen
  dann in deinem Google-Konto – bei echtem Einsatz DSGVO im Blick behalten.
