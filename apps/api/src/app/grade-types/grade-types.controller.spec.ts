import { Test, TestingModule } from '@nestjs/testing';
import { GradeTypesController } from './grade-types.controller';
import { GradeTypesService } from './grade-types.service';

describe('GradeTypesController', () => {
  let controller: GradeTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GradeTypesController],
      providers: [GradeTypesService],
    }).compile();

    controller = module.get<GradeTypesController>(GradeTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
