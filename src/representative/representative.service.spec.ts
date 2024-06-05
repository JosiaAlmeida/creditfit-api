import { Test, TestingModule } from '@nestjs/testing';
import { RepresentativeService } from './representative.service';

describe('RepresentativeService', () => {
  let service: RepresentativeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepresentativeService],
    }).compile();

    service = module.get<RepresentativeService>(RepresentativeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
