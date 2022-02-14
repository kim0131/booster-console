import Select from "react-select";

const style = {};

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Selectbox = () => <Select options={options} />;

export default Selectbox;
