import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // transform(items: any[], field: string, value: string): any[] {
  //   if (!items) {
  //     return [];
  //   }
  //   if (!field || !value) {
  //     return items;
  //   }

  //   return items.filter(singleItem =>
  //     singleItem[field].toLowerCase().includes(value.toLowerCase())
  //   )
  // }

  transform(value: any[], searchText: string, prop?: any): any {  
    if (!value) {  
      return [];  
    }  
    if (!searchText || !prop) {  
      return value;  
    }  
    const _searchText = searchText.toLowerCase(),  
      _isArr = Array.isArray(value),  
      _flag = _isArr && typeof value[0] === 'object' ? true : _isArr && typeof value[0] !== 'object' ? false : true;  

    return value.filter(ele => {  
      let val = _flag ? ele[prop] : ele;  
      return val.toString().toLowerCase().includes(_searchText);  
    });  

  } 
}
