import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteadmin'
})
export class FilteadminPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for (const post of value) {
      if (post.names.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.email.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }
}
