<script setup lang="ts">
import { z } from "zod";

const settings = useSettings();

const formSchema = toTypedSchema(
  z.object({
    width: z.number().min(0),
    borderWidth: z.number().min(0),
    inAdvance: z.number().min(0),
  }),
);

const { setFieldValue, isFieldValid, validate, setValues, values } = useForm({
  validationSchema: formSchema,
  initialValues: settings.value,
});

onMounted(() => {
  setValues(settings.value);
});

const onNumbeFieldUpdate = async (
  value: number,
  field: "width" | "borderWidth" | "inAdvance",
) => {
  setFieldValue(field, value);

  await validate();

  if (!isFieldValid(field)) return;

  settings.value[field] = value;
};
</script>

<template>
  <MaxWidthWrapper>
    <div class="flex w-full flex-col gap-6">
      <Field name="width">
        <UFormItem>
          <UFormLabel>Target Width</UFormLabel>
          <UNumberField
            class="w-fit gap-2"
            :model-value="values.width"
            @update:model-value="onNumbeFieldUpdate($event, 'width')"
          >
            <UNumberFieldContent>
              <UNumberFieldDecrement />
              <UFormControl>
                <UNumberFieldInput />
              </UFormControl>
              <UNumberFieldIncrement />
            </UNumberFieldContent>
          </UNumberField>
          <UFormDescription>
            The width of the target in pixels.
          </UFormDescription>
          <UFormMessage />
        </UFormItem>
      </Field>
      <Field name="borderWidth">
        <UFormItem>
          <UFormLabel>Border Width</UFormLabel>
          <UNumberField
            class="w-fit gap-2"
            :model-value="values.borderWidth"
            @update:model-value="onNumbeFieldUpdate($event, 'borderWidth')"
          >
            <UNumberFieldContent>
              <UNumberFieldDecrement />
              <UFormControl>
                <UNumberFieldInput />
              </UFormControl>
              <UNumberFieldIncrement />
            </UNumberFieldContent>
          </UNumberField>
          <UFormDescription>
            The target area border width in pixels.
          </UFormDescription>
          <UFormMessage />
        </UFormItem>
      </Field>
      <Field name="inAdvance">
        <UFormItem>
          <UFormLabel>In Advance</UFormLabel>
          <UNumberField
            class="w-fit gap-2"
            :model-value="values.inAdvance"
            @update:model-value="onNumbeFieldUpdate($event, 'inAdvance')"
          >
            <UNumberFieldContent>
              <UNumberFieldDecrement />
              <UFormControl>
                <UNumberFieldInput />
              </UFormControl>
              <UNumberFieldIncrement />
            </UNumberFieldContent>
          </UNumberField>
          <UFormDescription>
            The number of targets to be in advance.
          </UFormDescription>
          <UFormMessage />
        </UFormItem>
      </Field>
      <UButton class="w-fit" as-child>
        <NuxtLink to="/">Back</NuxtLink>
      </UButton>
    </div>
  </MaxWidthWrapper>
</template>
