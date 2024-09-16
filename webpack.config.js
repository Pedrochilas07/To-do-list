const path = require('path');

module.exports = {
  devServer: {
static:{
  directory: path.resolve(__dirname, 'dist')
},
compress: true,
port: 8000

  },
  entry: {
    index: './src/index.js'
  }, // ponto de entrada do seu aplicativo
  output: {
    filename: '[name].bundle.js', // nome do arquivo de saída
    path: path.resolve(__dirname, 'dist'), // diretório de saída
  },
  module: {
    rules: [
      {
        test: /\.js$/, // aplica a regra a arquivos .js
        exclude: /node_modules/, // não aplicar o Babel a arquivos dentro de node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // usa o preset-env para transformar o código ES6+
          },
        },
      },
      {
        test: /\.css$/, // aplica a regra a arquivos .css
        use: [
          'style-loader', // injeta o CSS no DOM
          'css-loader'    // interpreta os imports e URLs no CSS
        ],
      },
    ],
  },
  mode: 'production', // ou 'production' para builds otimizados
};