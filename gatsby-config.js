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
        // icon: "src/images/gatsby-icon.png", // This is relative to the root of the site.
        short_name: "ErgoConf",
        name: "Ergodox layout creator",
        icons: [
          {
            src: "favicon.png",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/png"
          },
          {
            src: "favicon-512.png",
            type: "image/png",
            sizes: "512x512"
          }
        ],
        start_url: "."
      }
    }
  ]
};
