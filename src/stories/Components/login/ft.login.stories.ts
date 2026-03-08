import { FtLoginComponent } from './ft.login.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<FtLoginComponent> = {
  title: 'Components/Login',
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
    loginData: {
      username: '',
      password: '',
      rememberMe: false
    }
  }
};

export const PreFilled: Story = {
  args: {
    loginData: {
      username: 'y.amrani',
      password: 'mypassword123',
      rememberMe: true
    }
  }
};

