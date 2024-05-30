import { BarDatum } from '@nivo/bar';

// Define a custom type that extends BarDatum and allows undefined values for the index signature
type CustomBarDatum = BarDatum & { [key: string]: string | number | undefined };

export interface BarData extends CustomBarDatum {
  time: string;
  value: number;
}

// import { Datum } from '@nivo/line';

// // Define a custom type that extends LineDatum and allows undefined values for the index signature
// type CustomLineDatum = Datum & { [key: string]: string | number | undefined };

// export interface LineData extends CustomLineDatum {
//   time: string;
//   value: number;
// }
