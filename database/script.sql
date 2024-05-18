
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

