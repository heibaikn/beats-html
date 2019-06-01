
const HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');
var path = require('path');
var srcPath = './src';  //输出文件的目录
var entryName = '';
var entryMobileName = '';
var entryPages = {};


function resolve(dir){
  return path.join(__dirname, './', dir);
}

const currNamePath = resolve(`../src/pages`);

function checkIsFile(filepath){
  try{
    return fs.statSync(filepath);
  }
  catch(e){
    
  }
  return null;
}

function findDirFiles(){
  var mainArr = ['main.js'];
  mainArr.some((v)=>{
    var is = checkIsFile(resolve(`../src/${v}`))
    if(is){
      entryName = `${srcPath}/${v}`
      return false
    }
  });
  return entryName;
}


function findEntryName(){
  return findDirFiles()
}

function findMobileEntryName() {
  var mainArr = ['mobile.js'];
  mainArr.some((v) => {
    var is = checkIsFile(resolve(`../src/${v}`))
    if (is) {
      entryMobileName = `${srcPath}/${v}`
      return false
    }
  });
  return entryMobileName;
}

function eachFiles(files, dirpath){
  files.forEach((file)=>{
    let filepath = path.join(dirpath, file);
    let state = checkIsFile(filepath);
    if(state && state.isDirectory()){
      var mainJsPath = path.join(dirpath, file, `${file}.js`);
      var isFile = checkIsFile(mainJsPath)
      if (!isFile){
        mainJsPath = path.join(dirpath, file, `index.js`);
      }
      var checkMainJS = checkIsFile(mainJsPath);
      if(checkMainJS){
        let jspath = mainJsPath.replace(/\\/g, '/');
        let filterStr = `src`;
        let index  = jspath.indexOf(filterStr);
        if(index == -1) return;
        jspath = jspath.substr(index + filterStr.length + 1);
        let key = jspath.replace('.js', '').replace('pages/', '');

        entryPages[`${key}`] = `${srcPath}/${jspath}`;
      }
      findEntryPages(filepath)
    }
  });
}

function findEntryPages(dirpath){
  try{
    var files = fs.readdirSync(dirpath);
    eachFiles(files, dirpath);
  }
  catch(e){

  }
  return entryPages;
}


function pushHtmlWebpackPlugin(){
  var plugin = [];
  Object.keys(entryPages).forEach((page)=>{
    var template = path.join(currNamePath, `${page}.html`);
    if(!checkIsFile(template)){
      template = path.join(currNamePath, 'index.html');
    }
    plugin.push(
      new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: template,
        chunks: ['manifest', 'vendor', page],
        inject: true
      })
    )
  });
  return plugin;
}

module.exports = {
  findEntryName,
  findMobileEntryName,
  pushHtmlWebpackPlugin,
  findEntryPages: function(){
    return findEntryPages(currNamePath)
  }
}