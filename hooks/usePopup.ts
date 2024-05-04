import { create } from 'zustand';

interface Props {
	isOpen: boolean;
	setOpen: () => void;
	setClose: () => void;
}

export const usePopup = create<Props>((set) => ({
	isOpen: false,
	setOpen: () => set({ isOpen: true }),
	setClose: () => set({ isOpen: false }),
}));
