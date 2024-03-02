import classNames from "classnames";

interface Props {
  icon: string;
  type?: "fal" | "fad" | "fas" | "far" | "fab";
  primaryColour?: string;
  secondaryColour?: string;
  fixedWidth?: boolean;
  className?: string;
}

export default function Icon({
  icon,
  type = "fad",
  primaryColour,
  secondaryColour,
  className = "",
}: Props) {
  const iconclass = classNames(className, {
    [type]: true,
    [`fa-${icon}`]: true,
  });

  const styleObject: any = {};

  if (primaryColour) styleObject["--fa-primary-color"] = primaryColour;
  if (secondaryColour) {
    styleObject["--fa-secondary-color"] = secondaryColour;
    styleObject["--fa-secondary-opacity"] = "1.0";
  }

  return <i className={iconclass} style={styleObject} />;
}
