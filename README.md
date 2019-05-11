# NGX PERFORMANCE UI

<p align="center">
  <a href="https://travis-ci.org/mehmet-erim/ngx-performance-ui"><img src="https://travis-ci.org/mehmet-erim/ngx-performance-ui.svg?branch=develop"/></a>
  <img src="https://img.shields.io/github/license/mehmet-erim/ngx-performance-ui.svg" />
  <img src="https://img.shields.io/codeclimate/maintainability-percentage/mehmet-erim/ngx-performance-ui.svg" />
  <a href="https://twitter.com/mehmterim"><img src="https://img.shields.io/twitter/follow/mehmterim.svg?label=Follow"/></a>
</p>

## Live demo

[Check out the demo page](https://ngx-performance-ui.firebaseapp.com)

## Installation

```bash
yarn add @ngx-performance-ui/core @ngx-performance-ui/ui
```

or

```bash
npm install @ngx-performance-ui/core @ngx-performance-ui/ui
```

Core Peer Dependencies:

```json
  "peerDependencies": {
    "@angular/core": ">=7.0.0 <8.0.0",
    "@angular/common": ">=7.0.0 <8.0.0",
    "@angular/forms": ">=7.0.0 <8.0.0",
    "angular2-text-mask": ">=9.0.0",
    "rxjs": ">=6.0.0",
    "@ngxs/store": ">=3.3.0",
    "just-compare": ">=1.3.0"
  }
```

UI Peer Dependencies:

```json
  "peerDependencies": {
    "@fortawesome/angular-fontawesome": ">=0.3.0",
    "@fortawesome/fontawesome-svg-core": ">=1.2.0",
    "@fortawesome/free-solid-svg-icons": ">=5.8.0",
    "@ngx-performance-ui/core": "^0.0.16",
    "angular2-text-mask": ">=9.0.0",
    "ng2-datepicker": ">=3.1.0",
    "ngx-perfect-scrollbar": ">=7.0.0",
    "ngx-slickjs": ">=1.3.0"
  },
```

### Installation Peer Dependencies

```bash
yarn add @ngxs/store just-compare @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons ng2-datepicker ngx-perfect-scrollbar ngx-slickjs
```

or

```bash
npm install @ngxs/store just-compare @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons ng2-datepicker ngx-perfect-scrollbar ngx-slickjs
```

## Usage

Import Core and UI module to your app.module

```typescript
import { CoreModule } from '@ngx-performance-ui/core';
import { UiModule } from '@ngx-performance-ui/ui';
import { NgxsModule } from '@ngxs/store';
import { NgxSlickJsModule } from 'ngx-slickjs';

@NgModule({
  imports: [
    NgxSlickJsModule.forRoot(),
    NgxsModule.forRoot(),
    CoreModule.forRoot(),
    UiModule,

    //...
  ]
```

Update 'styles' array from angular.json

```json
"styles": [
  "./node_modules/@ngx-performance-ui/ui/assets/bootstrap.min.css",
  "./node_modules/@ngx-performance-ui/ui/assets/main.css",
  //...
],
```

[See this readme on another page](https://nicedoc.io/mehmet-erim/ngx-performance-ui)
