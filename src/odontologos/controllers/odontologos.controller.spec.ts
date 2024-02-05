import { Test, TestingModule } from '@nestjs/testing';
import { OdontologosController } from './odontologos.controller';

describe('OdontologosController', () => {
  let controller: OdontologosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OdontologosController],
    }).compile();

    controller = module.get<OdontologosController>(OdontologosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
