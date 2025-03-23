# Project Notes:

This is a project test for Brandon Friar.
It serches Pokemon data from https://meowing-bristle-alamosaurus.glitch.me/
There are two pages one for searching (/) and one for results (/{id})

The Project was setup with vite and bun. It uses Sveltekit and tailwindcss.

Here is the structure of the project:
demo-app/
├── src/
│   ├── lib/
│   │   ├── components/
│   │      ├── CardLink.svelte      # Card component(each pokemon search result)
│   │      └── Header.svelte        # Header component
│   │
│   ├── routes/
│   │   ├── +page.svelte            # Main search page
│   │   └── pokemon/[id]/
│   │       └── +page.svelte        # Pokémon detail page
│   ├── app.html                     # main html file with head data and main
│   └── app.css                      # global css


## Run pokemon App
```bash
bun run dev --open
