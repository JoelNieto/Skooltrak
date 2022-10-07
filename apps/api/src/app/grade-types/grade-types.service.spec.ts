import { Test, TestingModule } from '@nestjs/testing';
import { GradeTypesService } from './grade-types.service';

describe('GradeTypesService', () => {
  let service: GradeTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradeTypesService],
    }).compile();

    service = module.get<GradeTypesService>(GradeTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
