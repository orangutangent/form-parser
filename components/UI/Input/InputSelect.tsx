'use client';
import React from 'react';
import downArrow from '@/public/downArrow.svg';
import Image from 'next/image';
import clearIcon from '@/public/clearIcon.svg';
import checkedIcon from '@/public/checkedIcon.svg';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
	id?: string;
	label?: string;
	required?: boolean;
	multiple?: boolean;
	placeholder?: string;
	options?: string[];
	onChange?: (value: any) => void;
}

const InputSelect: React.FC<Props> = ({
	id,
	label = '',
	required,
	placeholder = '',
	multiple,
	options = [],
	onChange,
}) => {
	const inputRef = React.useRef<HTMLInputElement | null>(null);
	const [value, setValue] = React.useState('');
	const [isOpen, setIsOpen] = React.useState(false);
	const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
	const variants = {
		open: { rotate: 180 },
		closed: { rotate: 0 },
	};
	const handleChange = (event: any) => {
		setValue(event.target.value);
	};
	const handleBlur = (event: any) => {
		setIsOpen(false);
	};

	const toggleSelect = (option: string) => {
		let newSelectedOptions: string[] = [];

		if (multiple) {
			if (selectedOptions.includes(option)) {
				newSelectedOptions = selectedOptions.filter((item) => item !== option);
			} else {
				newSelectedOptions = [...selectedOptions, option];
			}
		} else {
			if (selectedOptions.includes(option)) {
				newSelectedOptions = [];
			} else {
				newSelectedOptions = [option];
			}
		}

		setSelectedOptions(newSelectedOptions);
		setValue(newSelectedOptions.join(', '));

		if (onChange) onChange(newSelectedOptions);
	};

	const [filteredOptions, setFilteredOptions] = React.useState(options);
	React.useEffect(() => {
		setFilteredOptions(options.filter((option) => option.toLowerCase().includes(value.toLowerCase())));
	}, [value, options]);
	return (
		<div className="w-full max-w-[482px]">
			<div
				className="relative h-[56px] p-[10px] w-full flex items-center shadow-inputDefault hover:shadow-inputHover bg-white
        rounded-[8px] "
			>
				<div className="w-full flex justify-between">
					<div
						className={`
                                    relative w-full max-w-[482px] h-[56px] 
                                    disabled:cursor-not-allowed
                                    `}
					>
						<input
							id={id}
							className={`
                                peer h-full w-full pt-[16px] px-[16px] text-[16px] outline-none 
                                placeholder:text-[transparent] focus:placeholder:text-gray 
                                `}
							ref={inputRef}
							type="text"
							value={value}
							placeholder={placeholder}
							required={required}
							onChange={handleChange}
							onFocus={() => setIsOpen(true)}
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
					<div className=" flex flex-shrink-0 gap-[4px] items-center">
						{value && (
							<Image
								className="cursor-pointer hover:bg-grays rounded-full h-min "
								src={clearIcon}
								alt="clearIcon"
								width={24}
								height={24}
								onClick={() => setValue('')}
							/>
						)}
						<motion.div
							animate={isOpen ? 'open' : 'closed'}
							variants={variants}
							initial="closed"
							exit="closed"
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							onClick={() => setIsOpen(!isOpen)}
							className=" cursor-pointer hover:bg-grays rounded-full "
						>
							<Image src={downArrow} alt="downArrow" width={24} height={24} />
						</motion.div>
					</div>
				</div>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="absolute start-[0px] overflow-hidden shadow-inputDefault top-[calc(100%+10px)] bg-white  rounded-[8px] w-full"
						>
							{filteredOptions.map((option) => (
								<div
									onClick={() => toggleSelect(option)}
									key={option}
									className="flex justify-between px-[16px] py-[8px] hover:bg-grayl cursor-pointer"
								>
									<p>{option}</p>
									{selectedOptions.includes(option) && (
										<Image src={checkedIcon} alt="checkedIcon" width={24} height={24} />
									)}
								</div>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default InputSelect;
