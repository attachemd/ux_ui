import type { Meta, StoryObj } from "@storybook/angular";
import { SwitchButtonAllCasesComponent } from "./switch-button-all-cases.component";

const meta: Meta<SwitchButtonAllCasesComponent> = {
    title: 'Core/Switch Button/Switch Button All Cases',
    component: SwitchButtonAllCasesComponent,
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["xs-size", "sm-size", "md-size", "lg-size"],
        },
        color: {
            control: "select",
            options: ["neutral", "primary", "secondary", "tertiary", "success", "warning", "danger"],
        },
        radius: {
            control: "select",
            options: ["none-radius", "xs-radius", "sm-radius", "md-radius", "lg-radius", "full-radius"],
        },
    },
};

export default meta;
type Story = StoryObj<SwitchButtonAllCasesComponent>;

export const Default: Story = {
    args: {
        size: "md-size",
        color: "neutral",
        radius: "full-radius",
    },
};

