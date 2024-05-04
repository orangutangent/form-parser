'use client';
import React, { useState } from 'react';
import Button from '@/components/UI/Button';
import FormFileInput from '@/components/FormFileInput';
import { useFile } from '@/hooks/useFile';
import { usePopup } from '@/hooks/usePopup';
import Form from '@/components/Form';
import Popup from '@/components/UI/Popup';

export default function Home() {
	const { setOpen, setClose } = usePopup();
	const { file, setFile } = useFile();
	const [formConfig, setFormConfig] = useState<any>(null);

	React.useEffect(() => {
		if (file) {
			const reader = new FileReader();

			reader.onload = (event) => {
				if (typeof event?.target?.result === 'string') {
					try {
						const jsonData = JSON.parse(event.target.result);
						setFormConfig(jsonData);
					} catch (error) {
						console.error('Error parsing JSON:', error);
					}
				}
			};

			reader.readAsText(file);
		}
	}, [file]);

	const onReset = () => {
		setFormConfig(null);
		setFile(null);
	};

	return (
		<main className="w-full min-h-screen flex flex-col items-center px-[20px]">
			<Popup label="Do you want to reset?" onSubmit={onReset} actionLabel="Reset" />
			<div className="w-full max-w-[675px] flex flex-col gap-8 mt-[40px]">
				<FormFileInput />
				<div className="w-full flex justify-end">
					<Button label="Reset" secondary onClick={() => setOpen()} />
				</div>
			</div>
			{/* <InputCheckbox label="test" required onChange={(e) => console.log(e.target.checked)} id={''} /> */}

			{formConfig && <Form formConfig={formConfig} setFormConfig={setFormConfig} />}
		</main>
	);
}
