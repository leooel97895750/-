create table `member`
(
	MID int not null,
	Name nvarchar(100) null,
    CDes nvarchar(5000) null,
    Img varchar(50) null,
    Imgid varchar(50) null,
    Mail varchar(100) null unique,
    Mail_hash char(40) null unique,
	Pwd char(40) null,
	Since datetime default now(),
	LastModifyDT datetime null,
	Sex tinyint null,
	Phone varchar(50) null,
	Birthday date null,
	Address nvarchar(500) null,
    FriendsNum int null,
    RoomsNum int null,
    CID int null,
	constraint FK_Member_MID foreign key(MID) references object(OID),
	constraint PK_Member primary key clustered (MID),
    index Mail_Index(Mail_hash)
)