import { OptionalObjectSchema, TypeOfShape } from 'yup/lib/object'
import { RequiredStringSchema } from 'yup/lib/string'
import { AnyObject } from 'yup/lib/types'
import ValidationError from '../types/Validation/ValidationError'

const handleValidation = async (
  feldSchema: OptionalObjectSchema<
    {
      value: RequiredStringSchema<string, AnyObject>
    },
    AnyObject,
    TypeOfShape<{
      value: RequiredStringSchema<string, AnyObject>
    }>
  >,
  feldEntry: { value: string }
): Promise<ValidationError> => {
  const res = {
    hasError: false,
    errorMessage: '',
  }

  const isValid = await feldSchema.isValid(feldEntry)

  if (isValid) {
    return res
  }

  try {
    await feldSchema.validate(feldEntry, { abortEarly: true })
  } catch (error) {
    res.hasError = true
    res.errorMessage = error.errors[0]
  } finally {
    return res
  }
}

export default handleValidation
