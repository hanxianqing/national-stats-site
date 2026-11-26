# Japan in Figures

A national statistics site for one country — Japan — built as plain static
files. Overview dashboard, population, economy, labour, prices and trade
pages on hash routes, with canvas charts drawn by the site's own code and a
sortable, filterable table of key indicators. Every figure names its source
and year (mostly World Bank World Development Indicators, 2025; trade 2024).

## Run it

```sh
node serve.ts        # or: python3 -m http.server -d app 8080
```

Then open http://localhost:8080 — desktop and phone layouts included.

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and
writes `dossier.json` with the vendored make.fun library.

Built for make.fun's "Make the best national statistics site" bounty.
MIT licensed.
