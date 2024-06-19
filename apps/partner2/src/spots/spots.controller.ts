import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { SpotsService } from '@app/core/spots/spots.service';
import { CreateSpotRequest } from './request/create-spot.request';
import { UpdateSpotRequest } from './request/update-spot.request';

@Controller('events/:eventId/spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createSpotDto: CreateSpotRequest, @Param('eventId') eventId: string) {
    return this.spotsService.create({
      ...createSpotDto,
      eventId
    });
  }

  @Get()
  findAll(@Param('eventId') eventId: string) {
    return this.spotsService.findAll(eventId);
  }

  @Get(':id')
  findOne(@Param('id') spotId: string, @Param('eventId') eventId: string) {
    return this.spotsService.findOne(spotId, eventId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') spotId: string, @Body() updateSpotDto: UpdateSpotRequest, @Param('eventId') eventId: string) {
    return this.spotsService.update(spotId, updateSpotDto, eventId);
  }

  @Delete(':id')
  remove(@Param('eventId') eventId: string, @Param('id') spotId: string) {
    return this.spotsService.remove(eventId, spotId);
  }
}
