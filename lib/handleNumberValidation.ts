import { RequiredNumberSchema } from 'yup/lib/number'
import { OptionalObjectSchema, TypeOfShape } from 'yup/lib/object'
import { AnyObject } from 'yup/lib/types'
import ValidationError from '../types/Validation/ValidationError'

const handleNumberValidation = async (
  feldSchema: OptionalObjectSchema<
    {
      value: RequiredNumberSchema<number, AnyObject>
    },
    AnyObject,
    TypeOfShape<{
      value: RequiredNumberSchema<number, AnyObject>
    }>
  >,
  feldEntry: { value: number }
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

export default handleNumberValidation
