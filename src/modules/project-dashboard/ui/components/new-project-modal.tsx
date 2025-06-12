"use client";
import { useState, useEffect } from "react";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { createProjectSchema } from "../../schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProject } from "@/modules/project-dashboard/hooks/use-create-project-modal";

import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "@convex/_generated/api";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DialogDescription } from "@radix-ui/react-dialog";

export const NewProjectModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, close } = useCreateProject();

  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.projects.createProject),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.input<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      startDate: new Date(),
      endDate: new Date(),
      perDiemAmount: 50,
      restDays: 0,
    },
    mode: "onChange",
  });

  const handleOnClose = () => {
    form.reset();
    close();
  };

  const handleOnSubmit = (values: z.input<typeof createProjectSchema>) => {
    mutate({
      name: values.name,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
      perDiemAmount: values.perDiemAmount || 0,
      restDays: values.restDays || 0,
    });
    form.reset();
    close();
  };

  if (!isMounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a project</DialogTitle>
          <DialogDescription className="sr-only">
            Fill out the form to create a project
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOnSubmit)}>
            <div className="space-y-8 py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={form.formState.isSubmitting || isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="perDiemAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Per diem amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={form.formState.isSubmitting || isPending}
                          type="number"
                          className="pl-5"
                          {...field}
                        />
                        <span className="text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2 text-sm">
                          £
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="restDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rest days</FormLabel>
                    <FormControl>
                      <Input
                        disabled={form.formState.isSubmitting || isPending}
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value
                            ? parseInt(e.target.value)
                            : 0;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={
                                form.formState.isSubmitting || isPending
                              }
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date: Date): boolean =>
                              date < new Date("1900-01-01")
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={
                                form.formState.isSubmitting || isPending
                              }
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date: Date): boolean => {
                              const startDate = form.getValues("startDate");
                              return (
                                date <= startDate ||
                                date < new Date("1900-01-01")
                              );
                            }}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-full justify-end py-2">
              <Button
                disabled={
                  form.formState.isSubmitting ||
                  isPending ||
                  !form.formState.isValid
                }
                className="hover:cursor-pointer"
                type="submit"
              >
                {form.formState.isSubmitting ? <Loader2Icon /> : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
