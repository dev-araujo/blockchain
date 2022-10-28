export interface Props {
  connect: () => void;
  address: string | undefined;
}

export interface PropsToastr {
  isOpen: boolean;
  duration: number;
  close: () => void;
}
