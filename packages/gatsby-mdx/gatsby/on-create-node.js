const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const defaultOptions = require("../utils/default-options");
const createMDXNode = require("../utils/create-mdx-node");
const { MDX_SCOPES_LOCATION } = require("../constants");
const genMDX = require("../utils/gen-mdx");

const contentDigest = val =>
  crypto
    .createHash(`md5`)
    .update(val)
    .digest(`hex`);

module.exports = async (
  {
    node,
    loadNodeContent,
    actions,
    createNodeId,
    getNode,
    getNodes,
    store,
    reporter,
    cache,
    pathPrefix
  },
  pluginOptions
) => {
  const { createNode, createParentChildLink } = actions;
  const options = defaultOptions(pluginOptions);

  // if we shouldn't process this node, then return
  if (
    !(node.internal.type === "File" && options.extensions.includes(node.ext)) &&
    !(
      node.internal.type !== "File" &&
      options.mediaTypes.includes(node.internal.mediaType)
    )
  ) {
    return;
  }

  const content = await loadNodeContent(node);

  const mdxNode = await createMDXNode({
    id: createNodeId(`${node.id} >>> Mdx`),
    node,
    content
  });

  createNode(mdxNode);
  createParentChildLink({ parent: node, child: mdxNode });

  // write scope files into .cache for later consumption
  const { scopeImports, scopeIdentifiers } = await genMDX({
    node: mdxNode,
    getNode,
    getNodes,
    reporter,
    cache,
    pathPrefix,
    options
  });
  await cacheScope({
    scopeIdentifiers,
    scopeImports,
    createContentDigest: contentDigest,
    directory: store.getState().program.directory
  });
};

async function cacheScope({
  scopeImports,
  scopeIdentifiers,
  createContentDigest,
  directory
}) {
  // scope files are the imports from an MDX file pulled out and re-exported.
  const scopeFileContent = `${scopeImports.join("\n")}

export default { ${scopeIdentifiers.join(", ")} }`;

  const filePath = path.join(
    directory,
    MDX_SCOPES_LOCATION,
    `${createContentDigest(scopeFileContent)}.js`
  );

  fs.writeFileSync(filePath, scopeFileContent);
}
