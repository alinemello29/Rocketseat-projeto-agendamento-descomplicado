import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { ArrowRight } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../lib/axios'
import { Container, Form, FormError, Header } from './styles'

const basicInformationFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Escolha um usuário para continuar.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Apenas letras e hifens são permitidos.',
    })
    .transform((value) => value.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'Seu nome deve possuir pelo menos 3 caracteres.' }),
})

type BasicInformationFormData = z.infer<typeof basicInformationFormSchema>

export default function Register() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BasicInformationFormData>({
    resolver: zodResolver(basicInformationFormSchema),
  })

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  async function handleSetupBasicInformation(data: BasicInformationFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err?.response?.data?.message) {
        alert(err.response.data.message)
      } else {
        console.log(err)
      }
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleSetupBasicInformation)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            prefix="cal.com/"
            placeholder="seu-usuario"
            {...register('username')}
          />

          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />
          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { '@ignite-call:user': userOnCookies } = parseCookies({ req })

  if (userOnCookies) {
    return {
      redirect: {
        destination: '/register/connect-calendar',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
