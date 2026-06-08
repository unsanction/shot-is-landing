# OG generator fonts

These TTFs are used **only** by `scripts/generate-og.mjs` (build-time OG image
generation with satori). They are not shipped to the browser.

| File | Family / weight | Source | License |
|------|-----------------|--------|---------|
| `Unbounded-Bold.ttf` | Unbounded, 700 | [google/fonts · ofl/unbounded](https://github.com/google/fonts/tree/main/ofl/unbounded) | SIL Open Font License 1.1 |
| `Manrope-SemiBold.ttf` | Manrope, 600 | [google/fonts · ofl/manrope](https://github.com/google/fonts/tree/main/ofl/manrope) | SIL Open Font License 1.1 |

Both are static instances rendered from the upstream variable fonts with
`fontTools.varLib.instancer` (satori needs static-weight TTFs, not variable
fonts). To regenerate:

```sh
python3 -m fontTools.varLib.instancer "Unbounded[wght].ttf" wght=700 -o Unbounded-Bold.ttf
python3 -m fontTools.varLib.instancer "Manrope[wght].ttf"  wght=600 -o Manrope-SemiBold.ttf
```
