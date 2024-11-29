import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import dotenv from "dotenv";
import pkg from "webpack";
//const { webpack } = pkg;
const { DefinePlugin } = pkg;

const env = dotenv.config().parsed;
const supportedEnvs = ["PUBLIC_PATH", "API_URL"];

const FORCE_SOURCE_MAP = true;

const config = () => {
  const isDevMode = process.env.NODE_ENV !== "production";
  const consolidatedEnvs = { ...process.env, ...env };
  const filteredEnvs = {};
  supportedEnvs.forEach((envName) => {
    if (consolidatedEnvs[envName]) {
      filteredEnvs[envName] = consolidatedEnvs[envName];
    }
  });

  if (!filteredEnvs.API_URL) {
    filteredEnvs.API_URL = "https://api.todoist.com/rest/v2"; //открытое REST API с todoist
  }
  if ( !filteredEnvs.PUBLIC_PATH )
  {
    filteredEnvs.PUBLIC_PATH = "/"; // Путь к статическим файлам
  }
  const publicPath = filteredEnvs?.PUBLIC_PATH ? filteredEnvs.PUBLIC_PATH : "/";
  const publicPathEscaped = publicPath.replaceAll("/", "\\/");
  const publicPathFallbackRegex = RegExp(`^${publicPathEscaped}.*$`);

  return {
    entry: "./src/main.jsx",
    output: {
      path: path.resolve(import.meta.dirname, "dist/assets"),
      publicPath,
      filename: "[name].[contenthash].bundle.js",
      assetModuleFilename: "[contenthash][ext][query]",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(import.meta.dirname, "src/public", "index.html"),
        favicon: "./src/assets/favicons/favicon-50.png",
      }),
      new MiniCssExtractPlugin({
        filename: isDevMode ? "[name].css" : "[name].[contenthash].css",
        chunkFilename: isDevMode ? "[id].css" : "[id].[contenthash].css",
      }),
      new DefinePlugin({
        ENV: JSON.stringify(filteredEnvs),
      }),
    ],
    devServer: {
      static: {
        directory: path.join(import.meta.dirname, "dist/assets"),
        publicPath,
      },
      server: "https",
      port: 3000,
      historyApiFallback: {
        rewrites: [{ from: publicPathFallbackRegex, to: publicPath }],
      },
      allowedHosts: "all",
    },
    devtool: false || (FORCE_SOURCE_MAP && "source-map"),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.module\.(sass|scss)$/,
          use: [
            isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: isDevMode || FORCE_SOURCE_MAP,
                modules: {
                  localIdentName: isDevMode
                    ? "[name]__[local]--[hase:base64:5]"
                    : "[hash:base64]",
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevMode || FORCE_SOURCE_MAP,
              },
            },
          ],
        },
        {
          test: /\.(sass|scss|css)$/,
          exclude: /\.module\.(sass|scss)$/,
          use: [
            isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevMode || FORCE_SOURCE_MAP,
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: [".js", ".jsx", ".scss"],
    },
  };
};

export default config;
