insert into users (firstname, lastname, email, password) values ('Christophe', 'Delattre', 'christophe.delattre@decathlon.com', 'mdp');
insert into users (firstname, lastname, email, password) values ('Damien', 'Desprez', 'damien.desprez@decathlon.com', 'mdp');
insert into users (firstname, lastname, email, password) values ('Yuanqin', 'Deng', 'yuanqin.deng@decathlon.com', 'mdp');
insert into users (firstname, lastname, email, password) values ('Olivier', 'Masurel', 'olivier.masurel@decathlon.com', 'mdp');


insert into activities (title, id_owner, status) select 'Sport', id, '1' from users where email='christophe.delattre@decathlon.com';
insert into activity_members (id_activity,id_user) select a.id,u.id from activities a inner join users u on a.title='Sport' and u.email='damien.desprez@decathlon.com';
insert into activity_members (id_activity,id_user) select a.id,u.id from activities a inner join users u on a.title='Sport' and u.email='christophe.delattre@decathlon.com';
insert into activity_members (id_activity,id_user) select a.id,u.id from activities a inner join users u on a.title='Sport' and u.email='yuanqin.deng@decathlon.com';

insert into expenses (title, id_activity, id_payer, amount, status) select 'ping pong', a.id, u.id, 50, '1' from activities a
  inner join users u on a.title='Sport' and u.email='damien.desprez@decathlon.com';
insert into expense_members(id_expense,id_user) select e.id,u.id from expenses e
  inner join users u on e.title='ping pong' and u.email='damien.desprez@decathlon.com';
insert into expense_members(id_expense,id_user) select e.id,u.id from expenses e
  inner join users u on e.title='ping pong' and u.email='yuanqin.deng@decathlon.com';

insert into expenses (title, id_activity, id_payer, amount, status) select 'velo', a.id, u.id, 500, '1' from activities a
    inner join users u on a.title='Sport' and u.email='damien.desprez@decathlon.com';
insert into expense_members(id_expense,id_user) select e.id,u.id from expenses e
    inner join users u on e.title='velo' and u.email='damien.desprez@decathlon.com';
insert into expense_members(id_expense,id_user) select e.id,u.id from expenses e
    inner join users u on e.title='velo' and u.email='christophe.delattre@decathlon.com';


insert into activities (title, id_owner, status) select 'Restaurant', id, '1' from users where email='damien.desprez@decathlon.com';
insert into activities (title, id_owner, status) select 'Cinema', id, '0' from users where email='yuanqin.deng@decathlon.com';
