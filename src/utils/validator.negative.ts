import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class IsNotNegative implements ValidatorConstraintInterface {
    validate(value: any) {
        return value >= 0;
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} debe ser un número no negativo`;
    }
}
