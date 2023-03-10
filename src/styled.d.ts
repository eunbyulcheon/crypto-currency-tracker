import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		textColor: string;
		bgColor: string;
		accentColor: string;
		upColor: string;
		downColor: string;
		cardBgColor: string;
	}
}
