import React from "react";
import Helmet from "react-helmet";
import { graphql, StaticQuery } from "gatsby";
import { Edit3 } from "react-feather";
import { Layout, Link } from "$components";

// force top-level navigation to be a certain order
//const forcedNavOrder = ["/getting-started", "/guides"];

// Add an item node in the tree, at the right position
function addToTree(node, treeNodes) {
  // Check if the item node should inserted in a subnode
  for (var i = 0; i < treeNodes.length; i++) {
    const treeNode = treeNodes[i];

    // "/store/travel".indexOf( '/store/' )
    if (node.link.indexOf(treeNode.link + "/") == 0) {
      addToTree(node, treeNode.items);

      // Item node was added, we can quit
      return;
    }
  }

  // Item node was not added to a subnode, so it's a sibling of these treeNodes
  treeNodes.push({
    title: node.title,
    link: node.link,
    items: []
  });
}

//Create the item tree starting from menuItems
function createTree(nodes) {
  var tree = [];

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    addToTree(node, tree);
  }

  return tree;
}

const reduceNavTwo = allMdx => {
  const edges = allMdx.edges
    .filter(({ node }) => node.fields.slug !== "/")
    .map(({ node }) => ({
      title: node.frontmatter.title,
      link: node.fields.slug
    }));
  return createTree(edges);
};

const DocLayout = ({ children, ...props }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            docsLocation
          }
        }
        allMdx {
          edges {
            node {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={({ site, allMdx }) => {
      const itemList = reduceNavTwo(allMdx);
      return (
        <Layout {...props} itemList={itemList}>
          <Helmet />
          <h1 css={{ fontSize: `2.5rem`, marginBottom: `2rem` }} />
          {children}
          <div
            css={{
              width: "100%",
              margin: "4rem 0 2rem",
              padding: "1rem 1.5rem",
              borderTop: "1px solid #ddd",
              textAlign: "right"
            }}
          >
            <Link
              to={`${site.siteMetadata.docsLocation}`}
              css={{
                textDecoration: "none",
                color: "#555",
                "&:hover": {
                  color: "#663399"
                }
              }}
            >
              <Edit3 size={16} /> edit this page on GitHub
            </Link>
          </div>
        </Layout>
      );
    }}
  />
);

export default DocLayout;
