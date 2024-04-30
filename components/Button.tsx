import Image, { StaticImageData } from "next/image";

interface Props {
  secondary?: boolean;
  label?: string;
  iconCircle?: StaticImageData;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  secondary = false,
  label = "Button",
  iconCircle,
  disabled = false,
}) => {
  if (secondary) {
    return (
      <button
        disabled={disabled}
        className={`h-[44px] min-w-max border-2 py-[10px] px-[20px] rounded-[4px] border-primary bg-primary text-[16px] text-primary
                 bg-opacity-0
                 hover:bg-opacity-[0.04]
                 active:bg-opacity-[0.16] active:scale-95 duration-200 ease-in-out
                 focus:border-gray
                 ${disabled && "opacity-[0.56] pointer-events-none"}
                `}
      >
        {label}
      </button>
    );
  } else if (iconCircle) {
    return (
      <button
        disabled={disabled}
        className={`
      h-[44px] w-[44px] box-border p-[10px] rounded-full bg-primary text-white
      hover:bg-hover
      active:bg-active active:scale-95 duration-200 ease-in-out
      focus:border-2 focus:border-gray-500
      ${disabled && "bg-gray-400 opacity-50 pointer-events-none"}
    `}
      >
        <Image src={iconCircle} alt="icon" width={24} height={24} />
      </button>
    );
  } else {
    return (
      <button
        disabled={disabled}
        className={`h-[44px] border-2 box-border min-w-max py-[10px] px-[20px] rounded-[4px] bg-primary text-[16px] text-white
                 hover:bg-hover
                 active:bg-active active:scale-95 duration-200 ease-in-out
                 focus:border-2 focus:border-gray-500
                 ${disabled && "bg-gray-400 opacity-50 pointer-events-none"}
                `}
      >
        {label}
      </button>
    );
  }
};

export default Button;
