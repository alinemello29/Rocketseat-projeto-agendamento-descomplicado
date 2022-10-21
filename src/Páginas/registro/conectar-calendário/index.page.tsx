import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import Link from 'next/link'
import { ArrowRight, Check } from 'phosphor-react'
import { useState } from 'react'
import { Container, Header } from '../styles'
import { ConnectBox, ConnectItem, FormError } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function ConnectCalendar() {
  const router = useRouter()
  const { status } = useSession()

  const hasAuthError = !!router.query.error
  const hasConnectedCalendar = status === 'authenticated'

  const [isConnectingCalendar, setIsConnectingCalendar] = useState(false)

  async function handleConnectCalendar() {
    setIsConnectingCalendar(true)

    await signIn('google', {
      callbackUrl: '/register/connect-calendar',
    })
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Agenda</Text>

          {hasConnectedCalendar ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
              disabled={isConnectingCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <FormError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </FormError>
        )}

        <Link href="/register/time-intervals">
          <Button as="a" aria-disabled={!hasConnectedCalendar}>
            Próximo passo
            <ArrowRight />
          </Button>
        </Link>
      </ConnectBox>
    </Container>
  )
}
