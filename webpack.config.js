const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanObsoleteChunks = require("webpack-clean-obsolete-chunks");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV !== "production";

dotenv.config();

module.exports = {
  name: "React Webpack",

  mode: process.env.NODE_ENV === "production" ? "production" : "development",

  target: "web",

  entry: {
    bundle: path.resolve(__dirname, "./src/index.js"),
  },

  devtool: isProd ? "eval-cheap-module-source-map" : "source-map",

  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")],

    alias: {
      process: "process/browser",
    },

    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".scss"],

    fallback: {
      fs: false,
      path: require.resolve("path-browserify"),
    },
  },

  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    pathinfo: true,
    filename: process.env.NODE_ENV === "production" ? "[name].[chunkhash].js" : "[name].[fullhash].js",
    chunkFilename: process.env.NODE_ENV === "production" ? "chunk.[name].[chunkhash].js" : "chunk.[name].[fullhash].js",
    libraryTarget: "umd",
    clean: true, // Clean the output directory before emit.
    assetModuleFilename: "[name][ext]",
    sourceMapFilename: "[name].js.map",
  },

  devServer: {
    headers: {
      "access-control-allow-origin": "*",
      "Access-Control-Allow-Credentials": true,
      "cache-control": "private, max-age=31536000",
    },
    server: "http",
    allowedHosts: "auto",

    client: {
      progress: true,
      reconnect: true,
    },
    port: 3000,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "public"),
      publicPath: ["/"],
      serveIndex: true,
    },
    compress: true,
    hot: true,
    host: "localhost",
    proxy: {
      "/api": "http://localhost:5000", // Backend server host on this url
    },
  },

  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.m?js$/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties", "babel-plugin-styled-components"],
          },
        },
      },

      {
        test: /\.js$/,
        exclude: [/node_modules/, require.resolve("./public/index.html")],
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            presets: [require.resolve("@babel/preset-env")],
            plugins: ["@babel/plugin-proposal-class-properties", require.resolve("babel-plugin-styled-components")],
          },
        },
      },

      {
        test: /\.html$/,
        exclude: [/node_modules/, require.resolve("./public/index.html")],
        use: [
          {
            loader: "html-loader",
            options: { minimize: !isProd },
          },
        ],
      },

      //  To Load SVG,PNG,GIF,JPE Files.
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: "asset/resource",
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
            plugins: ["@babel/plugin-proposal-class-properties"],
            customize: require.resolve("babel-preset-react-app/webpack-overrides"),
          },
        },
      },

      {
        test: /\.handlebars/,
        use: "handlebars-loader",
        exclude: /node_modules/,
      },

      //   For Scss files
      {
        test: /\.(sass|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true, implementation: require("sass") } },
        ],
      },

      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: require.resolve("file-loader"),
        options: {
          name: "[path][name].[hash:8].[ext]",
        },
      },
    ],
  },

  plugins: [
    new CleanObsoleteChunks({
      verbose: true,
      deep: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve("./public/index.html"),
      filename: "./index.html",
      favicon: "./public/favicon.ico",
      manifest: "./public/manifest.json",
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
      },
      inject: true,
      hash: true,
      title: "development",
    }),

    new CleanWebpackPlugin({
      root: process.cwd(),
      verbose: true,
      dry: false,
      cleanOnceBeforeBuildPatterns: ["**/*", "!stats.json", "!important.js", "!folder/**/*"],
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),

    new webpack.ProvidePlugin({
      process: "process/browser",
    }),

    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),

    new webpack.HotModuleReplacementPlugin(),
  ],

  optimization: {
    minimize: true,
    runtimeChunk: true,
    splitChunks: false,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    minimizer: [new TerserPlugin({ parallel: true, test: /\.js(\?.*)?$/i, terserOptions: { compress: false, mangle: true, output: { comments: false, ascii_only: true } } })],
    flagIncludedChunks: true,
    usedExports: true,
    sideEffects: true,
  },

  performance: false,
};
