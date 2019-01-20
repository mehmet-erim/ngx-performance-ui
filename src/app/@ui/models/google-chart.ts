export namespace GoogleChart {
  export interface Column {
    type: string;
    label: string;
  }

  export type AnnotationOption = Partial<{
    allowHtml: boolean;
    allValuesSuffix: string;
    annotationsWidth: number;
    colors: string[];
    dateFormat: string;
    displayAnnotations: boolean;
    displayDateBarSeparator: boolean;
    displayExactValues: boolean;
    displayLegendDots: boolean;
    displayLegendValues: boolean;
    displayRangeSelector: boolean;
    displayZoomButtons: boolean;
    fill: number;
    legendPosition: string;
    max: number;
    min: number;
    numberFormats: string | Map<number, string>;
    scaleColumns: number[];
    scaleFormat: string;
    scaleType: 'maximized' | 'fixed' | 'allmaximized' | 'allfixed';
    table: { sortAscending: boolean; sortColumn: number };
    thickness: number;
    zoomEndTime: Date;
    zoomStartTime: Date;
  }>;
}
