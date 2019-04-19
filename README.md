# NGX PERFORMANCE UI

[![Build Status](https://travis-ci.org/mehmet-erim/ngx-performance-ui.svg?branch=develop)](https://travis-ci.org/mehmet-erim/ngx-performance-ui)

## Live demo

[Check out the demo page](https://ngx-performance-ui.firebaseapp.com)

## Installation Core

```bash
yarn add @ngx-performance-ui/core @ngx-performance-ui/ui bootstrap
```

or

```bash
npm install @ngx-performance-ui/core @ngx-performance-ui/ui bootstrap
```

Core Peer Dependencies:

```json
  "peerDependencies": {
    "@angular/core": ">=5.0.0 <8.0.0",
    "rxjs": ">=6.0.0 || ^5.6.0-forward-compat.4",
    "@ngx-translate/core": ">=10.0.0",
    "@ngxs/router-plugin": ">=3.3.0",
    "@ngxs/store": ">=3.3.0",
    "just-compare": ">=1.3.0"
  }
```

UI Peer Dependencies:

```json
  "peerDependencies": {
    "ng2-datepicker": ">=3.1.0",
    "@ngx-performance-ui/core": "^0.0.10",
    "bootstrap": ">=4.0.0"
  },
```

## Usage

Import Core and UI module to your app.module

```typescript
import { CoreModule } from '@ngx-performance-ui/core';
import { UiModule } from '@ngx-performance-ui/ui';

@NgModule({
  imports: [
    CoreModule.forRoot(),
    UiModule,
    ...
  ]
```

Update 'styles' array from angular.json

```json
"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.min.css",
  "./node_modules/@ngx-performance-ui/ui/src/assets/main.css",
  ...
],
```

[See this readme on another page](https://nicedoc.io/mehmet-erim/ngx-performance-ui)
