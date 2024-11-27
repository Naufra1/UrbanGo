import { TextField } from "@mui/material";

type InputType = {
  name: string;
  placeholder: string;
  valor?: string;
  handleOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
  className?: string;
};

export default function Input({
  name,
  placeholder,
  valor,
  handleOnChange,
  disable,
  className,
}: InputType) {
  return (
    <TextField
      disabled={disable}
      required
      id={name}
      label={name}
      className={`input ${className}`}
      placeholder={placeholder}
      value={valor}
      onChange={handleOnChange}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "black",
            color: "black"
          },
        },
        "& .MuiInputLabel-root": {
          color: "black",
        },
      }}
    />
  );
}
