import theme from "@components/styles/theme";
interface IPropsSvgIcon {
  size?: number;
  color?: string;
}
const SvgIconProfile = ({
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
        d="M15.773 12.666a6 6 0 1 0-7.546 0C4.617 13.99 2 17.166 2 21a1 1 0 1 0 2 0c0-3.759 3.468-7 8-7s8 3.241 8 7a1 1 0 1 0 2 0c0-3.834-2.617-7.009-6.227-8.334ZM16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
        fill="#000"
      />
    </svg>
  );
};

export default SvgIconProfile;
