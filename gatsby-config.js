module.exports = {
  siteMetadata: {
    title: "Eregodox Config"
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/favicon.png", // This is relative to the root of the site.
        short_name: "ErgoConf",
        name: "Ergodox layout creator",
        start_url: "."
      }
    },
    "gatsby-plugin-offline"
  ]
};
