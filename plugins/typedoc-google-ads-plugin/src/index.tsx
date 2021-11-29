import { Application, JSX, ParameterType } from "typedoc";

export function load(app: Application): void {
  app.options.addDeclaration({
    name: "googleAdsId",
    type: ParameterType.String,
    help: "Google Ads Pub ID",
  });

  app.renderer.hooks.on("body.end", (ctx) => {
    const pubId = ctx.options.getValue("googleAdsId");

    return (
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pubId}`}
        crossOrigin="anonymous"
      ></script>
    );
  });
}
