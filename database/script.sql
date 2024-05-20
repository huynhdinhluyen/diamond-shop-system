
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

INSERT INTO category (name, image_url) VALUES
    (N'Nhẫn', 'https://d1xzdqg8s8ggsr.cloudfront.net/664a22d2cbfa393cc4c9ceef/76e4e9b1-c95c-489c-9e32-9ff471942c74_1716134727505021543?Expires=-62135596800&Signature=n6nHy9d2V7znbC85kv1Z0JSDRVLFhD7T4ur9TOrCx03uBsW2AbPB0q6mzxg7-sXiexGQ43NIgEnAZJx0itrkN62YTs207V~a5B6OMHDR-SHa4Oy~z9QtGHX8Gi9onsKb1epLUJARsHaWw~q3U-LMUCRdHRQN9LqWD~8rb~703wy3IBPhbcKC0tCLjg5t0vpNf10ThxC4U~-USmNkKK4iNw0jGUoWItZkUSxTynrqUsuGUxJjZXDKr1wpu1AyRPLkPPMRAANQFdqZqhJJ7MZcsbyOk0qxdJgJwvfMAuD~0ysPg3P2MkfXm-9vLx3O0EItDVmdNoSnqGZQClOrkBhHaQ__&Key-Pair-Id=K1P54FZWCHCL6J'),
    (N'Dây chuyền', 'https://d1xzdqg8s8ggsr.cloudfront.net/664a22d2cbfa393cc4c9ceef/8bfb79e5-2821-4632-93bc-c363ac21ce30_1716134727504852254?Expires=-62135596800&Signature=jSAgZwTcIx8SZ9FKdhDc7plUcPgTRhF6eljvW3VRJwMVnOkKg33~f5SC6kB6osNnBI~8rLxvtNLiTfBkU6qzIGJtn9w58y9A4UPPifwcCT3PlMO8x0N10u1x22l6AxyO~IrP5CiVswygMhsS3xtH0IFlQY8nKS5tlJWAB~zX6uPlDetmscdyjJWoVcewOr9YX4zTdH9CGRvd04RvzLPy67C2MjKbjL8SFtyqGeKf-k2yJ71mk-d3CYCpdoXRDI6tSFBKwYHlocG8GjPHrYAHtC9MXhLDV0wf35-DN0cJx0SnslkAlRUdzykz1uoAUBJL0ZecTsF1~vwJgQOwEtVf8w__&Key-Pair-Id=K1P54FZWCHCL6J'),
    (N'Bông tai', 'https://d1xzdqg8s8ggsr.cloudfront.net/664a22d2cbfa393cc4c9ceef/aeedf89e-b00f-4d95-865e-10c3af12735c_1716134727505109286?Expires=-62135596800&Signature=aXTVDQa2WfY5CDlRMhRbV-2ZMAQlsg~aUlMYJJ1pSzFZsnBlu8S8Fn24Bs6lG5D-Xu8e3Jnuhz26LV8gbtoF7sp4Qsyk9Y0ooJQF-ooG4GAaR2nwF~Xtr~7H~6Lb2wKrMKDcHjBlIdS7Pz~juczvKzbEKKkwYpK~nag5DKs~pEDR-WDy5mnMsISATPGjdnMY1yKxCQTXyf9w2g95fQKYPBy42p1xYi2wNo98prvgWcivKeYJzqNQPdxCGU3zgmBdmkyZMX-2g9n01jnvuF5CHSKVwdAOQh3pFCUGmo9ameDOqT5wzqF5uvUbgw66n6TF70N1kIzIuCYHkQ8upjU2bg__&Key-Pair-Id=K1P54FZWCHCL6J'),
    (N'Kim cương viên', 'https://d1xzdqg8s8ggsr.cloudfront.net/664a22d2cbfa393cc4c9ceef/64581a48-b15f-4f48-83bb-b081a9042c66_1716134727505275375?Expires=-62135596800&Signature=iAUPdWuKOWskI5Fg6TWkfpuqZ4p2gCKYsWDlIrZyVDnGVsUxvNe1ji1n6U-JQT-O7e~loX92~957skmN~pvJ61U8PScddYxXl5HBSV8dmDT~9WjySDH7pN3QzFRhhUQpHEOHuHudWBpnNlVVwbJA6yKhis89HBEx9SkIbkBH~J0JruVp4Cw0nvFkzrMWQiNHySuLyqQJ179WsISE2yU4fAcRdgneSFgXX1wnNBGyn3ox13iVXOGF8G2l-~oyr0BMFCU5dRw9U9UXDT8qO41fN5XApP4xLs8dB3i1qnmDH5Ka4jiHl-oqsZg7LZP5g6LTJzwDt4ZyunkxJJWhqY6HjQ__&Key-Pair-Id=K1P54FZWCHCL6J');

	
	
