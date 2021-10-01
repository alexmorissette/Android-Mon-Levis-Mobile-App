import { Component } from '@angular/core';
import { LIEUX } from 'src/assets/data/lieux';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
public lieux = LIEUX;
  constructor() {}

}
