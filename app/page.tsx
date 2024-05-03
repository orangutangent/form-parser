'use client';
import React, { useState } from 'react';
import Button from '@/components/UI/Button';
import FormFileInput from '@/components/FormFileInput';
import closeIcon from '@/public/closeIcon.svg';
import InputTextarea from '@/components/UI/Input/InputTextarea';
import InputFile from '@/components/UI/Input/InputFile';
import { useFile } from '@/hooks/useFile';
import InputText from '@/components/UI/Input/InputText';
import InputSelect from '@/components/UI/Input/InputSelect';
import InputPassword from '@/components/UI/Input/InputPassword';
import InputCheckbox from '@/components/UI/Input/InputCheckbox';
import InputColor from '@/components/UI/Input/InputColor';
import Form from '@/components/Form';

export default function Home() {
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

	return (
		<main className="w-full min-h-screen flex flex-col items-center px-[20px]">
			<div className="w-full max-w-[675px] flex flex-col gap-8 mt-[40px]">
				<FormFileInput />
				<div className="w-full flex justify-end">
					<Button label="Reset" secondary onClick={() => setFile(null)} />
				</div>
			</div>

			{formConfig && <Form formConfig={formConfig} setFormConfig={setFormConfig} />}
		</main>
	);
}
