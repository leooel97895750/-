-- Type 1=目錄 2=帳號 3=群組
create table class
(
	CID int AUTO_INCREMENT,
	Type smallint null,
	CName nvarchar(100) null,
	CDes nvarchar(500) null,
	EName varchar(100) null,
	EDes varchar(500) null,
	IDpath varchar(1000) null,
	Namepath nvarchar(1000) null,
	Since datetime default now(),
	LastModifyDT datetime null,
	nLevel smallint null,
	nObject int default 0,
    jwt varchar(1000) null,
	constraint PK_Class primary key clustered (CID)
);