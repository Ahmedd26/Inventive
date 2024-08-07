import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import * as _icons from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons: any = { ..._icons };

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
