export interface Weather {
  zip: string;
  city: string;
  temperature: Temperature;
  humidity: number;
  conditions: Condition[];
}

export interface Condition {
  code: string;
  description: string;
}

export interface Temperature {
  current: number;
  max: number;
  min: number;
}
