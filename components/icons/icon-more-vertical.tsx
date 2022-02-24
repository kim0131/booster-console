import theme from "@components/styles/theme";
interface IPropsSvgIcon {
  size?: number;
  color?: string;
}
const SvgIconMoreVertical = ({
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
        d="M10 5a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM12 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM12 21a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
        fill={color}
      />
    </svg>
  );
};

export default SvgIconMoreVertical;
