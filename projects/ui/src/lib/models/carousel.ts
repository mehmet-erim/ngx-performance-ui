export namespace Carousel {
  export class Config {
    accessibility?: boolean = true;
    adaptiveHeight?: boolean = false;
    autoplay?: boolean = false;
    autoplaySpeed?: number = 3000;
    arrows?: boolean = true;
    asNavFor?: string = null;
    appendArrows?: string = '$(element)';
    appendDots?: string = '$(element)';
    prevArrow?: string | HTMLElement = '<button type="button" class="slick-prev">Previous</button>';
    nextArrow?: string | HTMLElement = '<button type="button" class="slick-next">Previous</button>';
    centerMode?: boolean = false;
    centerPadding?: string = '50px';
    cssEase?: string = 'ease';
    dots?: boolean = false;
    dotsClass?: string = 'slick-dots';
    draggable?: boolean = true;
    fade?: boolean = false;
    focusOnSelect?: boolean = false;
    easing?: string = 'linear';
    edgeFriction?: number = 0.15;
    infinite?: boolean = true;
    initialSlide?: number = 0;
    lazyLoad?: string = 'ondemand';
    mobileFirst?: boolean = false;
    pauseOnFocus?: boolean = true;
    pauseOnDotsHover?: boolean = false;
    respondTo?: string = 'window';
    responsive?: ConfigResponsive;
    rows?: number = 1;
    slidesPerRow?: number = 1;
    slidesToShow?: number = 1;
    slidesToScroll?: number = 1;
    speed?: number = 300;
    swipe?: boolean = true;
    swipeToSlide?: boolean = false;
    touchMove?: boolean = true;
    touchThreshold?: number = 5;
    useCSS?: boolean = true;
    useTransform?: boolean = true;
    variableWidth?: boolean = false;
    vertical?: boolean = false;
    verticalSwiping?: boolean = false;
    rti?: boolean = false;
    waitForAnimate?: boolean = true;
    zIndex?: number = 1000;
  }

  export interface ConfigResponsive {
    breakpoint: number;
    settings?: Config;
  }
}
