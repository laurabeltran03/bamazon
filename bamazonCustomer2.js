var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",


  port: 8889,


  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

var NumProduct = 0;

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    afterConnection();
  });


  function afterConnection() {
    console.log("Selecting all products...\n");
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      runSearch();
    });
}

function runSearch() {
    inquirer
      .prompt({
        name: 'ShopAsk',
        message: 'Would you like to shop with us today?',
        type: 'list',
        choices: ['Yes', 'No']
      }).then(function (answer) {

        
        if (answer.ShopAsk === 'Yes') {
            optionList();
        } else {
           
            console.log('Please come back soon! --Bamazon');
            connection.destroy();
            return;
        }
    
    });


function optionList() {
    return inquirer.prompt([{
        name: 'item',
        message: 'Enter the item number of the product you would like to purchase.',
        type: 'input',
       
        validate: function(value) {
            if (value >= NumProduct) {
                return true;
            } else {
                console.log('\nPlease enter a valid ID.');
                return false;
            }
        }
    }, {
        name: 'quantity',
        message: 'How many would you like to buy?',
        type: 'input',
        // Validator to ensure it is number
        validate: function(value) {
            if (value >= NumProduct) {
                return true;
            } else {
                console.log('\nPlease enter a valid quantity.');
                return false;
            }
        }
 
    }]).then(function(answer) {
        return new Promise(function(resolve, reject) {
            connection.query('SELECT * FROM products WHERE ?', { item_id: answer.item }, function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
           
        }).then(function(result) {
            var savedData = {};

            if (parseInt(answer.quantity) <= parseInt(result[0].stock_quantity)) {
                savedData.answer = answer;
                savedData.result = result;
            } else if (parseInt(answer.quantity) > parseInt(result[0].stock_quantity)) {
                console.log('Insufficient quantity!');
            } else {
                console.log('An error occurred, exiting Bamazon, your order is not complete.');
            }
            
            return savedData;
           
        }).then(function(savedData) {
            if (savedData.answer) {
                var updatedQuantity = parseInt(savedData.result[0].stock_quantity) - parseInt(savedData.answer.quantity);
                var itemId = savedData.answer.item;
                var totalCost = parseInt(savedData.result[0].price) * parseInt(savedData.answer.quantity);
                connection.query('UPDATE products SET ? WHERE ?', [{
                    stock_quantity: updatedQuantity
                }, {
                    item_id: itemId
                }], function(err, res) {
                    if (err) throw err;
                    console.log('Your order total cost $' + totalCost + '. Thank you for shopping with Bamazon!');
                    connection.destroy();
                });
            } else {

                runSearch();
            }
          
        }).catch(function(err) {
            console.log(err);
            connection.destroy();
        });
      
    }).catch(function(err) {
        console.log(err);
        connection.destroy();
    });
}
}