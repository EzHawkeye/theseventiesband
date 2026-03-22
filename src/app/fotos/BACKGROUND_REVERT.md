# Foto’s-pagina — achtergrond terugzetten

Dit bestand bewaart hoe de pagina er **vóór** de per-categorie achtergrondkleuren uitzag, zodat je dat eenvoudig kunt herstellen.

## Vorige look (uniform met de rest van de site)

- **Pagina-container:** alleen  
  `className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16"`  
  (geen eigen page-background; zelfde crème als `body` via `globals.css`: `--cream` / `#fff8f0`.)
- **Elke album-sectie:** alleen  
  `className="scroll-mt-28"`  
  — geen border, geen extra padding, geen gekleurde achtergrond per blok.
- **Ruimte tussen albums:** `space-y-16` op de wrapper rond de secties.

## Sectie in code (kopiëren om terug te zetten)

```tsx
<section
  key={album.eventId}
  id={album.eventId}
  className="scroll-mt-28"
  aria-labelledby={`album-${album.eventId}`}
>
```

Verwijder daarbij de import van `albumSectionClass` (of de map) uit `page.tsx` als je terugzet.

## Nieuwe look (na wijziging)

Zie `page.tsx`: elke `eventId` krijgt een eigen zachte tint (`mustard` / `plum` / `olive`) met border en padding binnen `albumSectionClass`.
