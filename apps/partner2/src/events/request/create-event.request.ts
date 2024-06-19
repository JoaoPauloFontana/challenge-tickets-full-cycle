import { IsString, MaxLength, IsISO8601, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class CreateEventRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsISO8601()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;
}
