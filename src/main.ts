import { App } from './app';
import container from './core/inversify/inversify.di';
import { DI_TYPES } from './core/inversify/types.di';

async function bootstrap() {
  const _app = container.get<App>(DI_TYPES.App);
  await _app.start();
}

bootstrap();
