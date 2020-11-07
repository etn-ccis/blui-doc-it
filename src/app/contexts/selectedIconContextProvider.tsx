import { createContext, useContext } from 'react';
import { IconType } from '../../__types__';

type SelectedIconContextType = {
    selectedIcon: IconType | undefined;
};

export const SelectedIconContext = createContext<SelectedIconContextType | null>(null);

export const useSelectedIcon = (): SelectedIconContextType => {
    const context = useContext(SelectedIconContext);
    if (context === null) {
        throw new Error('useSelectedIcon must be used within a SelectedIconContextProvider');
    }
    return context;
};
