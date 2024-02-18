use pure;

select * from stockReports;

select * from stockJournals;

SELECT table_name, column_name
FROM information_schema.key_column_usage
WHERE referenced_table_name = 'mutations';

SELECT table_name, column_name
FROM information_schema.key_column_usage
WHERE referenced_table_name = 'colours';

SELECT table_name, column_name
FROM information_schema.key_column_usage
WHERE referenced_table_name = 'mutations';

SELECT table_name, column_name
FROM information_schema.key_column_usage
WHERE referenced_table_name = 'productCategories';

select * from stockJournals;

select * from productCategories;

select * from productCategories where parentId = 148;


select * from sizes;

select * from productCategories;