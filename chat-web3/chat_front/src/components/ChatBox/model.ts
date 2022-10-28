export interface Props {
  messages: [{ address: string; timestamp: string; message: string }];
  sendMessage: () => void;
  setText: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  text: string;
  enableButton: boolean;
}
