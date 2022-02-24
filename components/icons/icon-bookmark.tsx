import theme from "@components/styles/theme";
interface IPropsSvgIcon {
  size?: number;
  color?: string;
}
const SvgIconBookmark = ({
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
        d="M11.106 16.361a2 2 0 0 1 1.788 0L18 18.914V4.15H6v14.764l5.106-2.553Zm-6.382 5.427A.5.5 0 0 1 4 21.341V4.15a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v17.191a.5.5 0 0 1-.724.447L12 18.15l-7.276 3.638Z"
        fill={color}
      />
    </svg>
  );
};

export default SvgIconBookmark;
