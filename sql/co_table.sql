create table co
(
	CID int not null,
	OID int not null,
	constraint FK_CO_CID foreign key(CID) references class(CID),
	constraint FK_CO_OID foreign key(OID) references object(OID),
	constraint PK_CO primary key clustered (CID, OID)
)