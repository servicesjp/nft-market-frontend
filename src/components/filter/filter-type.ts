interface Filter {
  id: number | string;
  name: string;
  type:
    | "input"
    | "checkbox"
    | "checkbox-button"
    | "radio"
    | "radio-button"
    | "select";
  placeholder?: string;
  options?: Array<string | { value: string; label: string }>;
  defaultValue?: string | string[];
}

export default Filter;
