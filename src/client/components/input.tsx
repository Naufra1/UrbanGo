type InputType = {
  name: string;
  placeholder: string;
  valor?: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ name, placeholder, valor, handleOnChange }: InputType) {
  return (
    <div className="input-div">
      <label htmlFor={name} className="label-input">
        {name}
      </label>
      <input
        type="text"
        id={name}
        className="input"
        placeholder={placeholder}
        value={valor}
        onChange={handleOnChange}
      />
    </div>
  );
}
