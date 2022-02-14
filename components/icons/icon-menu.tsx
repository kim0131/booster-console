import theme from "@components/styles/theme";
interface IPropsSvgIcon {
  size?: number;
  color?: string;
}
const SvgIconMenu = ({
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
        d="M4 6a1 1 0 0 0 1 1h14a1 1 0 1 0 0-2H5a1 1 0 0 0-1 1Zm0 6a1 1 0 0 0 1 1h14a1 1 0 1 0 0-2H5a1 1 0 0 0-1 1Zm0 6a1 1 0 0 0 1 1h14a1 1 0 1 0 0-2H5a1 1 0 0 0-1 1Z"
        fill={color}
      />
    </svg>
  );
};

export default SvgIconMenu;
