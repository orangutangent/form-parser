'use client';
import Image from 'next/image';
import React from 'react';
import downArrow from '@/public/downArrow.svg';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
	id?: string;
	label?: string;
	required?: boolean;
	options?: string[];
	onChange?: (value: any) => void;
}

const InputColor: React.FC<Props> = ({ id, label, required, options = [], onChange }) => {
	const inputRef = React.useRef<HTMLInputElement | null>(null);
	const [selectedOption, setSelectedOption] = React.useState(options[0]);
	React.useEffect(() => {
		if (onChange && inputRef.current) {
			onChange(inputRef.current.value);
		}
	}, []);
	const [open, isOpen] = React.useState(false);
	const variants = {
		open: { rotate: 180 },
		closed: { rotate: 0 },
	};
	const changeOption = (option: string) => {
		setSelectedOption(option);
		if (onChange) onChange(option);
	};

	return (
		<div className="relative w-full max-w-max flex gap-4 p-[8px] items-center shadow-inputDefault">
			{label && (
				<label className="text-[16px] ms-[8px]" htmlFor={id}>
					{label}
				</label>
			)}
			<div style={{ backgroundColor: selectedOption }} className={`w-[40px] h-[40px] rounded-[4px]  `} />
			<motion.div
				animate={open ? 'open' : 'closed'}
				variants={variants}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
				onClick={() => isOpen(!open)}
				className="cursor-pointer hover:bg-grays rounded-full h-min "
			>
				<Image src={downArrow} alt="downArrow" width={24} height={24} />
			</motion.div>
			<input
				className="hidden"
				type="text"
				name={id}
				value={selectedOption}
				onChange={() => {}}
				ref={inputRef}
				required={required}
			/>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="z-10 absolute w-fit flex start-0 top-[calc(100%+5px)] gap-1 p-2 bg-white rounded-[4px]  shadow-inputDefault"
					>
						{options.map((option) => (
							<div
								key={option}
								style={{ backgroundColor: option }}
								className={`w-[40px] h-[40px] rounded-[4px]  cursor-pointer`}
								onClick={() => changeOption(option)}
							/>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default InputColor;
