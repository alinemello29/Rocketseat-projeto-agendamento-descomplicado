import { Heading, styled, Text } from '@ignite-ui/react'

export const Container = styled('div', {
  maxWidth: 852,
  margin: '$20 auto $4',
  padding: '0 $4',

  '@media (max-width: 820px)': {
    width: '100%',
    maxWidth: 572,
  },
})

export const User = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [`& > ${Heading}`]: {
    lineHeight: '$base',
    marginTop: '$2',
  },

  [`& > ${Text}`]: {
    color: '$gray200',
  },
})
