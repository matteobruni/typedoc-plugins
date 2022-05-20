"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = void 0;
const typedoc_1 = require("typedoc");
function load(app) {
    app.options.addDeclaration({
        name: "keywords",
        type: typedoc_1.ParameterType.Array,
        help: "Website keywords",
    });
    app.renderer.hooks.on("head.begin", (ctx) => {
        const keywords = ctx.options.getValue("keywords");
        return typedoc_1.JSX.createElement("meta", { name: "keyword", content: keywords.join(" ") });
    });
}
exports.load = load;
