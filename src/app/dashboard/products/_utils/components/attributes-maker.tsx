/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import InputField from "@/components/atoms/input-field";
import TagInput from "@/components/molecules/tag-input";
import UploadMultipleImages from "@/components/molecules/upload-multi-image-with-cloudinary";
// import UploadMultiImages from "@/components/molecules/upload-multi-images";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SingleAttributesSchema = z.object({
  label: z.string().min(3),
  type: z.literal("others").or(z.literal("image")), // @TODO should be added to schema
  values: z.array(z.string()).min(1),
});

type TSingleAttributesSchema = z.infer<typeof SingleAttributesSchema>;

const AttributesMaker = ({ parentForm }: { parentForm: any }) => {
  const [attributes, setAttributes] = useState<TSingleAttributesSchema[]>(
    parentForm.getValues("attributes") || []
  );
  
  const defaultFormState: TSingleAttributesSchema = {
    label: "",
    type: "others",
    values: [],
  };
  const form = useForm<TSingleAttributesSchema>({
    resolver: zodResolver(SingleAttributesSchema),
    defaultValues: defaultFormState,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = (data: TSingleAttributesSchema) => {
    if (
      data.values.length &&
      !attributes.filter((item) => item.label == data.label).length
    ) {
      const newAttributes = [...attributes, data];
      
      setAttributes(newAttributes);
      parentForm.setValue("attributes", newAttributes);
      setErrorMessage(null);
      form.reset(defaultFormState);
    } else {
      setErrorMessage("Attribute already exists");
    }
  };

  const handleRemove = (label: string) => {
    const newAttributes = [
      ...attributes.filter((item) => item.label !== label),
    ];
    setAttributes(newAttributes);
    parentForm.setValue("attributes", newAttributes);
  };
  return (
    <div className="space-y-8 p-[8px] border rounded-[10px] max-w-[450px]">
      <h4 className="text-[16px] md:text-[20px] font-semibold">Attributes</h4>
      <div className="space-y-4">
        <div className="flex items-center flex-wrap gap-4 bg-muted p-[8px] rounded-[10px]">
          {attributes.length
            ? attributes.map((item) => {
                const { label, values, type } = item;
                
                return (
                  <div
                    key={label}
                    className="relative border p-2 rounded-[10px] space-y-2 min-w-[100px] bg-white"
                  >
                    <X
                      className="absolute top-0 right-0 -m-1 bg-white rounded-full stroke-gray-400 stroke-[1.3px] w-6 h-6 border hover:shadow-lg"
                      role="button"
                      onClick={() => handleRemove(label)}
                    />
                    <p>Attribute: {label}</p>
                    <p>Type: {type}</p>
                    <ul className="flex flex-wrap gap-[4px]">
                      Values:&nbsp;
                      {values.map((value) => {
                        return (
                          <li
                            key={value}
                            className="px-[4px] py-[2px] bg-muted rounded"
                          >
                            {type === "image" || value?.length > 50 ? (
                              <img
                                src={value}
                                alt="values"
                                className="w-6 h-6 rounded-full"
                              />
                            ) : (
                              value
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })
            : "Please add new attributes!"}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              form={form}
              name="label"
              label="Label"
              placeholder="e.g. Color"
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("values", []);
                    }}
                    defaultValue={form.getValues("type") || "others"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.getValues("type") === "image" ||
            form.getValues("values").length > 50 ? (
              <FormField
                control={form.control}
                name="values"
                render={() => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      
                      <UploadMultipleImages
                        form={form}
                        name="values"
                        defaultValues={form.getValues("values")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="flex flex-col gap-[4px]">
                <label htmlFor="status" className="font-semibold">
                  Values
                </label>
                <TagInput
                  onChange={(e: any) => {
                    form.setValue("values", e.target.value);
                  }}
                  name="values"
                  defaultValue={form?.getValues("values")?.length ? [...form?.getValues("values")] : []}
                />
              </div>
            )}

            <Button type="submit">Add attribute</Button>
            {errorMessage ? <FormMessage>{errorMessage}</FormMessage> : null}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AttributesMaker;
