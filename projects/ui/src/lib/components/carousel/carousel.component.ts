import { AfterContentInit, Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { map, filter, take, switchMap } from 'rxjs/operators';
import { Carousel } from '../../models';
import { LazyLoadScriptService } from '@ngx-performance-ui/core';

declare var $;

const SLICK_DEFAULTS = {
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
  ],
};

@Component({
  selector: 'p-carousel',
  templateUrl: './carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements AfterContentInit {
  @Input() config: Carousel.Config;
  constructor(private lazyLoadService: LazyLoadScriptService) {}

  ngAfterContentInit() {
    this.lazyLoadService
      .loadScript('https://code.jquery.com/jquery-3.4.0.min.js')
      .pipe(
        map(_ => 'jQuery is loaded'),
        filter(jquery => !!jquery),
        take(1),
        switchMap(_ =>
          this.lazyLoadService.loadScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js'),
        ),
      )
      .subscribe(_ => {
        $('.slick-container').slick(this.config || SLICK_DEFAULTS);
      });
  }
}
