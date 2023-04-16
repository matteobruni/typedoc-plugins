import { Application, JSX, ParameterType } from "typedoc";

export function load(app: Application): void {
  app.options.addDeclaration({
    name: "particlesOptions",
    type: ParameterType.Mixed,
    help: "Google Ads Pub ID",
    defaultValue: {},
  });

  app.renderer.hooks.on("body.end", (ctx) => {
    return (
      <>
        <div id="tsparticles"></div>
        <script src="https://cdn.jsdelivr.net/npm/tsparticles@2.9.3/tsparticles.bundle.min.js"></script>
        <script type="text/javascript">
          {`tsParticles.load("tsparticles", ${JSON.stringify(ctx.options.getValue("particlesOptions"))});`}
        </script>
      </>
    );
  });
}
