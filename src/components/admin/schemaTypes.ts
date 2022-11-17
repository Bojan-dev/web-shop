import { FieldErrorsImpl } from 'react-hook-form';

type LaptopsSpec = {
  cpu: string;
  gpu: string;
  hdd_ssd: string;
  ram: string;
};

type MonitorsSpec = {
  aspect_ratio: string;
  brightness: string;
  display_resolution: string;
  display_type: string;
  refresh_rate: string;
  resolution: string;
  response_time: string;
};

export type SpecType = LaptopsSpec | MonitorsSpec;

export interface BaseInputs {
  description: string;
  image: string;
  price: number;
  title: string;
}

interface RegularInputs extends BaseInputs {
  spec: SpecType;
}

interface OptionalInputs {
  screen_size?: number;
}

type InputsSchema = RegularInputs & OptionalInputs;

export default InputsSchema;

interface FormFields {
  select: string;
}

export type FormTypeSchema = InputsSchema & FormFields;

export type ErrorsType = FieldErrorsImpl<{
  spec: NonNullable<
    | {
        cpu: string;
        gpu: string;
        hdd_ssd: string;
        ram: string;
      }
    | {
        aspect_ratio: string;
        brightness: string;
        display_resolution: string;
        display_type: string;
        refresh_rate: string;
        resolution: string;
        response_time: string;
      }
  >;
  description: string;
  image: string;
  price: number;
  title: string;
  screen_size: number;
}>;
