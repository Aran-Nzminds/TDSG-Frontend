interface ICardItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface IDropdownProps {
  trigger: React.ReactNode;
  items: {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: React.ReactNode;
    type?: 'checkbox' | 'radio' | 'default' | 'separator';
    checked?: boolean;
  }[];
}

export { ICardItem, IDropdownProps };
