export interface Props {
  connect: any
  address: string | undefined
}

export interface PropsToastr {
  isOpen: boolean
  duration: number
  close: () => void
}
