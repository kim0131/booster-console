import Select from "react-select";

const customStyles = {
  option: (provided: any, state: { isSelected: any }) => ({
    ...provided,

    color: state.isSelected ? "red" : "black",
    padding: 5,
    wideh: "200px",
    zindex: "5",
  }),
  menu: (provided: any) => ({ ...provided, zIndex: 9999 }),
};

const Selectbox = (props: any) => {
  return (
    <Select
      id=""
      options={props.options}
      isMulti={props.isMulti}
      placeholder={props.placeholder}
      styles={customStyles}
      name={props.name}
      onChange={props.onChange}
      value={props.options.filter(
        (option: any) => option.value === props.value,
      )}
    />
  );
};

export default Selectbox;
