import classNames from "classnames";

interface Props {
  icon: string;
  type?: "fal" | "fad" | "fas" | "far" | "fab";
  primaryColour?: string;
  secondaryColour?: string;
  fixedWidth?: boolean;
  className?: string;
  size?: "xs | sm | lg | 2xl" | "xl" | "2xl" | "3x" | "5x" | "7x" | "10x";
  onClick?: () => void;
}

export default function Icon({
  icon,
  type = "fad",
  primaryColour,
  secondaryColour,
  className = "",
  size = "2xl",
  onClick = () => {},
}: Props) {
  const iconclass = classNames(className, {
    [type]: true,
    [`fa-${icon}`]: true,
    "fa-2xl": size === "2xl",
    "fa-xl": size === "xl",
    "fa-3x": size === "3x",
    "fa-5x": size === "5x",
    "fa-7x": size === "7x",
    "fa-10x": size === "10x",
  });

  const styleObject: any = {};

  if (primaryColour) styleObject["--fa-primary-color"] = primaryColour;
  if (secondaryColour) {
    styleObject["--fa-secondary-color"] = secondaryColour;
    styleObject["--fa-secondary-opacity"] = "1.0";
  }

  return <i className={iconclass} style={styleObject} onClick={onClick} />;
}
