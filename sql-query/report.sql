USE PURE;

select stocks.id, stocks.productId, stocks.warehouseId, products.name
from stocks
join products on stocks.productId = products.id
where stocks.warehouseId = 4;

select * from orderProducts;

select * from orders;

select p.id, p.name, 
sum(op.price * op.quantity) as total, 
sum(op.quantity) as sold
FROM orders as o
JOIN orderProducts as op ON o.id = op.orderId
JOIN stocks as st ON op.stockId = st.id
JOIN products as p ON st.productId = p.id
WHERE o.orderDate >= '2024-01-30 00:00:00' 
AND o.orderDate <= '2024-01-30 00:00:00' 
AND o.warehouseId = 5
GROUP BY p.id;

select * from orderProducts;

-- BY CATEGORIES
SELECT  grandparent_category.name as grandparent_name, parent_category.name AS group_name, parent_category.id as group_id,  
SUM(orderProducts.quantity) as ordercount,
SUM(orderProducts.price * orderProducts.quantity) AS total
FROM orders
JOIN orderProducts ON orders.id = orderProducts.orderId
JOIN stocks ON orderProducts.stockId = stocks.id
JOIN products ON stocks.productId = products.id
JOIN productCategories AS child_category ON products.productCategoryId = child_category.id
JOIN productCategories AS parent_category ON child_category.parentId = parent_category.id
JOIN productCategories AS grandparent_category ON parent_category.parentId = grandparent_category.id
WHERE orders.orderDate >= '2024-01-30 00:00:00' AND orders.orderDate <= '2024-01-30 00:00:00'
AND orders.warehouseId = 5
GROUP BY parent_category.id;




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

select * from stockJournals;
select * from stocks where warehouseId = 4;

SELECT stocks.id, 
SUM(CASE WHEN isAdding = 1 THEN stocks.qty ELSE 0 END) AS addition,
SUM(CASE WHEN isAdding = 0 THEN stocks.qty ELSE 0 END) AS reduction,
stocks.qty
FROM stockJournals
join stocks on stockJournals.stockId = stocks.id
where stocks.warehouseId = 4
GROUP BY stocks.id;


