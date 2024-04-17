import vine from '@vinejs/vine'

export const profileValidator = vine.compile(
  vine.object({
    firstName: vine.string().minLength(1).maxLength(255),
    age: vine.number().min(18).max(100),
    gender: vine.enum(['male', 'female', 'non-binary', 'other']),
  })
)
