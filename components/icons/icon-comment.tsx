import theme from "@components/styles/theme";
interface IPropsSvgIcon {
  size?: number;
  color?: string;
}
const SvgIconComment = ({
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
        d="M10.044 16.058 12 18.667l1.956-2.609.835-.11A6.002 6.002 0 0 0 14 4h-4a6 6 0 0 0-.791 11.948l.835.11ZM12 22l-3.051-4.069A8.001 8.001 0 0 1 10 2h4a8 8 0 0 1 1.051 15.931L12 22Z"
        fill={color}
      />
    </svg>
  );
};

export default SvgIconComment;
