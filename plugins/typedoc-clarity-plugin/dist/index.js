"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = void 0;
const typedoc_1 = require("typedoc");
function load(app) {
    app.options.addDeclaration({
        name: "clarityId",
        type: typedoc_1.ParameterType.String,
        help: "Clarity ID",
    });
    app.renderer.hooks.on("body.end", (ctx) => {
        const clarityId = ctx.options.getValue("clarityId");
        const clarityHtml = `(function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${clarityId}");`;
        return typedoc_1.JSX.createElement("script", { html: clarityHtml, type: "text/javascript" });
    });
}
exports.load = load;
