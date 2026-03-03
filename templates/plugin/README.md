Plugin Template README

To use this template:

1. Copy the template folder to `plugins/<your-plugin>`.
2. Run `pnpm install` at the repo root.
3. Build the plugin: `pnpm --filter <your-plugin> run build`.
4. Use in demo build with `typedoc --plugin <your-plugin>` or configure `apps/demo/typedoc.json`.

Example usage:

```
pnpm --filter <your-plugin> run build
typedoc --plugin <your-plugin> --out docs
```
