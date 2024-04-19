import vine from '@vinejs/vine'

export const profileValidator = vine.compile(
  vine.object({
    firstName: vine.string().minLength(1).maxLength(255),
    dob: vine
      .date({
        formats: ['YYYY-MM-DD', 'x'],
      })
      .nullable(),
    gender: vine.enum(['male', 'female', 'non-binary', 'other']),
  })
)
