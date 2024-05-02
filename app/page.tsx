'use client';
import React, { useState } from 'react';
import Button from '@/components/UI/Button';
import FormFileInput from '@/components/FormFileInput';
import closeIcon from '@/public/closeIcon.svg';
import InputTextarea from '@/components/UI/Input/InputTextarea';
import InputFile from '@/components/UI/Input/InputFile';
import { useFile } from '@/hooks/useFile';
import InputText from '@/components/UI/Input/InputText';

export default function Home() {
	const { file, setFile } = useFile();
	const [formConfig, setFormConfig] = useState<any>(null);
	const [form, setForm] = useState<any>({});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(form);
	};

	React.useEffect(() => {
		if (file) {
			const reader = new FileReader();

			reader.onload = (event) => {
				if (typeof event?.target?.result === 'string') {
					try {
						const jsonData = JSON.parse(event.target.result);
						setFormConfig(jsonData);
						console.log(jsonData);
					} catch (error) {
						console.error('Error parsing JSON:', error);
					}
				}
			};

			reader.readAsText(file);
		}
	}, [file]);

	return (
		<main className="w-screen h-screen flex flex-col items-center px-[20px]">
			<div className="w-full max-w-[675px] flex flex-col gap-8 mt-[40px]">
				<FormFileInput />
				<div className="w-full flex justify-end">
					<Button label="Reset" secondary onClick={() => setFile(null)} />
				</div>
			</div>
			{formConfig && (
				<div className="relative mt-[20px] w-full max-w-[480px] shadow-inputDefault rounded-[8px] p-[20px]">
					<div className="absolute top-4 right-4">
						<Button iconCircle={closeIcon} onClick={() => setFormConfig(null)} />
					</div>
					<div className="mt-[40px] mb-[20px] flex flex-col gap-[6px]">
						<h1 className="font-[700] text-[32px]">{formConfig?.form_name}</h1>
						<span className="text-[16px]">{formConfig?.form_description}</span>
					</div>
					<form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
						{formConfig?.form_fields.map((field: any) => {
							if (field.type === 'text') {
								return (
									<InputText
										key={field.id}
										{...field}
										onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
									/>
								);
							} else if (field.type === 'textarea') {
								return (
									<InputTextarea
										key={field.id}
										{...field}
										onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
									/>
								);
							} else if (field.type === 'file') {
								return (
									<InputFile key={field.id} {...field} onChange={(files) => setForm({ ...form, [field.id]: files })} />
								);
							}
						})}
						<div className="w-full flex sm:flex-row flex-col items-center gap-4">
							{formConfig?.form_buttons.map((field: any, index: number) => {
								return (
									<Button
										secondary={index % 2 !== 0}
										type={field.type}
										key={index}
										label={field.name}
										onClick={(event: any) => {
											if (field.action === 'submit') {
												handleSubmit(event);
											} else {
												return;
											}
										}}
									/>
								);
							})}
						</div>
					</form>
				</div>
			)}
		</main>
	);
}
