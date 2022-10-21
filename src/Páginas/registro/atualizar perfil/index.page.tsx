import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Header } from '../styles'
import { Annotation, PictureInput, ProfileBox } from './styles'

const updateProfileFormSchema = z.object({
  avatarFile: z
    .any()
    .nullable()
    .transform((fileList) => {
      if (fileList) {
        return fileList[0]
      }
    }),
  bio: z.string().nullable(),
})

type UpdateProfileFormData = z.input<typeof updateProfileFormSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  const avatarFile = watch('avatarFile')

  const avatarPreview = useMemo(() => {
    if (avatarFile?.[0]) {
      return URL.createObjectURL(avatarFile[0])
    }

    return null
  }, [avatarFile])

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(data)

    alert('Success! Form data is on console.log :)')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Finalize seu perfil</Heading>
        <Text>Por último, uma breve descrição e uma foto de perfil.</Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label htmlFor="avatarUrl">
          <Text size="sm">Foto de perfil</Text>

          <PictureInput>
            <Avatar
              src={`${avatarPreview ?? 'https://github.com/diego3g.png'}`}
              alt="Diego Fernandes"
            />

            <Button as="div" variant="secondary" size="sm">
              Selecionar foto
            </Button>

            <input
              id="avatarUrl"
              type="file"
              accept="image/*"
              {...register('avatarFile')}
            />
          </PictureInput>
        </label>

        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register('bio')} />
          <Annotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </Annotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  )
}
