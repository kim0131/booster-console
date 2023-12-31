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
      <path
        d="M8 13a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1ZM9 16a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.828 2a2 2 0 0 0-1.414.586L4.586 7.414A2 2 0 0 0 4 8.828V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7.172ZM18 4h-7.172L6 8.828V20h12V4Z"
        fill={color}
      />
    </svg>
  );
};

export default SvgIconDocuments;
