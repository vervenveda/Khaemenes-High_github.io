# Accessibility, Privacy, and Offline Use

The portals support responsive layouts, keyboard-accessible controls, scalable type, light/dark display, print layouts, text-to-speech where the browser supports it, and downloadable backups. Student records are stored in the active browser with `localStorage`; no server account is created. Export backups regularly and protect files containing student information.

The service worker caches the portal shell and major local resources after first load. External public resources still require internet access and may change independently.
