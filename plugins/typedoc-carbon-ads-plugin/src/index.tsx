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

  app.renderer.hooks.on("head.end", () => {
    const carbonCss = `#carbonads * {
  margin: initial;
  padding: initial;
}
#carbonads {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
}
#carbonads {
  display: flex;
  max-width: 330px;
  background-color: hsl(0, 0%, 98%);
  box-shadow: 0 1px 4px 1px hsla(0, 0%, 0%, 0.1);
  z-index: 100;
}
#carbonads a {
  color: inherit;
  text-decoration: none;
}
#carbonads a:hover {
  color: inherit;
}
#carbonads span {
  position: relative;
  display: block;
  overflow: hidden;
}
#carbonads .carbon-wrap {
  display: flex;
}
#carbonads .carbon-img {
  display: block;
  margin: 0;
  line-height: 1;
}
#carbonads .carbon-img img {
  display: block;
}
#carbonads .carbon-text {
  font-size: 13px;
  padding: 10px;
  margin-bottom: 16px;
  line-height: 1.5;
  text-align: left;
}
#carbonads .carbon-poweredby {
  display: block;
  padding: 6px 8px;
  background: #f1f1f2;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  font-size: 8px;
  line-height: 1;
  border-top-left-radius: 3px;
  position: absolute;
  bottom: 0;
  right: 0;
}`;

    return JSX.createElement("style", { html: carbonCss });
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
