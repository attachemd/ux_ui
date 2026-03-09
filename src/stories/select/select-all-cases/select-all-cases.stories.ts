import { Meta, StoryObj } from '@storybook/angular';
import { SelectAllCasesComponent } from './select-all-cases.component';

const meta: Meta<SelectAllCasesComponent> = {
    title: 'Core/Select/Select (All Cases)',
    component: SelectAllCasesComponent,
    argTypes: {
        radius: {
            control: 'select',
            options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius']
        },
        size: {
            control: 'select',
            options: ['xs-size', 'sm-size', 'md-size', 'lg-size']
        },
        color: {
            control: 'select',
            options: ['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger']
        },
        variant: {
            control: 'select',
            options: ['flat', 'faded', 'outlined', 'ghost']
        },
        isDescription: {
            control: 'boolean'
        },
        multiple: {
            control: 'boolean'
        },
        placeholder: {
            control: 'text'
        },
        isPrefixIconClass: {
            control: 'boolean'
        },
        startContent: {
            control: 'text'
        },
        endContent: {
            control: 'text'
        },
        isSuffix1IconClass: {
            control: 'boolean'
        },
        suffix1IconClass: {
            control: 'select',
            options: ['visibility', 'visibility_off', 'group', 'search', 'edit', 'check']
        },
        isSuffix2IconClass: {
            control: 'boolean'
        },
        suffix2IconClass: {
            control: 'select',
            options: ['search', 'keyboard_arrow_down', 'calendar_today', 'tune', 'filter_list']
        }
    },
    args: {
        isPrefixIconClass: false,
        prefixIconClass: 'mail',
        radius: 'md-radius',
        size: 'md-size',
        color: 'primary',
        variant: 'flat',
        isDescription: false,
        placeholder: 'Select an option',
        multiple: false,
        isSuffix1IconClass: false,
        suffix1IconClass: 'group',
        isSuffix2IconClass: true,
        suffix2IconClass: 'keyboard_arrow_down',
    }
};

export default meta;
type Story = StoryObj<SelectAllCasesComponent>;

export const Default: Story = {
    args: {}
};

export const MultipleSelection: Story = {
    args: {
        multiple: true,
    }
};

export const WithStartContent: Story = {
    args: {
        startContent: '$'
    }
};

export const WithEndContent: Story = {
    args: {
        endContent: '@'
    }
};

export const WithStartAndEndContent: Story = {
    args: {
        startContent: 'https://',
        endContent: '.org'
    }
};

export const WithPrefixIcon: Story = {
    args: {
        isPrefixIconClass: true,
        prefixIconClass: 'mail'
    }
};

export const WithSuffixIcons: Story = {
    args: {
        isSuffix1IconClass: true,
        suffix1IconClass: 'group',
        isSuffix2IconClass: true,
        suffix2IconClass: 'keyboard_arrow_down'
    }
};

export const FullyLoaded: Story = {
    args: {
        multiple: true,
        isPrefixIconClass: true,
        prefixIconClass: 'mail',
        isSuffix1IconClass: true,
        suffix1IconClass: 'group',
        isSuffix2IconClass: true,
        suffix2IconClass: 'keyboard_arrow_down',
        startContent: 'https://',
        endContent: '.com'
    }
};
