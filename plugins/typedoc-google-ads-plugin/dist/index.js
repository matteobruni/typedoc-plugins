"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = void 0;
const typedoc_1 = require("typedoc");
function load(app) {
    app.options.addDeclaration({
        name: "googleAdsId",
        type: typedoc_1.ParameterType.String,
        help: "Google Ads Pub ID",
    });
    app.renderer.hooks.on("body.end", (ctx) => {
        const pubId = ctx.options.getValue("googleAdsId");
        return (typedoc_1.JSX.createElement("script", { async: true, src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pubId}`, crossOrigin: "anonymous" }));
    });
}
exports.load = load;
