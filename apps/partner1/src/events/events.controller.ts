import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventsService } from '@app/core/events/events.service';
import { CreateEventRequest } from './request/create-event.request';
import { UpdateEventRequest } from './request/update-event.request';
import { ReserveSpotRequest } from './request/reserve-spot.request';
import { AuthGuard } from '@app/core/auth/auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createEventRequest: CreateEventRequest) {
    return this.eventsService.create(createEventRequest);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() updateEventRequest: UpdateEventRequest) {
    return this.eventsService.update(id, updateEventRequest);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/reserve')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  reserveSpot(@Body() request: ReserveSpotRequest, @Param('id') eventId: string) {
    return this.eventsService.reserveSpot({...request, eventId});
  }
}
