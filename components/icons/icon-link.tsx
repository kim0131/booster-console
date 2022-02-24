import theme from "@components/styles/theme";
interface IPropsSvgIcon {
  size?: number;
  color?: string;
}
const SvgIconLink = ({
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
        d="M2 4a2 2 0 0 1 2-2h5a1 1 0 1 1 0 2H4v16h16v-5a1 1 0 1 1 2 0v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z"
        fill={color}
      />
      <path
        d="M15 2a1 1 0 1 0 0 2h3.587l-5.88 5.88a1 1 0 0 0 1.414 1.414L20 5.415V9a1 1 0 1 0 2 0V4a2 2 0 0 0-2-2h-5Z"
        fill={color}
      />
    </svg>
  );
};

export default SvgIconLink;
