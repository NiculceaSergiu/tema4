# Tema 4 - Angular: Lista de cumparaturi

Am ales varianta B: crearea unei aplicatii Angular pentru gestionarea listei de cumparaturi.

## Functionalitati

- structura de date `ShoppingItem` pentru articole;
- operatii CRUD:
  - adaugare articol;
  - afisare lista;
  - editare articol;
  - stergere articol;
- bifare articol ca fiind cumparat;
- stergerea articolelor cumparate;
- formular reactiv cu validare;
- filtrare dupa status: toate, active, cumparate;
- directive Angular folosite in interfata: `*ngFor`, `*ngIf`, `[class]`, `[formGroup]`, `formControlName`;
- serviciu Angular pentru logica si persistenta;
- salvare in `localStorage`, astfel incat lista ramane disponibila dupa refresh.

## Rulare

Instaleaza dependintele:

```bash
npm install
```

Porneste aplicatia:

```bash
npm start
```

Deschide in browser:

```text
http://localhost:4200/
```

## Structura

- `src/app/shopping-item.model.ts` - modelul de date;
- `src/app/shopping-list.service.ts` - serviciul pentru CRUD si localStorage;
- `src/app/app.component.ts` - logica formularului, filtrarii si editarii;
- `src/app/app.component.html` - interfata Angular;
- `src/app/app.component.css` - stilizarea componentei;
- `src/styles.css` - stiluri globale.
