### Các bước cần làm để chạy dự án NestJS

#### 1. Cài đặt thư viện với câu lệnh: npm i
#### 2. Chạy dự án với câu lệnh: npm run dev

Set-ExecutionPolicy RemoteSigned
nest generate controller user
nest g resource user
npm i --save-exact ejs@3.1.9
docker pull mongo
docker run --name mymongodb -d -p 27018:27017 mongo:latest
docker start mymongodb
docker container ls
npm install --save @nestjs/mongoose mongoose

imports: [MongooseModule.forRoot('mongodb://localhost/nest')], add to app.module.ts
npm i dotenv@16.0.3
npm i --save-exact @nestjs/config@2.3.1

=================

