import { Application, JSX, ParameterType } from "typedoc";

export function load(app: Application): void {
  app.options.addDeclaration({
    name: "exampleOption",
    type: ParameterType.String,
    help: "Example option for plugin template",
  });

  app.renderer.hooks.on("body.end", (ctx) => {
    const opt = ctx.options.getValue("exampleOption");
    if (!opt) return;
    return (
      <script type="text/javascript">{`console.log('plugin example: ${opt}')`}</script>
    );
  });
}
