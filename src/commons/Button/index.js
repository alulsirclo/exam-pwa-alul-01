/* eslint-disable max-len */
import cx from 'classnames';
import Typography from '@common_typography';
import ArrowPath from '@heroicons/react/24/outline/ArrowPathIcon';
import propTypes from 'prop-types';
import Show from '@common_show';
import Link from 'next/link';

const Button = (props) => {
    const {
        className = '',
        classNameText = '',
        variant = 'primary',
        link,
        linkTarget,
        linkPassHref,
        children,
        disabled = false,
        onClick = () => {},
        loading = false,
        size = 'md',
        icon,
        iconPosition: position,
        iconOnly,
        textProps = {},
        iconProps = {},
        linkProps = {},
        customChildren,
        underline,
        ...restProps
    } = props;

    const { className: classIcon, ...resIconProps } = iconProps;
    const isPositionRight = position === 'right';

    const buttonSizes = {
        sm: `px-[16px] py-[8px] ${iconOnly ? 'p-[8px]' : ''}`,
        md: `px-[20px] py-[10px] ${iconOnly ? 'p-[10px]' : ''}`,
        lg: `px-[22px] py-[12px] ${iconOnly ? 'p-[10px]' : ''}`,
        xl: `px-[26px] py-[14px] ${iconOnly ? 'p-[12px]' : ''}`,
    };

    const textVariants = {
        sm: 'bd-2a',
        md: 'bd-2a',
        lg: 'bd-2',
        xl: 'bd-1',
    };

    const classes = cx(buttonSizes[size], className, !className.includes('rounded') && 'rounded-md');

    const styleClass = {
        primary: {
            button: cx(
                'focus:shadow-[0_0_0_4px] hover:shadow-lg bg-pwa-button_background hover:bg-pwa-button_background_hover focus:shadow-primary-300 ',
                'active:bg-primary disabled:bg-neutral-200 disabled:text-neutral-400 disabled:hover:shadow-none',
                'disabled:focus:shadow-none disabled:active:bg-neutral-200 disabled:active:shadow-none',
                loading && 'focus:shadow-none hover:shadow-none cursor-default',
            ),
            typography: cx('!text-pwa-button_text', underline && 'underline'),
        },
        secondary: {
            button: 'focus:shadow-[0_0_0_4px] hover:shadow-lg bg-primary-100 hover:bg-primary-200 focus:shadow-primary-300 active:bg-primary-200',
            typography: cx('!text-primary group-active:!text-neutral-white', underline && 'underline'),
        },
        tertiary: {
            button: cx(
                'focus:shadow-[0_0_0_4px] hover:shadow-lg bg-neutral-white hover:shadow-lg',
                'focus:shadow-primary-300 active:shadow-primary-300 active:shadow-[0_0_0_4px]',
                loading && 'focus:shadow-none hover:shadow-none cursor-default',
            ),
            typography: cx('!text-primary', underline && 'underline'),
        },
        outlined: {
            button: cx(
                'focus:shadow-[0_0_0_4px] hover:shadow-lg bg-neutral-white border border-black',
                'hover:opacity-50 focus:shadow-neutral-100',
                loading && 'focus:shadow-none hover:shadow-none cursor-default',
            ),
            typography: cx('!text-black', underline && 'underline'),
        },
        disabled: {
            button: cx(
                'focus:shadow-[0_0_0_4px] hover:shadow-lg bg-neutral-100 hover:bg-neutral-100',
                'hover:shadow-none focus:shadow-none active:bg-neutral-100 active:shadow-none',
            ),
            typography: cx('!text-neutral-400', underline && 'underline'),
        },
        plain: {
            button: '',
            typography: cx('!text-black hover:text-neutral-400', underline && 'underline'),
        },
    };

    const ButtonContent = () => (
        <Typography
            variant={textVariants[size]}
            className={
                cx(
                    'flex',
                    'items-center',
                    !disabled && styleClass[variant].typography,
                    disabled && styleClass.disabled.typography,
                    {
                        'flex-row-reverse': icon && isPositionRight,
                    },
                    classNameText,
                )
            }
            {...textProps}
        >
            <Show when={loading}>
                <ArrowPath
                    className={cx(
                        'animate-spin w-6 h-6',
                        {
                            'ml-[6px]': isPositionRight && !iconOnly,
                            'mr-[6px]': !isPositionRight && !iconOnly,
                            'text-lg': !iconOnly || (iconOnly && (size === 'sm' || size === 'md')),
                            '!text-neutral-white': variant === 'primary',
                        },
                    )}
                />
            </Show>
            <Show when={icon && !loading}>
                {icon ? React.cloneElement(icon, {
                    className: cx(
                        'w-6 h-6',
                        {
                            'mr-[6px]': !isPositionRight && !iconOnly,
                            'ml-[6px]': isPositionRight && !iconOnly,
                        },
                        classIcon,
                    ),
                    ...resIconProps,
                }) : null}
            </Show>
            <Show when={!iconOnly}>{children}</Show>
        </Typography>
    );

    if (link) {
        return (
            <Link
                href={link}
                target={linkTarget || '_self'}
                passHref={linkPassHref}
                className={cx(
                    'button-link',
                    'group',
                    'flex items-center',
                    !disabled && styleClass[variant].button,
                    disabled && styleClass.disabled.button,
                    classes,
                )}
                onClick={onClick}
                {...linkProps}
            >
                <ButtonContent />
                {customChildren && customChildren}
            </Link>
        );
    }

    return (
        <button
            type="button"
            onClick={() => {
                if (!disabled && !loading) {
                    onClick();
                }
            }}
            disabled={disabled}
            className={cx(
                'group',
                {
                    [styleClass[variant]?.button || '']: !disabled && styleClass[variant]?.button,
                    [styleClass.disabled.button]: disabled,
                },
                classes,
            )}
            {...restProps}
        >
            <ButtonContent />
            {customChildren && customChildren}
        </button>
    );
};

Button.propTypes = {
    className: propTypes.string,
    variant: propTypes.oneOf(['primary', 'secondary', 'tertiary', 'outlined', 'plain']),
    children: propTypes.any,
    disabled: propTypes.bool,
    onClick: propTypes.func,
    loading: propTypes.bool,
    size: propTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    icon: propTypes.oneOfType([propTypes.element, propTypes.bool]),
    iconOnly: propTypes.bool,
    iconProps: propTypes.object,
    iconPosition: propTypes.oneOf(['left', 'right']),
    underline: propTypes.bool,
    link: propTypes.string,
    linkTarget: propTypes.string,
    linkPassHref: propTypes.bool,
};

Button.defaultProps = {
    className: '',
    variant: 'primary',
    children: '',
    disabled: false,
    onClick: () => {},
    loading: false,
    size: 'md',
    icon: undefined,
    iconOnly: false,
    iconProps: {},
    iconPosition: 'left',
    underline: false,
    link: '',
    linkTarget: '_self',
    linkPassHref: true,
};

export default Button;
