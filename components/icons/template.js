const Template = ({ componentName, jsx, exports }, { tpl }) => {
  return tpl`
    import theme from "@components/styles/theme";
    
    interface IPropsSvgIcon {
      size?: number;
      color?: string;
    };

    const ${componentName} = ({size = 24, color = theme.color.gray[900] }:IPropsSvgIcon) => {
      return ${jsx};
    };

    ${exports}
    `;
};

module.exports = Template;
