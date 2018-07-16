import { by } from 'protractor';
import {Pipe , PipeTransform} from '@angular/core';

@Pipe({name:'imageFilter'})
export class imageFilterPipe implements PipeTransform{
    
    transform(value:any):any{
        var res = value.split("%");
        return res[0];
    }
}