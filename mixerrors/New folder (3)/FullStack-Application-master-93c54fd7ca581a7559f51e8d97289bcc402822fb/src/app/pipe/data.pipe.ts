import { by } from 'protractor';
import {Pipe , PipeTransform} from '@angular/core';

@Pipe({name:'dataFilter'})
export class DataFilterPipe implements PipeTransform{
    // transform(value:any):any{
        //  value=value.toLocaleLowerCase();
        //  let x=value.split("_");
        //  let newString = "";
        //  for(var i=0;i<x.length;i++){
        //      let word =x[i].charAt(0).toUpperCase() + x[i].slice(1);
        //      newString=newString+ word + " ";
      //   }
    //      return newString.trim();
    // }
    transform(value:any):any{
        var res = value.split("%");
        return res[0];
    }
}

