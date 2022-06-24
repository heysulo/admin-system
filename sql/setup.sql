CREATE USER 'newnop'@'localhost' IDENTIFIED BY 'password';
GRANT Alter ON newnop.* TO 'newnop'@'localhost';
GRANT Create ON newnop.* TO 'newnop'@'localhost';
GRANT Create view ON newnop.* TO 'newnop'@'localhost';
GRANT Delete ON newnop.* TO 'newnop'@'localhost';
GRANT Drop ON newnop.* TO 'newnop'@'localhost';
GRANT Grant option ON newnop.* TO 'newnop'@'localhost';
GRANT Index ON newnop.* TO 'newnop'@'localhost';
GRANT Insert ON newnop.* TO 'newnop'@'localhost';
GRANT References ON newnop.* TO 'newnop'@'localhost';
GRANT Select ON newnop.* TO 'newnop'@'localhost';
GRANT Show view ON newnop.* TO 'newnop'@'localhost';
GRANT Trigger ON newnop.* TO 'newnop'@'localhost';
GRANT Update ON newnop.* TO 'newnop'@'localhost';
GRANT Alter routine ON newnop.* TO 'newnop'@'localhost';
GRANT Create routine ON newnop.* TO 'newnop'@'localhost';
GRANT Create temporary tables ON newnop.* TO 'newnop'@'localhost';
GRANT Execute ON newnop.* TO 'newnop'@'localhost';
GRANT Lock tables ON newnop.* TO 'newnop'@'localhost';


ALTER USER 'newnop'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;