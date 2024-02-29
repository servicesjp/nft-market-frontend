import { HStack, Text } from "@chakra-ui/react"
import { FormikProps } from "formik"
import Yup from 'yup'
import { passwordSchema } from "./auth-schemas"

import TickCircleFilledRed from '@/assets/icons/tick-circle-filled-red.svg'
import TickCircleFilled from '@/assets/icons/tick-circle-filled.svg'
import TickCircleOutline from '@/assets/icons/tick-circle-outline.svg'

export default function PasswordValidationMessage({ formikProps, errorMessage }: PasswordValidationMessageProps) {
    let color = 'black'
    let icon = <TickCircleOutline />
    const currentInput = formikProps.values.password
    if (currentInput && currentInput.length > 0) {
        if (passwordContainsError(currentInput, errorMessage)) {
            color = 'red.100'
            icon = <TickCircleFilledRed />
        } else {
            color = 'green.100'
            icon = <TickCircleFilled />
        }
    }

    return <HStack w="100%">
        { icon }
        <Text color={color}> {errorMessage}</Text>
    </HStack>
}

interface PasswordValidationMessageProps {
    formikProps: FormikProps<any>;
    errorMessage: string;
}

function passwordContainsError(password: string, errorMessage: string) {
    try {
        passwordSchema().validateSync(password, { abortEarly: false });
        return false
    } catch (error) {
        const validationError = error as Yup.ValidationError
        if (!validationError) {
            throw error
        }

        return validationError.errors.indexOf(errorMessage) >= 0
    }
}