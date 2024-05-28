
CREATE TABLE [role] (
    id INT IDENTITY(1,1) PRIMARY KEY,
    role_name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE [user] (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    [password] VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    role_id INT REFERENCES role(id),
    first_name NVARCHAR(50) NOT NULL,
    last_name NVARCHAR(50) NOT NULL,
    city NVARCHAR(50) NOT NULL,
    [address] NVARCHAR(255) NOT NULL
);

CREATE TABLE diamond (
    id INT IDENTITY(1,1) PRIMARY KEY,
    color NVARCHAR(25) NOT NULL,
    origin NVARCHAR(50) NOT NULL,
    carat_weight DECIMAL(8, 2) NOT NULL CHECK (carat_weight > 0),
    cut_type NVARCHAR(25) NOT NULL,
    clarity VARCHAR(10) NOT NULL,
    GIA_certificate VARCHAR(255) NOT NULL UNIQUE,
    price BIGINT NOT NULL CHECK (price >= 0)
);

CREATE TABLE category (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE size (
    id INT IDENTITY(1,1) PRIMARY KEY,
    [name] NVARCHAR(50) NOT NULL UNIQUE,
    diameter DECIMAL(5, 2) NOT NULL CHECK (diameter > 0)
);

CREATE TABLE diamond_casing (
    id INT IDENTITY(1,1) PRIMARY KEY,
    material NVARCHAR(50) NOT NULL,
    price BIGINT NOT NULL CHECK (price > 0),
    category_id INT REFERENCES category(id) ON DELETE CASCADE,
    size_id INT REFERENCES size(id) ON DELETE CASCADE
);

CREATE TABLE warranty (
    id INT IDENTITY(1,1) PRIMARY KEY,
    warranty_free TEXT NOT NULL,
    warranty_paid TEXT NOT NULL,
    warranty_excluded TEXT NOT NULL,
    warranty_start_date DATE,
    warranty_end_date DATE,
    category_id INT REFERENCES category(id) ON DELETE CASCADE
);

CREATE TABLE promotion (
    id INT IDENTITY(1,1) PRIMARY KEY,
    [name] NVARCHAR(100) NOT NULL,
    [description] TEXT NOT NULL,
    discount_rate DECIMAL(8, 2) NOT NULL CHECK (discount_rate >= 0 AND discount_rate <= 1),
    [start_date] DATE NOT NULL,
    [end_date] DATE NOT NULL
);

CREATE TABLE product (
    id INT IDENTITY(1,1) PRIMARY KEY,
    diamond_casing_id INT REFERENCES diamond_casing(id) ON DELETE NO ACTION,
    [name] NVARCHAR(255) NOT NULL UNIQUE,
    image_url VARCHAR(255) NOT NULL,
    labor_cost BIGINT NOT NULL CHECK (labor_cost >= 0),
    profit_margin DECIMAL(8, 2) NOT NULL CHECK (profit_margin >= 0),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    promotion_id INT REFERENCES promotion(id) ON DELETE SET NULL,
    warranty_id INT REFERENCES warranty(id) ON DELETE SET NULL
);

CREATE TABLE product_diamonds (
    product_id INT REFERENCES product(id) ON DELETE CASCADE,
    diamond_id INT REFERENCES diamond(id) ON DELETE CASCADE,
    is_main BIT NOT NULL,
    PRIMARY KEY (product_id, diamond_id),  
);

CREATE TABLE [transaction] (
    id INT IDENTITY(1,1) PRIMARY KEY,
    payment_method NVARCHAR(255) NOT NULL,
    transaction_date DATETIME NOT NULL,
    transaction_amount BIGINT NOT NULL CHECK (transaction_amount > 0),
    [status] NVARCHAR(25) NOT NULL
);

CREATE TABLE [order] (
    id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT REFERENCES [user](id) ON DELETE CASCADE,
    transaction_id INT UNIQUE REFERENCES [transaction](id) ON DELETE CASCADE,
    delivery_fee BIGINT DEFAULT 0 CHECK (delivery_fee >= 0),
    discount_price BIGINT DEFAULT 0 CHECK (discount_price >= 0),
    total_price BIGINT NOT NULL CHECK (total_price > 0)
	
);

CREATE TABLE order_status (
    id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT REFERENCES [order](id) ON DELETE CASCADE,
    [user_id] INT REFERENCES [user](id) ON DELETE NO ACTION,
    [name] nvarchar(255) not null,
);

CREATE TABLE order_detail (
    id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT REFERENCES [order](id) ON DELETE CASCADE,
    product_id INT REFERENCES product(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price BIGINT NOT NULL CHECK (unit_price > 0)
);

CREATE TABLE cart (
    id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT REFERENCES [user](id) ON DELETE CASCADE,
    product_id INT REFERENCES product(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0)
);

CREATE TABLE point (
    id INT IDENTITY(1,1) PRIMARY KEY,
    points BIGINT NOT NULL CHECK (points >= 0),
    customer_id INT REFERENCES [user](id)
);

ALTER TABLE category
ALTER COLUMN image_url VARCHAR(MAX)

ALTER TABLE warranty
ALTER COLUMN warranty_free NVARCHAR(255) NOT NULL; 

ALTER TABLE warranty
ALTER COLUMN warranty_paid NVARCHAR(255) NOT NULL; 

ALTER TABLE warranty
ALTER COLUMN warranty_excluded NVARCHAR(255) NOT NULL; 

ALTER TABLE promotion
ALTER COLUMN description NVARCHAR(255) NOT NULL; 

ALTER TABLE [order] ADD created_at DATETIME NOT NULL DEFAULT GETDATE();

INSERT INTO category (name, image_url) VALUES
    (N'Nhẫn', 'https://d1xzdqg8s8ggsr.cloudfront.net/664a22d2cbfa393cc4c9ceef/76e4e9b1-c95c-489c-9e32-9ff471942c74_1716134727505021543?Expires=-62135596800&Signature=n6nHy9d2V7znbC85kv1Z0JSDRVLFhD7T4ur9TOrCx03uBsW2AbPB0q6mzxg7-sXiexGQ43NIgEnAZJx0itrkN62YTs207V~a5B6OMHDR-SHa4Oy~z9QtGHX8Gi9onsKb1epLUJARsHaWw~q3U-LMUCRdHRQN9LqWD~8rb~703wy3IBPhbcKC0tCLjg5t0vpNf10ThxC4U~-USmNkKK4iNw0jGUoWItZkUSxTynrqUsuGUxJjZXDKr1wpu1AyRPLkPPMRAANQFdqZqhJJ7MZcsbyOk0qxdJgJwvfMAuD~0ysPg3P2MkfXm-9vLx3O0EItDVmdNoSnqGZQClOrkBhHaQ__&Key-Pair-Id=K1P54FZWCHCL6J'),
    (N'Dây chuyền', 'https://d1xzdqg8s8ggsr.cloudfront.net/664a22d2cbfa393cc4c9ceef/8bfb79e5-2821-4632-93bc-c363ac21ce30_1716134727504852254?Expires=-62135596800&Signature=jSAgZwTcIx8SZ9FKdhDc7plUcPgTRhF6eljvW3VRJwMVnOkKg33~f5SC6kB6osNnBI~8rLxvtNLiTfBkU6qzIGJtn9w58y9A4UPPifwcCT3PlMO8x0N10u1x22l6AxyO~IrP5CiVswygMhsS3xtH0IFlQY8nKS5tlJWAB~zX6uPlDetmscdyjJWoVcewOr9YX4zTdH9CGRvd04RvzLPy67C2MjKbjL8SFtyqGeKf-k2yJ71mk-d3CYCpdoXRDI6tSFBKwYHlocG8GjPHrYAHtC9MXhLDV0wf35-DN0cJx0SnslkAlRUdzykz1uoAUBJL0ZecTsF1~vwJgQOwEtVf8w__&Key-Pair-Id=K1P54FZWCHCL6J'),
    (N'Bông tai', 'https://d1xzdqg8s8ggsr.cloudfront.net/664a22d2cbfa393cc4c9ceef/aeedf89e-b00f-4d95-865e-10c3af12735c_1716134727505109286?Expires=-62135596800&Signature=aXTVDQa2WfY5CDlRMhRbV-2ZMAQlsg~aUlMYJJ1pSzFZsnBlu8S8Fn24Bs6lG5D-Xu8e3Jnuhz26LV8gbtoF7sp4Qsyk9Y0ooJQF-ooG4GAaR2nwF~Xtr~7H~6Lb2wKrMKDcHjBlIdS7Pz~juczvKzbEKKkwYpK~nag5DKs~pEDR-WDy5mnMsISATPGjdnMY1yKxCQTXyf9w2g95fQKYPBy42p1xYi2wNo98prvgWcivKeYJzqNQPdxCGU3zgmBdmkyZMX-2g9n01jnvuF5CHSKVwdAOQh3pFCUGmo9ameDOqT5wzqF5uvUbgw66n6TF70N1kIzIuCYHkQ8upjU2bg__&Key-Pair-Id=K1P54FZWCHCL6J'),
    (N'Kim cương viên', 'https://d1xzdqg8s8ggsr.cloudfront.net/664a22d2cbfa393cc4c9ceef/64581a48-b15f-4f48-83bb-b081a9042c66_1716134727505275375?Expires=-62135596800&Signature=iAUPdWuKOWskI5Fg6TWkfpuqZ4p2gCKYsWDlIrZyVDnGVsUxvNe1ji1n6U-JQT-O7e~loX92~957skmN~pvJ61U8PScddYxXl5HBSV8dmDT~9WjySDH7pN3QzFRhhUQpHEOHuHudWBpnNlVVwbJA6yKhis89HBEx9SkIbkBH~J0JruVp4Cw0nvFkzrMWQiNHySuLyqQJ179WsISE2yU4fAcRdgneSFgXX1wnNBGyn3ox13iVXOGF8G2l-~oyr0BMFCU5dRw9U9UXDT8qO41fN5XApP4xLs8dB3i1qnmDH5Ka4jiHl-oqsZg7LZP5g6LTJzwDt4ZyunkxJJWhqY6HjQ__&Key-Pair-Id=K1P54FZWCHCL6J');

INSERT INTO warranty (warranty_free, warranty_paid, warranty_excluded, warranty_start_date, warranty_end_date, category_id) VALUES

    (N'Bảo hành làm sạch, đánh bóng sản phẩm miễn phí trọn đời.', 
     N'Bảo hành thay thế, sửa chữa các chi tiết sản phẩm với chi phí ưu đãi.', 
     N'Không bảo hành các trường hợp hư hỏng do lỗi người dùng.', 
     '2023-01-01', '2025-01-01', 2),  -- Bảo hành cho nhẫn

    (N'Bảo hành làm sạch, đánh bóng sản phẩm miễn phí 1 năm.', 
     N'Bảo hành thay thế, sửa chữa các chi tiết sản phẩm với chi phí ưu đãi.', 
     N'Không bảo hành các trường hợp hư hỏng do lỗi người dùng.', 
     '2023-01-01', '2024-01-01', 3),  -- Bảo hành cho dây chuyền

    (N'Bảo hành làm sạch, đánh bóng sản phẩm miễn phí 6 tháng.', 
     N'Bảo hành thay thế, sửa chữa các chi tiết sản phẩm với chi phí ưu đãi.', 
     N'Không bảo hành các trường hợp hư hỏng do lỗi người dùng.', 
     '2023-01-01', '2023-07-01', 4);  -- Bảo hành cho bông tai	

INSERT INTO promotion (name, description, discount_rate, start_date, end_date) VALUES
    (N'Khuyến mãi mừng khai trương', N'Giảm giá 10% cho tất cả các sản phẩm', 0.10, '2024-05-20', '2024-06-20'),
    (N'Ưu đãi đặc biệt ngày lễ', N'Giảm giá 15% cho các sản phẩm nhẫn đính hôn', 0.15, '2024-06-01', '2024-06-10'),
    (N'Flash sale cuối tuần', N'Giảm giá 20% cho các sản phẩm dây chuyền', 0.20, '2024-05-25', '2024-05-26');

INSERT INTO diamond_casing (material, price, category_id, size_id)
VALUES
    (N'Vàng trắng 14K', 2500000, 2, 1),    -- Nhẫn vàng trắng 14K, size nhỏ
    (N'Vàng trắng 14K', 3000000, 2, 2),    -- Nhẫn vàng trắng 14K, size vừa
    (N'Vàng trắng 18K', 3500000, 2, 3),    -- Nhẫn vàng trắng 18K, size lớn
    (N'Vàng trắng 10K', 2000000, 2, 1),    -- Nhẫn vàng trắng 10K, size nhỏ
    (N'Vàng vàng 14K', 2800000, 2, 2),    -- Nhẫn vàng vàng 14K, size vừa
    (N'Vàng vàng 18K', 3800000, 2, 3),    -- Nhẫn vàng vàng 18K, size lớn
    (N'Bạch kim', 5000000, 2, 2),        -- Nhẫn bạch kim, size vừa
    (N'Bạc', 1000000, 2, 1),           -- Nhẫn bạc, size nhỏ

    (N'Vàng trắng 14K', 3000000, 3, 1),    -- Dây chuyền vàng trắng 14K, size nhỏ
    (N'Vàng trắng 18K', 4000000, 3, 2),    -- Dây chuyền vàng trắng 18K, size vừa
    (N'Vàng vàng 14K', 3500000, 3, 2),    -- Dây chuyền vàng vàng 14K, size vừa
    (N'Vàng vàng 18K', 4500000, 3, 3),    -- Dây chuyền vàng vàng 18K, size lớn
    (N'Bạch kim', 6000000, 3, 2),        -- Dây chuyền bạch kim, size vừa

    (N'Vàng trắng 14K', 1800000, 4, 1),    -- Bông tai vàng trắng 14K, size nhỏ
    (N'Vàng trắng 18K', 2200000, 4, 2),    -- Bông tai vàng trắng 18K, size vừa
    (N'Vàng vàng 14K', 2000000, 4, 2),    -- Bông tai vàng vàng 14K, size vừa
    (N'Bạch kim', 3000000, 4, 2)         -- Bông tai bạch kim, size vừa
;

INSERT INTO size ("name", diameter) VALUES
    (N'3', 9.0),
    (N'3.5', 9.5),
    (N'4', 10.0),
    (N'4.5', 10.5),
    (N'5', 11.0),
    (N'5.5', 11.5),
    (N'6', 12.0),
    (N'6.5', 12.5),
    (N'7', 13.0),
    (N'7.5', 13.5),
    (N'8', 14.0),
    (N'8.5', 14.5),
    (N'9', 15.0),
    (N'9.5', 15.5),
    (N'10', 16.0),
    (N'10.5', 16.5),
    (N'11', 17.0),
    (N'11.5', 17.5),
    (N'12', 18.0),
    (N'12.5', 18.5),
    (N'13', 19.0),
    (N'13.5', 19.5),
    (N'14', 20.0),
    (N'14.5', 20.5),
    (N'15', 21.0);

	INSERT INTO product (diamond_casing_id, name, image_url, labor_cost, profit_margin, stock_quantity, promotion_id, warranty_id)
VALUES
    (1, N'Nhẫn kim cương Solitaire', 'https://cdn.pnj.io/images/detailed/197/sp-gnddddw009976-nhan-kim-cuong-vang-trang-14k-pnj-1.png', 1000000, 0.2, 10, 1, 2),
    (2, N'Dây chuyền kim cương Halo', 'https://cdn.pnj.io/images/detailed/204/sp-gd0000w001067-day-chuyen-vang-trang-10k-pnj-1.png', 1500000, 0.25, 5, NULL, 3),
    (3, N'Bông tai kim cương Princess', 'https://cdn.pnj.io/images/detailed/205/sp-gbddddw060389-bong-tai-kim-cuong-vang-trang-kim-cuong-pnj-1.png', 800000, 0.18, 15, NULL, 4);

	INSERT INTO diamond (color, origin, carat_weight, cut_type, clarity, GIA_certificate, price)
VALUES
    (N'D', N'Nga', 0.50, N'Tuyệt hảo (Excellent)', 'FL', 'GIA123456789', 10000000),
    (N'E', N'Nam Phi', 0.75, N'Rất tốt (Very Good)', 'VVS1', 'GIA987654321', 15000000),
    (N'F', N'Canada', 1.00, N'Tốt (Good)', 'VS2', 'GIA555555555', 20000000),
    (N'G', N'Úc', 0.30, N'Khá tốt (Fair)', 'SI1', 'GIA111111111', 8000000),
    (N'H', N'Bỉ', 1.50, N'Tuyệt hảo (Excellent)', 'VVS2', 'GIA222222222', 30000000),
    (N'I', N'Ấn Độ', 2.00, N'Rất tốt (Very Good)', 'VS1', 'GIA333333333', 50000000),
    (N'J', N'Brazil', 0.90, N'Tốt (Good)', 'SI2', 'GIA444444444', 18000000);

	INSERT INTO product_diamonds (product_id, diamond_id, is_main) VALUES
    (1, 1, 1), 
    (2, 2, 1), 
    (3, 3, 1),  
    (3, 4, 0);

	INSERT INTO role (role_name) VALUES ('ADMIN');
	INSERT INTO role (role_name) VALUES ('CUSTOMER');
	INSERT INTO role (role_name) VALUES ('SALES_STAFF');

	INSERT INTO [user] (username, password, email, phone_number, role_id, first_name, last_name, city, address) VALUES
	('adminn', '1', 'customer2@gmail.com', '0987654325', 2, N'Trần', N'Thị B', N'Đà Nẵng', N'789 Hoàng Diệu');

	INSERT INTO [transaction] (payment_method, transaction_date, transaction_amount, status) VALUES
    ('COD', '2024-05-20 10:30:00', 12000000, 'completed'),
    ('Banking', '2024-05-19 14:45:00', 13500000, 'shipped');

	INSERT INTO [order] (customer_id, transaction_id, delivery_fee, discount_price, total_price, created_at) VALUES
    (2, 1, 0, 0, 12000000, '2024-05-20 10:30:00'),
    (2, 2, 0, 1500000, 13500000, '2024-05-19 14:45:00');

	INSERT INTO order_detail (order_id, product_id, quantity, unit_price) VALUES
    (2, 1, 1, 12000000),
    (3, 2, 1, 15000000);

	INSERT INTO order_status (order_id, user_id, name) VALUES
    (2, 1, 'completed'),
    (3, 1, 'shipped');

	select * from warranty
	select * from category
	select * from size
	select * from product
	select * from diamond
	select * from diamond_casing
	select * from product_diamonds
	select * from [order]
	select * from order_detail
	select * from order_status
	select * from [user]
	select * from [role]
	select * from [transaction]


