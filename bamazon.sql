CREATE DATABASE bamazon;

USE bamazon;
CREATE TABLE products(
  -- Create a numeric column called "id" which will automatically increment its default value as we create new rows. --
item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50),
department_name VARCHAR(50),
price DECIMAL (4.2) NOT NULL,
stock_quantity INT(4) NOT NULL,
PRIMARY KEY (item_id)
);

SELECT * FROM products;

DROP TABLE products

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Roku Smart LED TV", "Televisions",149.99, 20 );

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Sceptre 43 Inches 1080p LED TV", "Televisions",115.39, 30 );

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("TruSkin Naturals Vitamin C Serum for Face", "Beauty & Personal Care",19.99, 50 );

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Kirkland Signature 100% Colombian Coffee", "Food and Grocery",16.45, 80 );

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Jstyle Mens Cufflinks and Studs Set Tuxedo", "Clothing, Shoes and Jewelry ",12.99, 70 );

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Watermelon Taffy Butter Slime (Scented)", "Handmade",9.50, 8 );

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Wonderful Pistachios, Roasted and Salted, 32 Oz", "Food and Grocery",29.95, 38 );

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Classic Man Snack Gift Basket-Summer Sausage", "Food and Grocery",29.95, 42 );

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Happy Howie's, Inc. 2lb Premium Turkey Roll", "Pet Supplies",11.99, 16 );

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Rachael Ray Nutrish Natural Wet Dog Food, Grain Free", "Pet Supplies",14.64, 26 );