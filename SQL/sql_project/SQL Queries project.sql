--Write SQL Queries According to the Specifications

--6.1
select*
from Items

	----------------------------------------------------------------------------------

--6.2
select
 eo.Date AS OrderDate,                   -- ����� ������
    i.TotAmount AS OrderAmount,            -- ���� ������
    it.Description AS ItemDescription,     -- ����� �����
    eo.Quant AS OrderedQuantity,           -- ���� ������
    eo.Status AS OrderStatus              -- ����� ������
from ExOrders eo join Invoices i
on eo.OrderNo = i.OrderNo
join Items it 
on eo.Code = it.Code
order by
    eo.Date;                  
	
	----------------------------------------------------------------------------------

--6.3
select 
  cust.CustID AS CustomerID,                     -- �.�. ����
    cust.CustName AS CustomerName,                 -- �� ����
    cust.CustStatus AS CustomerStatus,             -- ����� ����
    eo.OrderNo AS OrderNumber,                  -- ���� �����
    eo.Status AS OrderStatus,                   -- ����� �����
    it.Description AS ItemDescription,          -- ����� �����
    eo.Quant AS OrderedQuantity,                -- ���� ������
    it.Freq AS OrderFrequency                    -- ������ ������
from Customers cust join ExOrders EO
on cust.CustID = eo.CustID
join items it on EO.code = it.Code
ORDER BY
    cust.CustID, eo.OrderNo;                       -- ���� ��� �.�. ���� ����� �����

	----------------------------------------------------------------------------------

--6.4
DECLARE @StartDate DATE = '2024-08-01'; 

-- ����� ������ (������) ������ ������ (�������)
select
    'Credit' AS Source,
    i.OrderNo AS [Order No],
    r.ReceiptNo AS [Receipt No],
    r.PymtDate AS [Payment Date],
    a.Amount AS [Amount],
    NULL AS [Total Debit]
from
    Accounting a
join Invoices i ON a.InvNo = i.InvNo
join Receipt r ON a.ReceiptNo = r.ReceiptNo
where
    a.Date >= @StartDate AND a.CrdtDebt = 'Credit'

UNION ALL

select
    'Debit' AS Source,
    i.OrderNo AS [Order No],
    r.ReceiptNo AS [Receipt No],
    r.PymtDate AS [Payment Date],
    NULL AS [Amount],
    a.Amount * -1 AS [Total Debit]
from
    Accounting a
join Invoices i ON a.InvNo = i.InvNo
join Receipt r ON a.ReceiptNo = r.ReceiptNo
where
    a.Date >= @StartDate AND a.CrdtDebt = 'Debit'

UNION ALL

-- ���� ������ (������)
select
    'Total Credit' AS Source,
    NULL AS [Order No],
    NULL AS [Receipt No],
    NULL AS [Payment Date],
    SUM(a.Amount) AS [Amount],
    NULL AS [Total Debit]
from
    Accounting a
where
    a.Date >= @StartDate AND a.CrdtDebt = 'Credit'

UNION ALL

-- ���� ������ (�������)
select
    'Total Debit' AS Source,
    NULL AS [Order No],
    NULL AS [Receipt No],
    NULL AS [Payment Date],
    NULL AS [Amount],
    SUM(a.Amount * -1) AS [Total Debit]
from
    Accounting a
where
    a.Date >= @StartDate AND a.CrdtDebt = 'Debit'

UNION ALL

-- ����� �����
select
    'Balance' AS Source,
    NULL AS [Order No],
    NULL AS [Receipt No],
    NULL AS [Payment Date],
    NULL AS [Amount],
    (
        ISNULL(
            (SELECT SUM(a.Amount) FROM Accounting a WHERE a.Date >= @StartDate AND a.CrdtDebt = 'Credit'), 
            0
        ) - ISNULL(
            (SELECT SUM(a.Amount * -1) FROM Accounting a WHERE a.Date >= @StartDate AND a.CrdtDebt = 'Debit'), 
            0
        )
    ) AS [Total Debit]

		----------------------------------------------------------------------------------

--6.5

select
    e.OrderNo as [order number],
    e.Date AS [Order Date],          
    e.SuppDate AS [Supply Date],      
    i.TotAmount AS [Order Amount],     
    e.Status AS [Order Status]          
from ExOrders e join Invoices i on e.OrderNo = i.OrderNo 
where
     e.Status IN ('Pending', 'Not Shipped')
order by
    e.SuppDate;                    

