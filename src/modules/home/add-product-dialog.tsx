import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../components/dialog";
import { Plus } from "lucide-react";
import { Button } from "../../components/button";
import { DialogHeader, DialogFooter } from "../../components/dialog";
import { Input } from "../../components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProduct, type ProductsPostBody } from "../../api/products";

const packagingMethods = {
  pet: "PET",
  can: "Can",
  glass: "Glass",
  tetra: "Tetra",
  other: "Other",
};

const formSchema = z.object({
  name: z.string().trim().min(2).max(64),
  packaging: z.enum(Object.keys(packagingMethods)),
  deposit: z.coerce.number<number>().int().min(1),
  volume: z.coerce.number<number>().int().min(1),
});

function AddProductDialog() {
  const queryClient = useQueryClient();

  const closeButton = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      packaging: "pet",
      deposit: 0,
      volume: 0,
    },
    mode: "onTouched",
  });

  const addProductMutation = useMutation({
    mutationFn: async (product: ProductsPostBody) => {
      const data = await addProduct(product);
      return data.message;
    },
    onError: (error) => toast.error(error.message),
    onSuccess: (message) => {
      queryClient.invalidateQueries({
        queryKey: ["pendingProducts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["recentProducts"],
      });
      toast.success(message);
      form.reset();
      if (closeButton.current) {
        closeButton.current.click();
      }
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    let { name } = data;

    name = name.trim();

    addProductMutation.mutate({
      ...data,
      name,
      companyId: 1,
      registeredById: 1,
    } as ProductsPostBody);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add new product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a product</DialogTitle>
          <DialogDescription>
            Fill in the product details. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="add-product-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="packaging"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Packaging type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select packaging type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(packagingMethods).map(
                          ([value, label]) => (
                            <SelectItem
                              key={`packaging-${value}`}
                              value={value}
                            >
                              {label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit amount</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Packaging volume (ml)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              ref={closeButton}
              variant="outline"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="add-product-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddProductDialog;
