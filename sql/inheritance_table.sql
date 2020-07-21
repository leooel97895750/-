create table inheritance
(
	PCID int not null,
	CCID int not null,
	constraint FK_Inheritance_PCID foreign key(PCID) references class(CID),
	constraint FK_Inheritance_CCID foreign key(CCID) references class(CID),
	constraint PK_Inheritance primary key clustered (PCID, CCID)
)