const path = require("path");
const { readdirSync, existsSync } = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { container } = require("webpack");

const srcDir = path.resolve(__dirname, "src");

const exposes = readdirSync(srcDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .reduce((acc, dir) => {
      const tsx = path.resolve(srcDir, dir.name, `${dir.name}.tsx`);
      if (existsSync(tsx)) {
        acc[`./${dir.name}`] = `./src/${dir.name}/${dir.name}.tsx`;
      }
      return acc;
    }, {});

module.exports = (_, argv) => ({
  entry: "./src/main.ts",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "auto",
    clean: true,

    // 🔴 REQUIRED for Module Federation
    library: {
      type: "var",
      name: "pod",
    },
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": srcDir,
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: { transpileOnly: true },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.module\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new container.ModuleFederationPlugin({
      name: "pod",
      filename: "remoteEntry.js",

      exposes,

      shared: {
        react: {
          singleton: true,
          requiredVersion: false,
          eager: false, // 🔴 IMPORTANT: remove eager
        },
        "react-dom": {
          singleton: true,
          requiredVersion: false,
          eager: false,
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  devServer: {
    port: 3001,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});