import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentTypesService } from './assignment-types.service';

describe('AssignmentTypesService', () => {
  let service: AssignmentTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignmentTypesService],
    }).compile();

    service = module.get<AssignmentTypesService>(AssignmentTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
