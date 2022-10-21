import { Avatar, Heading, Text } from '@ignite-ui/react'
import { useState } from 'react'
import { CalendarStep } from '../../components/ScheduleForm/CalendarStep'
import { ConfirmStep } from '../../components/ScheduleForm/ConfirmStep'

import { Container, User } from './styles'

export default function Home() {
  const [schedulingDate, setSchedulingDate] = useState<Date>(null)

  function handleCancelConfirmation() {
    setSchedulingDate(null)
  }

  return (
    <Container>
      <User>
        <Avatar src="https://github.com/diego3g.png" />
        <Heading>Diego Fernandes</Heading>
        <Text>CTO @Rocketseat</Text>
      </User>
      {!schedulingDate ? (
        <CalendarStep onSelectedDateTime={setSchedulingDate} />
      ) : (
        <ConfirmStep
          schedulingDate={schedulingDate}
          onCancelConfirmation={handleCancelConfirmation}
        />
      )}
    </Container>
  )
}
