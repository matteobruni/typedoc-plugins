import { Application, JSX, ParameterType } from "typedoc";

export function load(app: Application): void {
  app.options.addDeclaration({
    name: "particlesOptions",
    type: ParameterType.Object,
    help: "Particles Options",
    defaultValue: {
      fullScreen: {
        zIndex: -1,
      },
      particles: {
        color: {
          value: "#000",
        },
        links: {
          color: "#000",
          enable: true,
          opacity: 0.5,
          distance: 200,
        },
        move: {
          enable: true,
          speed: 0.2,
        },
        number: {
          density: {
            enable: true,
          },
          value: 100,
        },
        opacity: {
          value: 0.5,
        },
        size: {
          value: 1,
        },
      },
    },
  });

  app.options.addDeclaration({
    name: "additionalPlugins",
    type: ParameterType.Array,
    help: "Additional Plugins",
    defaultValue: [],
  });

  app.renderer.hooks.on("body.end", (ctx) => {
    const particlesOptions = ctx.options.getValue("particlesOptions"),
      additionalPlugins = ctx.options.getValue("additionalPlugins") as string[],
      html = `tsParticles.load("tsparticles", ${JSON.stringify(particlesOptions)});`;

    return (
      <>
        <div id="tsparticles"></div>
        <script src="https://cdn.jsdelivr.net/npm/tsparticles@2"></script>
        {additionalPlugins.map((plugin) => (
          <script src={`https://cdn.jsdelivr.net/npm/${plugin}@2`}></script>
        ))}
        <script type="text/javascript">{<JSX.Raw html={html}></JSX.Raw>}</script>
      </>
    );
  });
}
