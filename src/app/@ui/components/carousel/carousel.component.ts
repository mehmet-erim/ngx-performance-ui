import { AfterContentInit, Component } from '@angular/core';
import { LazyLoadingScriptService } from '../../../@core/services/lazy-load-script.service';
import { map, filter, take, switchMap } from 'rxjs/operators';

declare var $;

@Component({
  selector: 'mn-carousel',
  templateUrl: './carousel.component.html',
  styles: [],
})
export class CarouselComponent implements AfterContentInit {
  constructor(private lazyLoadService: LazyLoadingScriptService) {}

  ngAfterContentInit() {
    this.lazyLoadService
      .loadScript('/assets/js/jquery.min.js')
      .pipe(
        map(_ => 'jQuery is loaded'),
        filter(jquery => !!jquery),
        take(1),
        switchMap(_ => this.lazyLoadService.loadScript('/assets/slick/slick.min.js')),
      )
      .subscribe(_ => {
        $('.your-class').slick({
          dots: true,
          infinite: false,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ],
        });
      });
  }
}
