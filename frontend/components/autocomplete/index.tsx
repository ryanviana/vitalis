import React from 'react';
import { AutoComplete } from 'antd';

interface CustomAutoCompleteProps {
    options: string[];
    onSearch: (value: string) => void;
    onSelect: (value: string, option: any) => void;
    placeholder: string;
    className?: string;
    style?: React.CSSProperties;
}

const CustomAutoComplete: React.FC<CustomAutoCompleteProps> = ({ options, onSearch, onSelect, placeholder, className, style }) => {
    return (
        <AutoComplete
            options={options.map(option => ({ value: option }))}
            onSearch={onSearch}
            onSelect={onSelect}
            placeholder={placeholder}
            className={`custom-autocomplete-style ${className}`}
            style={style}
        />
    );
};

export default CustomAutoComplete;
