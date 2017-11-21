var inquirer = require('inquirer');
var fs = require('fs');
var chalk = require('chalk');
var path = process.cwd();
var template = require("./bin/template");

var chooseMVC = [{
  type: 'list',
  name: 'type',
  message: '選擇功能',
  choices: ['Model', 'View', 'Controller'],
  filter: (val) => {
    return val.toLowerCase();
  }
}]

var modelQuestion = [{
  type: 'input',
  name: 'name',
  message: '輸入Model名稱'
}];

function createModel() {
  inquirer.prompt(modelQuestion).then(function(ans) {
    if(ans.name !== "quit") {
      fs.mkdir(path + "/model", function(e) {
        if(!e || (e && e.code === "EEXIST")) {
          fs.writeFile(path + `/model/${ans.name}.js`, template.model(ans.name), function(err) {
            if(err) {
              return console.log(err);
            }
            console.log(chalk.green(`Model ${ans.name}.js create!`));
            createModel();
          });
        } else {
          console.log(e);
        }
      });
    }
  });
}

inquirer.prompt(chooseMVC).then(function(ans) {
  switch(ans.type) {
    case 'model':
      createModel();
      break;
    case 'view':
      inquirer.prompt(chooseMVC).then(function(ans) {

      });
      break;
    case 'controller':
      inquirer.prompt(chooseMVC).then(function(ans) {

      });
      break;
  }
});
