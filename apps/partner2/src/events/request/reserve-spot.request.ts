import { IsArray, ArrayNotEmpty, IsEmail, IsIn, IsString } from 'class-validator';
import { TicketKind } from '@prisma/client';

export class ReserveSpotRequest {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  spots: string[];

  @IsIn(['full', 'half'])
  ticket_kind: TicketKind;

  @IsEmail()
  email: string;
}
