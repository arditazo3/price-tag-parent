import { Routes } from '@angular/router';

import { PriceTagComponent } from './price-tag/price-tag.component';

export const PriceTagRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PriceTagComponent,
        data: {
          title: 'Corporate Obligations - Price Tag',
          urls: [
            { title: 'GENERAL.PRICE_TAG', url: '/price-tag' }
          ]
        }
      }
    ]
  }
];
