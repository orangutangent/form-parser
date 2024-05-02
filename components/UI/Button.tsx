import Image, { StaticImageData } from 'next/image';

interface Props {
	secondary?: boolean;
	label?: string;
	type?: 'button' | 'submit' | 'reset';
	iconCircle?: StaticImageData;
	disabled?: boolean;
	onClick?: (e: any) => void;
}

const Button: React.FC<Props> = ({
	secondary = false,
	label = 'Button',
	type = 'button',
	iconCircle,
	disabled = false,
	onClick = () => {},
}) => {
	if (secondary) {
		return (
			<button
				onClick={onClick}
				type={type}
				disabled={disabled}
				className={`min-h-[44px] w-max border-2 flex justify-center items-center px-[20px]  rounded-[4px] border-primary bg-primary text-[16px] text-primary
                 bg-opacity-0
                 hover:bg-opacity-[0.04]
                 active:bg-opacity-[0.16] active:scale-95 duration-200 ease-in-out
                 focus:border-gray
                 ${disabled && 'opacity-[0.56] pointer-events-none'}
                `}
			>
				{label}
			</button>
		);
	} else if (iconCircle) {
		return (
			<button
				onClick={onClick}
				disabled={disabled}
				className={`
      h-[44px] w-[44px] box-border flex justify-center items-center rounded-full bg-primary text-white
      hover:bg-hover
      active:bg-active active:scale-95 duration-200 ease-in-out
      focus:border-2 focus:border-gray-500
      ${disabled && 'bg-gray-400 opacity-50 pointer-events-none'}
    `}
			>
				<Image src={iconCircle} alt="icon" width={24} height={24} />
			</button>
		);
	} else {
		return (
			<button
				onClick={onClick}
				disabled={disabled}
				className={`min-h-[44px] border-2 box-border w-max flex justify-center items-center py-[10px] px-[20px] rounded-[4px] bg-primary text-[16px] text-white
                 hover:bg-hover
                 active:bg-active active:scale-95 duration-200 ease-in-out
                 focus:border-2 focus:border-gray-500
                 ${disabled && 'bg-gray-400 opacity-50 pointer-events-none'}
                `}
			>
				{label}
			</button>
		);
	}
};

export default Button;
