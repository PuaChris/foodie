module.exports = {
  //mode: "production", 
  // mode: "development", devtool: "inline-source-map",

  // entry: ["./src/app.tsx"/*main*/],
  // output: {
  //   filename: "./bundle.js"  // in /dist
  // },
  // resolve: {
  //   // Add `.ts` and `.tsx` as a resolvable extension.
  //   extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
  // },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "@teamsupercell/typings-for-css-modules-loader",
          {
            loader: "css-loader",
            options: { modules: true }
          }
        ]
      },
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          "@teamsupercell/typings-for-css-modules-loader",
          {
            loader: "sass-loader",
            options: { modules: true }
          }
        ]
      }
    ]
  }
};
