export type ThemeName = 'Classic' | 'Solarized' | 'IanPad' | 'Midnight';

export interface ITheme {
	background: string;
	chrome: string;
	accent: string;
	text: string;
	links: string;
	explorerContent: string;
	instructionImages: {
		notepad: string;
		note: string;
		element: string;
	};
	backgroundImage?: string;
	drawingBackground?: string;
}
