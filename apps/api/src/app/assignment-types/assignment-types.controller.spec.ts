import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentTypesController } from './assignment-types.controller';
import { AssignmentTypesService } from './assignment-types.service';

describe('AssignmentTypesController', () => {
  let controller: AssignmentTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignmentTypesController],
      providers: [AssignmentTypesService],
    }).compile();

    controller = module.get<AssignmentTypesController>(
      AssignmentTypesController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
