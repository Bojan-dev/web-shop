import InputsSchema, {
  BaseInputs,
  SpecType,
  ErrorsType,
  FormTypeSchema,
} from './schemaTypes';
import { AdminInput, AdminTextarea, InputLabelWrapper } from './styles';
import { UseFormRegister } from 'react-hook-form';

export type InputTypes = {
  schema: InputsSchema;
  register: UseFormRegister<FormTypeSchema>;
  errors: ErrorsType;
};

const placeholderCreator = (value: string): string => {
  const fieldName = value.replaceAll('_', ' ');

  return `${fieldName[0].toUpperCase()}${fieldName.slice(1, fieldName.length)}`;
};

const NewProductInputs: React.FC<InputTypes> = ({
  schema,
  register,
  errors,
}) => {
  const { spec, ...rest } = schema;
  console.time('start');

  const baseFields = Object.entries(rest).sort((a, b) =>
    b[0].localeCompare(a[0])
  );
  const specFields = Object.entries(spec);

  const baseInputs = baseFields.map((value) => {
    const fieldName = value[0] as keyof BaseInputs;

    const isError = errors[fieldName] ? true : false;

    if (value[1] <= 100) {
      const inputType =
        fieldName === 'price' ? (
          <AdminInput
            placeholder={placeholderCreator(fieldName)}
            {...register(fieldName, {
              required: true,
            })}
            key={fieldName}
            type="number"
            isError={isError}
            step=".01"
          />
        ) : (
          <AdminInput
            placeholder={placeholderCreator(fieldName)}
            {...register(fieldName, {
              required: true,
            })}
            key={fieldName}
            isError={isError}
          />
        );

      return inputType;
    }
    return (
      <AdminTextarea
        placeholder={placeholderCreator(fieldName)}
        {...register(fieldName, {
          required: true,
        })}
        key={fieldName}
        rows={4}
        isError={isError}
      />
    );
  });

  const specInputs = specFields.map((value) => {
    const fieldName = value[0] as keyof SpecType;

    const isError = errors[fieldName] ? true : false;

    return (
      <AdminInput
        placeholder={placeholderCreator(fieldName)}
        {...register(fieldName, {
          required: true,
        })}
        key={fieldName}
        isError={isError}
      />
    );
  });

  console.timeEnd('start');

  return (
    <>
      <InputLabelWrapper>
        <p>Fill in the basic fields:</p>
        {baseInputs}
      </InputLabelWrapper>
      <InputLabelWrapper>
        <p>Fill in the specification fields:</p>
        {specInputs}
      </InputLabelWrapper>
    </>
  );
};

export default NewProductInputs;
