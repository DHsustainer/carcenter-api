import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SurveyService } from './survey.service';
import { BuyingFactors, Survey } from './entities/survey.entity';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

describe('SurveyService', () => {
  let service: SurveyService;
  const mockSurveyRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyService,
        {
          provide: getRepositoryToken(Survey),
          useValue: mockSurveyRepository,
        },
      ],
    }).compile();

    service = module.get<SurveyService>(SurveyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a survey', async () => {
      const createSurveyDto: CreateSurveyDto = {
        fullName: 'John Doe',
        identification: 1234567890,
        carModel: 'Hyundai Eon',
        buyingFactors: BuyingFactors.BRAND,
        drivingRating: 5,
        satisfactionRating: 4,
      };

      const survey = new Survey();
      jest.spyOn(mockSurveyRepository, 'create').mockReturnValue(survey);
      jest.spyOn(mockSurveyRepository, 'save').mockResolvedValue(survey);

      const result = await service.create(createSurveyDto);

      expect(result).toEqual(survey);
      expect(mockSurveyRepository.create).toHaveBeenCalledWith(createSurveyDto);
      expect(mockSurveyRepository.save).toHaveBeenCalledWith(survey);
    });
  });

  describe('findAll', () => {
    it('should return an array of surveys', async () => {
      const surveys = [new Survey(), new Survey()];
      jest.spyOn(mockSurveyRepository, 'find').mockResolvedValue(surveys);

      const result = await service.findAll();

      expect(result).toEqual(surveys);
      expect(mockSurveyRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a survey by ID', async () => {
      const surveyId = 'sample-id';
      const survey = new Survey();
      jest.spyOn(mockSurveyRepository, 'findOne').mockResolvedValue(survey);

      const result = await service.findOne(surveyId);

      expect(result).toEqual(survey);
      expect(mockSurveyRepository.findOne).toHaveBeenCalledWith({
        where: { id: surveyId },
      });
    });
  });

  describe('update', () => {
    it('should update a survey by ID', async () => {
      const surveyId = 'sample-id';
      const updateSurveyDto: UpdateSurveyDto = {
        fullName: 'John Does',
        identification: 12345678904,
        carModel: 'Hyundai Eons',
        buyingFactors: BuyingFactors.FUNDING,
        drivingRating: 3,
        satisfactionRating: 4,
      };

      const updateResult = { affected: 1, raw: {} };
      jest
        .spyOn(mockSurveyRepository, 'update')
        .mockResolvedValue(updateResult);

      const result = await service.update(surveyId, updateSurveyDto);

      expect(result).toEqual(updateResult);
      expect(mockSurveyRepository.update).toHaveBeenCalledWith(
        surveyId,
        updateSurveyDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a survey by ID', async () => {
      const surveyId = 'sample-id';
      const deleteResult = { affected: 1, raw: {} };
      jest.spyOn(mockSurveyRepository, 'delete').mockResolvedValue(deleteResult);

      const result = await service.remove(surveyId);

      expect(result).toEqual(deleteResult);
      expect(mockSurveyRepository.delete).toHaveBeenCalledWith(surveyId);
    });
  });
});