import { Application, JSX, ParameterType } from "typedoc";

export function load(app: Application): void {
  app.options.addDeclaration({
    name: "carbonServe",
    type: ParameterType.String,
    help: "Carbon Ads Serve",
  });

  app.options.addDeclaration({
    name: "carbonPlacement",
    type: ParameterType.String,
    help: "Carbon Ads Placement",
  });

  app.renderer.hooks.on("body.end", (ctx) => {
    const serve = ctx.options.getValue("carbonServe");
    const placement = ctx.options.getValue("carbonPlacement");

    return (
      <script
        async
        type="text/javascript"
        src={`//cdn.carbonads.com/carbon.js?serve=${serve}&placement=${placement}`}
        id="_carbonads_js"
      ></script>
    );
  });
}
