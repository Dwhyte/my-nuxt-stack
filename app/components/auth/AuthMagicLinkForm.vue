<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useInitiateGoogleOAuth, useSendMagicLink } from '~/features/auth/mutations'
import { validateLoginEmail } from '~/features/auth/schemas'

const props = withDefaults(
  defineProps<{
    mode?: 'login' | 'signup'
    name?: string
  }>(),
  {
    mode: 'login',
    name: '',
  },
)

const emit = defineEmits<{
  sent: [email: string]
}>()

const stage = ref<'form' | 'sent'>('form')
const email = ref('')
const signupName = ref(props.name)
const emailError = ref<string | null>(null)
const formError = ref<string | null>(null)

const { send, isPending: sendingMagicLink } = useSendMagicLink()
const { open: openGoogle, isPending: googleLoading } = useInitiateGoogleOAuth()

const sentEmailDisplay = computed(() => {
  const trimmed = email.value.trim()

  return trimmed !== '' ? trimmed : 'your inbox'
})

const googleLabel = computed(() => (
  props.mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google'
))

const submitLabel = computed(() => (
  props.mode === 'signup' ? 'Sign up' : 'Sign in'
))

async function submitMagicLink(): Promise<void> {
  formError.value = null
  emailError.value = null

  const validation = validateLoginEmail(email.value)

  if (validation !== true) {
    emailError.value = validation
    return
  }

  try {
    await send(
      email.value.trim(),
      props.mode === 'signup' ? signupName.value.trim() || undefined : undefined,
    )
    stage.value = 'sent'
    emit('sent', email.value.trim())
  } catch (error) {
    formError.value = error instanceof Error ? error.message : 'Unable to send magic link.'
  }
}

async function resendMagicLink(): Promise<void> {
  formError.value = null

  try {
    await send(
      email.value.trim(),
      props.mode === 'signup' ? signupName.value.trim() || undefined : undefined,
    )
  } catch (error) {
    formError.value = error instanceof Error ? error.message : 'Unable to resend magic link.'
  }
}

async function startGoogleSignIn(): Promise<void> {
  formError.value = null

  try {
    await openGoogle()
  } catch (error) {
    formError.value = error instanceof Error ? error.message : 'Unable to open Google sign-in.'
  }
}

function backToForm(): void {
  stage.value = 'form'
  formError.value = null
}
</script>

<template>
  <div v-if="stage === 'form'" class="flex flex-col gap-4">
    <UButton
      variant="outline"
      size="lg"
      block
      :loading="googleLoading"
      :disabled="sendingMagicLink"
      @click="startGoogleSignIn"
    >
      <Icon icon="flat-color-icons:google" class="mr-2 size-5 shrink-0" />
      {{ googleLabel }}
    </UButton>

    <p class="text-muted text-center text-sm">
      or
    </p>

    <UFormField v-if="mode === 'signup'" label="Name">
      <UInput v-model="signupName" autocomplete="name" />
    </UFormField>

    <UFormField label="Email" :error="emailError ?? undefined">
      <UInput
        v-model="email"
        type="email"
        autocomplete="email"
        @keyup.enter="submitMagicLink"
      />
    </UFormField>

    <UAlert
      v-if="formError"
      color="error"
      variant="subtle"
      :title="formError"
    />

    <UButton
      block
      size="lg"
      :loading="sendingMagicLink"
      :disabled="googleLoading"
      @click="submitMagicLink"
    >
      {{ submitLabel }}
    </UButton>
  </div>

  <div v-else class="flex flex-col gap-4">
    <h2 class="text-highlighted text-xl font-bold tracking-tight">
      Check your email
    </h2>
    <p class="text-muted text-sm leading-relaxed">
      We sent a sign-in link to
      <span class="text-highlighted font-medium">{{ sentEmailDisplay }}</span>.
      It expires in 15 minutes.
    </p>

    <UAlert
      v-if="formError"
      color="error"
      variant="subtle"
      :title="formError"
    />

    <UButton variant="link" class="px-0" @click="backToForm">
      Use a different email
    </UButton>

    <UButton
      block
      size="lg"
      :loading="sendingMagicLink"
      @click="resendMagicLink"
    >
      Resend link
    </UButton>
  </div>
</template>
