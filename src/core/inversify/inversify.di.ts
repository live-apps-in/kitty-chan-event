import {} from 'inversify';
import { Container } from 'inversify/lib/container/container';
import { App } from '../../app';
import { EventsHandler } from '../../handlers/events_handler.service';
import { SharedService } from '../../service/shared.service';
import { DI_TYPES } from './types.di';

const container = new Container({
  defaultScope: 'Singleton',
});

///Bindings
container.bind<App>(DI_TYPES.App).to(App);

//Services
container.bind<SharedService>(DI_TYPES.SharedService).to(SharedService);
container.bind<EventsHandler>(DI_TYPES.EventsHandler).to(EventsHandler);

export default container;
