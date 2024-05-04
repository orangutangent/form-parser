'use client';
import Button from './Button';
import { usePopup } from '@/hooks/usePopup';
import closeIcon from '@/public/closeIcon.svg';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
	label?: string;
	actionLabel?: string;
	onSubmit?: () => void;
}

const Popup: React.FC<Props> = ({ label, onSubmit, actionLabel }) => {
	const { isOpen, setClose } = usePopup();
	return (
		<AnimatePresence onExitComplete={setClose}>
			{isOpen && (
				<div className="absolute p-[10px] z-50 top-0 left-[50%] translate-x-[-50%] w-full max-w-[481px] min-h-[166px] ">
					<motion.div
						initial={{ opacity: 0, y: -100 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -100 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="w-full h-full bg-white rounded-[8px] shadow-inputHover relative flex flex-col gap-[10px] items-center justify-center p-[24px]"
					>
						<h1 className="text-[32px] mt-[40px] text-center font-[700]">{label}</h1>
						<div className="w-full flex justify-center gap-[10px] ">
							<Button
								label={actionLabel ? actionLabel : 'Submit'}
								onClick={() => {
									onSubmit && onSubmit();
									setClose();
								}}
							/>
							<Button secondary label="Cancel" onClick={setClose} />
						</div>
						<div className="absolute top-4 right-4">
							<Button iconCircle={closeIcon} onClick={setClose} />
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default Popup;
