
	select * from category
	select * from product
	select * from diamond
	select * from diamond_casing
	select * from product_diamonds
	select * from [order]
	select * from order_assignment
	select * from order_detail
	select * from order_status
	select * from [user]
	select * from [transaction]
	select * from membership_level

	SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE TABLE_NAME = 'user';
	
	ALTER TABLE [user] DROP CONSTRAINT FK__user__role_id__3D5E1FD2

	DELETE FROM [user];
	DELETE FROM [order];
	DELETE FROM [order_assignment];
	DELETE FROM [cart]
