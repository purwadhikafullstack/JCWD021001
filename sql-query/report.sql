
USE PURE;
select * from products;
select * from productCategories;
select * from stockJournals;
select * from colours;
select * from mutations;

SELECT 
    SUM(totalPrice) AS TotalSales,
    SUM(totalQuantity) AS TotalQuantity
FROM 
    orders
WHERE 
    orderDate >= '2024-02-01 00:00:00' AND orderDate <= '2024-02-28 00:00:00';
    
    
select * from stockJournals;
select * from cities;
select * from warehouseAddresses;
select * from warehouses;
select * from users;
select * from userAddresses;
select * from mutations;
select * from sizes;
select * from productsToColours;

SELECT 
    MONTH(orderDate) AS Month,
    YEAR(orderDate) AS Year,
    SUM(totalPrice) AS MonthlyTotalSales,
    SUM(totalQuantity) AS MonthlyTotalQuantity
FROM 
   orders
GROUP BY 
    YEAR(orderDate), MONTH(orderDate)
ORDER BY 
    Year, Month;
    
select * from orders;

select * from payments;

select * from stocks;

select * from productCategories;

select * from productCategories;


select * from stockJournals;
select * from specificAddresses;

select * from stockJournals where stockId=21;

select * from stocks;

select stocks.id, stocks.productId, stocks.warehouseId, products.name
from stocks
join products on stocks.productId = products.id
where stocks.warehouseId = 4;

select * from orderProducts;

select * from stocks;

select * from stocks;
select * from orders;
select * from orderProducts;

select p.id, p.name, 
sum(op.price) as total, 
sum(op.quantity) as sold
FROM orders as o
JOIN orderProducts as op ON o.id = op.orderId
JOIN stocks as st ON op.stockId = st.id
JOIN products as p ON st.productId = p.id
WHERE o.orderDate >= '2024-01-01 00:00:00' 
AND o.orderDate <= '2024-01-30 00:00:00' 
AND o.warehouseId = 5
GROUP BY p.id;

select * from orderProducts;

-- BY CATEGORIES
SELECT  grandparent_category.name as grandparent_name, parent_category.name AS group_name, parent_category.id as group_id,  
SUM(orderProducts.quantity) as ordercount,
SUM(orderProducts.price) AS total
FROM orders
JOIN orderProducts ON orders.id = orderProducts.orderId
JOIN stocks ON orderProducts.stockId = stocks.id
JOIN products ON stocks.productId = products.id
JOIN productCategories AS child_category ON products.productCategoryId = child_category.id
JOIN productCategories AS parent_category ON child_category.parentId = parent_category.id
JOIN productCategories AS grandparent_category ON parent_category.parentId = grandparent_category.id
WHERE orders.orderDate >= '2024-02-01' AND orders.orderDate <= '2024-02-28'
AND orders.warehouseId = 4
GROUP BY parent_category.id;

select * from stocks;
select * from products;

select * from orderProducts;
select * from orders;

select * from users;
select * from warehouses;



WITH RECURSIVE category_path (id, title, path) AS
(
  SELECT id, title, title as path
    FROM category
    WHERE parent_id = 7
  UNION ALL
  SELECT c.id, c.title, CONCAT(cp.path, ' > ', c.title)
    FROM category_path AS cp JOIN category AS c
      ON cp.id = c.parent_id
)
SELECT * FROM category_path
ORDER BY path;


-- BY PRODUCT
SELECT products.name AS product, SUM(orders.totalPrice) AS total
FROM  orders
JOIN orderProducts ON orders.id = orderProducts.orderId
JOIN stocks ON orderProducts.stockId = stocks.id
JOIN products ON stocks.productId = products.id
WHERE orders.orderDate >= '2024-01-01 00:00:00' AND orders.orderDate <= '2024-01-30 00:00:00'
GROUP BY products.name;


select * from orderProducts;
SELECT p.id, p.name, 
  SUM(op.price) as total, 
  SUM(op.quantity) as sold
FROM orders as o
JOIN orderProducts as op ON o.id = op.orderId
JOIN stocks as st ON op.stockId = st.id
JOIN products as p ON st.productId = p.id
WHERE o.orderDate >= '2024-02-01 00:00:00' 
  AND o.orderDate <= '2024-02-29 00:00:00' 
  AND o.warehouseId = 4
GROUP BY p.id;
-- LIMIT ${pageSize} OFFSET ${offset};


select * from productCategories;

WITH RECURSIVE category_path (id, name, path) AS
(
  SELECT id, title, title as path
    FROM productCategories
    WHERE parentId = 7
  UNION ALL
  SELECT c.id, c.title, CONCAT(cp.path, ' > ', c.title)
    FROM category_path AS cp JOIN category AS c
      ON cp.id = c.parent_id
)
SELECT * FROM category_path
ORDER BY path;

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

select * from stocks;


select * from productCategories;
select * from sizes;

SELECT stocks.id, products.name as product, sizes.name,
SUM(CASE WHEN isAdding = 1 THEN stocks.qty ELSE 0 END) AS addition,
SUM(CASE WHEN isAdding = 0 THEN stocks.qty ELSE 0 END) AS reduction,
stocks.qty, child_category.name as category, parent_category.name as grup,grandparent_category.name as gender
FROM stockJournals
join stocks on stockJournals.stockId = stocks.id
join products on stocks.productId = products.id
join sizes on stocks.sizeId = sizes.id
JOIN productCategories AS child_category ON products.productCategoryId = child_category.id
JOIN productCategories AS parent_category ON child_category.parentId = parent_category.id
JOIN productCategories AS grandparent_category ON parent_category.parentId = grandparent_category.id
where stocks.warehouseId = 4 
AND stockJournals.createdAt>= '2024-02-01 00:00:00' AND stockJournals.createdAt<= '2024-02-28 00:00:00'
GROUP BY stocks.id;


use pure;
select * from productCategories where name = 'Men';
select * from products;
select * from productCategories;
select * from sizes;
select * from stocks;
select * from stockJournals;


-- BY CATEGORIES
SELECT  grandparent_category.name as grandparent_name, parent_category.name AS group_name, parent_category.id as group_id,  
SUM(orderProducts.quantity) as ordercount,
SUM(orderProducts.price) AS total
FROM orders
JOIN orderProducts ON orders.id = orderProducts.orderId
JOIN stocks ON orderProducts.stockId = stocks.id
JOIN products ON stocks.productId = products.id
JOIN productCategories AS child_category ON products.productCategoryId = child_category.id
JOIN productCategories AS parent_category ON child_category.parentId = parent_category.id
JOIN productCategories AS grandparent_category ON parent_category.parentId = grandparent_category.id
WHERE orders.orderDate >= '2024-02-01' AND orders.orderDate <= '2024-02-28'
AND orders.warehouseId = 4
GROUP BY parent_category.id;
