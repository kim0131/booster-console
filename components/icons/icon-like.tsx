import theme from "@components/styles/theme";
interface IPropsSvgIcon {
  size?: number;
  color?: string;
}
const SvgIconLike = ({
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
        d="M15.3 10h2.278a4 4 0 0 1 3.946 4.658l-.946 5.67A2 2 0 0 1 18.606 22H4.3a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2l3.177-6.354a2 2 0 0 1 2.532-.963l2.034.814A2 2 0 0 1 15.3 5.354V10Zm-7 .472V20h10.306l.945-5.671A2 2 0 0 0 17.578 12H15.3a2 2 0 0 1-2-2V5.354l-2.034-.814L8.3 10.472ZM6.3 12h-2v8h2v-8Z"
        fill={color}
      />
    </svg>
  );
};

export default SvgIconLike;
