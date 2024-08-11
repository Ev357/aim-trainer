<script setup lang="ts">
import { z } from "zod";

const settings = useSettings();

const formSchema = toTypedSchema(
  z.object({
    width: z.number().min(0),
  }),
);

const { setFieldValue, isFieldValid, validate, setValues, values } = useForm({
  validationSchema: formSchema,
  initialValues: settings.value,
});

onMounted(() => {
  setValues(settings.value);
});

const onWidthUpdate = async (value: number) => {
  setFieldValue("width", value);

  await validate();

  if (!isFieldValid("width")) return;

  settings.value.width = value;
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
            @update:model-value="onWidthUpdate"
            v-model="values.width"
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
      <UButton class="w-fit" as-child>
        <NuxtLink to="/">Back</NuxtLink>
      </UButton>
    </div>
  </MaxWidthWrapper>
</template>
