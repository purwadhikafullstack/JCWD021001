-- BY PRODUCT
SELECT products.name AS product, SUM(orders.totalPrice) AS total
FROM  orders
JOIN orderProducts ON orders.id = orderProducts.orderId
JOIN stocks ON orderProducts.stockId = stocks.id
JOIN products ON stocks.productId = products.id
WHERE orders.orderDate >= '2024-01-30 00:00:00' AND orders.orderDate <= '2024-01-30 00:00:00'
GROUP BY products.name;

-- BY CATEGORIES
SELECT  grandparent_category.name AS grandparent_name,
COUNT(orders.id) as ordercount,
SUM(orders.totalPrice) AS total
FROM orders
JOIN orderProducts ON orders.id = orderProducts.orderId
JOIN stocks ON orderProducts.stockId = stocks.id
JOIN products ON stocks.productId = products.id
JOIN productCategories AS child_category ON products.productCategoryId = child_category.id
JOIN productCategories AS parent_category ON child_category.parentId = parent_category.id
JOIN productCategories AS grandparent_category ON parent_category.parentId = grandparent_category.id
WHERE orders.orderDate >= '2024-01-30 00:00:00' AND orders.orderDate <= '2024-01-30 00:00:00'
GROUP BY grandparent_category.name;



