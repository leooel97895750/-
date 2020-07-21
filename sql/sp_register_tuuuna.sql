use tuuuna;
drop procedure if exists sp_register;
DELIMITER //
create procedure sp_register(gmail varchar(200), mailhash binary(40), pwd_hash binary(40), nickname nvarchar(500))
begin
	declare mycid int;
    start transaction;
		if exists (select Mail_hash from `member` where Mail_hash = mailhash) then
			select 'alreadyExist';
		else
			-- 根據act的第一個字來建立目錄樹
			insert into class(CName, `Type`, nLevel) values(gmail, 2, 2);
			set mycid = last_insert_id();
			insert into object(`Type`) values(2);
			insert into co(CID, OID) values(mycid, last_insert_id());
			insert into `member`(MID, `Name`, Pwd, Mail, Mail_hash, CID) values(last_insert_id(), nickname, pwd_hash, gmail, mailhash, mycid);
			select mycid;
		end if;
	commit;
end//
DELIMITER ;
