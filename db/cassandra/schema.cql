DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Colours;

CREATE TABLE Products (
  id INT,
  productName TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE Colours (
  productId INT,
  id TEXT,
  colourName TEXT,
  colour INT,
  logoUrl TEXT,
  frontUrl TEXT,
  backUrl TEXT,
  PRIMARY KEY (productId, colourName)
) WITH CLUSTERING ORDER BY (colourName ASC);
