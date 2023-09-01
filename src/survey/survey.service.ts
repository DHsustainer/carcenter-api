import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from './entities/survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>
  ) {}
  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    try {
      const newSurvey = this.surveyRepository.create(createSurveyDto);
      return await this.surveyRepository.save(newSurvey);
    } catch (error) {
      console.error("create Survey error: ", error);
      throw new Error("Could not create survey");
    }
  }

  findAll(): Promise<Survey[]> {
    return this.surveyRepository.find();
  }

  findOne(id: string): Promise<Survey> {
    return this.surveyRepository.findOne({
      where: { id }
    });
  }

  update(id: string, updateSurveyDto: UpdateSurveyDto) {
    return this.surveyRepository.update(id, updateSurveyDto);
  }

  remove(id: string) {
    return this.surveyRepository.delete(id);
  }
}
