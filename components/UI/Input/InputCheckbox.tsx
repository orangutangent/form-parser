'use client';

import React from 'react';

interface Props {
	id: string;
	label: string;
	required: boolean;
	disabled?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCheckbox: React.FC<Props> = ({ id, label, required, disabled, onChange }) => {
	const inputRef = React.useRef<HTMLInputElement | null>(null);

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
		if (onChange) onChange(event);
	};
	return (
		<div
			className={`w-full max-w-max flex gap-[12px] relative
        ${disabled && 'opacity-[0.56] pointer-events-none'}`}
		>
			<input
				className={`peer  rounded-[4px] border-[1px] border-gray
                 h-[24px] w-[24px] active:bg-grayl
                 focus:border-[3px] 
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
				className="text-[16px] cursor-pointer hover:scale-[1.02] duration-200 ease-in-out active:scale-[0.98]"
				htmlFor={id}
			>
				{label}
			</label>
		</div>
	);
};

export default InputCheckbox;
