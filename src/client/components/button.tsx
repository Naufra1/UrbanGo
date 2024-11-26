type ButtonType = {
  name: string;
  handleOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

export default function Button({ name, handleOnClick }: ButtonType) {
  return (
    <div className="button-div">
      <button className="button" onClick={handleOnClick}>{name}</button>
    </div>
  );
}
