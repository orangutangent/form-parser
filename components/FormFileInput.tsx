'use client';
import Image from 'next/image';
import React from 'react';
import fileIcon from '@/public/fileIcon.svg';
import fileIconPrimary from '@/public/fileIconPrimary.svg';
import { useFile } from '@/hooks/useFile';

const FormFileInput = () => {
	const [success, setSuccess] = React.useState(false);
	const [error, setError] = React.useState(false);
	const { file, setFile } = useFile();
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
		if (files.length > 1) {
			setErrorMessage('Only one file allowed');
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
		const file = files[0];
		if (file.type !== 'application/json') {
			setErrorMessage('Only json files allowed');
			setSuccess(false);
			setError(true);
			return;
		}
		if (file.size > 10 * 1024 * 1024) {
			setErrorMessage('File size should be less than 10MB');
			setSuccess(false);
			setError(true);
			return;
		}
		setError(false);
		setSuccess(true);
		setErrorMessage('');
		setFile(file);
	};

	const handleFileDelete = () => {
		setFile(null);
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
		<div
			className={`
        w-full max-w-[675px] h-[92px] rounded-[4px] bg-white shadow-inputDefault overflow-hidden
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
					<Image src={fileIcon} alt="file" width={24} />
				</div>
			) : file ? (
				<div className="w-full h-full p-[20px] flex justify-between items-center">
					<div className="flex flex-col  gap-[8px]">
						<div className="w-full flex text-[16px] gap-[8px]">
							<p>{file.name}</p>
							<p className=" text-gray">{Math.round(file.size / 1024)} KB</p>
						</div>
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
							<input ref={inputRef} type="file" className="hidden" onChange={handleFileInput} />
							<p className="text-[16px]"> or drag and drop</p>
						</div>
						<div className="w-full flex">
							{errorMessage ? (
								<div className="text-[13px] text-red">{errorMessage}</div>
							) : (
								<p className="text-[13px] text-gray">json files up to 10 MB in size are available for download</p>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default FormFileInput;
