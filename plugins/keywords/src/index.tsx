import { Application, JSX, ParameterType } from "typedoc";

export function load(app: Application): void {
  app.options.addDeclaration({
    name: "keywords",
    type: ParameterType.Array,
    help: "Website keywords",
  });

  app.renderer.hooks.on("head.begin", (ctx) => {
    const keywords = ctx.options.getValue("keywords") as string[];

    return <meta name="keywords" content={keywords.join(", ")} />;
  });
}
