import theme from "@components/styles/theme";
interface IPropsSvgIcon {
  size?: number;
  color?: string;
}
const SvgIconView = ({
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
        d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-2 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.856 11.654a.86.86 0 0 1 0 .692C21.184 13.881 18.122 20 12 20s-9.184-6.119-9.856-7.654a.86.86 0 0 1 0-.692C2.816 10.119 5.878 4 12 4s9.184 6.119 9.856 7.654ZM17.513 8.62c1.142 1.217 1.901 2.565 2.3 3.38-.399.815-1.158 2.163-2.3 3.38C16.132 16.853 14.327 18 12 18s-4.132-1.147-5.513-2.62c-1.142-1.217-1.901-2.565-2.3-3.38.399-.815 1.158-2.163 2.3-3.38C7.868 7.147 9.673 6 12 6s4.132 1.147 5.513 2.62Z"
        fill={color}
      />
    </svg>
  );
};

export default SvgIconView;
