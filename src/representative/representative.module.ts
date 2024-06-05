import { Module } from '@nestjs/common';
import { RepresentativeService } from './representative.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Representative } from './representative.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Representative])],
  providers: [RepresentativeService],
  exports: [RepresentativeService],
})
export class RepresentativeModule {}
