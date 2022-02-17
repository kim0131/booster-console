import Select from "react-select";

const customStyles = {
  option: (provided: any, state: { isSelected: any }) => ({
    ...provided,

    color: state.isSelected ? "red" : "black",
    padding: 5,
    wideh: "200px",
  }),
};

const Selectbox = (props: any) => {
  return (
    <Select
      options={props.options}
      isMulti={props.isMulti}
      placeholder={props.placeholder}
      styles={customStyles}
    />
  );
};

export default Selectbox;
