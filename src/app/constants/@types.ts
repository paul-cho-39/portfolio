interface ContactIconParams {
   className: string;
   height?: number;
   width?: number;
   hoverColor?: string;
}

export interface ClassNameProps {
   className?: string;
}

export interface PositionRange {
   low: number;
   high: number;
}

export interface BasicCardProps {
   index: number;
   isOdd: (index: number) => boolean;
}

export type { ContactIconParams };
