
import { Bus } from './main-bus/bus';

const registry = Bus.getInstance().register('event-name', (eventName: string) => {
    if(eventName)
        console.log('Event: ' + eventName);
    else 
        console.log('Default event emitted!');
});

Bus.getInstance().dispatch<string>('event-name', 'Jeidah');
Bus.getInstance().dispatch<string>('event-name', 'Lembani');
Bus.getInstance().dispatch<string>('event-name');
Bus.getInstance().dispatch<string>('event-name', 'Iza');
Bus.getInstance().dispatch<string>('event-name');
Bus.getInstance().dispatch<string>('event-name', `Stopping event publication now because we called: 'registry.unregister()'.`);
registry.unregister();
Bus.getInstance().dispatch<string>('event-name', 'We will not reach this point..');
Bus.getInstance().dispatch<string>('event-name', 'Lembani');
