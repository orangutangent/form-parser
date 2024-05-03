'use client';
import Button from './UI/Button';
import InputText from './UI/Input/InputText';
import InputPassword from './UI/Input/InputPassword';
import InputSelect from './UI/Input/InputSelect';
import InputFile from './UI/Input/InputFile';
import InputTextarea from './UI/Input/InputTextarea';
import InputColor from './UI/Input/InputColor';
import InputCheckbox from './UI/Input/InputCheckbox';
import { useState } from 'react';
import closeIcon from '../public/closeIcon.svg';

interface Props {
	formConfig: any;
	setFormConfig: (formConfig: any) => void;
}

const Form: React.FC<Props> = ({ formConfig, setFormConfig }) => {
	const [form, setForm] = useState<any>({});
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(form);
	};
	return (
		<div className="relative mt-[20px] mb-[80px] w-full max-w-[480px] shadow-inputDefault rounded-[8px] p-[20px]">
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
							<InputText key={field.id} {...field} onChange={(e) => setForm({ ...form, [field.id]: e.target.value })} />
						);
					} else if (field.type === 'password') {
						return (
							<InputPassword
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
					} else if (field.type === 'select') {
						return (
							<InputSelect key={field.id} {...field} onChange={(value) => setForm({ ...form, [field.id]: value })} />
						);
					} else if (field.type === 'checkbox') {
						return (
							<InputCheckbox
								key={field.id}
								{...field}
								onChange={(e) => setForm({ ...form, [field.id]: e.target.checked })}
							/>
						);
					} else if (field.type === 'color') {
						return (
							<InputColor key={field.id} {...field} onChange={(value) => setForm({ ...form, [field.id]: value })} />
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
	);
};

export default Form;
