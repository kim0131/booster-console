import theme from "@components/styles/theme";
interface IPropsSvgIcon {
  size?: number;
  color?: string;
}
const SvgIconDocuments = ({
  size = 24,
  color = theme.color.gray[900],
}: IPropsSvgIcon) => {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M16 16H8v2h8v-2Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 22V8l6-6h10v20H4ZM18 4v16H6V8.828L10.828 4H18Z"
        fill={color}
      />
      <path d="M16 12H8v2h8v-2Z" fill={color} />
    </svg>
  );
};

export default SvgIconDocuments;
