import {} from 'inversify';
import { Container } from 'inversify/lib/container/container';
import { App } from '../../app';
import { EventsHandler } from '../../handlers/events_handler.service';
import { DiscordEventsProcessor } from '../../service/discord-events-processor';
import { DI_TYPES } from './types.di';

const container = new Container({
  defaultScope: 'Singleton',
});

///Bindings
container.bind<App>(DI_TYPES.App).to(App);

//Services
container
  .bind<DiscordEventsProcessor>(DI_TYPES.DiscordEventsProcessor)
  .to(DiscordEventsProcessor);
container.bind<EventsHandler>(DI_TYPES.EventsHandler).to(EventsHandler);

export default container;
