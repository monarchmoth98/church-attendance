import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ChurchService } from 'src/modules/churches/church.service';

@ValidatorConstraint({ name: 'ChurchExists', async: true })
@Injectable()
export class ChurchExistsValidation implements ValidatorConstraintInterface {
  constructor(private churchservice: ChurchService) {}

  async validate(value: string) {
    console.log('Begin Validation of ChurchID');
    try {
      const churchExists = await this.churchservice.findChurchById(value);
      console.log('Fetched the church Object');
      if (!churchExists) {
        console.log('Could not find a church with id ' + value);
        return false;
      }
      console.log('Found a church with id ' + value);
      return true;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Church with id ${validationArguments.value} does not exist`;
  }
}
