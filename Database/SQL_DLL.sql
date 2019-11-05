create database  T_Roman

use T_Roman

create table Temas(
idTema int primary key identity
,nome varchar(255) not null
,ativo bit default (1)
)

create table Permissao(
idPermissao int primary key identity
,nome varchar(255) not null
)

create table Projetos(
idProjeto int primary key identity
,nome varchar (255) not null
,idTema int foreign key references Temas (idTema)
)

create table usuarios (
idUsuario int primary key identity,
Nome varchar(255) not null
,Email Varchar(255) not null unique	
,Senha Varchar (255) not null 
,Foto text  default('http://cdn.onlinewebfonts.com/svg/img_95941.png') not null
)
alter table usuarios add idPermissao int foreign key references Permissao (idPermissao)

insert into Temas (nome) values ('sei la'),('sei la 2')
select * from Temas

insert into Permissao (nome) values ('Professor'), ('Aluno')
select * from Permissao

insert into Projetos(nome,idTema) values ('Projeto 2', 2)
select * from Projetos

insert into usuarios (Nome ,Email,Senha,idPermissao) values ('schorsch','schorsch@gmail.com','password',1),('Pedro','Pedro@gmail.com','password',1)

	

drop table usuarios