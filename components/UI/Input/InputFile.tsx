'use client';
import Image from 'next/image';
import React from 'react';
import fileIcon from '@/public/fileIcon.svg';
import fileIconPrimary from '@/public/fileIconPrimary.svg';

interface Props {
	id: string;
	label?: string;
	required?: boolean;
	formats?: string;
	max_size?: number;
	max_count?: number;
	files?: File[];
	onChange?: (files: FileList) => void;
}

const InputFile: React.FC<Props> = ({
	id,
	label,
	required,
	formats,
	max_size: maxSize,
	max_count: maxCount,
	files,
	onChange,
}) => {
	const [success, setSuccess] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [filesInput, setFilesInput] = React.useState<File[] | null>(null);
	const [drag, setDrag] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');
	const inputRef = React.useRef<HTMLInputElement>(null);
	const selectFile = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};
	const onDragStart = (e: React.DragEvent) => {
		e.preventDefault();
		setDrag(true);
	};
	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		if (!drag) {
			setDrag(true);
		}
	};
	const onDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setDrag(false);
	};

	const checkFiles = (files: FileList) => {
		if (!maxCount && files.length > 1) {
			setErrorMessage('Only one file allowed');
			setSuccess(false);
			setError(true);
			return;
		} else if (maxCount && files.length > maxCount) {
			setErrorMessage(`Only ${maxCount} files allowed`);
			setSuccess(false);
			setError(true);
			return;
		}
		if (files.length === 0) {
			setErrorMessage('No file selected');
			setSuccess(false);
			setError(true);
			return;
		}
		for (let file of files) {
			if (formats && !formats?.split(', ').includes(file.type)) {
				console.log('FILE: ', file);
				setErrorMessage(`Only ${formats} files allowed`);
				setSuccess(false);
				setError(true);
				return;
			}
			if (maxSize && file.size > maxSize) {
				setErrorMessage(`File size should be less than ${maxSize / 1024 / 1024}MB`);
				setSuccess(false);
				setError(true);
				return;
			}
		}
		setError(false);
		setSuccess(true);
		setDrag(false);
		setErrorMessage('');
		if (onChange) onChange(files);
		const filesArray = Array.from(files);
		setFilesInput(filesArray);
	};

	const handleFileDelete = () => {
		setFilesInput(null);
		setSuccess(false);
		setError(false);
		setErrorMessage('');
	};

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files) {
			checkFiles(e.target.files);
		}
	};

	const onDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setDrag(false);
		if (e.dataTransfer) {
			checkFiles(e.dataTransfer.files);
		}
	};
	return (
		<div className="w-full max-w-max">
			<label htmlFor={id} className="text-[16px] font-[600] text-primary mb-[8px] ms-[8px]">
				{label} {required && <span className="text-red">*</span>}
			</label>
			<div
				className={`
            w-full max-w-[675px] 
            ${drag ? 'h-[92px]' : 'min-h-[92px]'} 
            rounded-[4px] bg-white shadow-inputDefault overflow-hidden
            hover:shadow-inputHover
            active:shadow-inputActive
            ${success && 'shadow-inputSuccess'}
            ${error && 'shadow-inputError'}
            `}
			>
				{drag ? (
					<div
						onDragStart={(e) => onDragStart(e)}
						onDragOver={(e) => onDragOver(e)}
						onDragLeave={(e) => onDragLeave(e)}
						onDrop={(e) => onDrop(e)}
						className="w-full h-full flex justify-center items-center bg-primary"
					>
						<Image src={fileIcon} alt="file" width={24} height={24} />
					</div>
				) : filesInput ? (
					<div className="w-full h-full p-[20px] flex justify-between items-center">
						<div className="flex flex-col  gap-[8px]">
							{filesInput.map((file, index) => (
								<div key={index} className="w-full flex text-[16px] gap-[8px]">
									<p>{file.name}</p>
									<p className=" text-gray">{Math.round(file.size / 1024)} KB</p>
								</div>
							))}
							<div className="w-full flex">
								<button
									onClick={handleFileDelete}
									className="text-[16px] text-primary cursor-pointer hover:scale-105 duration-200 ease-in-out"
								>
									Delete file
								</button>
							</div>
						</div>
						<div className="text-primary w-[56px] h-[56px] rounded-full flex justify-center items-center bg-grayl">
							<Image className="" src={fileIconPrimary} alt="file" width={24} height={24} />
						</div>
					</div>
				) : (
					<div
						onDragStart={(e) => onDragStart(e)}
						onDragOver={(e) => onDragOver(e)}
						onDragLeave={(e) => onDragLeave(e)}
						className="w-full h-full p-[20px] flex justify-between items-center "
					>
						<div className=" flex flex-col justify-center gap-[8px]">
							<div className="flex w-full gap-[4px]">
								<label
									onClick={selectFile}
									className="text-[16px] text-primary cursor-pointer hover:scale-105 duration-200 ease-in-out"
								>
									Select a file{' '}
								</label>
								<input
									id={id}
									name={'files'}
									required={required}
									multiple={(maxCount && maxCount > 1) || false}
									ref={inputRef}
									type="file"
									className="hidden"
									onChange={handleFileInput}
								/>
								<p className="text-[16px]"> or drag and drop</p>
							</div>
							<div className="w-full flex">
								{errorMessage ? (
									<div className="text-[13px] text-red">{errorMessage}</div>
								) : (
									<p className="text-[13px] text-gray">
										{formats} files up to {maxSize && maxSize / 1024 / 1024 + 'MB in size'} are available for upload
									</p>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default InputFile;
