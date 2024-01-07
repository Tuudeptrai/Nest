import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    email: string;
  
    @ApiProperty()
    password: string;
  
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    phone: number;
  
    @ApiProperty()
    age: number;
  
    @ApiProperty()
    address: string;
  
    @ApiProperty()
    createdAt: Date;
  
    @ApiProperty()
    updatedAt: Date;
}
