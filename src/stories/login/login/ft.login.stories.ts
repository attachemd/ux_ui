import {FtLoginComponent} from './ft.login.component';
import type {Meta, StoryObj} from '@storybook/angular';

const meta: Meta<FtLoginComponent> = {
  title: 'Login/Login',
  component: FtLoginComponent,
  // tags: ['autodocs'],
  parameters: {
    order: 1,  // Lower number = appears earlier
  },
  argTypes: {

  },
  args: {

  }
};

export default meta;
type Story = StoryObj<FtLoginComponent>;

export const Default: Story = {
  args: {

  }
};

export const Focus: Story = {
  args: {
    inputState: {
      username: "focus" as const,
      password: "rest"
    }
  }
};

export const Content: Story = {
  args: {
    inputState: {
      username: "content",
      password: "content"
    },
    content: {
      username: 'root',
      password: 'password'
    },
    buttonState: 'rest'
  }
};

