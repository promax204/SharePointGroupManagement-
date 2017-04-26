import {Component} from '@angular/core';

@Component({
    selector: 'web-part-1',
    template: '<h1>{{text}}</h1>'
})
export class WebPart1Component {
    text: string = 'Group Management WebPart Loaded';
}