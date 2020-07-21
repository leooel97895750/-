-- type=1 會員, type=2 群組, type=3 內容
create table object
(
	OID int AUTO_INCREMENT,
	Type smallint null,
	Since datetime default now(),
	constraint PK_Object primary key clustered (OID)
)