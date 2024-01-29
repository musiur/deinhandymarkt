/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "@/components/atoms/input-field";
import { z } from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Switch } from "@/components/ui/switch";
import { PRINT } from "@/lib/utils";
import { useContextStore } from "@/lib/hooks/hooks";
import { useRouter } from "next/navigation";

const BillingFormSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  salutation: z.string().min(1, "Salutation is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  reference: z.string().min(1, "Reference number is required"),
  telephone: z.string().min(1, "Telephone number is required"),
  street: z.string().min(1, "Address is required"),
  house: z.string().min(1, "House number is required"),
  pobox: z.string().min(1, "P.O Box is required"),
  plz: z.string().min(1, "PLZ is required"),
  location: z.string().min(1, "Location is required"),
  land: z.string().min(1, "Land is required"),
  message: z.string().min(1, "Message is required"),
});

type TBillingFormSchema = z.infer<typeof BillingFormSchema>;

const BillingAddressForm = ({
  title,
  name,
  handler,
  defaultValues,
}: {
  title: string;
  name: string;
  handler: {
    data: { delivery: TBillingFormSchema; billing: TBillingFormSchema };
    setData: Function;
    step: number;
    setStep: Function;
  };
  defaultValues: TBillingFormSchema;
}) => {
  const router = useRouter();
  const { getContext, setContext } = useContextStore();
  const form = useForm<TBillingFormSchema>({
    resolver: zodResolver(BillingFormSchema),
    defaultValues: getContext("billingDetails")
      ? getContext("billingDetails")[name]
      : defaultValues,
  });
  const [sameAsBilling, setSameAsBilling] = useState(
    getContext("sameAsBilling") ?? false
  );

  // form submission handler
  const onSubmit = async (values: TBillingFormSchema) => {
    // action on successfull response
    console.log(values);
    if (Object.values(values).filter((item) => item).length === 13) {
      const toPersist = { ...handler.data, [name]: values };
      handler.setData(toPersist);
      setContext("billingDetails", toPersist);
      if (name === "billing") {
        handler.setStep(2);
      }
      if (handler.step === 2) {
        router.push("/checkout/payment-methods");
      }
    }
  };

  useEffect(() => {
    if (sameAsBilling && handler.step === 2) {
      handler.setData({ ...handler.data, [name]: handler.data.billing });
      form.reset(handler.data.billing);
    }
    setContext("sameAsBilling", sameAsBilling);
  }, [sameAsBilling]);

  return (
    <div
      className={clsx(
        "rounded-[10px] border transition ease-in-out duration-500 p-4",
        {
          "border-secondary": sameAsBilling && handler.step === 2,
          "border-dark_gray": !sameAsBilling,
        }
      )}
    >
      {handler.step === 2 ? (
        <div className="flex gap-4">
          <div>Same as billing? </div>
          <Switch
            checked={sameAsBilling}
            onClick={() => {
              setSameAsBilling(!sameAsBilling);
              handler.setData({
                ...handler.data,
                delivery: sameAsBilling
                  ? handler.data.billing
                  : handler.data.delivery,
              });
            }}
          />
        </div>
      ) : null}
      <h3 className="text-[14px] md:text-[18px] font-semiobold pb-5">
        {title}
      </h3>
      <Form {...form}>
        <form
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[32px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <fieldset className="space-y-8">
            <InputField form={form} name="salutation" label="Salutation" />
            <InputField
              form={form}
              name="firstName"
              label="First name"
              placeholder="e.g. John"
            />
            <InputField
              form={form}
              name="lastName"
              label="Last name"
              placeholder="e.g. Doe"
            />
            <InputField form={form} name="reference" label="Reference number" />
            <InputField form={form} name="telephone" label="Telephone number" />
          </fieldset>
          <fieldset className="space-y-8">
            <InputField form={form} name="street" label="Street" />
            <InputField form={form} name="house" label="House number" />
            <InputField form={form} name="pobox" label="P.O Box" />
            <InputField form={form} name="plz" label="PLZ" />
            <InputField form={form} name="location" label="Location" />
          </fieldset>
          <fieldset className="space-y-8">
            <InputField form={form} name="land" label="Land" />
            <InputField
              form={form}
              name="email"
              label="Email"
              placeholder="e.g. hello@example.com"
            />
            <InputField
              form={form}
              name="message"
              label="Your message"
              textarea
            />
            <div className="flex justify-end gap-4">
              {handler.step === 1 ? (
                <Link href="/checkout">
                  <Button variant="outline">Previous</Button>
                </Link>
              ) : (
                <div
                  className="px-[16px] py-[6px] border border-dark_gray rounded-[10px]"
                  onClick={() => handler.setStep(1)}
                  role="button"
                >
                  Previous
                </div>
              )}
              {sameAsBilling && handler.step === 2 ? (
                <div
                  className="px-[16px] py-[6px] border border-secondary bg-secondary text-white rounded-[10px]"
                  onClick={() => {
                    PRINT(handler.data);
                    router.push("/checkout/payment-methods");
                  }}
                  role="button"
                >
                  Next
                </div>
              ) : (
                <Button type="submit">Next</Button>
              )}
            </div>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};
export default BillingAddressForm;
