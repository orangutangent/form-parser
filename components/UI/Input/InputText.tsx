'use client';
import React from 'react';

interface Props {
	id?: string;
	name?: string;
	label: string;
	value?: string;
	required?: boolean;
	placeholder?: string;
	pattern?: string;
	mask?: string;
	maxlength?: number;
	minlength?: number;
	disabled?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({
	id,
	name,
	label,
	value,
	disabled,
	pattern: patternString,
	mask,
	required,
	placeholder = '',
	onChange,
	maxlength: maxLength,
	minlength: minLength,
}) => {
	const regExp = new RegExp(patternString || '.*');
	const [error, setError] = React.useState('');
	const [inputValue, setInputValue] = React.useState(value || '');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		setInputValue(inputValue);
		if (onChange) onChange(event);
		if (regExp && !regExp.test(inputValue)) {
			setError(`Invalid input format ${mask && '(' + mask + ')'}`);
		} else if (maxLength && inputValue.length > maxLength) {
			setError(`Input length should be less than ${maxLength}`);
		} else if (minLength && inputValue.length < minLength) {
			setError(`Input length should be greater than ${minLength}`);
		} else {
			setError('');
		}
	};

	const handleBlur = () => {
		if (!inputValue) {
			setError('');
		}
	};
	return (
		<div className=" w-full max-w-[482px] space-y-2">
			<div
				className={`
        relative w-full max-w-[482px] h-[56px] 
          shadow-inputDefault hover:shadow-inputHover
        disabled:cursor-not-allowed
        bg-white
        rounded-[8px] overflow-hidden  `}
			>
				<input
					id={id}
					className={`peer h-full w-full pt-[16px] px-[16px] text-[16px] outline-none 
          placeholder:text-[transparent] focus:placeholder:text-gray
          ${error ? ' bg-redgirl' : 'bg-white'}
          `}
					type="text"
					name={name}
					value={inputValue}
					disabled={disabled}
					placeholder={placeholder}
					required={required}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<label
					className={`pointer-events-none absolute text-gray start-[16px]
            text-[13px] top-[6px] transition-all 
            peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-[16px]
            peer-focus:top-[6px]  peer-focus:text-[13px] 
        `}
				>
					{label}
				</label>
			</div>
			{error && <p className="text-red">{error}</p>}
		</div>
	);
};

export default Input;
