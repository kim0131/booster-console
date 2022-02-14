import theme from "@components/styles/theme";
interface IPropsSvgIcon {
  size?: number;
  color?: string;
}
const SvgIconSearch = ({
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.624 18.027a9 9 0 1 1 1.403-1.403c.033.025.064.053.094.083l3.586 3.586a1 1 0 0 1-1.414 1.414l-3.586-3.586a1.022 1.022 0 0 1-.083-.094ZM18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        fill={color}
      />
    </svg>
  );
};

export default SvgIconSearch;
