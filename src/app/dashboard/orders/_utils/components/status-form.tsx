"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ActionResponseHandler } from "@/lib/error";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { PRINT } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatusFormSchema, TOrderStatusFormSchema } from "../types/types";
import { UpdateOrder } from "../actions/actions";

const OrderStatusUpdateForm = ({
  _id,
  status = "pending",
}: {
  _id: string;
  status: "pending" | "paid" | "shipped";
}) => {
  const router = useRouter();
  const form = useForm<TOrderStatusFormSchema>({
    resolver: zodResolver(OrderStatusFormSchema),
    defaultValues: {
      _id,
      status,
    },
  });
  const { auth } = useAuthContext();

  const onSubmit = async (values: TOrderStatusFormSchema) => {
    // action on successfull response
    // PRINT(values);
    const result = await UpdateOrder(values, auth?.accessToken as string);
    ActionResponseHandler(result, "Order Status");
    if (result.success) {
      router.push("/dashboard/orders");
    }
  };
  return (
    <div className="max-w-[350px] space-y-8">
      <div className="space-y-2">
        <h4 className="text-[16px] md:text-[20px] font-semibold">
          Order status
        </h4>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Based on this order status will be changed
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-x-4">
            <Link
              href="/dashboard/orders"
              className="py-[10px] px-[16px] rounded-[10px] bg-muted text-primary border border-dark_gray"
            >
              Discard
            </Link>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Updating..." : "Update status"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OrderStatusUpdateForm;
