/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import cx from 'classnames';
import CloseIcon from '@heroicons/react/24/outline/XCircleIcon';

const Swatch = ({
    variant = 'text',
    disabled,
    label = '',
    value = '',
    dataValues = [],
    onChange = () => {},
    checked: selected = false,
    className = '',
    style: customStyle = {},
    ...others
}) => {
    const isColor = variant === 'color';
    const isImage = variant === 'image';
    const checked = dataValues && dataValues.length > 0 ? dataValues.indexOf(value) !== -1 : selected;

    const handleChange = () => {
        onChange(value);
    };

    let style = { background: '#FFFFFF' };
    if (isColor && label) {
        style = { background: label };
    }

    if (isImage && label) {
        style = {
            backgroundImage: `url(${label})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        };
    }

    if (isColor || isImage) {
        return (
            <div
                className={cx(
                    'p-[1px]',
                    'rounded-full border-[2px] border-neutral-white',
                    checked ? 'border-[2px] border-primary-700' : '',
                    disabled ? 'border-yellow-400 opacity-40' : 'hover:border-[2px] hover:border-neutral-700',
                )}
            >
                <div
                    key="swatches-color-selector"
                    role="button"
                    style={{
                        ...style,
                        ...customStyle,
                    }}
                    onClick={handleChange}
                    className={cx(
                        'swift-swatcher-color',
                        'flex',
                        'justify-center',
                        'items-center',
                        'rounded-[999px] border-[1px] border-neutral-400',
                        'h-[30px]',
                        'w-[30px]',
                        className,
                    )}
                    {...others}
                >
                    {disabled && <CloseIcon className="text-neutral-white" />}
                </div>
            </div>
        );
    }

    return (
        <div
            key="swatches-text-selector"
            role="button"
            className={cx(
                'swift-swatcher-text',
                !disabled ? (checked ? 'border-neutral-700 text-neutral-700 bg-primary-50' : 'border-neutral-500 text-neutral-700') : '',
                !disabled ? 'hover:border-neutral-700 hover:text-neutral-700 hover:bg-primary-50' : '',
                disabled && 'bg-neutral-50 border-neutral-800 text-neutral-200',
                'text-base',
                'swatches-text',
                'border-[1px]',
                'font-medium',
                'rounded-[6px]',
                'py-[6px] px-[6px]',
                'relative',
                'uppercase',
                'text-center',
                'max-w-[200px]',
                'min-w-[40px]',
                'truncate',
                className,
            )}
            onClick={handleChange}
            {...others}
        >
            {label}
        </div>
    );
};

export default Swatch;
