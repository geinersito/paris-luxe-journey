import { Input } from "../ui/input";

interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

const PlacesAutocomplete = ({ value, onChange, placeholder, className }: PlacesAutocompleteProps) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default PlacesAutocomplete;