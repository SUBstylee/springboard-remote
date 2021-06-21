-- write your queries here
-- 1. Join the two tables so that every column and record appears, regardless of if there is not an owner_id. 
SELECT * FROM owners o FULL JOIN vehicles v ON o.id = v.owner_id;
-- 2. Count the number of cars for each owner. Display the owners first_name, last_name and count of vehicles. The first_name should be ordered in ascending order.
SELECT o.first_name, o.last_name, COUNT(v.owner_id) FROM owners o JOIN vehicles v ON o.id = v.owner_id GROUP BY (o.first_name, o.last_name) ORDER BY o.first_name;
-- 3. Count the number of cars for each owner and display the average price for each of the cars as integers. Display the owners first_name, last_name, average price and count of vehicles. The first_name should be ordered in descending order. Only display results with more than one vehicle and an average price greater than 10000.
SELECT o.first_name, o.last_name, CAST(AVG(v.price) AS int) AS average_price, COUNT(v.owner_id) FROM owners o JOIN vehicles v ON o.id = v.owner_id GROUP BY (o.first_name, o.last_name) HAVING COUNT(v.owner_id) >= 2 AND CAST(AVG(v.price) AS int) > 10000 ORDER BY o.first_name DESC;
