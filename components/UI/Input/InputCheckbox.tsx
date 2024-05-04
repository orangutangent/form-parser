'use client';

import React from 'react';

interface Props {
	id: string;
	label: string;
	required: boolean;
	disabled?: boolean;
	onChange?: (value: any) => void;
}

const InputCheckbox: React.FC<Props> = ({ id, label, required, disabled, onChange }) => {
	const inputRef = React.useRef<HTMLInputElement | null>(null);
	React.useEffect(() => {
		if (onChange && inputRef.current) {
			onChange(inputRef.current.checked);
		}
	}, []);

	const handleClick = () => {
		if (inputRef.current) {
			if (inputRef.current.checked) {
				inputRef.current.checked = true;
			} else {
				inputRef.current.checked = false;
			}
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) onChange(event.target.checked);
	};
	return (
		<div
			className={`w-full max-w-max flex gap-[12px] relative
        ${disabled && 'opacity-[0.56] pointer-events-none'}`}
		>
			<input
				className={`peer appearance-none  rounded-[4px] border-[1px] border-gray flex-shrink-0
                 h-[24px] w-[24px] active:bg-grayl
                 focus:border-[3px] 
				 after:content-['']
				 after:absolute
				 after:top-0
				 after:left-0
				 after:h-full
				 after:w-full
				 after:bg-no-repeat
				 checked:after:bg-[url('../public/checkedIcon.svg')] checked:bg-primary
				 checked:hover:bg-hover checked:active:bg-active
                  cursor-pointer`}
				id={id}
				type="checkbox"
				ref={inputRef}
				required={required}
				disabled={disabled}
				onChange={handleChange}
			/>
			<label
				onClick={handleClick}
				className="text-[16px] cursor-pointer hover:scale-[102%] duration-200 ease-in-out active:scale-[98%]				"
				htmlFor={id}
			>
				{label}
			</label>
		</div>
	);
};

export default InputCheckbox;
