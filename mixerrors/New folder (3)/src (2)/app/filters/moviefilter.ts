import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'movieFilter'})
export class MovieFilterPipe implements PipeTransform {
    transform(value: any[], args: string): any[] {
        let filter: string = args ? args.toLocaleLowerCase() : null;
        return filter ? value.filter((name) =>
            name.title.toLocaleLowerCase().startsWith(filter) != false) : value;
    }
}
