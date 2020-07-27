# warren-poc

# Instalação

npm i

# Executar jest

npm test

# Executar aplicação

npm start

# Informações

Endpoints: \
(GET) http://localhost:3000/accounts - Retornar todas contas criadas. \
(GET) http://localhost:3000/accounts/:id - Retornar informações da conta específica \
(GET) http://localhost:3000/accounts/:id/transactions - Retornar todas as transações realizadas nessa conta. \
(POST) http://localhost:3000/transactions - Cadastrar nova transação \
\
As transações podem ser:\
 deposit = Transação de depósito\
 redeem - Transação de resgate\
 payment - Transação de pagamento\
 income - Rendimento diário do saldo\
\
Arquivo .env está no repositório apenas p/ facilitar a execução.\
 MONGO_URL - Apoontando para banco no serviço Mongo Atlas com acesso público\
 JOB_CRON - Está configurado para executar cada minuto apenas p/ facilitar o teste. Esse job serve p/ simular rentabilização do saldo\
\
Para teste esta sendo utilizado mongo em memória.\
\
Está no repositório a coleção do Postman p/ ajudar no acesso dos endpoints.
