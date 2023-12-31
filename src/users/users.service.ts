import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import {genSaltSync,hashSync } from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getHashPassword =(password:string)=>{
    var salt = genSaltSync(10);
    return hashSync(password, salt);
  }
 
  async  create(createUserDto: CreateUserDto) {
    const hashPassword = this.getHashPassword(createUserDto.password);
   let user = await this.userModel.create({
      email:createUserDto.email, password:hashPassword , name:createUserDto.name, address:createUserDto.address
    })
    return user;
  }

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }
  

  async findOne(id: string) {
    const cleanedId = id.trim();
    if (!mongoose.Types.ObjectId.isValid(cleanedId)) {
      return null; 
    }
    const user = await this.userModel.findOne({ _id: cleanedId });
    return user;
  }
  

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({_id:updateUserDto._id},{...updateUserDto});
  }

  async remove(id: string) {
    const cleanedId = id.trim();
    if (!mongoose.Types.ObjectId.isValid(cleanedId)) {
      return null; 
    }
    return await this.userModel.deleteOne({_id:cleanedId});
  }
}
