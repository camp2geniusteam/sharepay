insert into users (firstname, lastname, email, password, facebook_id) values ('Christophe', 'Delattre', 'christophe.delattre@decathlon.com', 'mdp', '34324343434');
insert into users (firstname, lastname, email, password, facebook_id) values ('Damien', 'Desprez', 'damien.desprez@decathlon.com', 'mdp', '3434');
insert into users (firstname, lastname, email, password, facebook_id) values ('Yuanqin1', 'Deng', 'yuanqin.deng@decathlon.com', 'mdp', '34324343435253434');
insert into users (firstname, lastname, email, password, facebook_id) values ('Olivier', 'Masurel', 'olivier.masurel@decathlon.com', 'mdp', '545454545');
insert into users (firstname, lastname, email, password, facebook_id) values ('Yuanqin', 'Deng', 'lydie_in_chine@hotmail.com', ' ', '10216514018461848');


insert into activities (title, id_owner, status) select 'Sport', id, '1' from users where email='christophe.delattre@decathlon.com';
insert into activities (title, id_owner, status) select 'Restaurant', id, '1' from users where email='damien.desprez@decathlon.com';
insert into activities (title, id_owner, status) select 'Cinema', id, '0' from users where email='yuanqin.deng@decathlon.com';
insert into activities (title, id_owner, status) select 'Transport', id, '1' from users where email='lydie_in_chine@hotmail.com';


insert into activity_members (id_activity,id_user) select a.id,u.id from activities a inner join users u on a.title='Sport' and u.email='damien.desprez@decathlon.com';
insert into activity_members (id_activity,id_user) select a.id,u.id from activities a inner join users u on a.title='Sport' and u.email='christophe.delattre@decathlon.com';
insert into activity_members (id_activity,id_user) select a.id,u.id from activities a inner join users u on a.title='Sport' and u.email='yuanqin.deng@decathlon.com';
insert into activity_members (id_activity,id_user) select a.id,u.id from activities a inner join users u on a.title='Sport' and u.email='lydie_in_chine@hotmail.com';


insert into expenses (title, id_activity, id_payer, amount, status) select 'ping pong', a.id, u.id, 50, '1' from activities a
  inner join users u on a.title='Sport' and u.email='damien.desprez@decathlon.com';
insert into expense_members(id_expense,id_user) select e.id,u.id from expenses e
  inner join users u on e.title='ping pong' and u.email='damien.desprez@decathlon.com';
insert into expense_members(id_expense,id_user) select e.id,u.id from expenses e
  inner join users u on e.title='ping pong' and u.email='yuanqin.deng@decathlon.com';
insert into expense_members(id_expense,id_user) select e.id,u.id from expenses e
  inner join users u on e.title='swimming' and u.email='lydie_in_chine@hotmail.com';

insert into expenses (title, id_activity, id_payer, amount, status) select 'velo', a.id, u.id, 500, '1' from activities a
    inner join users u on a.title='Sport' and u.email='damien.desprez@decathlon.com';
insert into expense_members(id_expense,id_user) select e.id,u.id from expenses e
    inner join users u on e.title='velo' and u.email='damien.desprez@decathlon.com';
insert into expense_members(id_expense,id_user) select e.id,u.id from expenses e
    inner join users u on e.title='velo' and u.email='christophe.delattre@decathlon.com';
insert into expense_members(id_expense,id_user) select e.id,u.id from expenses e
    inner join users u on e.title='badminton' and u.email='lydie_in_chine@hotmail.com';


