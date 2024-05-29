import { FC, PropsWithChildren } from 'react'
import { ActionBox, ImageBg, Wrapper } from './ui'

export const AuthWrapper: FC<PropsWithChildren<{}>> = ({children}) => {

  return <Wrapper>
    <ImageBg />
    <ActionBox>
      {children}
    </ActionBox>
  </Wrapper>
}
