COPY Products (id, productName) FROM '../../cassandra_products.csv' WITH DELIMITER=';' AND HEADER=TRUE;
COPY Colours (colourName, colour, logoUrl, frontUrl, backUrl, productId) FROM '../../cassandra_colours.csv' WITH DELIMITER=';' AND HEADER=TRUE;
