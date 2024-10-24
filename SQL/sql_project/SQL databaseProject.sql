-- Create the Items table (���� ������)
CREATE TABLE Items (
    Code INT PRIMARY KEY,                -- ��� ����
    Description NVARCHAR(255),           -- ����� ����
    UnitPrice MONEY,                     -- ���� �����
    Available INT,                       -- ���� �����
    Saved INT,                           -- ���� �����
    Waiting INT,                         -- ���� ������
    Subscript INT,                       -- ���� ������� ������
    Freq INT,                            -- ������ ����� ����� (���� ����)
    SuppDate DATE,                       -- ����� ����� ��� �����
    OrderPercnt DECIMAL(5, 2)            -- ���� ����� �����
);

-- Insert data into the Items table
INSERT INTO Items (Code, Description, UnitPrice, Available, Saved, Waiting, Subscript, Freq, SuppDate, OrderPercnt)
VALUES
(101, 'Office Chair', 85.00, 150, 20, 15, 10, 7, '2024-08-25', 5.00),
(102, 'Desk Lamp', 45.00, 200, 30, 10, 12, 10, '2024-08-30', 10.00),
(103, 'Desk Organizer', 20.00, 300, 25, 20, 15, 14, '2024-09-01', 7.50);

-- Create the Customers table (���� ������)
CREATE TABLE Customers (
    CustID INT PRIMARY KEY,              -- �.�. ����
    CustType NVARCHAR(50),               -- ��� ����
    CustStatus NVARCHAR(50),             -- ����� ����
    FreezCode NVARCHAR(50),              -- ���� �����
    OverCount INT,                       -- ���� ������
    CustName NVARCHAR(255),              -- �� ����
    DelivAddrss NVARCHAR(255),           -- ����� �������
    MailAddrss NVARCHAR(255),            -- ����� �����
    CreditCard NVARCHAR(255)             -- ���� ����� �����
);

-- Insert data into the Customers table
INSERT INTO Customers (CustID, CustType, CustStatus, FreezCode, OverCount, CustName, DelivAddrss, MailAddrss, CreditCard)
VALUES
(123456789, 'Regular', 'Active', NULL, 0, 'John Smith', '123 Main St, Anytown', 'john.smith@email.com', '1234-5678-9012-3456'),
(987654321, 'Premium', 'Inactive', 'Payment Issue', 3, 'Emily Johnson', '456 Oak St, Somewhere', 'emily.johnson@email.com', '9876-5432-1098-7654'),
(112233445, 'Gold', 'Active', NULL, 1, 'Michael Brown', '789 Pine St, Anywhere', 'michael.brown@email.com', '1111-2222-3333-4444');

-- Create the ExOrders table (���� ������ ������)
CREATE TABLE ExOrders (
    OrderNo INT PRIMARY KEY,             -- ���� �����
    Date DATE,                           -- ����� ������
    CustID INT,                          -- �.�. ����
    Code INT,                            -- ��� ����
    Quant INT,                           -- ���� ������ �������
    Delivery INT,                        -- ��� �����
    Address NVARCHAR(255),               -- ����� ������
    Status NVARCHAR(50),                 -- ����� �����
    SuppDate DATE,                       -- ����� ������
    FOREIGN KEY (Code) REFERENCES Items(Code),           -- ���� �� ���� ����
    FOREIGN KEY (CustID) REFERENCES Customers(CustID)    -- ���� �� ��.�. ����
);

-- Insert data into the ExOrders table
INSERT INTO ExOrders (OrderNo, Date, CustID, Code, Quant, Delivery, Address, Status, SuppDate)
VALUES
(5001, '2024-08-10', 123456789, 101, 5, 1, '123 Main St, Anytown', 'Pending', '2024-08-20'),
(5002, '2024-08-15', 987654321, 102, 3, 2, '456 Oak St, Somewhere', 'Shipped', '2024-08-25'),
(5003, '2024-08-20', 112233445, 103, 7, 1, '789 Pine St, Anywhere', 'Delivered', '2024-09-05');

-- Create the Invoices table (���� ��������)
CREATE TABLE Invoices (
    InvNo INT PRIMARY KEY,                -- ���� �������
    Date DATE,                           -- �����
    OrderNo INT,                         -- ���� �����
    UnitDesc NVARCHAR(255),              -- ����� ����
    NoUnits INT,                         -- ���� ������
    UnitPrice MONEY,                     -- ���� �����
    TotAmount MONEY,                     -- ���� �����
    FOREIGN KEY (OrderNo) REFERENCES ExOrders(OrderNo)    -- ���� �� ����� �����
);

-- Insert data into the Invoices table
INSERT INTO Invoices (InvNo, Date, OrderNo, UnitDesc, NoUnits, UnitPrice, TotAmount)
VALUES
(6001, '2024-08-11', 5001, 'Office Chair', 5, 85.00, 425.00),
(6002, '2024-08-16', 5002, 'Desk Lamp', 3, 45.00, 135.00),
(6003, '2024-08-21', 5003, 'Desk Organizer', 7, 20.00, 140.00);

-- Create the Subscription table (���� ���� ������ ������)
CREATE TABLE Subscription (
    OrderNo INT,                         -- ���� �����
    CustID INT,                          -- �.�. ����
    Code INT,                            -- ��� ����
    Quant INT,                           -- ���� ������
    Freq INT,                            -- ������ ����� ������ (���� ����)
    Delivery INT,                        -- ��� �����
    NextOrder DATE,                      -- ����� ��� ������ �����
    Expiration DATE,                     -- ����� ����� ������
    Status NVARCHAR(50),                 -- ����� ����� �����
    PRIMARY KEY (OrderNo, CustID),       -- ���� ���� �����
    FOREIGN KEY (Code) REFERENCES Items(Code),           -- ���� �� ���� ����
    FOREIGN KEY (CustID) REFERENCES Customers(CustID)    -- ���� �� ��.�. ����
);

-- Insert data into the Subscription table
INSERT INTO Subscription (OrderNo, CustID, Code, Quant, Freq, Delivery, NextOrder, Expiration, Status)
VALUES
(7001, 123456789, 101, 10, 30, 1, '2024-09-10', '2025-09-10', 'Active'),
(7002, 987654321, 102, 5, 15, 2, '2024-09-15', '2025-09-15', 'On Hold'),
(7003, 112233445, 103, 8, 60, 1, '2024-10-01', '2025-10-01', 'Active');

-- Create the Receipt table (���� �����)
CREATE TABLE Receipt (
    ReceiptNo INT PRIMARY KEY,            -- ���� ����
    PymtDate DATE,                        -- �����
    InvNo INT,                            -- ���� �������
    OrderNo INT,                          -- ���� �����
    PaidAmt MONEY,                        -- ���� �����
    FOREIGN KEY (InvNo) REFERENCES Invoices(InvNo),    -- ���� �� ����� �������
    FOREIGN KEY (OrderNo) REFERENCES ExOrders(OrderNo) -- ���� �� ����� �����
);

-- Insert data into the Receipt table
INSERT INTO Receipt (ReceiptNo, PymtDate, InvNo, OrderNo, PaidAmt)
VALUES
(8001, '2024-08-12', 6001, 5001, 425.00),
(8002, '2024-08-17', 6002, 5002, 135.00),
(8003, '2024-08-22', 6003, 5003, 140.00);

-- Create the Accounting table (���� �����)
CREATE TABLE Accounting (
    AccountID INT IDENTITY(1,1) PRIMARY KEY,  -- ���� �����
    Date DATE,                               -- �����
    Amount MONEY,                            -- ����
    CrdtDebt NVARCHAR(50),                   -- ����/�����
    InvNo INT,                               -- ���� �������
    OrderNo INT,                             -- ���� �����
    ReceiptNo INT,                           -- ���� ����
    FOREIGN KEY (InvNo) REFERENCES Invoices(InvNo),    -- ���� �� ����� �������
    FOREIGN KEY (OrderNo) REFERENCES ExOrders(OrderNo), -- ���� �� ����� �����
    FOREIGN KEY (ReceiptNo) REFERENCES Receipt(ReceiptNo)  -- ���� �� ����� ����
);

-- Insert data into the Accounting table
INSERT INTO Accounting (Date, Amount, CrdtDebt, InvNo, OrderNo, ReceiptNo)
VALUES
('2024-08-12', 425.00, 'Credit', 6001, 5001, 8001),
('2024-08-17', 135.00, 'Credit', 6002, 5002, 8002),
('2024-08-22', 140.00, 'Credit', 6003, 5003, 8003);

-- Create the StockOrder table (���� ������ �����)
CREATE TABLE StockOrder (
    OrderNo INT PRIMARY KEY,                -- ���� �����
    StockDate DATE,                        -- �����
    Code INT,                              -- ��� ����
    Descr NVARCHAR(255),                   -- ����� ����
    Quant INT                             -- ���� ������ ������
);

-- Insert data into the StockOrder table
INSERT INTO StockOrder (OrderNo, StockDate, Code, Descr, Quant)
VALUES
(9001, '2024-08-01', 101, 'Office Chair', 50),
(9002, '2024-08-15', 102, 'Desk Lamp', 30),
(9003, '2024-08-20', 103, 'Desk Organizer', 40);

-- Create the DeliveryFees table (���� ����� �������)
CREATE TABLE DeliveryFees (
    Delivery INT PRIMARY KEY,               -- ��� �����
    Description NVARCHAR(255),              -- ����� ��� ������
    DelFee MONEY                            -- ����
);

-- Insert data into the DeliveryFees table
INSERT INTO DeliveryFees (Delivery, Description, DelFee)
VALUES
(1, 'Standard Delivery', 10.00),
(2, 'Express Delivery', 25.00),
(3, 'Overnight Delivery', 50.00);

-- Create the Discounts table (���� �����)
CREATE TABLE Discounts (
    CustType NVARCHAR(50) PRIMARY KEY,      -- ��� ����
    Discnt DECIMAL(5, 2)                    -- ���� ����
);

-- Insert data into the Discounts table
INSERT INTO Discounts (CustType, Discnt)
VALUES
('Regular', 5.00),
('Premium', 10.00),
('Gold', 15.00);

-- Create the Numbers table (���� ������)
CREATE TABLE Numbers (
    LastOrder INT,                         -- ���� ����� �� ����� �����
    LastSubsc INT,                         -- ���� ����� �� ����� �����
    LastStock INT,                         -- ���� ����� �� ����� �����
    LastReceipt INT,                       -- ���� ����� �� ����
    LastInvoice INT                        -- ���� ����� �� �������
);

-- Insert data into the Numbers table
INSERT INTO Numbers (LastOrder, LastSubsc, LastStock, LastReceipt, LastInvoice)
VALUES
(5003, 7003, 9003, 8003, 6003);

-- Create the Users table (���� ������)
CREATE TABLE Users (
    UserName NVARCHAR(50) PRIMARY KEY,      -- �� �����
    Profile NVARCHAR(50)                    -- ������
);

-- Insert data into the Users table
INSERT INTO Users (UserName, Profile)
VALUES
('user1', 'Admin'),
('user2', 'Sales'),
('user3', 'Warehouse');

-- Create the Profiles table (���� ��������)
CREATE TABLE Profiles (
    Profile NVARCHAR(50) PRIMARY KEY,       -- ������
    Act NVARCHAR(255)                       -- ��� �/� �������
);

-- Insert data into the Profiles table
INSERT INTO Profiles (Profile, Act)
VALUES
('Admin', 'All'),
('Sales', 'Sales Related Actions'),
('Warehouse', 'Stock Management');


